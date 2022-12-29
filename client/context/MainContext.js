import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { client } from '../lib/client';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState('loading');
    const [currentWalletAddress, setCurrentWalletAddress] = useState('');
    const [hums, setHums] = useState([]);
    const [currentUserDetails, setCurrentUserDetails] = useState({});
    const router = useRouter();

    useEffect(() => {
        isWalletConnected();
    }, []);


    useEffect(() => {
        if(!currentWalletAddress || appStatus !== 'connected') return;
        getCurrentUserDetails(currentWalletAddress);
        fetchHums();
    }, [currentWalletAddress, appStatus]);


    const isWalletConnected = async () => {
        if(!window.ethereum) return;

        try {
            const wallet_addresses = await window.ethereum.request({
                method: "eth_accounts",
            });
            
            if (wallet_addresses.length > 0) {
                setAppStatus('connected');
                setCurrentWalletAddress(wallet_addresses[0]);
                createBirdAccount(wallet_addresses[0]);
            } else {
                router.push('/');
                setAppStatus('not-connected');
            }
        } catch (error) {
            setAppStatus('error');
        }
    };


    // Initialize Metamask Wallet Connection
    const wallectConnect = async () => {
        if(!window.ethereum) return setAppStatus('no-metamask-found');

        try {
            setAppStatus('loading');

            const wallet_addresses = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            if(wallet_addresses.length > 0) {
                setAppStatus('connected');
                setCurrentWalletAddress(wallet_addresses[0]);
                createBirdAccount(wallet_addresses[0]);
            } else {
                router.push('/');
                setAppStatus('not-connected');
            }

        } catch(error) {
            setAppStatus('error');
        }
    };


    const createBirdAccount = async(walletAddress = currentWalletAddress) => {
        if (!window.ethereum) return setAppStatus('no-metamask-found');

        try {
            const userDoc = {
                _type: 'birds',
                _id: walletAddress,
                name: 'Unknown',
                isProfileImageNFT: false,
                profileImage: '',
                walletAddress: walletAddress,
            };

            await client.createIfNotExists(userDoc);
            setAppStatus('connected');
        } catch(error) {
            router.push('/');
            setAppStatus('error');
        }
    };
    
    
    const fetchHums = async () => {
        const query = `
            *[_type == 'hums'] {
                "bird": bird->{name, walletAddress, profileImage, isProfileImageNFT},
                hum,
                timestamp
            } | order (timestamp desc)
        `;

        const sanityResponse = await client.fetch(query);
        setHums([]);

        sanityResponse.forEach(async (items) => {
            const newItem = {
                hum: items.hum,
                timestamp: items.timestamp,
                bird: {
                name: items.bird.name,
                walletAddress: items.bird.walletAddress,
                isProfileImageNFT: items.bird.isProfileImageNFT,
                profileImage: items.bird.profileImage,
                }
            };
            setHums(hums => [...hums, newItem]);
        }); 
    };

    
    const getCurrentUserDetails = async (walletAddress = currentWalletAddress) => {
        if (appStatus !== 'connected') return;

        const query = `
            *[_type == 'birds' && _id == "${walletAddress}"] {
                "hums": hums[]->{timestamp, hum} | order (timestamp desc),
                name,
                profileImage,
                isProfileImageNFT,
                coverImage,
                walletAddress
            }
        `;

        const sanityResponse = await client.fetch(query);
        setCurrentUserDetails({
            hums: sanityResponse[0].hums,
            name: sanityResponse[0].name,
            profileImage: sanityResponse[0].profileImage,
            isProfileImageNFT: sanityResponse[0].isProfileImageNFT,
            coverImage: sanityResponse[0].coverImage,
            walletAddress: sanityResponse[0].walletAddress
        });
    };


    return (
        <MainContext.Provider
            value={{
                appStatus,
                currentWalletAddress,
                hums,
                currentUserDetails,
                wallectConnect,
                fetchHums,
                getCurrentUserDetails
            }
        }>
            {children}
        </MainContext.Provider>
    );
}
