"use client";
import React, {useEffect, useState} from 'react';
import {useCrypto} from "@/app/contexts/CryptoContext";
import {useParams} from "next/navigation";
import {useProduct} from "@/app/hooks/ProductHooks";
import Loader from "@/app/components/Loader";
import NoResult from "@/app/components/NoResult";
import QRCode from "react-qr-code";
import MovementTimeline from "@/app/components/Movement/MovementTimeline";
import NewMovement from "@/app/components/Movement/NewMovement";
import ProductCard from "@/app/components/Product/ProductCard";

interface ProductState {
    id: number;
    name: string,
    manufacturingDate: number,
    manufacturingLocation: string,
    movements: any,
    numberOfMovements: number,
    description: string,
}

function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<ProductState | null>(null);
    const params = useParams()

    const {contract, account} = useCrypto();
    const {getProduct} = useProduct(contract);

    useEffect(() => {
        if (contract) {
            getProduct(params.id).then((product) => {
                setProduct(product)
                setIsLoading(false)
            })
        }
    }, [contract]);

    if (isLoading) {
        return <Loader/>
    }

    if (!isLoading && !product?.id) {
        return <NoResult/>
    }

    return (
        <div>
            <div id={'product' + params.id} className={'max-w-2xl mx-auto flex flex-col gap-8'}>
                <ProductCard product={product} />

                <div id={'movements'} className={'w-full'}>
                    <h2 className={'text-3xl font-semibold text-gray-600 mb-8'}>All movements</h2>
                    <NewMovement product={product} />
                    <MovementTimeline movements={product?.movements} />
                </div>
            </div>
        </div>
    );


}

export default Page;
