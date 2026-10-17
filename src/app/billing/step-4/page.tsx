// "use client";import {useState} from "react";import StepLayout from "@/components/StepLayout";import {Field} from "@/components/Fields";import {useBilling,Profile} from "@/context/BillingContext";
// const fields:[keyof Profile,string,string?][]=[["profileName","Profile Name"],["stpName","STP / প্রতিষ্ঠানের নাম","Ucchash Center"],["occupation","Occupation / Subject","ADTP / TSTP"],["address","ঠিকানা"],["phone","যোগাযোগ নম্বর"],["accountName","Account Name"],["accountNumber","Account Number"],["bankName","Bank Name"],["branchName","Branch Name"],["routingNumber","Routing Number"]];
// export default function Step4(){const {data,setProfile,setBank}=useBilling();const [msg,setMsg]=useState("");const save=async()=>{try{const r=await fetch("/api/profiles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data.profile)});const d=await r.json();setMsg(r.ok?"Profile MongoDB-তে সংরক্ষিত হয়েছে।":d.error||"সংরক্ষণ হয়নি")}catch{setMsg("MongoDB সংযোগ নেই। .env.local সেট করুন।")}};const load=async()=>{try{const r=await fetch("/api/profiles");const d=await r.json();const found=(d.profiles||[]).find((p:Profile)=>p.profileName===data.profile.profileName);if(found){fields.forEach(([k])=>setProfile(k,found[k]||""));setBank("stpAccountName",found.accountName||"");setBank("stpAccountNumber",found.accountNumber||"");setBank("stpBank",found.bankName||"");setBank("stpBranch",found.branchName||"");setBank("stpRouting",found.routingNumber||"");setMsg("Profile load হয়েছে")}}catch{setMsg("Profile load করা যায়নি")}};const del=async()=>{try{const r=await fetch("/api/profiles",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({profileName:data.profile.profileName})});setMsg(r.ok?"Profile মুছে ফেলা হয়েছে":"মুছতে পারেনি")}catch{setMsg("MongoDB সংযোগ নেই")}};return <StepLayout step={4} title="STP Profile"><h2>ধাপ ৪ — STP Profile ও প্রতিষ্ঠানের তথ্য</h2><p>এই তথ্য local browser-এ স্বয়ংক্রিয়ভাবে সংরক্ষিত হবে। MongoDB profile save/load আলাদা করে ব্যবহার করতে পারেন।</p><div className="formgrid">{fields.map(([k,label,ph])=><Field key={k} label={label} value={data.profile[k]} onChange={v=>setProfile(k,v)} placeholder={ph}/>)}</div><div className="buttonrow"><button className="primary" onClick={save}>＋ Profile Save</button><button onClick={load}>Profile Name দিয়ে Load</button><button className="danger" onClick={del}>Profile Delete</button>{msg&&<span className="message">{msg}</span>}</div></StepLayout>}




"use client";

import { useEffect, useState } from "react";
import StepLayout from "@/components/StepLayout";

const QUAL = [
  { v: "", t: "— নেই —" },
  { v: "CBT&A-5", t: "CBT&A-5 (৩৮,৭০০ / ৩০,৯৬০)" },
  { v: "CBT&A-4", t: "CBT&A-4 (৩৪,৮৩০ / ২৭,৮৬৪)" },
  { v: "NSC", t: "NSC (৩০,৯৬০ / ২৪,৭৬৮)" },
];

export default function Step4() {
  const [d, setD] = useState({
    trainer1: "", trainer2: "", totalBatch: "0",
    boys: "0", girls: "0", attendance: "0",
  });
  const set = (k: string) => (e: any) => setD({ ...d, [k]: e.target.value });

  useEffect(() => {
    try {
      const s = localStorage.getItem("billingStep4");
      if (s) setD((p) => ({ ...p, ...JSON.parse(s) }));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("billingStep4", JSON.stringify(d));
  }, [d]);

  const Trainer = ({ k, n }: { k: "trainer1" | "trainer2"; n: number }) => (
    <div className="f">
      <label>প্রশিক্ষক {n} — যোগ্যতা</label>
      <select value={d[k]} onChange={set(k)}>
        {QUAL.map((q) => <option key={q.v} value={q.v}>{q.t}</option>)}
      </select>
    </div>
  );

  const Num = ({ k, label }: { k: keyof typeof d; label: string }) => (
    <div className="f">
      <label>{label}</label>
      <input type="number" min="0" value={d[k]} onChange={set(k)} />
    </div>
  );

  return (
    <StepLayout step={4} title="প্রশিক্ষক ও প্রশিক্ষণার্থী">
      <style>{`
        .s4{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px}
        .s4 h2{font-size:16px;border-left:4px solid #e8590c;padding-left:8px;margin:0 0 6px}
        .s4 p.desc{font-size:12px;color:#555;margin:0 0 14px}
        .g{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
        .f label{display:block;font-size:11px;color:#444;margin-bottom:4px}
        .f select,.f input{width:100%;padding:9px 10px;border:1px solid #cfd4dc;border-radius:8px;font-size:13px;background:#fff}
        .note{margin-top:14px;background:#fff1e8;border:1px solid #f5c9a8;border-radius:8px;padding:10px 12px;font-size:11px;line-height:1.7;color:#7a3b12}
      `}</style>

      <section className="s4">
        <h2>ধাপ ৪ — প্রশিক্ষক ও প্রশিক্ষণার্থী (ব্যাচ ভিত্তিক)</h2>
        <p className="desc">প্রশিক্ষকদের যোগ্যতা ও প্রশিক্ষণার্থীর সংখ্যা দিন</p>

        <div className="g">
          <Trainer k="trainer1" n={1} />
          <Trainer k="trainer2" n={2} />
          <Num k="totalBatch" label="ব্যাচে মোট প্রশিক্ষণার্থী সংখ্যা (ছেলে ও মেয়ে)" />
          <Num k="boys" label="কমপিটেন্ট প্রশিক্ষণার্থী - ছেলে (জন)" />
          <Num k="girls" label="কমপিটেন্ট প্রশিক্ষণার্থী - মেয়ে (জন)" />
          <Num k="attendance" label="কমপিটেন্ট প্রশিক্ষণার্থীদের (ছেলে ও মেয়ে) মোট উপস্থিতি" />
        </div>

        <div className="note">
          প্রতি ছেলে প্রশিক্ষণার্থীর ভাতা = ৪,০০০ (১০০%) / ৩,২০০ (৮০%)। প্রতি মেয়ে
          প্রশিক্ষণার্থীর ভাতা = ৬,০০০ (১০০%) / ৪,৮০০ (৮০%)। কমপিটেন্ট প্রশিক্ষণার্থীদের
          মোট উপস্থিতি (দিন) × ২০০ টাকা = কনভেয়েন্স, যা ভাতার সাথে যোগ হবে (৮০%-এর
          ক্ষেত্রে কনভেয়েন্স ০.৮ গুণ হবে)।
        </div>
      </section>
    </StepLayout>
  );
}