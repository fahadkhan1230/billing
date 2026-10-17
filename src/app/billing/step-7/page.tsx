// "use client";import StepLayout from "@/components/StepLayout";import {Field} from "@/components/Fields";import {useBilling,Bank} from "@/context/BillingContext";
// const fields:[keyof Bank,string][]=[["stpAccountName","STP Account Name"],["stpAccountNumber","STP Account Number"],["stpBank","STP Bank Name"],["stpBranch","STP Branch Name"],["stpRouting","STP Routing Number"],["industryAccountName","Industry Partner Account Name"],["industryAccountNumber","Industry Partner Account Number"],["industryBank","Industry Partner Bank Name"],["industryBranch","Industry Partner Branch"],["industryRouting","Industry Partner Routing Number"]];export default function Step7(){const {data,setBank}=useBilling();return <StepLayout step={7} title="Bank Details"><h2>ধাপ ৭ — STP ও Industry Partner ব্যাংক তথ্য</h2><div className="formgrid">{fields.map(([k,label])=><Field key={k} label={label} value={data.bankDetails[k]} onChange={v=>setBank(k,v)}/>)}</div></StepLayout>}



"use client";
import StepLayout from "@/components/StepLayout";
import { useBilling } from "@/context/BillingContext";

const QUAL = ["", "CBT&A-5 (৩৮,৭০০ / ৩০,৯৬০)", "CBT&A-4 (৩৪,৮৩০ / ২৭,৮৬৪)", "NSC (৩০,৯৬০ / ২৪,৭৬৮)"];

const STP: [string, string][] = [
  ["stpAccountName", "STP-র Account Name"], ["stpAccountNumber", "STP-র Account Number"],
  ["stpBank", "STP-র Bank Name"], ["stpBranch", "STP-র Branch Name"], ["stpRouting", "STP-র Routing Number"],
];
const IND: [string, string][] = [
  ["Industry Partner — Account Name", "ASSET EBT ISISC"], ["Industry Partner — Account Number", "0200022625097"],
  ["Industry Partner — Bank Name", "Agrani Bank"], ["Industry Partner — Branch Name", "Mouchak"],
  ["Industry Partner — Routing Number", "010274392"],
];
const TR = (n: number): [string, string][] => [
  [`t${n}AccountName`, `ট্রেইনার ${n}-এর Account Name`], [`t${n}AccountNumber`, `ট্রেইনার ${n}-এর Account Number`],
  [`t${n}Bank`, `ট্রেইনার ${n}-এর Bank Name`], [`t${n}Branch`, `ট্রেইনার ${n}-এর Branch Name`],
];

export default function Step7() {
  const { data, setBank } = useBilling();
  const b: any = data.bankDetails;
  const set = setBank as any;
  const inp = (k: string) => <input value={b[k] || ""} onChange={(e) => set(k, e.target.value)} />;

  const trainer = (n: number) => (
    <>
      <div className="f">
        <label>ট্রেইনার {n}-এর যোগ্যতা <span className="red">(এটা এখানেও বসাতে পারো)</span></label>
        <select value={b[`t${n}Qual`] || ""} onChange={(e) => set(`t${n}Qual`, e.target.value)}>
          {QUAL.map((q) => <option key={q} value={q}>{q || "— নেই —"}</option>)}
        </select>
      </div>
      {TR(n).map(([k, l]) => <div className="f" key={k}><label>{l}</label>{inp(k)}</div>)}
      <div className="f"><label>ট্রেইনার {n}-এর Routing Number</label>{inp(`t${n}Routing`)}</div>
    </>
  );

  return (
    <StepLayout step={7} title="ব্যাংক তথ্য">
      <style>{`
        .s7{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;font-size:13px}
        .s7 h2{font-size:16px;border-left:4px solid #e8590c;padding-left:8px;margin:0 0 12px}
        .s7 .al{background:#fde8dd;border:1px solid #f5c9a8;border-radius:8px;padding:8px 12px;font-size:11px;margin-bottom:14px;line-height:1.7}
        .s7 .g{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:12px}
        .s7 label{display:block;font-size:10px;font-weight:600;color:#444;margin-bottom:4px}
        .s7 .red{color:#c00}
        .s7 input,.s7 select{width:100%;padding:10px;border:1px solid #cfd4dc;border-radius:8px;font-size:13px;background:#fff;box-sizing:border-box}
        .s7 input[readonly]{background:#eef1f6;color:#333}
        @media(max-width:900px){.s7 .g{grid-template-columns:1fr 1fr}}
      `}</style>

      <section className="s7">
        <h2>ধাপ ৭ — STP, Industry Partner ও ট্রেইনারের ব্যাংক তথ্য</h2>

        <div className="al">
          ⚠️ STP / প্রতিষ্ঠানের নাম এখানে লেখা হয়নি (ধাপ ৫-এ) — তাই ইনভয়েসে "—" দেখাবে।<br />
          ⛔ ADTP/TSTP বিলে দুইজন ট্রেইনারের ব্যাংক তথ্য বাধ্যতামূলক — ট্রেইনার ১ ও ট্রেইনার ২ ব্যক্তি। বিল, PDF, Word, বান্ডেল ও Fund Release এখন বন্ধ থাকবে।
        </div>

        <div className="g">
          {STP.map(([k, l]) => <div className="f" key={k}><label>{l}</label>{inp(k)}</div>)}
        </div>

        <div className="g">
          {IND.map(([l, v]) => <div className="f" key={l}><label>{l}</label><input value={v} readOnly /></div>)}
        </div>

        <div className="g">{trainer(1)}</div>
        <div className="g">{trainer(2)}</div>
      </section>
    </StepLayout>
  );
}