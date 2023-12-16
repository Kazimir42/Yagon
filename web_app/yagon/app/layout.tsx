import type {Metadata} from 'next'
import './globals.css'
import {CryptoProvider} from "@/app/contexts/CryptoContext";
import Head from 'next/head';

export const metadata: Metadata = {
    title: 'Yagon',
    description: '',
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <CryptoProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="manifest" href="/public/manifest.json" />
            </Head>
            <html lang="en">
            <body className={'font-sans bg-main'}>{children}</body>
            </html>
        </CryptoProvider>
    )
}
