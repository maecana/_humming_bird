import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';

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
            } else {
                router.push('/');
                setAppStatus('not-connected');
            }

        } catch(error) {
            setAppStatus('error');
        }
    };

    return (
        <MainContext.Provider value={{ appStatus, currentWalletAddress, wallectConnect }}>
            {children}
        </MainContext.Provider>
    );
}
