import React from 'react';
import QRCode from "react-qr-code";

function ProductCard({product}) {

    return (
        <div id={'card'} className={'grid grid-cols-3 mt-8 gap-6 mx-auto p-6 bg-white rounded-xl shadow-xl w-full'}>
            <QRCode
                className={'rounded w-full mt-0 h-auto'}
                value={product?.id}
                viewBox={`0 0 256 256`}
            />
            <div className={'text-gray-600 col-span-2 flex flex-col gap-2'}>
                <h1 className={'text-3xl font-semibold mb-2'}>{product?.name}</h1>

                <div>
                    <h2 className={'font-bold'}>Id</h2>
                    <p className={'break-words'}>{product?.id}</p>
                </div>

                <div>
                    <h2 className={'font-bold'}>Manufacturing date</h2>
                    <p className={'break-words'}>{product?.manufacturingDate}</p>
                </div>

                <div>
                    <h2 className={'font-bold'}>Manufacturing location</h2>
                    <p className={'break-words'}>{product?.manufacturingLocation}</p>
                </div>

                <div>
                    <h2 className={'font-bold'}>Number of movements</h2>
                    <p className={'break-words'}>{product?.movementIds.length}</p>
                </div>

                <div>
                    <h2 className={'font-bold'}>Description</h2>
                    <p className={'break-words'}>{product?.description}</p>
                </div>

                <div>
                    <h2 className={'font-bold'}>Created at</h2>
                    <p className={'break-words'}>{product?.createdAt}</p>
                </div>

                <div>
                    <h2 className={'font-bold'}>Created By</h2>
                    <p className={'break-words'}>{product?.createdBy}</p>
                </div>

            </div>
        </div>
    );
}

export default ProductCard;
