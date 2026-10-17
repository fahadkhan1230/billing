// "use client";import Link from "next/link";import StepLayout from "@/components/StepLayout";import {useBilling} from "@/context/BillingContext";
// const money=(n:number)=>Math.round(n).toLocaleString("en-US");export default function Step9(){const {data}=useBilling();const extra=data.traineeConveyance||data.conveyanceDays*(data.traineeMale+data.traineeFemale)*100;const total=data.stpAmount+data.isiscAmount+data.trainerAmount+data.traineeAllowance+extra;const selected=Math.round(total*data.tranche/100);const release=selected-Math.round(67633*data.tranche/100)-Math.round(90177*data.tranche/100);const rows:[[string,number],... [string,number][]]=[["STP অংশ",data.stpAmount],["ISISC অংশ",data.isiscAmount],["প্রশিক্ষক",data.trainerAmount],["প্রশিক্ষণার্থী ভাতা",data.traineeAllowance],["কনভেয়েন্স",extra]];const word=`<html><meta charset="utf-8"><body><h1>UCCHASH CENTER — Billing Invoice</h1><p>Invoice: ${data.invoice.invoiceNo} | Cycle: ${data.invoice.cycle} | Trade: ${data.trade}</p><table border="1" cellspacing="0" cellpadding="7"><tr><th>খাত</th><th>100%</th><th>${data.tranche}%</th></tr>${rows.map(([l,v])=>`<tr><td>${l}</td><td>${money(v)}</td><td>${money(v*data.tranche/100)}</td></tr>`).join("")}<tr><th>Total</th><th>${money(total)}</th><th>${money(selected)}</th></tr></table><p>STP: ${data.profile.stpName}</p><p>Developer: Md Farhad Hossain</p></body></html>`;const wordDownload=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff",word],{type:"application/msword"}));a.download="Ucchash-Billing.doc";a.click();URL.revokeObjectURL(a.href)};return <StepLayout step={9} title="Review & Export"><h2>ধাপ ৯ — মোট হিসাব যাচাই ও ডাউনলোড</h2><p>Invoice: <b>{data.invoice.invoiceNo}</b> · Trade: <b>{data.trade}</b> · Batch: <b>{data.customBatches||data.batchCount}</b></p><div className="tablewrap"><table><thead><tr><th>খাত</th><th>১০০%</th><th>{data.tranche}%</th></tr></thead><tbody>{rows.map(([label,value])=><tr key={label}><td>{label}</td><td>{money(value)}</td><td>{money(value*data.tranche/100)}</td></tr>)}<tr className="total"><th>মোট প্রত্যাশিত</th><th>{money(total)}</th><th>{money(selected)}</th></tr></tbody></table></div><div className="summarygrid"><div><small>মোট প্রত্যাশিত (১০০%)</small><strong>৳ {money(total)}</strong></div><div><small>মোট প্রত্যাশিত ({data.tranche}%)</small><strong>৳ {money(selected)}</strong></div><div><small>VAT ({data.tranche}%)</small><strong>৳ {money(67633*data.tranche/100)}</strong></div><div><small>AIT ({data.tranche}%)</small><strong>৳ {money(90177*data.tranche/100)}</strong></div></div><div className="claim"><p className="total">Net Amount Requested for Release <b>৳ {money(release)}</b></p></div><div className="buttonrow"><button className="primary" onClick={()=>window.print()}>Print / Save PDF</button><button onClick={wordDownload}>Word ডাউনলোড</button><Link className="nav-button" href="/billing/invoice">Final Invoice Preview</Link><Link className="nav-button" href="/billing/step-8">Trainee Excel/CSV</Link></div><p className="hint">আপনার তথ্য ব্রাউজারের local storage-এ step-to-step সংরক্ষিত থাকে।</p></StepLayout>}

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StepLayout from "@/components/StepLayout";
import { useBilling } from "@/context/BillingContext";

const A = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
const B = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
const t2 = (n: number) => (n < 20 ? A[n] : B[(n / 10) | 0] + (n % 10 ? " " + A[n % 10] : ""));
const t3 = (n: number) => [n >= 100 ? A[(n / 100) | 0] + " Hundred" : "", n % 100 ? t2(n % 100) : ""].filter(Boolean).join(" ");
const words = (n: number) => {
  if (!n) return "Zero Taka Only";
  const p = [[(n / 1e7) | 0, "Crore"], [((n % 1e7) / 1e5) | 0, "Lakh"], [((n % 1e5) / 1e3) | 0, "Thousand"]] as [number, string][];
  const s = p.filter(([v]) => v).map(([v, l]) => t2(v) + " " + l);
  if (n % 1e3) s.push(t3(n % 1e3));
  return s.join(" ") + " Taka Only";
};
const f = (n: number) => Math.round(n).toLocaleString("en-US");

const CSS = `
#rcpt{background:#fff;color:#111;font-size:12px;padding:24px;border:1px solid #cfd4dc;border-radius:8px;font-family:Arial,sans-serif}
#rcpt h1{font-size:18px;text-align:center;margin:0 0 2px;color:#0b1f4b}
#rcpt .sub{text-align:center;font-size:11px;color:#555;margin-bottom:14px}
#rcpt h3{font-size:13px;background:#0b1f4b;color:#fff;padding:6px 10px;margin:14px 0 0}
#rcpt table{width:100%;border-collapse:collapse}
#rcpt td,#rcpt th{border:1px solid #bbb;padding:6px 8px;text-align:left;font-size:11px}
#rcpt th{background:#eef1f6}
#rcpt .r{text-align:right;font-family:monospace}
#rcpt .tot td,#rcpt .tot th{background:#d9f2ea;font-weight:700}
#rcpt .ft{margin-top:24px;display:flex;justify-content:space-between;font-size:11px}
@media print{body *{visibility:hidden}#rcpt,#rcpt *{visibility:visible}#rcpt{position:absolute;left:0;top:0;width:100%;border:0}}
`;

export default function Step9() {
  const { data } = useBilling();
  const d: any = data;
  const inv: any = d.invoice || {};
  const pr: any = d.profile || {};
  const bk: any = d.bankDetails || {};
  const ref = useRef<HTMLDivElement>(null);
  const [s4, setS4] = useState<any>(null);
  const [tr, setTr] = useState<any[]>([]);

  useEffect(() => {
    try { setS4(JSON.parse(localStorage.getItem("billingStep4") || "null")); } catch {}
    try { setTr(JSON.parse(localStorage.getItem("billingTrainees") || "[]")); } catch {}
  }, []);

  const m = Number(s4?.boys) || 0, w = Number(s4?.girls) || 0, dy = Number(s4?.attendance) || 0;
  const conv = dy * 100;
  const rows: [string, number][] = [
    ["STP অংশ", d.stpAmount || 0],
    ["ISISC অংশ", d.isiscAmount || 0],
    ["প্রশিক্ষক (২ জন)", d.trainerAmount || 0],
    [`প্রশিক্ষণার্থী ভাতা (ছেলে ${m} + মেয়ে ${w})`, d.traineeAllowance || 0],
    [`কনভেয়েন্স (${dy} দিন × ৳100)`, conv],
  ];
  const t100 = rows.reduce((s, r) => s + r[1], 0);
  const t80 = rows.reduce((s, r) => s + Math.round(r[1] * 0.8), 0);
  const gross = (t: number) => (t * 115) / 80;
  const vat = (t: number) => (t * 15) / 80;
  const ait = (t: number) => t / 4;
  const ok = !!(s4 && s4.trainer1 && s4.trainer2 && m + w > 0);

  const guard = (fn: () => void) => () => {
    if (!ok) return alert("ত্রুটি: আগে Step 4 সম্পূর্ণ করুন (প্রশিক্ষক ১, ২ ও প্রশিক্ষণার্থী সংখ্যা)।");
    fn();
  };

  const exportWord = () => {
    const html = `<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${ref.current?.outerHTML || ""}</body></html>`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\ufeff", html], { type: "application/msword" }));
    a.download = "Ucchash-Billing-Invoice.doc";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const info: [string, any][] = [
    ["Invoice No", inv.invoiceNo], ["Invoice Date", inv.invoiceDate], ["Cycle", inv.cycle],
    ["Asset Approval Memo", inv.memoNo], ["Memo Date", inv.memoDate], ["STP/ISTP Serial", inv.serial],
    ["NSDA Memo No", inv.nsdaMemo], ["NSDA Memo Date", inv.nsdaDate], ["NSDA Serial", inv.nsdaSerial],
    ["Batch Start", inv.batchStart], ["Batch End", inv.batchEnd], ["Batch Days", inv.batchDays],
    ["BNQF Level", inv.bnqf], ["Approved Batch Size", inv.approvedSize], ["Trainees Appeared", inv.appeared],
    ["Assessment Date", inv.assessmentDate],
  ];

  return (
    <StepLayout step={9} title="মোট হিসাব যাচাই ও ডাউনলোড">
      <style>{CSS + `.s9 .btn{border:1px solid #0b1f4b;background:#fff;border-radius:16px;padding:7px 14px;font-size:12px;font-weight:700;cursor:pointer;margin:0 8px 8px 0}.s9 .btn.dk{background:#0b1f4b;color:#fff}.s9 .bar{margin:16px 0 6px}`}</style>

      <section className="s9">
        <h2>ধাপ ৯ — মোট হিসাব যাচাই ও ডাউনলোড</h2>
        {!ok && <p style={{ color: "#c00", fontWeight: 700, fontSize: 12 }}>⚠ Step 4 সম্পূর্ণ হয়নি। প্রশিক্ষক ও প্রশিক্ষণার্থী তথ্য দিন।</p>}

        <div className="bar">
          <button className="btn dk" onClick={guard(() => window.print())}>📕 PDF / Print</button>
          <button className="btn" onClick={guard(exportWord)}>📄 Word ডাউনলোড</button>
          <Link className="btn" href="/billing/invoice">Final Invoice Preview</Link>
          <Link className="btn" href="/billing/step-8">Trainee Excel/CSV</Link>
        </div>

        <div id="rcpt" ref={ref}>
          <h1>UCCHASH CENTER — Billing Invoice</h1>
          <div className="sub">Trade: {d.trade || "—"} | Tranche: 80% | Batch: {d.customBatches || d.batchCount || "—"}</div>

          <h3>Invoice Information</h3>
          <table><tbody>
            {Array.from({ length: Math.ceil(info.length / 2) }, (_, i) => (
              <tr key={i}>
                <th>{info[i * 2][0]}</th><td>{info[i * 2][1] || "—"}</td>
                <th>{info[i * 2 + 1]?.[0] || ""}</th><td>{info[i * 2 + 1]?.[1] || ""}</td>
              </tr>
            ))}
            <tr><th>STP</th><td>{pr.stpName || "—"}</td><th>Occupation</th><td>{pr.occupation || "—"}</td></tr>
          </tbody></table>

          <h3>খাতভিত্তিক হিসাব</h3>
          <table><thead><tr><th>খাত</th><th className="r">১০০%</th><th className="r">৮০%</th></tr></thead>
            <tbody>
              {rows.map(([l, v]) => <tr key={l}><td>{l}</td><td className="r">{f(v)}</td><td className="r">{f(v * 0.8)}</td></tr>)}
              <tr className="tot"><th>মোট প্রত্যাশিত</th><th className="r">{f(t100)}</th><th className="r">{f(t80)}</th></tr>
            </tbody></table>

          <h3>Financial Claim Details (Single STP — 80%)</h3>
          <table><tbody>
            <tr><td>Eligible Grant for Completion (80%)</td><td className="r">{f(gross(t80))}</td></tr>
            <tr><td>Less: VAT (as per GoB approved rate)</td><td className="r">{f(vat(t80))}</td></tr>
            <tr><td>Less: AIT / Income Tax (as per GoB rate)</td><td className="r">{f(ait(t80))}</td></tr>
            <tr><td>Trainer IT Included</td><td className="r">0</td></tr>
            <tr className="tot"><th>Net Amount Requested for Release</th><th className="r">{f(t80)}</th></tr>
            <tr><td colSpan={2}><b>In Words:</b> {words(Math.round(t80))}</td></tr>
          </tbody></table>

          <h3>Bank Details for Fund Release</h3>
          <table><tbody>
            <tr><th>STP</th><td>{bk.stpAccountName || "—"} / {bk.stpAccountNumber || "—"}</td><td>{bk.stpBank || "—"}, {bk.stpBranch || "—"}</td><td>{bk.stpRouting || "—"}</td></tr>
            <tr><th>Industry Partner</th><td>ASSET EBT ISISC / 0200022625097</td><td>Agrani Bank, Mouchak</td><td>010274392</td></tr>
            <tr><th>Trainer 1</th><td>{bk.t1AccountName || "—"} / {bk.t1AccountNumber || "—"}</td><td>{bk.t1Bank || "—"}, {bk.t1Branch || "—"}</td><td>{bk.t1Routing || "—"}</td></tr>
            <tr><th>Trainer 2</th><td>{bk.t2AccountName || "—"} / {bk.t2AccountNumber || "—"}</td><td>{bk.t2Bank || "—"}, {bk.t2Branch || "—"}</td><td>{bk.t2Routing || "—"}</td></tr>
          </tbody></table>

          {tr.some((x) => x.name) && (
            <>
              <h3>Trainee List (Competent: {m + w})</h3>
              <table><thead><tr><th>SL</th><th>Name</th><th>Gender</th><th>Days</th><th>Account No</th><th>Bank</th></tr></thead>
                <tbody>{tr.filter((x) => x.name).map((x, i) => (
                  <tr key={i}><td>{i + 1}</td><td>{x.name}</td><td>{x.gender}</td><td>{x.attendance}</td><td>{x.accNo}</td><td>{x.bank}</td></tr>
                ))}</tbody></table>
            </>
          )}

          <div className="ft"><span>Developer: Md Farhad Hossain</span><span>Authorized Signature: ____________</span></div>
        </div>
      </section>
    </StepLayout>
  );
}