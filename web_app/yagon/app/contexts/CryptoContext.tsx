"use client";
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {smartContractAbi, smartContractAddress} from "@/contract.conf";
import {Web3} from "web3";

const CryptoContext = createContext<CryptoContextProps | undefined>(undefined);

interface CryptoContextProps {
    wallet: any;
    setWallet: (value: any) => void;
    address: any;
    setAddress: (value: any) => void;
    contract: any;
    setContract: (value: any) => void;
    account: any;
    setAccount: (value: any) => void;
    getProduct: (value: any) => void;
}

export const CryptoProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [web3, setWeb3] = useState(null);
    const [wallet, setWallet] = useState<any>(null);
    const [address, setAddress] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState(null);


    useEffect(() => {
        if (!web3) {
            initWeb3().then(r => console.log('web3 connected'))
        }
    }, [web3]);


    useEffect(() => {
        if (web3) {
            fetchAccount().then(r => console.log('accound fetched'));
        }
    }, [web3]);

    useEffect(() => {
        if (web3) {
            initContract().then(r => console.log('contract init'));
        }
    }, [web3]);


    const initWeb3 = async () => {
        if (window.ethereum) {
            const newWeb3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({method: 'eth_requestAccounts'});
                // @ts-ignore
                setWeb3(newWeb3);
            } catch (error) {
                console.error('User denied account access');
            }
        } else {
            if (window.web3) {
                // @ts-ignore
                setWeb3(new Web3(window.web3.currentProvider));
            } else {
                console.log('No Ethereum browser extension detected');
            }
        }
    }

    const fetchAccount = async () => {
        if (web3) {
            // @ts-ignore
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
        }
    };

    const initContract = async () => {
        if (web3) {
            // @ts-ignore
            const newContract = new web3.eth.Contract(smartContractAbi, smartContractAddress);
            setContract(newContract);
        }
    };

    async function getProduct({productId}: { productId: number }) {
        const result = await contract.methods.getProduct(productId).call();

        console.log(result)

        // Retourne le résultat
        return result;    }

    return (
        <CryptoContext.Provider value={{wallet, setWallet, address, setAddress, contract, setContract, account, setAccount, getProduct}}>
            {children}
        </CryptoContext.Provider>
    );
};

export const useCrypto = () => {
    return useContext(CryptoContext);
};
