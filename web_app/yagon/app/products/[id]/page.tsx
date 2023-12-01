"use client";
import React, {useEffect, useState} from 'react';
import {useCrypto} from "@/app/contexts/CryptoContext";
import {useParams} from "next/navigation";
import {useProduct} from "@/app/hooks/ProductHooks";
import Loader from "@/app/components/Loader";
import NoResult from "@/app/components/NoResult";

interface ProductState {
    id: number;
    name: string,
    manufacturingDate: number,
    manufacturingLocation: string,
    numberOfMovements: number,
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
            <div id={'product' + params.id}>
                <div>Product id : {product?.id}</div>
                <div>Product name : {product?.name}</div>
                <div>Product manufacturingDate : {product?.manufacturingDate}</div>
                <div>Product manufacturingLocation : {product?.manufacturingLocation}</div>
                <div>Product numberOfMovements : {product?.numberOfMovements}</div>
            </div>


        </div>
    );


}

export default Page;
