"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InvoiceLetterhead from "@/components/InvoiceLetterhead";
import { useBilling } from "@/context/BillingContext";

// টাকার পরিমাণ কমা দিয়ে দেখানোর helper function
const money = (n: number) => Math.round(n).toLocaleString("en-US");

export default function InvoicePage() {
  const { data } = useBilling();

  // Trainee conveyance হিসাব
  const extra =
    data.traineeConveyance ||
    data.conveyanceDays *
      (data.traineeMale + data.traineeFemale) *
      100;

  // মোট হিসাব
  const total =
    data.stpAmount +
    data.isiscAmount +
    data.trainerAmount +
    data.traineeAllowance +
    extra;

  // নির্বাচিত Tranche অনুযায়ী হিসাব
  const selected = Math.round((total * data.tranche) / 100);

  // VAT ও AIT বাদ দিয়ে Release Amount
  const release =
    selected -
    Math.round((67633 * data.tranche) / 100) -
    Math.round((90177 * data.tranche) / 100);

  return (
    <>
      <SiteHeader />

      <main className="container">
        <div className="invoice-document invoice-screen">
          <section className="invoice-page">
            {/* Invoice Letterhead */}
            <InvoiceLetterhead />

            <hr />

            <h2 className="invoice-title">INVOICE</h2>

            <p className="invoice-subtitle">
              (Request for Release of {data.tranche}% Performance-Based Grant)
            </p>

            {/* Invoice Number এবং Date */}
            <div className="invoice-meta">
              <b>Invoice No: {data.invoice.invoiceNo}</b>

              <b>
                Invoice Date: {data.invoice.invoiceDate || "—"}
              </b>
            </div>

            {/* প্রাপক */}
            <p>
              To
              <br />
              Project Director
              <br />
              ASSET Project, Directorate of Technical Education
            </p>

            {/* Subject */}
            <p>
              <b>
                Subject: Invoice for Release of {data.tranche}%
                Performance-Based Grant for Enterprise-Based Training
                (EBT) – {data.profile.stpName || "Ucchash Center"}
              </b>
            </p>

            <p>
              This invoice is submitted for release of the{" "}
              {data.tranche}% completion-based tranche under Component-2.1
              (Enterprise-Based Training – EBT), following completion of
              training and assessment activities.
            </p>

            {/* Reference Details */}
            <h3>Reference</h3>

            <table className="invoice-table details-table">
              <tbody>
                {[
                  [
                    "Industry Partner",
                    "Informal Sector Industry Skills Council (ISISC)",
                  ],
                  ["Name of STP", data.profile.stpName || "Ucchash Center"],
                  ["STP Address", data.profile.address || "—"],
                  ["Contact Number", data.profile.phone || "—"],
                  ["Training Type", data.trade],
                  ["Occupation", data.profile.occupation || "—"],
                  ["Cycle", data.invoice.cycle],
                  ["Approval Memo No.", data.invoice.memoNo || "—"],
                  ["STP Serial", data.invoice.serial || "—"],
                  ["NSDA Memo No.", data.invoice.nsdaMemo || "—"],
                  ["BNQF Level", data.invoice.bnqf],
                  ["Approved Batch Size", data.invoice.approvedSize],
                  ["Trainees Appeared", data.invoice.appeared],
                  ["Assessment Date", data.invoice.assessmentDate || "—"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <th>{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Financial Claim Details */}
            <h3>
              Financial Claim Details ({data.trade} — {data.tranche}%)
            </h3>

            <table className="invoice-table financial-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount (BDT)</th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["STP portion", data.stpAmount],
                  ["ISISC portion", data.isiscAmount],
                  ["Trainer", data.trainerAmount],
                  ["Trainee allowance", data.traineeAllowance],
                  ["Trainee conveyance", extra],
                  [
                    `Less: VAT (${data.tranche}%)`,
                    -Math.round((67633 * data.tranche) / 100),
                  ],
                  [
                    `Less: AIT (${data.tranche}%)`,
                    -Math.round((90177 * data.tranche) / 100),
                  ],
                ].map(([label, value]) => {
                  const description = String(label);

                  const amount = Number(value);

                  const isMainAmount = [
                    "STP portion",
                    "ISISC portion",
                    "Trainer",
                    "Trainee allowance",
                    "Trainee conveyance",
                  ].includes(description);

                  const displayedAmount = isMainAmount
                    ? amount * (data.tranche / 100)
                    : amount;

                  return (
                    <tr key={description}>
                      <td>{description}</td>
                      <td>{money(displayedAmount)}</td>
                    </tr>
                  );
                })}

                <tr>
                  <th>Net Amount Requested for Release</th>
                  <th>{money(release)}</th>
                </tr>
              </tbody>
            </table>

            {/* Bank Details */}
            <h3>Bank Details for Fund Release</h3>

            <table className="invoice-table details-table">
              <tbody>
                {[
                  ["STP Account Name", data.bankDetails.stpAccountName],
                  ["STP Account Number", data.bankDetails.stpAccountNumber],
                  ["STP Bank", data.bankDetails.stpBank],
                  ["STP Branch", data.bankDetails.stpBranch],
                  ["STP Routing", data.bankDetails.stpRouting],
                  [
                    "Industry Account Name",
                    data.bankDetails.industryAccountName,
                  ],
                  [
                    "Industry Account Number",
                    data.bankDetails.industryAccountNumber,
                  ],
                  ["Industry Bank", data.bankDetails.industryBank],
                  ["Industry Branch", data.bankDetails.industryBranch],
                  ["Industry Routing", data.bankDetails.industryRouting],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <th>{label}</th>
                    <td>{value || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Trainee List */}
            <h3>Trainee List</h3>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Attendance</th>
                  <th>Account Name</th>
                  <th>Account Number</th>
                  <th>Bank</th>
                </tr>
              </thead>

              <tbody>
                {data.trainees.map((trainee, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{trainee.name || "—"}</td>
                    <td>{trainee.gender}</td>
                    <td>{trainee.attendance}</td>
                    <td>{trainee.accountName || "—"}</td>
                    <td>{trainee.accountNumber || "—"}</td>
                    <td>{trainee.bankName || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Declaration */}
            <h3>Declaration</h3>

            <p>
              We hereby certify that this claim is true and correct and
              respectfully request release of the eligible {data.tranche}%
              performance-based grant for the above-mentioned STP.
            </p>

            {/* Authorized Signatory */}
            <div className="signatory">
              <b>Authorized Signatory</b>

              <p>
                Mirza Nurul Ghani Shovon
                <br />
                Chairman
                <br />
                Informal Sector Industry Skills Council (ISISC)
              </p>
            </div>

            {/* Developer Credit */}
            <div className="developer-credit">
              Prepared using Ucchash Center Billing System · Developer: Md
              Farhad Hossain
            </div>
          </section>
        </div>

        {/* Invoice Actions */}
        <div className="buttonrow invoice-actions">
          <button
            className="primary"
            onClick={() => window.print()}
          >
            🖨 Print / Save as PDF (A4)
          </button>

          <Link className="nav-button" href="/billing/step-9">
            ← হিসাব সম্পাদনা
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}