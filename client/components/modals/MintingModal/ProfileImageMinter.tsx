import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useContext } from "react";

import { MainContext } from "../../../context/MainContext";
import { pinJSONtoIPFS, pinFileToIPFS } from '../../../lib/pinata';
import { client } from "../../../lib/client";
import { contractABI, contractAddress } from '../../../lib/constants';
import { ethers } from 'ethers';
import FinishedState from "./FinishedState";
import InitialState from "./InitialState";
import LoadingState from "./LoadingState";

declare let window: any

let metamask: any

if (typeof window !== 'undefined') {
  metamask = window.ethereum
}

interface Metadata {
  name: string
  description: string
  image: string
}

interface HeaderObject {
  key: string | undefined
  value: string | undefined
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(metamask)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )

  return transactionContract
}

const createPinataRequestHeaders = (headers: Array<HeaderObject>) => {
  const requestHeaders: HeadersInit = new Headers()

  headers.forEach((header: any) => {
    requestHeaders.append(header.key, header.value)
  })

  return requestHeaders
}

const ProfileImageMinter: NextPage = () => {
    const router = useRouter();
    const { setAppStatus, currentWalletAddress } = useContext(MainContext);
    const [status, setStatus] = useState<string>("initial");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [profileImage, setProfileImage] = useState<File>();
    
    const mint = async () => {
        if (!name || !profileImage || !description) return;

        setStatus('loading');
        const pinataMetadata = {
            name: `${name} - ${description}`,
        };

        const IPFSImageHash = await pinFileToIPFS(profileImage, pinataMetadata);
        await client.patch(currentWalletAddress)
            .set({profileImage: IPFSImageHash})
            .set({isProfileImageNFT: true})
            .commit();
        
        const imageMetadata = {
            name: name,
            description: description,
            image: `ipfs://${IPFSImageHash}`,
        };

        const IPFSJSONHash = await pinJSONtoIPFS(imageMetadata);
        const contract = await getEthereumContract();
        const transactionParameters = {
            to: contractAddress,
            from: currentWalletAddress,
            data: await contract.mint(currentWalletAddress, `ipfs://${IPFSJSONHash}`),
        };
      
        try {
            await metamask.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        
            setStatus('finished');
        } catch (error: any) {
            console.log(error);
            setStatus('finished');
        }
    }


    const modalChildren = (modalStatus = status) => {
        switch(modalStatus) {
            case 'initial':
                return (
                    <InitialState
                        profileImage={profileImage!}
                        name={name}
                        description={description}
                        mint={mint}
                        setProfileImage={setProfileImage}
                        setName={setName}
                        setDescription={setDescription}
                    />
                );
                break;

            case 'loading':
                return <LoadingState />

            case 'finished':
                return <FinishedState />

            default:
                router.push('/')
                setAppStatus('error');
        }
    }

    return <>{modalChildren(status)}</>
};

export default ProfileImageMinter;