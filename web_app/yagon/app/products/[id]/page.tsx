"use client";
import React, {useEffect, useState} from 'react';
import {useCrypto} from "@/app/contexts/CryptoContext";
import {useParams} from "next/navigation";
import {useProduct} from "@/app/hooks/ProductHooks";
import Loader from "@/app/components/Loader";
import NoResult from "@/app/components/NoResult";
import QRCode from "react-qr-code";

interface ProductState {
    id: number;
    name: string,
    manufacturingDate: number,
    manufacturingLocation: string,
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
            <div id={'product' + params.id}>
                <div id={'card'}
                     className={'flex flex-row max-w-2xl mt-8 gap-6 mx-auto p-6 bg-white rounded-xl shadow-xl'}>
                    <div className={'w-64'}>
                        <QRCode
                            class={'rounded'}
                            value={'test'}
                            viewBox={`0 0 256 256`}
                        />
                    </div>

                    <div className={'text-gray-600'}>
                        <h1 className={'text-3xl font-semibold mb-4'}>{product?.name}</h1>

                        <p>
                            Id : {product?.id}
                        </p>
                        <p>
                            Manufacturing date : {product?.manufacturingDate}
                        </p>
                        <p>
                            Manufacturing location : {product?.manufacturingLocation}
                        </p>
                        <p>
                            Number of movements : {product?.numberOfMovements}
                        </p>
                        <p>
                            Description : {product?.description}
                        </p>
                    </div>
                </div>


            </div>


        </div>
    );


}

export default Page;
