"use client";
import React, {useEffect, useState} from 'react';
import {useCrypto} from "@/app/contexts/CryptoContext";
import {useParams} from "next/navigation";

function Page() {
    const [product, setProduct] = useState(null);
    const params = useParams()


    // @ts-ignore
    const { getProduct } = useCrypto();

    useEffect(() => {
        getProduct(params.id).then((product: React.SetStateAction<null>) => setProduct(product))
    }, []);

    return (
        <div>Product id</div>
    );
}

export default Page;
