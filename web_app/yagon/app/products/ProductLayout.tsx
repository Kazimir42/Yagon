'use client'

import {CryptoProvider} from "@/app/contexts/CryptoContext";
import Header from "@/app/components/Product/Header";
import {useParams} from "next/navigation";

// @ts-ignore
export default function ProductLayout({children}) {
    const params = useParams()

    return (
        <CryptoProvider>
            <html lang="en">
                <body className={'font-sans bg-main'}>
                    <Header searchTerm={params.id} />
                    {children}
                </body>
            </html>
        </CryptoProvider>
    )
}
