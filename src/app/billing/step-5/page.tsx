// "use client";import StepLayout from "@/components/StepLayout";import {Field} from "@/components/Fields";import {useBilling} from "@/context/BillingContext";
// export default function Step5(){const {data,set,setProfile}=useBilling();const n=(v:string)=>Number(v)||0;const vals:[string,number,(v:string)=>void][]=[["প্রশিক্ষক — ছেলে",data.trainerMale,v=>set("trainerMale",n(v))],["প্রশিক্ষক — মেয়ে",data.trainerFemale,v=>set("trainerFemale",n(v))],["প্রশিক্ষণার্থী — ছেলে",data.traineeMale,v=>set("traineeMale",n(v))],["প্রশিক্ষণার্থী — মেয়ে",data.traineeFemale,v=>set("traineeFemale",n(v))],["কনভেয়েন্স দিন",data.conveyanceDays,v=>set("conveyanceDays",n(v))],["STP অংশ (১০০%) ৳",data.stpAmount,v=>set("stpAmount",n(v))],["ISISC অংশ (১০০%) ৳",data.isiscAmount,v=>set("isiscAmount",n(v))],["প্রশিক্ষক মোট (১০০%) ৳",data.trainerAmount,v=>set("trainerAmount",n(v))],["প্রশিক্ষণার্থী ভাতা (১০০%) ৳",data.traineeAllowance,v=>set("traineeAllowance",n(v))],["কনভেয়েন্স মোট (১০০%) ৳",data.traineeConveyance||data.conveyanceDays*(data.traineeMale+data.traineeFemale)*100,v=>set("traineeConveyance",n(v))]];return <StepLayout step={5} title="People & Amounts"><h2>ধাপ ৫ — প্রশিক্ষক, প্রশিক্ষণার্থী ও খরচ</h2><div className="formgrid">{<Field label="প্রশিক্ষক ১ — যোগ্যতা" value={data.profile.occupation} onChange={v=>setProfile("occupation",v)}/>}<Field label="প্রশিক্ষক ২ — যোগ্যতা" value={data.profile.address} onChange={v=>setProfile("address",v)}/>{vals.map(([label,value,change])=><Field key={label} label={label} value={value} onChange={change} type="number"/>)}</div><p className="hint">কনভেয়েন্সের ডিফল্ট হিসাব: ৳১০০ × দিন × প্রশিক্ষণার্থী। প্রয়োজনে মোট অঙ্কটি নিজে পরিবর্তন করুন।</p></StepLayout>}



"use client";
import { useState, useEffect } from "react";
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

export default function Step5() {
  const { data, setProfile } = useBilling();
  const p: any = data.profile;
  const [profiles, setProfiles] = useState<Record<string, any>>({});
  const [sel, setSel] = useState("");
  const [pname, setPname] = useState("");
  const [bundle, setBundle] = useState<number[]>([]);
  const [s4, setS4] = useState<any>(null);

  // Step 4 এর ডেটা লাইভ লোড
  useEffect(() => {
    const load = () => {
      try { setS4(JSON.parse(localStorage.getItem("billingStep4") || "null")); } catch { setS4(null); }
    };
    load();
    window.addEventListener("storage", load);
    window.addEventListener("focus", load);
    const t = setInterval(load, 1000);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("focus", load);
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    try { setProfiles(JSON.parse(localStorage.getItem("stpProfiles") || "{}")); } catch {}
  }, []);

  const ok4 = !!(s4 && s4.trainer1 && s4.trainer2 && Number(s4.boys) + Number(s4.girls) > 0);
  const guard = (fn: () => void) => () => {
    if (!ok4) {
      alert("ত্রুটি: আগে Step 4 সম্পূর্ণ করুন (প্রশিক্ষক ১, প্রশিক্ষক ২ ও প্রশিক্ষণার্থী সংখ্যা নির্বাচন করুন)।");
      return;
    }
    fn();
  };

  const saveProfiles = (x: any) => { setProfiles(x); localStorage.setItem("stpProfiles", JSON.stringify(x)); };

  const m = Number(s4?.boys) || 0;
  const w = Number(s4?.girls) || 0;
  const d = Number(s4?.attendance) || 0;
  const conv = d * 100;
  const rows: [string, number][] = [
    ["STP অংশ", data.stpAmount],
    ["ISISC অংশ", data.isiscAmount],
    ["প্রশিক্ষক (২ জন)", data.trainerAmount],
    [`প্রশিক্ষণার্থী ভাতা (ছেলে ${m} + মেয়ে ${w})`, data.traineeAllowance],
    [`প্রশিক্ষণার্থী কনভেয়েন্স (${d} দিন × ৳100)`, conv],
  ];
  const t100 = rows.reduce((s, r) => s + r[1], 0);
  const t80 = rows.reduce((s, r) => s + Math.round(r[1] * 0.8), 0);
  const gross = (t: number) => (t * 115) / 80;
  const vat = (t: number) => (t * 15) / 80;
  const ait = (t: number) => t / 4;
  const comp = m + w;
  const bad = comp < 17;

// word 
    const exportWord = () => {
    const body = bundle.length
      ? bundle.map((x, i) => `<p>ব্যাচ ${i + 1}: ${f(x)} টাকা</p>`).join("")
      : `<p>Net Amount: ${f(t80)} টাকা</p>`;
    const html = `<html><head><meta charset="utf-8"></head><body>
      <h2>${p.stpName || "STP"} — Billing Summary</h2>
      <p>Occupation: ${p.occupation || "—"}</p>
      <p>Trainees Competent: ${comp} (Male-${m}, Female-${w})</p>
      ${body}
      <p><b>Net Amount in Words:</b> ${words(Math.round(t80))}</p>
    </body></html>`;
    const blob = new Blob(["\uFEFF" + html], { type: "application/msword" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "billing.doc";
    a.click();
  };
  const exportPdf = () => window.print();






  const autoFill = () => {
    const x = profiles[sel]; if (!x) return;
    setPname(sel);
    (setProfile as any)("stpName", x.stpName || "");
    setProfile("occupation", x.occupation || "");
  };
  const saveProfile = () => {
    if (!pname.trim()) return;
    saveProfiles({ ...profiles, [pname]: { stpName: p.stpName || "", occupation: p.occupation || "" } });
    setSel(pname);
  };
  const delProfile = () => {
    const { [sel]: _, ...rest } = profiles; saveProfiles(rest); setSel("");
  };
  const reset = () => { if (confirm("নতুন করে শুরু করবেন?")) { localStorage.clear(); location.reload(); } };

  return (
    <StepLayout step={5} title="মোট হিসাব ও STP ইনভয়েস যাচাই">
      <style>{`
        .s5{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;font-size:13px}
        .s5 h2{font-size:16px;border-left:4px solid #e8590c;padding-left:8px;margin:0 0 14px}
        .s5 .tb{border:1px solid #0b1f4b;border-radius:8px;overflow:hidden;margin-bottom:16px}
        .s5 .hd{background:#0b1f4b;color:#fff;font-weight:700;padding:8px 12px}
        .s5 .r{display:grid;grid-template-columns:1fr 130px 130px;padding:9px 12px;border-top:1px solid #e5e7eb}
        .s5 .r.h{background:#0b1f4b;color:#fff;font-size:11px;border:0}
        .s5 .r b,.s5 .r span{font-family:monospace;text-align:right}
        .s5 .r .g{color:#15803d}
        .s5 .tot{background:#d9f2ea;font-weight:700}
        .s5 .two{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
        .s5 label{display:block;font-size:11px;color:#555;margin-bottom:4px}
        .s5 .bx{border:1px solid #cfd4dc;border-radius:8px;padding:8px 12px;font-size:17px;background:#fff}
        .s5 input,.s5 select{width:100%;padding:9px 10px;border:1px solid #cfd4dc;border-radius:8px;font-size:13px;background:#fff}
        .s5 .card{border:1px solid #cfd4dc;border-radius:10px;padding:14px;margin-bottom:16px}
        .s5 .btn{border:1px solid #0b1f4b;background:#fff;border-radius:16px;padding:6px 12px;font-size:12px;cursor:pointer;margin:0 6px 6px 0}
        .s5 .btn.dk{background:#0b1f4b;color:#fff}.s5 .btn.rd{color:#c00;border-color:#c00}
        .s5 .warn{background:#fde8dd;border:1px solid #f5c9a8;color:#c00;font-size:12px;font-weight:700;padding:9px 12px;border-radius:8px;margin-bottom:16px}
        .s5 .fl{display:grid;grid-template-columns:1fr auto;padding:9px 12px;border-top:1px solid #e5e7eb}
        .s5 .fl small{display:block;font-size:10px;color:#777}
        .s5 .wd{background:#fffdf5;font-size:11px;padding:9px 12px;border-top:1px solid #e5e7eb}
        .s5 .bk{display:grid;grid-template-columns:110px 20px 1fr 1fr 1fr;padding:9px 12px;border-top:1px solid #e5e7eb;font-size:12px;align-items:center}
        .s5 .red{background:#fcd5d5;color:#b00020;font-weight:700;text-align:right;padding:9px 12px;margin:-9px -12px -9px 0}
      `}</style>

      <section className="s5">
        <h2>ধাপ ৫ — মোট হিসাব ও STP ইনভয়েস যাচাই</h2>

        <div className="tb">
          <div className="r h"><div>খাত</div><b>১০০%</b><b>৮০% (নির্ধারিত)</b></div>
          {rows.map(([l, v]) => (
            <div className="r" key={l}><div>{l}</div><span>{f(v)}</span><span className="g">{f(v * 0.8)}</span></div>
          ))}
          <div className="r tot"><div>মোট প্রত্যাশিত</div><span>{f(t100)}</span><span>{f(t80)}</span></div>
        </div>

        <div className="two">
          <div><label>প্রত্যাশিত মোট (১০০%)</label><div className="bx">{f(t100)}</div></div>
          <div><label>প্রত্যাশিত মোট (৮০%)</label><div className="bx">{f(t80)}</div></div>
        </div>
        <div className="two">
          <div><label>STP / প্রতিষ্ঠানের নাম</label>
            <input placeholder="যেমন: Standard Professional Training Center" value={p.stpName || ""} onChange={(e) => (setProfile as any)("stpName", e.target.value)} /></div>
          <div><label>সাবজেক্ট / ট্রেড (Occupation)</label>
            <input placeholder="যেমন: General Care Giving" value={p.occupation || ""} onChange={(e) => setProfile("occupation", e.target.value)} /></div>
        </div>

        <div className="card">
          <b>⚡ STP Profile — একবার এন্ট্রি, পরের ব্যাচে Auto-Fill (Single/Manual)</b>
          <p style={{ fontSize: 11, color: "#555" }}>একই STP-এর তথ্য বারবার লিখতে হবে না। Profile সংরক্ষণ করে পরের ব্যাচে নির্বাচন করলেই তথ্যগুলো স্বয়ংক্রিয়ভাবে পূরণ হবে।</p>
          <div className="two">
            <div><label>Saved STP Profile</label>
              <select value={sel} onChange={(e) => setSel(e.target.value)}>
                <option value="">— STP Profile নির্বাচন করুন —</option>
                {Object.keys(profiles).map((k) => <option key={k}>{k}</option>)}
              </select></div>
            <div><label>Profile Name</label>
              <input placeholder="যেমন: ABC Training Institute" value={pname} onChange={(e) => setPname(e.target.value)} /></div>
          </div>
          <button className="btn" onClick={autoFill}>⚡ Selected Profile Auto-Fill</button>
          <button className="btn" onClick={delProfile}>🗑 Profile Delete</button>
          <button className="btn" onClick={saveProfile}>💾 Profile Save</button>
        </div>

        {!ok4 && <div className="warn">⚠ Step 4 সম্পূর্ণ হয়নি। প্রশিক্ষক ১, প্রশিক্ষক ২ ও প্রশিক্ষণার্থী সংখ্যা দিন।</div>}
        {ok4 && bad && <div className="warn">⚠ কম্পিটেন্ট প্রশিক্ষণার্থী {comp} জন! অনুমোদিত ২৪ জনের ৭০% (ন্যূনতম ১৭ জন) না হলে এই ব্যাচের বিল তৈরি বা ক্লেম করা যাবে না।</div>}

        <div className="tb">
          <div className="hd">Financial Claim Details (Single STP — 80%)</div>
          {[
            ["Eligible Grant for Completion (80%)", gross(t80), gross(t100)],
            ["Less: VAT (as per GoB approved rate)", vat(t80), vat(t100)],
            ["Less: AIT / Income Tax (as per GoB rate)", ait(t80), ait(t100)],
            ["Trainer IT Included", 0, 0],
          ].map(([l, a, b]) => (
            <div className="fl" key={l as string}><div>{l}<small>(100% will be {f(b as number)})</small></div><span style={{ fontFamily: "monospace" }}>{f(a as number)}</span></div>
          ))}
          <div className="fl tot"><div>Net Amount Requested for Release for this batch (in Figure)</div><b style={{ fontFamily: "monospace" }}>{f(t80)}</b></div>
          <div className="wd"><b>Net Amount in Words:</b> {words(Math.round(t80))}</div>
        </div>

        <div className="tb">
          <div className="hd">Bank Details for Fund Release</div>
          <div className="bk"><div>Name of STP</div><div>{p.stpName ? "" : "—"}</div><div>Trainees Declared Competent</div>
            <div>{comp}<small style={{ display: "block", fontSize: 9, color: "#777" }}>Male-{m} Female-{w}</small></div>
            <div className="red">Trainees Declared Competent (Reassessment)<small style={{ display: "block", fontSize: 9 }}>Male-0 Female-0</small></div></div>
          <div className="bk"><div>Occupation</div><div>—</div><div>Mode</div><div></div><div style={{ textAlign: "right" }}>TSTP (80%)</div></div>
        </div>

        <div className="card">
          <b>📦 একাধিক ব্যাচের বান্ডেল</b>
          <p style={{ fontSize: 11, color: "#555" }}>প্রতিটি ব্যাচের হিসাব শেষ করে "বান্ডেলে যোগ করুন" চাপুন। সব ব্যাচ যোগ হলে একসাথে এক ফাইলে ডাউনলোড করুন।</p>
          <ul style={{ fontSize: 11, margin: "0 0 10px 16px" }}>
            {bundle.length ? bundle.map((x, i) => <li key={i}>ব্যাচ {i + 1}: {f(x)} টাকা</li>) : <li>এখনো কোনো ব্যাচ যোগ হয়নি।</li>}
          </ul>
          <button className="btn" onClick={guard(() => window.print())}>👁 এই ব্যাচের প্রিভিউ</button>
          <button className="btn dk" onClick={guard(() => setBundle([...bundle, t80]))}>＋ এই ব্যাচ বান্ডেলে যোগ করুন</button>
          <button className="btn" onClick={guard(() => window.print())}>👁 বান্ডেল প্রিভিউ</button>
          <button className="btn" onClick={guard(exportWord)}>📄 সব একসাথে Word</button>
<button className="btn" onClick={guard(exportPdf)}>📕 সব একসাথে PDF</button>
          <button className="btn rd" onClick={() => setBundle([])}>🗑 বান্ডেল খালি করুন</button>
        </div>

        <button className="btn" onClick={reset}>⟳ নতুন করে শুরু করুন</button>
        <button className="btn" onClick={guard(() => window.print())}>🖨 হিসাব প্রিন্ট করুন (স্ক্রিন অনুযায়ী)</button>
      </section>
    </StepLayout>
  );
}