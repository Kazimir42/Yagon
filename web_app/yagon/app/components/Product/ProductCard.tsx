import React from 'react';
import QRCode from "react-qr-code";

function ProductCard({product}) {
    return (
        <div id={'card'}
             className={'flex flex-row mt-8 gap-6 mx-auto p-6 bg-white rounded-xl shadow-xl w-full'}>
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
    );
}

export default ProductCard;
