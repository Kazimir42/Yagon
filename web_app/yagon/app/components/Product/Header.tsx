import React from 'react';
import Search from "@/app/components/Product/Search";
import Link from "next/link";

function Header(props: {
    searchTerm: string | number | readonly string[] | undefined;
}) {
    return (
        <header className={'bg-white py-6 px-4 shadow-xl'}>
            <div className="grid grid-cols-3 items-center gap-6">
                <div></div>
                <Search defaultValue={props.searchTerm}/>
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

export default Header;
