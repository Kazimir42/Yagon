import React, {useState} from 'react';

function NewMovement({product}) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    function Modal() {
        return (
            <div className={'bg-black/50 absolute top-0 left-0 w-full h-full flex flex-col overflow-hidden'}>
                <div className={'bg-white rounded-xl p-8 max-w-2xl mx-auto w-full my-auto shadow-xl'}>
                    <h2 className={'text-2xl font-semibold text-center text-gray-600'}>New movement</h2>

                </div>
            </div>
        )
    }

    return (
        <>
            <div id={'new_movement'} onClick={() => setIsModalOpen(true)} className={' rounded-xl border-2 border-primary p-8 border-dashed duration-300 hover:cursor-pointer hover:shadow-xl text-gray-400 hover:text-primary mb-8'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-10 h-10 mx-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <h2 className={'text-xl font-semibold text-center'}>Add new</h2>
            </div>
            {isModalOpen ? <Modal />: ''}
        </>

    );
}

export default NewMovement;
