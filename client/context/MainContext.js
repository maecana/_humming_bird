import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { client } from '../lib/client';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState('loading');
    const [currentWalletAddress, setCurrentWalletAddress] = useState('');
    const router = useRouter();

    useEffect(() => {
        isWalletConnected();
    }, []);


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
    

    return (
        <MainContext.Provider value={{ appStatus, currentWalletAddress, wallectConnect }}>
            {children}
        </MainContext.Provider>
    );
}
