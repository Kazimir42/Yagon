import React from 'react';
import SearchProduct from "@/app/components/Product/SearchProduct";
import Link from "next/link";

function ProductHeader(props: {
    searchTerm: string | number | readonly string[] | undefined;
}) {
    return (
        <header className={'bg-white py-6 px-4 shadow-xl'}>
            <div className="grid grid-cols-3 items-center gap-6">
                <div></div>
                <SearchProduct defaultValue={props.searchTerm}/>
                <div className={'ml-auto'}>
                    <Link href='products/new'
                          className={" text-xl font-light rounded-full bg-primary text-white shadow-lg px-8 text-center py-3 hover:bg-primary hover:bg-opacity-90 transition duration-200"}>
                        Create new one
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default ProductHeader;
