
"use client";

import { useRouter } from "next/navigation";
import "./welcome.css";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="welcome-page">
      {/* Header: Organization এবং ASSET Logo */}
      <header className="welcome-header">
        <div className="welcome-logos">
          <div className="welcome-logo-box">
            <img src="/logo.png" alt="Organization Logo" />
          </div>

          <div className="welcome-asset-box">
            <img src="/asset-logo.png" alt="ASSET Project Logo" />
          </div>
        </div>

        <div className="welcome-title">
          <h1>
            ISISC-ASSET-EBT প্রকল্পের ইনভয়েসিং ও বিলিং পোর্টাল
          </h1>
          <p>
            ADTP · TSTP · STP — প্রশিক্ষণ ও বিল প্রস্তুতির সমন্বিত ব্যবস্থা
          </p>
        </div>
      </header>

      {/* Main Welcome Section */}
      <section className="welcome-main">
        <div className="welcome-card">
          <span className="welcome-label">
            OFFICIAL BILLING PORTAL
          </span>

          <h2>স্বাগতম</h2>

          <h3>ISISC-ASSET-EBT Billing Portal</h3>

          <p>
            প্রশিক্ষণ, Trainer, Trainee এবং Invoice-এর তথ্য
            পরিচালনা ও বিল প্রস্তুত করতে শুরু করুন।
          </p>

          {/* Powered By */}
          <div className="welcome-powered">
            <span className="welcome-bolt">⚡</span>
            <span>Powered by</span>
            <span className="welcome-divider" />
            <strong>
              NUSAIFA <b>IT</b>
            </strong>
          </div>

          {/* Start button: পুরোনো Home Page-এ যাবে */}
         
                <button
                type="button"
                className="welcome-start"
                onClick={() => router.push("/home")}
                >
                শুরু করা <span>→</span>
                </button>


          <small>পোর্টালে প্রবেশ করতে শুরু করা বাটনে ক্লিক করুন</small>
        </div>
      </section>

      {/* Footer */}
      <footer className="welcome-footer">
        <span>© {new Date().getFullYear()} ISISC-ASSET-EBT</span>
        <span>Developer: Md Farhad Hossain</span>
      </footer>
    </main>
  );
}
