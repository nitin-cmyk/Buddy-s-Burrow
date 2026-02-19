"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";


export default function ResetPasswordPage() {

  const router = useRouter();

  // ---------- SESSION GUARD ----------
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      // If user reached here WITHOUT verifying OTP
      if (!data.session) {
        router.replace("/forgot-password?expired=1");
      }
    };

    checkSession();
  }, []);


  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------- VALIDATIONS ----------
  const passLen = password.length >= 8;
  const passAlphaNum = /[a-zA-Z]/.test(password) && /\d/.test(password);
  const confirmMatch = confirm === password && confirm !== "";

  const valid =
    passLen &&
    passAlphaNum &&
    confirmMatch;

  // ---------- SUBMIT ----------
  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!valid) {
      setError("Please fix validation errors");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // SUCCESS
    router.push("/password-updated");
  };

  return (
    <main className="min-h-screen bg-[#FCFFF7]">
      <section className="min-h-screen p-[12px] flex items-center justify-center">

        <div className="w-full max-w-[1400px] min-h-[calc(100vh-24px)] grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[64px]">

          {/* IMAGE */}
          <div className="relative w-full h-[300px] sm:h-[420px] lg:h-full overflow-hidden rounded-[32px]">
            <Image
              src="/loginimg.png"
              alt="Reset Password"
              fill
              priority
              className="object-cover rounded-[24px] lg:rounded-[32px]"
            />
          </div>

          {/* FORM */}
          <div className="flex items-center">
            <form
              onSubmit={resetPassword}
              className="w-full max-w-[460px] mx-auto py-[24px] sm:py-[40px]"
            >

              <h1 className="font-poppins text-[#00360C] text-[32px] sm:text-[48px] font-medium mb-[8px]">
                Create New Password
              </h1>

              <p className="text-[#7B7B7B] text-[14px] mb-[32px]">
                Set a new password for your account.
              </p>

              {/* PASSWORD */}
              <div className="mb-[16px]">
                <label className="block text-[16px] text-[#00360C] font-medium mb-[6px]">
                  Enter New Password
                </label>

                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-[16px] border border-[#CFE2A7] px-[16px] py-[14px] pr-[48px]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-[14px] top-1/2 -translate-y-1/2"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {password && (
                  <div className="flex gap-[16px] mt-[8px] text-[13px]">
                    <div className={`flex items-center gap-1 ${passLen ? "text-green-600" : "text-red-500"}`}>
                      {passLen ? <Check size={14} /> : <X size={14} />}
                      8 characters
                    </div>

                    <div className={`flex items-center gap-1 ${passAlphaNum ? "text-green-600" : "text-red-500"}`}>
                      {passAlphaNum ? <Check size={14} /> : <X size={14} />}
                      Letters & numbers
                    </div>
                  </div>
                )}
              </div>

              {/* CONFIRM */}
              <div className="mb-[16px]">
                <label className="block text-[16px] text-[#00360C] font-medium mb-[6px]">
                  Re-enter new Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full rounded-[16px] border border-[#CFE2A7] px-[16px] py-[14px] pr-[48px]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-[14px] top-1/2 -translate-y-1/2"
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {confirm && (
                  <div className={`mt-[6px] text-[13px] flex items-center gap-1 ${confirmMatch ? "text-green-600" : "text-red-500"}`}>
                    {confirmMatch ? <Check size={14} /> : <X size={14} />}
                    Passwords match
                  </div>
                )}
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-[13px] mb-[12px]">
                  {error}
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={!valid || loading}
                className="w-full bg-[#455F0F] text-white rounded-[16px] py-[16px] font-medium"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>

            </form>
          </div>

        </div>
      </section>
    </main>
  );
}
