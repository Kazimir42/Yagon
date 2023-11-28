"use client";
import React, {useEffect, useState} from 'react';
import {useCrypto} from "@/app/contexts/CryptoContext";
import {useParams} from "next/navigation";
import {useProduct} from "@/app/hooks/ProductHooks";

interface ProductState {
    id: number;
    name: string,
    manufacturingDate: number,
    manufacturingLocation: string,
    numberOfMovements: number,
}

function Page() {
    const [product, setProduct] = useState<ProductState | null>(null);
    const params = useParams()

    const {contract, account} = useCrypto();
    const {getProduct} = useProduct(contract);

    useEffect(() => {
        if (contract) {
            getProduct(params.id).then((product) => {
                setProduct(product)
            })
        }
    }, [contract]);

    return (
        <div>
            <p className={'absolute right-0 p-1 text-gray-600'}>{account ? 'Wallet connected: ' + account : 'No wallet connected'}</p>
            <div>Product id : {product?.id}</div>
            <div>Product name : {product?.name}</div>
            <div>Product manufacturingDate : {product?.manufacturingDate}</div>
            <div>Product manufacturingLocation : {product?.manufacturingLocation}</div>
            <div>Product numberOfMovements : {product?.numberOfMovements}</div>
        </div>
    );
}

export default Page;
