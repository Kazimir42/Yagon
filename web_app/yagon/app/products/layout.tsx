import ProductLayout from './ProductLayout'
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Product - Yagon',
    description: '',
}
// @ts-ignore
export default function Layout({ children }) {
    return <ProductLayout>{children}</ProductLayout>
}
