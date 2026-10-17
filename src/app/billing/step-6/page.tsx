// "use client";import StepLayout from "@/components/StepLayout";import {Field} from "@/components/Fields";import {useBilling,Invoice} from "@/context/BillingContext";
// const fields:[keyof Invoice,string,string?][]=[["invoiceNo","Invoice No"],["invoiceDate","Invoice Date","dd/mm/yyyy"],["cycle","সাইকেল","3rd Cycle"],["memoNo","Asset Approval Memo No"],["memoDate","Approval Memo Date"],["serial","STP/ISTP Serial Number"],["nsdaMemo","NSDA Assessment Memo No"],["nsdaDate","NSDA Memo Date"],["nsdaSerial","NSDA Serial No"],["approvedBatches","অনুমোদিত ব্যাচ","5 Batch"],["batchStart","ব্যাচ শুরু তারিখ"],["batchEnd","ব্যাচ শেষের তারিখ"],["batchDays","ব্যাচের দিন সংখ্যা","21 day's"],["bnqf","BNQF Level","Level-3"],["approvedSize","Approved Batch Size","24"],["appeared","Trainees Appeared","24"],["assessmentDate","Assessment Date"]];export default function Step6(){const {data,setInvoice}=useBilling();return <StepLayout step={6} title="Invoice Details"><h2>ধাপ ৬ — ইনভয়েসের অতিরিক্ত তথ্য</h2><div className="formgrid">{fields.map(([k,label,ph])=><Field key={k} label={label} value={data.invoice[k]} onChange={v=>setInvoice(k,v)} placeholder={ph}/>)}</div></StepLayout>}


"use client";
import StepLayout from "@/components/StepLayout";
import { useBilling } from "@/context/BillingContext";

type F = [string, string, string?];

const rows: F[][] = [
  [["invoiceNo", "Invoice No"], ["invoiceDate", "Invoice Date", "dd/mm/yyyy"], ["cycle", "সাইকেল (যেমন: 3rd Cycle)", "3rd Cycle"]],
  [["memoNo", "Asset Approval Memo No"], ["memoDate", "Approval Memo Date", "dd Mon yyyy"], ["serial", "STP/ISTP Serial Number"]],
  [["nsdaMemo", "NSDA Assessment Office Order Memo No"], ["nsdaDate", "NSDA Memo Date", "dd Mon yyyy"], ["nsdaSerial", "NSDA Assessment Office Order Serial No"], ["approvedSerial", "অনুমোদনের ব্যাচ ক্রমিক নং (এই ব্যাচের, টেক্সিত)", "যদি থাকে"]],
  [["stpAddress", "STP-র ঠিকানা"], ["stpEmail", "STP-র ইমেইল"], ["stpPhone", "STP-র যোগাযোগ নম্বর"]],
  [["approvedBatches", "এই সাইকেলে STP-এর মোট ব্যাচ সংখ্যা", "যেমন: 5 Batch"], ["batchStart", "ব্যাচ শুরুর তারিখ"], ["batchEnd", "ব্যাচ শেষের তারিখ"], ["batchDays", "ব্যাচের দিন সংখ্যা", "21 day's"]],
  [["bnqf", "BNQF Level", "Level-3"], ["approvedSize", "Approved Batch Size", "24"], ["appeared", "Trainees Appeared", "24"], ["assessmentDate", "Assessment Date"]],
];

export default function Step6() {
  const { data, setInvoice } = useBilling();
  const inv: any = data.invoice;
  const set = setInvoice as any;
  const invoiceOk = !!inv.invoiceNo;

  const input = (k: string, ph?: string) => (
    <input value={inv[k] || ""} placeholder={ph || ""} onChange={(e) => set(k, e.target.value)} />
  );

  return (
    <StepLayout step={6} title="ইনভয়েসের অতিরিক্ত তথ্য">
      <style>{`
        .s6{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;font-size:13px}
        .s6 h2{font-size:16px;border-left:4px solid #e8590c;padding-left:8px;margin:0 0 4px}
        .s6 .desc{font-size:11px;color:#555;margin:0 0 14px}
        .s6 .warn{background:#fde8dd;border:1px solid #f5c9a8;color:#c00;font-size:12px;font-weight:700;padding:9px 12px;border-radius:8px;margin-bottom:16px}
        .s6 .row{display:grid;gap:14px;margin-bottom:14px}
        .s6 .c3{grid-template-columns:repeat(3,1fr)}
        .s6 .c4{grid-template-columns:repeat(4,1fr)}
        .s6 label{display:block;font-size:10px;font-weight:600;color:#444;margin-bottom:4px}
        .s6 input{width:100%;padding:10px;border:1px solid #cfd4dc;border-radius:8px;font-size:13px;background:#fff;box-sizing:border-box}
        .s6 .inv{display:flex;gap:6px;align-items:center}
        .s6 .inv span{font-family:monospace;font-size:10px;color:#555;white-space:nowrap}
        @media(max-width:700px){.s6 .c3,.s6 .c4{grid-template-columns:1fr}}
      `}</style>

      <section className="s6">
        <h2>ধাপ ৬ — ইনভয়েসের অতিরিক্ত তথ্য (ADTP/TSTP প্রিন্ট ফরম্যাট)</h2>
        <p className="desc">এই তথ্যগুলো শুধু চূড়ান্ত প্রিন্ট-ইনভয়েসে বসবে, হিসাবে প্রভাব ফেলবে না</p>

        {!invoiceOk && <div className="warn">⚠ অবশ্যই সঠিক তথ্য প্রদান করবেন।</div>}

        {rows.map((r, i) => (
          <div key={i} className={`row ${r.length === 4 ? "c4" : "c3"}`}>
            {r.map(([k, label, ph]) => (
              <div key={k}>
                <label>{label}</label>
                {k === "invoiceNo" ? (
                  <div className="inv">
                    <span>ISISC/ASSET/EBT/80%/TSTP/STP-</span>
                    {input(k, "RCI/2026/04")}
                  </div>
                ) : input(k, ph)}
              </div>
            ))}
          </div>
        ))}
      </section>
    </StepLayout>
  );
}