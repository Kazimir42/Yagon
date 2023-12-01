"use client";
import Link from "next/link";
import {useCrypto} from "@/app/contexts/CryptoContext";
import React, {useRef} from "react";
import { useRouter } from 'next/navigation'
import Search from "@/app/components/Product/Search";

export default function Home() {
    const {account} = useCrypto();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter()

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push('products/' + inputRef.current?.value);
    }

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
                <Search />
                <p className={'text-3xl font-medium'}>OR</p>
                <Link href='products/new'
                      className={" text-2xl font-light rounded-full bg-primary text-white shadow-lg px-8 text-center py-2 hover:bg-primary hover:bg-opacity-90 transition duration-200"}>
                    Create new one
                </Link>
            </div>
        </main>
    );
}
