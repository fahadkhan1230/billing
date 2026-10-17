// "use client";import StepLayout from "@/components/StepLayout";import {useBilling} from "@/context/BillingContext";
// export default function Step2(){const {data,set}=useBilling();return <StepLayout step={2} title="Training Type"><h2>ধাপ ২ — প্রশিক্ষণ ট্রেড নির্বাচন</h2><p>আপনার অনুমোদিত training type নির্বাচন করুন।</p><div className="two">{["ADTP","TSTP"].map(t=><button key={t} className={`choice ${data.trade===t?"chosen":""}`} onClick={()=>set("trade",t)}>{t}</button>)}</div></StepLayout>}


"use client";
import { useRouter } from "next/navigation";
import StepLayout from "@/components/StepLayout";
import QuickEntry24 from "@/components/QuickEntry24";
import { useBilling } from "@/context/BillingContext";

export default function Step2() {
  const { data, set } = useBilling();
  const router = useRouter();

  const pick = (t: string) => {
    set("trade", t);
    if (t === "TSTP") router.push("/billing/step-4");
  };

  return (
    <StepLayout step={2} title="Training Type">
      <h2>ধাপ ২ — প্রশিক্ষণ ট্রেড নির্বাচন</h2>
      <p>আপনার অনুমোদিত training type নির্বাচন করুন।</p>

      <div className="two">
        {["ADTP", "TSTP"].map((t) => (
          <button
            key={t}
            className={`choice ${data.trade === t ? "chosen" : ""}`}
            onClick={() => pick(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {data.trade === "ADTP" && <QuickEntry24 />}
    </StepLayout>
  );
}