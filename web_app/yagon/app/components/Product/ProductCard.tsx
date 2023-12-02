import React from 'react';
import QRCode from "react-qr-code";

function ProductCard({product}) {

    return (
        <div id={'card'} className={'flex flex-row flex-nowrap mt-8 gap-6 mx-auto p-6 bg-white rounded-xl shadow-xl w-full'}>
            <div className={'grow'}>
                <QRCode
                    className={'rounded'}
                    value={'test'}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <div className={'text-gray-600 w-full'}>
                <h1 className={'text-3xl font-semibold mb-4 break-words'}>{product?.name}</h1>

                <p>
                    <span className={'font-bold'}>Id :</span> {product?.id}
                </p>
                <p>
                    <span className={'font-bold'}>Manufacturing date :</span> {product?.manufacturingDate}
                </p>
                <p>
                    <span className={'font-bold'}>Manufacturing location :</span> {product?.manufacturingLocation}
                </p>
                <p>
                    <span className={'font-bold'}>Number of movements :</span> {product?.numberOfMovements}
                </p>
                <p>
                    <span className={'font-bold'}>Description :</span> {product?.description}
                </p>
            </div>
        </div>
    );
}

export default ProductCard;
