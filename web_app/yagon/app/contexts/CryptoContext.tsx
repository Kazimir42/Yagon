"use client";
import Web3 from "web3";
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {smartContractAbi, smartContractAddress} from "@/contract.conf";

const CryptoContext = createContext<CryptoContextProps | undefined>(undefined);

interface CryptoContextProps {
    wallet: any;
    setWallet: (value: any) => void;
    contract: any;
    setContract: (value: any) => void;
    account: any;
    setAccount: (value: any) => void;
}

export const CryptoProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [wallet, setWallet] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState<any>(null);

    useEffect(() => {
        async function initializeWeb3() {
            if (!web3) {
                try {
                    if (window.ethereum) {
                        const newWeb3 = new Web3(window.ethereum);
                        await window.ethereum.request({method: 'eth_requestAccounts'});
                        setWeb3(newWeb3);
                    } else if (window.web3) {
                        const newWeb3 = new Web3(window.web3.currentProvider);
                        setWeb3(newWeb3);
                    } else {
                        console.log('No Ethereum browser extension detected');
                    }
                } catch (error) {
                    console.error('Error initializing Web3', error);
                }
            }
        }

        initializeWeb3().then(r => console.log('web3 initialized'));
    }, [web3]);

    useEffect(() => {
        async function fetchUserAccount() {
            if (web3) {
                try {
                    const accounts = await web3.eth.getAccounts();
                    setAccount(accounts[0]);
                } catch (error) {
                    console.error('Error fetching user account', error);
                }
            }
        }

        fetchUserAccount().then(r => console.log('user account fetched'));
    }, [web3]);

    useEffect(() => {
        async function initializeSmartContract() {
            if (web3) {
                try {
                    const newContract = new web3.eth.Contract(smartContractAbi, smartContractAddress);
                    setContract(newContract);
                } catch (error) {
                    console.error('Error initializing smart contract', error);
                }
            }
        }

        initializeSmartContract().then(r => console.log('smart cotnract initialized'));
    }, [web3]);

    return (
        <CryptoContext.Provider value={{wallet, setWallet, contract, setContract, account, setAccount}}>
            {children}
        </CryptoContext.Provider>
    );
};

export const useCrypto = () => {
    const context = useContext(CryptoContext);
    if (!context) {
        throw new Error('useCrypto must be used within a CryptoProvider');
    }
    return context;
};
