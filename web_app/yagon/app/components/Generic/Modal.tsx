import React from 'react';

function Modal({title, children, isOpen, setIsOpen}) {
    return (
        <div className={'bg-black/50 absolute top-0 left-0 w-full h-full flex flex-col overflow-hidden z-50'}>
            <div className={'relative bg-white rounded-2xl p-8 max-w-2xl mx-auto w-full my-auto shadow-xl'}>
                <h2 className={'text-2xl font-semibold text-center text-gray-600'}>{title}</h2>
                <button className={'absolute top-4 right-4'} onClick={() => setIsOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;
