"use client";
import React, {useState} from 'react';
import {useCrypto} from "@/app/contexts/CryptoContext";
import {useProduct} from "@/app/hooks/ProductHooks";
import Loader from "@/app/components/Loader";
import {useRouter} from "next/navigation";

function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');

    const router = useRouter()
    const {contract, account} = useCrypto();
    const {createProduct} = useProduct(contract, account);

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        createProduct(e.target.elements.name.value, e.target.elements.manufacturingLocation.value, e.target.elements.manufacturingDate.value, e.target.elements.description.value).then(productId => {
            setIsLoading(false);
            router.push('/products/' + productId);
        }).catch((e) => {
            setIsLoading(false);
            //todo handle status
            setStatus('Error')
        })

    }

    return (
        <div>
            <div id={'new_product'} className={'bg-white rounded-2xl p-8 max-w-2xl mx-auto w-full my-auto shadow-xl mt-8'}>
                <h2 className={'text-2xl font-semibold text-center text-gray-600'}>New product</h2>
                {isLoading ? <div className={'absolute bg-black/30 top-0 left-0 w-full h-full pt-48'}><Loader /></div> : ''}
                <form className={'mt-4 grid grid-cols-2 gap-4'} onSubmit={handleSubmit}>
                    <div className={'col-span-2'}>
                        <label htmlFor="name" className="block font-medium leading-6 text-gray-600">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                required={true}
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-xl border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="manufacturingDate" className="block font-medium leading-6 text-gray-600">
                            Manufacturing date
                        </label>
                        <div className="mt-1">
                            <input
                                required={true}
                                type="datetime-local"
                                name="manufacturingDate"
                                id="manufacturingDate"
                                className="block w-full rounded-xl border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                placeholder="Manufacturing date"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="manufacturingLocation" className="block font-medium leading-6 text-gray-600">
                            Manufacturing location
                        </label>
                        <div className="mt-1">
                            <input
                                required={true}
                                type="text"
                                name="manufacturingLocation"
                                id="manufacturingLocation"
                                className="block w-full rounded-xl border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                placeholder="Manufacturing location"
                            />
                        </div>
                    </div>
                    <div className={'col-span-2'}>
                        <label htmlFor="description" className="block font-medium leading-6 text-gray-600">
                            Description
                        </label>
                        <div className="mt-1">
                                <textarea id={'description'} name={'description'}
                                          className={'block w-full rounded-xl border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 h-32'}
                                          placeholder={'Description'}>

                                </textarea>
                        </div>
                    </div>
                    <input type={'submit'}
                           className={"col-span-2 font-light rounded-xl bg-primary text-white shadow-lg px-2 text-center py-2 hover:bg-primary hover:bg-opacity-90 hover:cursor-pointer transition duration-200"}
                           value={'Create'}/>
                </form>
            </div>
        </div>
    );
}

export default Page;
