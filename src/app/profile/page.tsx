"use client";

import { useState } from "react";
import { User, Info, Search, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [tab, setTab] = useState<"certs" | "info">("certs");
  const certificates = [1, 2, 3, 4];

  return (
    <main className="min-h-screen bg-[#FCFFF7] pb-10">

      <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium text-[#0B3D1C] mb-8 pl-4 sm:pl-8 pt-24 lg:pt-30">
        My Profile
      </h1>

      <div className="rounded-2xl p-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-10 px-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-5">
          <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] bg-[#EBF8CD] border border-[#B3CA7F] rounded-xl flex items-center justify-center">
            <User size={36} className="text-[#455F0F]" />
          </div>

          <div>
            <p className="font-medium text-[#00360C] text-[16px] sm:text-[18px]">John Doe Chaudhary</p>
            <p className="text-[#00360C] text-[14px] sm:text-[16px]">johndoe@gmail.consultixs.com</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-end gap-8 sm:gap-12 text-center">
          <Stat label="Ongoing Courses" value="1" />
          <Stat label="Courses Completed" value="3" />
          <Stat label="Certificates Earned" value="3" />
        </div>
      </div>

      <div className="flex border-b border-[#D9D9D9] mb-8 w-full">
        <TabButton active={tab === "certs"} onClick={() => setTab("certs")} icon={<img src="/certificationsicon.svg" className="w-8 h-8 sm:w-10 sm:h-10" />} label="Certificates" />
        <TabButton active={tab === "info"} onClick={() => setTab("info")} icon={<Info size={24} />} label="Account Info" />
      </div>

      {tab === "certs" && (
        <>
          {certificates.length === 0 ? (
            <EmptyCertificates />
          ) : (
            <>
              <p className="text-[#005715] font-medium text-[16px] sm:text-[18px] mb-8 px-4 sm:px-8 lg:px-10">
                A record of the courses you’ve successfully completed and the certifications you’ve earned.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8 lg:px-10">
                {certificates.map((c, i) => (
                  <CertificateCard key={i} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {tab === "info" && <AccountInfo />}

    </main>
  );
}

function Stat({ label, value }: any) {
  return (
    <div>
      <p className="text-[14px] sm:text-[16px] font-medium text-[#3E3E3E]">{label}</p>
      <p className="text-[48px] sm:text-[64px] lg:text-[72px] font-medium text-[#00360C]">{value}</p>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex-1 flex items-center justify-center gap-2 text-[14px] sm:text-[20px] lg:text-[24px] py-3 sm:py-4 font-medium transition ${active ? "border-t-[6px] rounded-t-[6px] border-[#455F0F] text-[#00360C] bg-[#F6FBE9]" : "hover:bg-[#F6FBE9]"}`}>
      {icon}
      {label}
    </button>
  );
}

function CertificateCard() {
  return (
    <div className="rounded-xl shadow-sm overflow-hidden">
      <img src="/BB Certificate.png" className="w-full" />
      <div className="p-4">
        <p className="text-[14px] text-[#0B3D1C] mb-3">Beginning of Biomes : Beginner Level</p>
        <button className="w-full bg-[#0B3D1C] text-white rounded-lg py-3">Download Certificate</button>
      </div>
    </div>
  );
}

function EmptyCertificates() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-medium text-[#002E0B] mb-6">No Certificates yet</h2>
      <p className="max-w-[700px] font-medium text-[#00360C] text-[16px] sm:text-[18px] mb-12 px-4">
        You’ll see your certificates here once you complete a course. Keep learning and taking action, your achievements will appear soon.
      </p>
      <Link href="/courses" className="flex items-center border-2 border-[#005715] rounded-xl overflow-hidden hover:shadow-lg transition">
        <div className="px-6 sm:px-8 py-5 sm:py-6 text-left">
          <p className="text-[#00360C] font-semibold text-[16px] sm:text-[18px]">Explore our</p>
          <p className="text-[#00360C] font-semibold text-[16px] sm:text-[18px]">Courses</p>
        </div>
        <div className="bg-[#005715] p-6 sm:p-10 flex items-center justify-center rounded-[6px]">
          <Search size={26} color="white" />
        </div>
      </Link>
    </div>
  );
}

function AccountInfo() {
  return (
    <div className="px-4 sm:px-8 lg:px-20 mx-auto">
      <p className="text-[#005715] mb-10 font-medium text-[16px] sm:text-[18px]">Manage your account details and security settings.</p>

      <InfoField label="Name" value="John Doe Chaudhary" action="Change user name" />
      <InfoField label="Email Address" value="johndoe@gmail.consultixs.com" action="Change Email Address" />
      <InfoField label="Password" value="************" action="Update Password" />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 mt-16">
        <button className="flex items-center justify-center gap-2 border border-[#FF5A1E] text-[#B91C1C] px-4 py-3 rounded-lg font-semibold hover:bg-red-50 transition w-full sm:w-auto">
          Delete Account
          <Trash2 size={18} />
        </button>

        <Link href="/privacy-policy" className="text-white font-semibold bg-[#005715] rounded-[8px] px-4 py-3 text-[16px] w-full sm:w-auto text-center">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

function InfoField({ label, value, action }: any) {
  return (
    <div className="mb-8">
      <p className="text-[#00360C] text-[18px] sm:text-[20px] mb-3 font-medium">{label}</p>
      <div className="flex items-center justify-between border border-[#CFE2A7] rounded-xl px-4 sm:px-6 py-3 sm:py-4">
        <span className="text-[#00360C] text-[14px] sm:text-[16px]">{value}</span>
        <button className="flex items-center gap-2 text-[#6B7280] hover:text-[#00360C] transition">
          {action}
          <Pencil size={16} />
        </button>
      </div>
    </div>
  );
}
