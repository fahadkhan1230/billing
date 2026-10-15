"use client";
import Link from "next/link";
import {ORG_NAME,ORG_LOGO} from "@/lib/branding";
export default function SiteHeader(){return <><header className="topbar"><Link href="/" className="brandrow compact"><span className="brandmark"><img src={ORG_LOGO} alt="Ucchash Center logo"/></span><span className="brandname">{ORG_NAME}<small>TRAINING · PROJECTS & CONSULTANCY</small></span></Link><div className="top-title"><b>{ORG_NAME} — বিলিং ও ফান্ড রিলিজ পোর্টাল</b><small>ADTP · TSTP · Batch-based billing</small></div></header><nav className="navstrip"><Link href="/billing/step-1">Billing Wizard</Link><Link href="/billing/step-9">হিসাব যাচাই</Link><Link href="/billing/invoice">Final Invoice</Link></nav></>}
