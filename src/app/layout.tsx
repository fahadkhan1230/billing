import type { Metadata } from "next";
import "./globals.css";
import {BillingProvider} from "@/context/BillingContext";
export const metadata:Metadata={title:"Ucchash Center | Billing System",description:"Ucchash Center billing and fund release preparation system"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body><BillingProvider>{children}</BillingProvider></body></html>}
