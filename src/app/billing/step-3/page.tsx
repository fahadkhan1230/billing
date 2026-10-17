// "use client";import StepLayout from "@/components/StepLayout";import {Field} from "@/components/Fields";import {useBilling} from "@/context/BillingContext";
// export default function Step3(){const {data,set}=useBilling();return <StepLayout step={3} title="Batch Count"><h2>ধাপ ৩ — অনুমোদিত ব্যাচ সংখ্যা</h2><p>এই সাইকেলে মোট অনুমোদিত ব্যাচ কতটি?</p><div className="five">{[1,2,3,4,5].map(n=><button key={n} className={`choice ${data.batchCount===n?"chosen":""}`} onClick={()=>set("batchCount",n)}>{n}</button>)}</div><Field label="অথবা কাস্টম ব্যাচ সংখ্যা" value={data.customBatches} onChange={v=>set("customBatches",v)} placeholder="যেমন ৬" type="number"/></StepLayout>}





"use client";
import StepLayout from "@/components/StepLayout";
import { useBilling } from "@/context/BillingContext";

export default function Step3() {
  const { data, set } = useBilling();
  const custom: any = data.customBatches;

  return (
    <StepLayout step={3} title="অনুমোদিত মোট ব্যাচ সংখ্যা">
      <style>{`
        .s3{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px}
        .s3 h2{font-size:16px;border-left:4px solid #e8590c;padding-left:8px;margin:0 0 6px}
        .s3 .d{font-size:11px;color:#555;margin:0 0 16px}
        .s3 .five{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;max-width:560px;margin-bottom:16px}
        .s3 .bt{height:56px;border:1px solid #cfd4dc;border-radius:10px;background:#fff;font-size:15px;font-weight:700;cursor:pointer}
        .s3 .bt.on{background:#0b1f4b;color:#fff;border-color:#0b1f4b}
        .s3 label{display:block;font-size:11px;color:#444;margin-bottom:4px}
        .s3 input{width:140px;padding:9px 10px;border:1px solid #cfd4dc;border-radius:8px;font-size:13px;box-sizing:border-box}
        @media(max-width:600px){.s3 .five{grid-template-columns:repeat(3,1fr)}}
      `}</style>

      <section className="s3">
        <h2>ধাপ ৩ — অনুমোদিত মোট ব্যাচ সংখ্যা (ADTP/TSTP/SUTP মোডে এই সাইকেলে মোট অনুমোদিত ব্যাচ কতটি)</h2>
        <p className="d">STP-র অনুমোদিত সঠিক ব্যাচ সংখ্যার ভিত্তিতে বিলিং হিসাব নির্ভর করে।</p>

        <div className="five">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`bt ${data.batchCount === n && !custom ? "on" : ""}`}
              onClick={() => { set("customBatches", ""); set("batchCount", n); }}
            >
              {n}
            </button>
          ))}
        </div>

        <label>অথবা নিজে লিখুন (n)</label>
        <input
          type="number"
          min="1"
          placeholder="১-৫"
          value={custom || ""}
          onChange={(e) => {
            const v = e.target.value;
            set("customBatches", v);
            if (Number(v) > 0) set("batchCount", Number(v));
          }}
        />
      </section>
    </StepLayout>
  );
}