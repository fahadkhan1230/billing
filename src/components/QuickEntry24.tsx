"use client";
import { useState } from "react";

const COLS = ["Student Name", "Gender", "Attendance", "Account Name", "Account Number", "Bank Name", "Branch", "Routing"];
const KEYS = ["name", "gender", "attendance", "accName", "accNo", "bank", "branch", "routing"];
const STORE = "billingTrainees";

const blankRow = () => Object.fromEntries(KEYS.map((k) => [k, k === "attendance" ? "0" : ""]));

const toRows = (text: string) =>
  text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    .map((l) => l.split(l.includes("\t") ? "\t" : ",").map((c) => c.trim()))
    .filter((c, i) => !(i === 0 && /student/i.test(c[0] || "")))
    .slice(0, 24)
    .map((c) => Object.fromEntries(KEYS.map((k, i) => [k, c[i] || (k === "attendance" ? "0" : "")])));

export default function QuickEntry24() {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  // ডেটা সেভ + Step 8 টেবিল খোলার event পাঠানো
  const save = (rows: any[], m: string) => {
    localStorage.setItem(STORE, JSON.stringify(rows));
    localStorage.setItem("billingStep8Open", "1");
    window.dispatchEvent(new CustomEvent("trainees-updated", { detail: rows }));
    setMsg(m);
  };

  const create = () => save(Array.from({ length: 24 }, blankRow), "২৪টি trainee row প্রস্তুত হয়েছে। এখন Excel/Paste থেকে তথ্য বসান।");

  const template = () => {
    const blob = new Blob(["\uFEFF" + COLS.join(",") + "\n"], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "trainee-template.csv";
    a.click();
  };

  const paste = () => {
    const rows = toRows(text);
    if (!rows.length) return alert("ত্রুটি: Paste box-এ কোনো ডেটা নেই।");
    save(rows, `${rows.length} জনের তথ্য বসানো হয়েছে।`);
    setText("");
  };

  const importFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      const rows = toRows(String(r.result));
      if (!rows.length) return alert("ত্রুটি: ফাইলে কোনো ডেটা পাওয়া যায়নি।");
      save(rows, `${rows.length} জনের তথ্য ইমপোর্ট হয়েছে।`);
    };
    r.readAsText(file);
    e.target.value = "";
  };

  return (
    <section className="q24">
      <style>{`
        .q24{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-top:16px;font-size:13px}
        .q24 h2{font-size:16px;border-left:4px solid #e8590c;padding-left:8px;margin:0 0 6px}
        .q24 .d{font-size:11px;color:#555;margin:0 0 14px}
        .q24 .bar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:14px}
        .q24 .btn{border:1px solid #0b1f4b;background:#fff;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer}
        .q24 .btn.dk{background:#0b1f4b;color:#fff;padding:12px 18px}
        .q24 .imp{font-size:10px;font-weight:700;color:#444;cursor:pointer;display:inline-flex;align-items:center;gap:4px}
        .q24 .nb{background:#fde8dd;border:1px solid #f5c9a8;border-radius:8px;padding:10px 12px;font-size:11px;line-height:1.7;margin-bottom:12px}
        .q24 textarea{width:100%;max-width:240px;height:78px;padding:8px;border:1px solid #cfd4dc;border-radius:6px;font:11px monospace;box-sizing:border-box;display:block;margin-bottom:14px}
        .q24 .row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
        .q24 .ok{background:#fde8dd;border:1px solid #f5c9a8;border-radius:8px;padding:9px 12px;font-size:11px;color:#7a3b12}
      `}</style>

      <h2>দ্রুত ২৪ জন প্রশিক্ষার্থী এন্ট্রি</h2>
      <p className="d">প্রতি ব্যাচে ২৪ জন প্রশিক্ষার্থী। এক এক করে ব্যাংক তথ্য টাইপ না করে Excel/CSV থেকে একসাথে Paste/Import করুন।</p>

      <div className="bar">
        <button className="btn" onClick={create}>👥 ২৪ জনের তালিকা তৈরি করুন</button>
        <button className="btn" onClick={template}>📥 Excel Template</button>
        <label className="imp">
          📤 Excel/CSV Import
          <input type="file" accept=".csv,.txt" onChange={importFile} hidden />
        </label>
      </div>

      <div className="nb">
        <b>Excel columns:</b> {COLS.join(", ")}. Excel থেকে ২৪ জনের data copy করে নিচের Paste box-এ সরাসরি paste করতে পারবেন।
      </div>

      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Excel থেকে ৮টি কলামসহ ২৪টি row copy করে এখানে Paste করুন..." />

      <div className="row">
        <button className="btn dk" onClick={paste}>⚡ Paste থেকে ২৪ জনের তথ্য বসান</button>
        {msg && <div className="ok" role="status">{msg}</div>}
      </div>
    </section>
  );
}