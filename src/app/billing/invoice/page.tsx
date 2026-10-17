// "use client";

// import Link from "next/link";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";
// import InvoiceLetterhead from "@/components/InvoiceLetterhead";
// import { useBilling } from "@/context/BillingContext";

// // টাকার পরিমাণ কমা দিয়ে দেখানোর helper function
// const money = (n: number) => Math.round(n).toLocaleString("en-US");

// export default function InvoicePage() {
//   const { data } = useBilling();

//   // Trainee conveyance হিসাব
//   const extra =
//     data.traineeConveyance ||
//     data.conveyanceDays *
//       (data.traineeMale + data.traineeFemale) *
//       100;

//   // মোট হিসাব
//   const total =
//     data.stpAmount +
//     data.isiscAmount +
//     data.trainerAmount +
//     data.traineeAllowance +
//     extra;

//   // নির্বাচিত Tranche অনুযায়ী হিসাব
//   const selected = Math.round((total * data.tranche) / 100);

//   // VAT ও AIT বাদ দিয়ে Release Amount
//   const release =
//     selected -
//     Math.round((67633 * data.tranche) / 100) -
//     Math.round((90177 * data.tranche) / 100);

//   return (
//     <>
//       <SiteHeader />

//       <main className="container">
//         <div className="invoice-document invoice-screen">
//           <section className="invoice-page">
//             {/* Invoice Letterhead */}
//             <InvoiceLetterhead />

//             <hr />

//             <h2 className="invoice-title">INVOICE</h2>

//             <p className="invoice-subtitle">
//               (Request for Release of {data.tranche}% Performance-Based Grant)
//             </p>

//             {/* Invoice Number এবং Date */}
//             <div className="invoice-meta">
//               <b>Invoice No: {data.invoice.invoiceNo}</b>

//               <b>
//                 Invoice Date: {data.invoice.invoiceDate || "—"}
//               </b>
//             </div>

//             {/* প্রাপক */}
//             <p>
//               To
//               <br />
//               Project Director
//               <br />
//               ASSET Project, Directorate of Technical Education
//             </p>

//             {/* Subject */}
//             <p>
//               <b>
//                 Subject: Invoice for Release of {data.tranche}%
//                 Performance-Based Grant for Enterprise-Based Training
//                 (EBT) – {data.profile.stpName || "Ucchash Center"}
//               </b>
//             </p>

//             <p>
//               This invoice is submitted for release of the{" "}
//               {data.tranche}% completion-based tranche under Component-2.1
//               (Enterprise-Based Training – EBT), following completion of
//               training and assessment activities.
//             </p>

//             {/* Reference Details */}
//             <h3>Reference</h3>

//             <table className="invoice-table details-table">
//               <tbody>
//                 {[
//                   [
//                     "Industry Partner",
//                     "Informal Sector Industry Skills Council (ISISC)",
//                   ],
//                   ["Name of STP", data.profile.stpName || "Ucchash Center"],
//                   ["STP Address", data.profile.address || "—"],
//                   ["Contact Number", data.profile.phone || "—"],
//                   ["Training Type", data.trade],
//                   ["Occupation", data.profile.occupation || "—"],
//                   ["Cycle", data.invoice.cycle],
//                   ["Approval Memo No.", data.invoice.memoNo || "—"],
//                   ["STP Serial", data.invoice.serial || "—"],
//                   ["NSDA Memo No.", data.invoice.nsdaMemo || "—"],
//                   ["BNQF Level", data.invoice.bnqf],
//                   ["Approved Batch Size", data.invoice.approvedSize],
//                   ["Trainees Appeared", data.invoice.appeared],
//                   ["Assessment Date", data.invoice.assessmentDate || "—"],
//                 ].map(([label, value]) => (
//                   <tr key={label}>
//                     <th>{label}</th>
//                     <td>{value}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Financial Claim Details */}
//             <h3>
//               Financial Claim Details ({data.trade} — {data.tranche}%)
//             </h3>

//             <table className="invoice-table financial-table">
//               <thead>
//                 <tr>
//                   <th>Description</th>
//                   <th>Amount (BDT)</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {[
//                   ["STP portion", data.stpAmount],
//                   ["ISISC portion", data.isiscAmount],
//                   ["Trainer", data.trainerAmount],
//                   ["Trainee allowance", data.traineeAllowance],
//                   ["Trainee conveyance", extra],
//                   [
//                     `Less: VAT (${data.tranche}%)`,
//                     -Math.round((67633 * data.tranche) / 100),
//                   ],
//                   [
//                     `Less: AIT (${data.tranche}%)`,
//                     -Math.round((90177 * data.tranche) / 100),
//                   ],
//                 ].map(([label, value]) => {
//                   const description = String(label);

//                   const amount = Number(value);

//                   const isMainAmount = [
//                     "STP portion",
//                     "ISISC portion",
//                     "Trainer",
//                     "Trainee allowance",
//                     "Trainee conveyance",
//                   ].includes(description);

//                   const displayedAmount = isMainAmount
//                     ? amount * (data.tranche / 100)
//                     : amount;

//                   return (
//                     <tr key={description}>
//                       <td>{description}</td>
//                       <td>{money(displayedAmount)}</td>
//                     </tr>
//                   );
//                 })}

//                 <tr>
//                   <th>Net Amount Requested for Release</th>
//                   <th>{money(release)}</th>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Bank Details */}
//             <h3>Bank Details for Fund Release</h3>

//             <table className="invoice-table details-table">
//               <tbody>
//                 {[
//                   ["STP Account Name", data.bankDetails.stpAccountName],
//                   ["STP Account Number", data.bankDetails.stpAccountNumber],
//                   ["STP Bank", data.bankDetails.stpBank],
//                   ["STP Branch", data.bankDetails.stpBranch],
//                   ["STP Routing", data.bankDetails.stpRouting],
//                   [
//                     "Industry Account Name",
//                     data.bankDetails.industryAccountName,
//                   ],
//                   [
//                     "Industry Account Number",
//                     data.bankDetails.industryAccountNumber,
//                   ],
//                   ["Industry Bank", data.bankDetails.industryBank],
//                   ["Industry Branch", data.bankDetails.industryBranch],
//                   ["Industry Routing", data.bankDetails.industryRouting],
//                 ].map(([label, value]) => (
//                   <tr key={label}>
//                     <th>{label}</th>
//                     <td>{value || "—"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Trainee List */}
//             <h3>Trainee List</h3>

//             <table className="invoice-table">
//               <thead>
//                 <tr>
//                   <th>SL</th>
//                   <th>Name</th>
//                   <th>Gender</th>
//                   <th>Attendance</th>
//                   <th>Account Name</th>
//                   <th>Account Number</th>
//                   <th>Bank</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {data.trainees.map((trainee, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{trainee.name || "—"}</td>
//                     <td>{trainee.gender}</td>
//                     <td>{trainee.attendance}</td>
//                     <td>{trainee.accountName || "—"}</td>
//                     <td>{trainee.accountNumber || "—"}</td>
//                     <td>{trainee.bankName || "—"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Declaration */}
//             <h3>Declaration</h3>

//             <p>
//               We hereby certify that this claim is true and correct and
//               respectfully request release of the eligible {data.tranche}%
//               performance-based grant for the above-mentioned STP.
//             </p>

//             {/* Authorized Signatory */}
//             <div className="signatory">
//               <b>Authorized Signatory</b>

//               <p>
//                 Mirza Nurul Ghani Shovon
//                 <br />
//                 Chairman
//                 <br />
//                 Informal Sector Industry Skills Council (ISISC)
//               </p>
//             </div>

//             {/* Developer Credit */}
//             <div className="developer-credit">
//               Prepared using Ucchash Center Billing System · Developer: Md
//               Farhad Hossain
//             </div>
//           </section>
//         </div>

//         {/* Invoice Actions */}
//         <div className="buttonrow invoice-actions">
//           <button
//             className="primary"
//             onClick={() => window.print()}
//           >
//             🖨 Print / Save as PDF (A4)
//           </button>

//           <Link className="nav-button" href="/billing/step-9">
//             ← হিসাব সম্পাদনা
//           </Link>
//         </div>
//       </main>

//       <SiteFooter />
//     </>
//   );
// }














"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InvoiceLetterhead from "@/components/InvoiceLetterhead";
import { useBilling } from "@/context/BillingContext";

const money = (n: number) => Math.round(n).toLocaleString("en-US");

// Net amount in words (Lakh/Crore system)
const A = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const T = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const two = (n: number) => (n < 20 ? A[n] : T[Math.floor(n / 10)] + (n % 10 ? " " + A[n % 10] : ""));
const words = (n: number) => {
  let s = "";
  for (const [v, l] of [[1e7, "Crore"], [1e5, "Lakh"], [1e3, "Thousand"], [100, "Hundred"]] as [number, string][]) {
    const q = Math.floor(n / v);
    if (q) { s += `${two(q)} ${l} `; n %= v; }
  }
  return `${s}${n ? two(n) : ""}`.trim() + " Taka Only";
};

// GoB fixed amounts at 100%
const VAT = 67633, AIT = 90177, IT = 19350; // IT = 9675 x 2 trainers

const css = `
.inv{font-size:13px;line-height:1.55;color:#000}
.inv h3{font-size:14px;margin:16px 0 6px}
.inv table{width:100%;border-collapse:collapse;margin:0 0 10px}
.inv th,.inv td{border:1.5px solid #000;padding:6px 9px;text-align:left;vertical-align:middle}
.inv thead th{background:#f0f0f0}
.inv .r{text-align:right}.inv .c{text-align:center}.inv .sm{font-size:11px;color:#555}
.inv .bank th,.inv .bank td{padding:4px;font-size:11px;text-align:center}
.inv .row{display:flex;justify-content:space-between}
.inv .pb{break-before:page}
.inv tr{break-inside:avoid}
@media print{header,footer,.noprint{display:none!important}}
`;

export default function InvoicePage() {
  const { data } = useBilling();
  const t = data.tranche;
  const pc = (n: number) => Math.round((n * t) / 100);

  const inv: any = data.invoice, pr: any = data.profile, bd: any = data.bankDetails;
  const name = pr.stpName || "—";
  const dash = (v: any) => (v === undefined || v === null || v === "" ? "—" : v);

  const male = data.traineeMale || 0, female = data.traineeFemale || 0;
  const competent = male + female;
  const conv = data.traineeConveyance || data.conveyanceDays * 100;
  const trainer = data.trainerAmount / 2; // per trainer

  const total = data.stpAmount + data.isiscAmount + data.trainerAmount + data.traineeAllowance + conv;
  const grant100 = total + VAT + AIT + IT;
  const grant = pc(grant100), vat = pc(VAT), ait = pc(AIT), it = pc(IT);
  const net = grant - vat - ait - it;

  const info: [string, any][] = [
    ["Industry Partner", "Informal Sector Industry Skills Council (ISISC)"],
    ["Name of STP", name],
    ["STP Address", dash(pr.address)],
    ["Email of STP", dash(pr.email)],
    ["Contact Number of STP", dash(pr.phone)],
    ["Total Number of Batches of STP for this Cycle", `${dash(inv.batches)} (Start Date: ${inv.startDate || "…"} to End Date: ${inv.endDate || "…"})`],
    ["Training Type", dash(data.trade)],
    ["Occupation", dash(pr.occupation)],
    ["BNQF Level", dash(inv.bnqf)],
    ["Approved Batch Size", `${dash(inv.approvedSize)} Trainees`],
    ["Trainees Appeared", `${dash(inv.appeared)} Trainees`],
    ["Trainees Declared Competent", `${competent} Trainees`],
    ["Assessment Date", dash(inv.assessmentDate)],
  ];

  const claim: [string, number, number | null][] = [
    [`Eligible Grant for Completion (${t}%)`, grant, grant100],
    ["Less: VAT (as per GoB approved rate)", vat, VAT],
    ["Less: AIT / Income Tax (as per GoB rate)", ait, AIT],
    ["Trainer IT Included", it, IT],
  ];

  // [label, 100% amount, account name, number, bank, branch, routing]
  const acct = (p: string) => [bd[`${p}AccountName`], bd[`${p}AccountNumber`], bd[`${p}Bank`], bd[`${p}Branch`], bd[`${p}Routing`]];
  const banks: [string, number, any[]][] = [
    [name, data.stpAmount, acct("stp")],
    ["ISISC", data.isiscAmount, acct("industry")],
    ["Trainer 1", trainer, acct("trainer1")],
    ["Trainer 2", trainer, acct("trainer2")],
  ];

  const memo = (label: string, no: any, date: any) => `${label}: ${dash(no)}, dated ${dash(date)}`;

  return (
    <>
      <SiteHeader />
      <style>{css}</style>

      <main className="container">
        <div className="inv invoice-document">
          <InvoiceLetterhead />
          <hr style={{ border: 0, borderTop: "3px solid #000", margin: "8px 0 14px" }} />

          <h2 className="c" style={{ margin: 0 }}>INVOICE</h2>
          <p className="c"><i>(Request for Release of {t}% Performance-Based Grant)</i></p>

          <div className="row">
            <span><b>Invoice No:</b> {inv.invoiceNo}</span>
            <b>Invoice Date: {dash(inv.invoiceDate)}</b>
          </div>

          <p>To<br />Project Director<br />ASSET Project, Directorate of Technical Education</p>

          <p><b>Subject: Invoice for Release of {t}% Performance-Based Grant for Enterprise-Based Training (EBT) – {name}</b></p>

          <p>
            This invoice is submitted for <b>release of the {t}% completion-based tranche</b> under{" "}
            <b>Component-2.1 (Enterprise-Based Training – EBT)</b> of the ASSET Project, following successful
            completion of training and assessment activities conducted by the approved <b>Skills Training Provider (STP)</b> mentioned below.
          </p>
          <p>
            The training was implemented in accordance with the <b>STP/ISTP Approval Letter</b>, the{" "}
            <b>Performance-Based Grant Agreement (PBGA – Revised 2025)</b>, and the{" "}
            <b>EBT Operations Manual (Revised 2025)</b>. All required deliverables and supporting documents prescribed
            in the <b>EBT Bill Submission Checklist ({t}%)</b> have been duly completed and enclosed.
          </p>

          <h3><u>Reference</u></h3>
          <ul>
            <li>{memo("Asset Approval Memo No", inv.memoNo, inv.memoDate)}</li>
            <li>STP/ISTP Serial Number: {dash(inv.serial)}</li>
            <li>PBGA: ASSET EBT – 2nd Phase (Revised September 2025)</li>
            <li>PBGA Clause-16 (Option-2): {t}% payment upon completion &amp; assessment</li>
            <li>{memo("NSDA Assessment Office Order Memo No", inv.nsdaMemo, inv.nsdaDate)}</li>
            <li>NSDA Assessment Office Order Serial Number: {dash(inv.nsdaSerial)}</li>
          </ul>

          <h3>STP-Wise Training Details</h3>
          <table>
            <thead><tr><th>Particulars</th><th>Information</th></tr></thead>
            <tbody>
              {info.map(([k, v]) => (
                <tr key={k}><th>{k}</th><td>{v}</td></tr>
              ))}
              <tr>
                <th rowSpan={2}>QR Code(s)</th>
                <td colSpan={2} style={{ padding: 0 }}>
                  <table style={{ margin: 0 }}>
                    <thead>
                      <tr>
                        <th>Enrolment</th><th>Result</th>
                        <th>Trainer 1 (NSC/ CBT&amp;A L4/L5)</th><th>Trainer 2 (NSC/ CBT&amp;A L4/L5)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{inv.qrEnrolment}</td><td>{inv.qrResult}</td>
                        <td className="c">{inv.qrTrainer1 || "CBT&A-5"}</td>
                        <td className="c">{inv.qrTrainer2 || "CBT&A-5"}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Compliance Summary</h3>
          <p>For <b>{name}</b>, all eligibility conditions for the <b>{t}% performance-based tranche</b> have been fulfilled, including:</p>
          <ul>
            <li>Minimum trainee appearance and competency achieved as per PBGA</li>
            <li>Assessment completed and results uploaded and updated in AProMIS</li>
            <li>Trainee and trainer subsistence disbursed through individual bank accounts</li>
            <li>Attendance sheets, monitoring report, training completion report, and trainee database prepared and submitted</li>
          </ul>

          <h3>Financial Claim Details (Single STP — {t}%, {data.trade})</h3>
          <table>
            <thead><tr><th>Description</th><th className="r">Amount (BDT)</th></tr></thead>
            <tbody>
              {claim.map(([label, v, full]) => (
                <tr key={label}>
                  <td>{label} {full !== null && <span className="sm">(100% will be {money(full)}{label.startsWith("Trainer") ? " = 9675+9675" : ""})</span>}</td>
                  <td className="r">{money(v)}</td>
                </tr>
              ))}
              <tr><th>Net Amount Requested for Release for this batch (in Figure)</th><th className="r">{money(net)}</th></tr>
              <tr><td colSpan={2}><b>Net Amount in Words:</b> {words(net)}</td></tr>
            </tbody>
          </table>

          <h3>Bank Details for Fund Release</h3>
          <table>
            <tbody>
              <tr><td>Name of STP</td><td>{name}</td></tr>
              <tr><td>Occupation</td><td>{dash(pr.occupation)}</td></tr>
              <tr><td>Trainees Declared Competent</td><td>{competent} (Male-{male} Female-{female})</td></tr>
            </tbody>
          </table>

          <table className="bank">
            <thead>
              <tr>
                <th rowSpan={2}>SL</th><th rowSpan={2}>Particulars</th><th rowSpan={2}>Allowance</th>
                <th colSpan={3}>Conveyances</th><th colSpan={2}>Total Amount</th>
                <th rowSpan={2}>Account Name</th><th rowSpan={2}>Account Number</th>
                <th rowSpan={2}>Bank Name</th><th rowSpan={2}>Branch Name</th><th rowSpan={2}>Routing Number</th>
              </tr>
              <tr><th>Attendance</th><th>Per Day Rate</th><th>Total</th><th>Bill 100%</th><th>Bill {t}%</th></tr>
            </thead>
            <tbody>
              {banks.map(([label, amt, a], i) => (
                <tr key={i}>
                  <td>{i + 1}</td><td>{label}</td>
                  {[0, 1, 2, 3].map((k) => <td key={k}>-</td>)}
                  <td>{money(amt)}</td><td>{money(pc(amt))}</td>
                  {a.map((v, k) => <td key={k}>{dash(v)}</td>)}
                </tr>
              ))}
              <tr>
                <th></th><th></th>
                <th>{money(data.traineeAllowance)}</th><th>{data.conveyanceDays}</th><th></th><th></th>
                <th>{money(total)}</th><th>{money(net)}</th>
                <th colSpan={5}></th>
              </tr>
            </tbody>
          </table>

          <div className="pb" />
          <h3>Declaration</h3>
          <p>
            We hereby certify that this claim is <b>true, correct, and exclusively related to {name}</b>. The claim has been
            submitted in full compliance with the <b>PBGA</b>, <b>EBT Operations Manual</b>, and approved rate structure of the
            ASSET Project. <b>No duplicate claim has been submitted for this STP or batch.</b>
          </p>
          <p>We respectfully request <b>release of the eligible {t}% performance-based grant</b> for the above-mentioned STP.</p>

          <h3>Enclosures (Single STP — {name})</h3>
          <ul>
            {["STP Approval Page", "Training Completion Report (Signed)", "Attendance Sheets", "NSDA Assessment Report", "AProMIS Result Print", "Trainee & Trainer Bank Information (Excel + Signed Copies)", "Subsistence Disbursement Evidence", "Monitoring Report", "Trainee Database (Excel / AProMIS)"].map((e) => <li key={e}>{e}</li>)}
          </ul>

          <p style={{ marginTop: 48 }}><b>Authorized Signatory</b></p>
          <p style={{ marginTop: 40 }}>
            Mirza Nurul Ghani Shovon<br />Chairman<br />Informal Sector Industry Skills Council (ISISC)
          </p>
        </div>

        <div className="buttonrow invoice-actions noprint">
          <button className="primary" onClick={() => window.print()}>🖨 Print / Save as PDF (A4)</button>
          <Link className="nav-button" href="/billing/step-9">← হিসাব সম্পাদনা</Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}












