import React, {useRef} from 'react';
import QrCode from "@/app/icons/qr-code";
import {useRouter} from "next/navigation";

function Search(props: {
    defaultValue: string | number | readonly string[] | undefined;
}) {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter()

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push('/products/' + inputRef.current?.value);
    }

    return (
        <form className={'flex flex-row gap-2 w-full items-center'} onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" name="product_id" id="product_id"
                   className="w-full text-2xl font-light rounded-full border border-gray-300 bg-white shadow-lg px-4 text-center py-2"
                   placeholder="Find the product" defaultValue={props.defaultValue}/>
            <button
                className={'text-2xl font-light rounded-full bg-primary text-white shadow-lg px-3 py-3 text-center hover:bg-primary hover:bg-opacity-90 transition duration-200'}>
                <QrCode/>
            </button>
        </form>
    );
}

export default Search;
