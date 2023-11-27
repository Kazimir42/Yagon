import DashboardLayout from './DashboardLayout'
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Product - Yagon',
    description: '',
}
// @ts-ignore
export default function Layout({ children }) {
    return <DashboardLayout>{children}</DashboardLayout>
}
