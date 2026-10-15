// import Link from "next/link";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";
// export default function Home(){return <>
// <SiteHeader/>
// <main className="welcome home-welcome">
//     <p className="eyebrow">WELCOME TO</p>
//     <h1>UCCHASH CENTER <em>BILLING SYSTEM</em></h1>
//     <p>ধাপে ধাপে তথ্য পূরণ করুন। প্রতিটি ধাপ আলাদা পেজে খুলবে এবং তথ্য স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকবে।</p>
//     <Link className="primary big" href="/billing/step-1">শুরু করুন →</Link>
//     </main><SiteFooter/>
//     </>}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../home.css";

export default function HomePage() {
  const router = useRouter();
  const [billingType, setBillingType] = useState("quick");

  const startBilling = () => {
    // নির্বাচিত Billing Mode অনুযায়ী পরবর্তী পেজে যাবে
    localStorage.setItem("billingType", billingType);
    router.push("/billing/step-1");
  };

  return (
    <main className="home-page">
      {/* ================= HEADER ================= */}
      <header className="main-header">
        <div className="header-logos">
          {/* Logo পরিবর্তন করতে public folder-এ ছবি রাখবে */}
          <div className="logo-box">
            <img
              src="/Image/Ussach logo.jpg"
              alt="Organization Logo"
              className="organization-logo"
            />
          </div>

          <div className="asset-logo">
            <img src="/Image/Assert logo.jpg" alt="ASSET Project" />
          </div>
        </div>

        <div className="header-title">
          <h2>
            ISISC-ASSET-EBT প্রকল্পের ইনভয়েসিং ও বিলিং পোর্টাল
          </h2>
          <p>
            ADTP · TSTP · STP — প্রশিক্ষণ ও বিল প্রস্তুতির সমন্বিত ব্যবস্থা
          </p>
        </div>

        {/* Powered By */}
        <div className="powered-section">
          <div className="powered-line" />
          <div className="powered-card">
            <span className="power-icon">⚡</span>
            <span>Powered by</span>
            <span className="powered-divider" />
            <strong className="powered-name">
              🛡️ Ucchash Innovation  <span>IT</span>
            </strong>
          </div>
        </div>
      </header>

      {/* ================= NAVIGATION ================= */}
      <nav className="navigation-bar">
        <div className="navigation-top">
          <span className="system-badge">
            নিরাপদ ও প্রোটেক্টেড
          </span>

          <p>
            <strong>অভিনন্দন!</strong> — কো-অর্ডিনেশন
            পোর্টাল, ISISC-ASSET-EBT প্রকল্প
          </p>
        </div>

        <div className="navigation-actions">
          
          <button
            className="nav-button white-button"
            onClick={() => router.push("/")}
          >
            ← Back to Welcome
          </button>


          <button
            className="nav-button orange-button"
            onClick={startBilling}
          >
            📁 বিল প্রস্তুত করুন
          </button>

          <button
            className="nav-button orange-button"
            onClick={() => router.push("/billing/invoice")}
          >
            ▣ ইনভয়েস দেখুন
          </button>

          <button
            className="nav-button white-button"
            onClick={() => window.print()}
          >
            ▧ সম্পূর্ণ প্রিন্ট
          </button>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <section className="content-area">
        <div className="billing-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">স্মার্ট BILLING PROCESS</span>
              <h1>আপনি কীভাবে Billing তৈরি করতে চান?</h1>
              <p>
                বিলিংয়ের পদ্ধতিটি বেছে নিয়ে নিচে বিলিং Wizard
                ব্যবহার করতে পারবেন।
              </p>
            </div>

            <span className="protection-badge">
              Existing System Protected
            </span>
          </div>

          {/* Billing Options */}
          <div className="billing-options">
            <button
              className={`billing-card ${
                billingType === "quick" ? "selected" : ""
              }`}
              onClick={() => setBillingType("quick")}
            >
              <span className="number-circle">1</span>
              <span className="card-text">
                <strong>Quick Billing</strong>
                <small>
                  একটি Subject / Batch — সরাসরি ধাপে ধাপে Wizard
                </small>
              </span>
            </button>

            <button
              className={`billing-card ${
                billingType === "multi" ? "selected" : ""
              }`}
              onClick={() => setBillingType("multi")}
            >
              <span className="number-circle">2</span>
              <span className="card-text">
                <strong>Multi-Subject Billing</strong>
                <small>
                  একাধিক Master Entry, একাধিক Subject/Batch
                </small>
              </span>
            </button>

            <button
              className={`billing-card ${
                billingType === "excel" ? "selected" : ""
              }`}
              onClick={() => setBillingType("excel")}
            >
              <span className="number-circle">3</span>
              <span className="card-text">
                <strong>Excel Auto Billing</strong>
                <small>
                  Excel থেকে Subject, Trainee, Trainer Auto Map
                </small>
              </span>
            </button>
          </div>

          <div className="billing-hint">
            {billingType === "quick" && (
              <p>
                <strong>Quick Billing:</strong> একটি Subject ও
                Batch-এর জন্য নতুন Billing Wizard শুরু করুন।
              </p>
            )}

            {billingType === "multi" && (
              <p>
                <strong>Multi-Subject Billing:</strong> একাধিক
                Subject ও Batch-এর তথ্য দিয়ে বিল তৈরি করুন।
              </p>
            )}

            {billingType === "excel" && (
              <p>
                <strong>Excel Auto Billing:</strong> Excel ফাইল
                থেকে তথ্য নিয়ে Billing প্রস্তুত করুন।
              </p>
            )}
          </div>

          <div className="panel-footer">
            <span>Developer: Md Farhad Hossain</span>

            <button
              className="start-button"
              onClick={startBilling}
            >
              পরবর্তী ধাপে যান →
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="main-footer">
        <p>
          © {new Date().getFullYear()} ISISC-ASSET-EBT Billing Portal
        </p>
        <p>Developer: Md Farhad Hossain</p>
      </footer>
    </main>
  );
}