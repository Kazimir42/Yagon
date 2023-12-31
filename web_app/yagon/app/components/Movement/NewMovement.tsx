import React, {useState} from 'react';
import Modal from "@/app/components/Generic/Modal";
import {useCrypto} from "@/app/contexts/CryptoContext";
import {useProduct} from "@/app/hooks/ProductHooks";
import Loader from "@/app/components/Loader";
import {useRouter} from "next/navigation";

function NewMovement({product}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');

    const router = useRouter()
    const {contract, account} = useCrypto();
    const {createMovement} = useProduct(contract, account);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        createMovement(product.id, e.target.elements.name.value, e.target.elements.date.value, e.target.elements.location.value, e.target.elements.description.value).then(r => {
            setIsLoading(false);
            setIsModalOpen(false);
            window.location.reload();
        }).catch((e) => {
            setIsLoading(false);
            //todo handle status
            setStatus('Error')
        })
    }

    return (
        <>
            <div id={'new_movement'} onClick={() => setIsModalOpen(true)}
                 className={' rounded-xl border-2 border-primary p-8 border-dashed duration-300 hover:cursor-pointer hover:shadow-xl text-gray-400 hover:text-primary mb-8'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                     stroke="currentColor" className="w-10 h-10 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                <h2 className={'text-xl font-semibold text-center'}>Add new</h2>
            </div>
            {isModalOpen ?
                <Modal title={'New movement'} setIsOpen={setIsModalOpen} isOpen={isModalOpen}>
                    {isLoading ? <div className={'absolute bg-black/30 top-0 left-0 rounded-2xl w-full h-full pt-48'}><Loader /></div> : ''}
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
                            <label htmlFor="date" className="block font-medium leading-6 text-gray-600">
                                Date
                            </label>
                            <div className="mt-1">
                                <input
                                    required={true}
                                    type="datetime-local"
                                    name="date"
                                    id="date"
                                    className="block w-full rounded-xl border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                    placeholder="Date"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="location" className="block font-medium leading-6 text-gray-600">
                                Location
                            </label>
                            <div className="mt-1">
                                <input
                                    required={true}
                                    type="text"
                                    name="location"
                                    id="location"
                                    className="block w-full rounded-xl border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                    placeholder="Location"
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
                </Modal>
                : ''}
        </>

    );
}

export default NewMovement;
