import { Suspense } from "react";
import VerifyOTPPageContent from "@/components/VerifyOTPPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <VerifyOTPPageContent />
    </Suspense>
  );
}
