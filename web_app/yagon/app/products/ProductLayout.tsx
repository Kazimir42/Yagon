'use client'

import {CryptoProvider} from "@/app/contexts/CryptoContext";
import ProductHeader from "@/app/components/Product/ProductHeader";
import {useParams} from "next/navigation";

// @ts-ignore
export default function ProductLayout({children}) {
    const params = useParams()

    return (
        <CryptoProvider>
            <html lang="en">
                <body className={'font-sans bg-main'}>
                    <ProductHeader searchTerm={params.id} />
                    {children}
                </body>
            </html>
        </CryptoProvider>
    )
}
