"use client";
import Link from "next/link";
import QrCode from "@/app/icons/qr-code";
import {useEffect, useState} from "react";
import Web3 from 'web3';
import {smartContractAbi, smartContractAddress} from '@/contract.conf.js'

export default function Home() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

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
        // @ts-ignore
        if (window.ethereum) {
            // @ts-ignore
            const newWeb3 = new Web3(window.ethereum);
            try {
                // @ts-ignore
                await window.ethereum.request({method: 'eth_requestAccounts'});
                // @ts-ignore
                setWeb3(newWeb3);
            } catch (error) {
                console.error('User denied account access');
            }
        } else { // @ts-ignore
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

    return (
        <main className="flex min-h-screen flex-col items-center">
            <p className={'absolute right-0 p-1 text-gray-600'}>{account ? 'Wallet connected: ' + account : 'No wallet connected'}</p>
            <p className={"text-primary text-xl mt-2"}>Yagon</p>
            <div className={'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32'}>
                <div className="flex flex-col gap-8 text-center mx-auto max-w-4xl">
                    <h1 className={'text-5xl md:text-6xl font-medium leading-snug'}>The new way to do the <span
                        className={'text-primary'}>supply chain tracking</span></h1>
                </div>
            </div>
            <div className={'flex flex-col max-w-xl w-full items-center gap-6 p-4'}>
                <div className={'flex flex-row gap-2 w-full items-center'}>
                    <input type="text" name="product_id" id="product_id"
                           className="w-full text-2xl font-light rounded-full border border-gray-300 bg-white shadow-lg px-4 text-center py-2"
                           placeholder="Find the product"/>
                    <button
                        className={'text-2xl font-light rounded-full bg-primary text-white shadow-lg px-3 py-3 text-center hover:bg-primary hover:bg-opacity-90 transition duration-200'}>
                        <QrCode/>
                    </button>
                </div>
                <p className={'text-3xl font-medium'}>OR</p>
                <Link href='products/new'
                      className={" text-2xl font-light rounded-full bg-primary text-white shadow-lg px-8 text-center py-2 hover:bg-primary hover:bg-opacity-90 transition duration-200"}>
                    Create new one
                </Link>
            </div>
        </main>
    )
}
