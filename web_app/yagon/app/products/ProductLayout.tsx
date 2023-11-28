'use client'

// @ts-ignore
import {CryptoProvider} from "@/app/contexts/CryptoContext";

// @ts-ignore
export default function ProductLayout({children}) {
    return (
        <CryptoProvider>
            <html lang="en">
                <body className={'font-sans bg-main'}>{children}</body>
            </html>
        </CryptoProvider>
    )
}
