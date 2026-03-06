"use client";

import { useEffect, useState } from "react";
import { User, Info, Search, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default function ProfilePage() {
  const [tab, setTab] = useState<"certs" | "info">("certs");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) return;

      setUser(userData.user);

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      setProfile(profileData);

      // Fetch certificates
      const { data: certData } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_id", userData.user.id);

      setCertificates(certData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFFF7] pb-10">
      <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium text-[#0B3D1C] mb-8 pl-4 sm:pl-8 pt-24">
        My Profile
      </h1>

      <div className="rounded-2xl p-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-10 px-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-5">
          <div className="w-[80px] h-[80px] bg-[#EBF8CD] border border-[#B3CA7F] rounded-xl flex items-center justify-center">
            <User size={36} className="text-[#455F0F]" />
          </div>

          <div>
            <p className="font-medium text-[#00360C] text-[18px]">
              {profile?.name || "User"}
            </p>
            <p className="text-[#00360C] text-[16px] break-all">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex gap-12 text-center">
          <Stat label="Ongoing Courses" value={profile?.ongoing_courses || 0} />
          <Stat label="Courses Completed" value={profile?.completed_courses || 0} />
          <Stat label="Certificates Earned" value={certificates.length} />
        </div>
      </div>

      <div className="flex border-b border-[#D9D9D9] mb-8 w-full">
        <TabButton active={tab === "certs"} onClick={() => setTab("certs")} icon={<img src="/certificationsicon.svg" className="w-8 h-8" />} label="Certificates" />
        <TabButton active={tab === "info"} onClick={() => setTab("info")} icon={<Info size={24} />} label="Account Info" />
      </div>

      {tab === "certs" && (
        <>
          {certificates.length === 0 ? (
            <EmptyCertificates />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-10">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
            </div>
          )}
        </>
      )}

      {tab === "info" && (
        <AccountInfo
          profile={profile}
          email={user?.email}
          onChangeName={() => setShowNameModal(true)}
          onOpenPrivacy={() => setShowPrivacyModal(true)}
          onOpenDelete={() => setShowDeleteModal(true)}
        />
      )}

      {showNameModal && (
        <ChangeNameModal
          currentName={profile?.name}
          onClose={(updatedName?: string) => {
            if (updatedName) {
              setProfile((prev: any) => ({
                ...prev,
                name: updatedName,
              }));
            }
            setShowNameModal(false);
          }}
        />
      )}
      {showPrivacyModal && (
        <PrivacyPolicyModal onClose={() => setShowPrivacyModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
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

function CertificateCard({ cert }: any) {
  return (
    <div className="rounded-xl shadow-sm overflow-hidden">
      <img src={cert.image_url} className="w-full" />
      <div className="p-4">
        <p className="text-[14px] text-[#0B3D1C] mb-3">
          {cert.course_title}
        </p>
        <a
          href={cert.file_url}
          target="_blank"
          className="block w-full text-center bg-[#0B3D1C] text-white rounded-lg py-3"
        >
          Download Certificate
        </a>
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

function AccountInfo({ profile, email, onChangeName, onOpenPrivacy, onOpenDelete }: any) {
  return (
    <div className="px-4 sm:px-8 lg:px-20 mx-auto">
      <p className="text-[#005715] mb-10 font-medium text-[18px]">
        Manage your account details and security settings.
      </p>

      <InfoField
        label="Name"
        value={profile?.name}
        action="Change user name"
        onClick={onChangeName}
      />
      <InfoField label="Email Address" value={email} action="Change Email Address" />
      <InfoField label="Password" value="************" action="Update Password" />

      {/* Bottom Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-20 mt-16">

        {/* Delete Account */}
        <button onClick={onOpenDelete} className="flex items-center justify-between gap-4 border-[1px] border-[#FF5A1E] rounded-[8px] px-3 py-2 group hover:bg-red-50 transition">

          <span className="text-[#B91C1C] text-[16px] font-semibold">
            Delete Account
          </span>

          <div className="rounded-[6px] p-1 flex items-center justify-center">
            <Trash2 size={28} className="text-[#B91C1C]" />
          </div>
        </button>

        {/* Privacy Policy */}
        <button
          onClick={onOpenPrivacy}
          className="flex items-center justify-between gap-4 bg-[#005715] rounded-[8px] px-3 py-2 hover:opacity-90 transition"
        >
          <span className="text-white text-[16px] font-semibold">
            Privacy Policy
          </span>

          <div className="rounded-[6px] p-1 flex items-center justify-center">
            <Image
              src="/privacy-icon1.svg" // change to your icon
              alt="Privacy"
              width={25}
              height={25}
            />
          </div>
        </button>

      </div>
    </div>
  );
}

function PrivacyPolicyModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="relative bg-[#F3F5EC] w-full max-w-[900px] rounded-[32px] p-12 max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={() => onClose()}
          className="absolute top-6 right-6 text-black text-3xl"
        >
          ×
        </button>

        <h2 className="text-[52px] font-medium text-[#33470B] mb-8">
          Privacy Policy
        </h2>

        <p className="text-[#3E3E3E] text-[16px] space-y-6">
          Buddy’s Burrow is committed to respecting and protecting the privacy of everyone who uses our platform. We collect limited personal information such as your name, email address, login credentials, course activity, progress data, certificates earned, and any optional content you choose to upload, solely to provide access to our educational programs, track learning progress, issue certificates, communicate important updates, and improve the overall platform experience.

          <br /><br />

          Personal information is used only for legitimate platform functionality and is never sold, rented, or shared for marketing purposes. Data may be securely processed by trusted third-party service providers who assist with hosting, authentication, analytics, or payment processing, strictly for operational needs and in compliance with applicable data protection standards.

          <br /><br />

          Information provided during account creation, including your name, may appear on certificates and learning records to ensure accuracy and authenticity. We implement reasonable technical and organizational measures to safeguard data against unauthorized access, misuse, or loss, and we regularly review our practices to maintain platform security and transparency.

          <br /><br />

          By using Buddy’s Burrow, you acknowledge and agree that your information is handled responsibly to support learning, participation, and meaningful engagement with environmental education.
        </p>

      </div>
    </div>
  );
}

function InfoField({ label, value, action, onClick }: any) {
  return (
    <div className="mb-8">
      <p className="text-[#00360C] text-[18px] sm:text-[20px] mb-3 font-medium">
        {label}
      </p>

      <div className="flex items-center justify-between border border-[#CFE2A7] rounded-xl px-4 sm:px-6 py-3 sm:py-4">
        <span className="text-[#00360C] text-[14px] sm:text-[16px] break-all max-w-[60%]">
          {value}
        </span>

        <button
          onClick={onClick}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#00360C] transition"
        >
          {action}
          <Pencil size={16} />
        </button>
      </div>
    </div>
  );
}

function ChangeNameModal({ currentName, onClose }: any) {
  const [newName, setNewName] = useState(currentName || "");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    setNameError("");
    setPasswordError("");
    setLoading(true);

    // ✅ NAME VALIDATION
    if (!/^[A-Za-z ]+$/.test(newName)) {
      setNameError("Name can only contain letters and spaces");
      setLoading(false);
      return;
    }

    if (newName.length > 20) {
      setNameError("Keep name under 20 characters");
      setLoading(false);
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      setLoading(false);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const email = userData?.user?.email;

    // 🔐 Re-authenticate
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email!,
      password,
    });

    if (authError) {
      setPasswordError("Incorrect password");
      setLoading(false);
      return;
    }

    // ✅ Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ name: newName })
      .eq("id", userData?.user?.id);

    setLoading(false);

    if (updateError) {
      setNameError(updateError.message);
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      onClose(newName);
    }, 3500);
  };


  if (success) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-[#F3F5EC] w-full max-w-[900px] rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 lg:p-16 text-center">

          <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto bg-[#1CB91C] rounded-full flex items-center justify-center mb-6 sm:mb-10">
            <Image
              src="/success-check.svg"
              alt="Success"
              width={40}
              height={40}
              className="sm:w-12 sm:h-12"
            />
          </div>

          <h2 className="text-[26px] sm:text-[40px] lg:text-[52px] font-medium text-[#33470B] mb-4 break-words">
            User Name Updated
          </h2>

          <p className="text-[14px] sm:text-[16px] text-[#3E3E3E] leading-relaxed break-words">
            Success! Your name has been updated on all existing and future certificates.
          </p>
        </div>
      </div>
    );
  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#F3F5EC] w-[90%] max-w-[700px] rounded-[24px] p-10">

        <h2 className="text-[40px] font-medium text-[#33470B] mb-2">
          Change Name
        </h2>
        <p className="text-[#3E3E3E] text-[14px] mb-3">Your certificates will be issued using this name, and any existing certificates will also be updated accordingly. Please ensure it appears exactly as you want it to be displayed.</p>

        <div className="mb-6">
          <label className="block mb-2 text-[20px] font-medium text-[#00360C]">
            New Name
          </label>

          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={`w-full rounded-[12px] border px-6 py-4 ${nameError ? "border-red-500" : "border-[#CFE2A7]"
              }`}
            placeholder="Enter new name"
          />

          {nameError && (
            <p className="text-red-500 text-sm mt-2">
              {nameError}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-[#00360C] text-[20px]">
            Enter your password to confirm this change
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[12px] border border-[#CFE2A7] px-6 py-4"
            placeholder="Enter password"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
          )}
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-[#33470B] text-white rounded-2xl py-5 text-[20px] cursor-pointer"
        >
          {loading ? "Updating..." : "Update name"}
        </button>

        <button
          onClick={() => onClose()}
          className="w-full mt-4 text-gray-500 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function DeleteAccountModal({ onClose }: any) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setError("");
    setLoading(true);

    if (!password) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const email = userData?.user?.email;

    // 🔐 Re-authenticate
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email!,
      password,
    });

    if (authError) {
      setError("Incorrect password");
      setLoading(false);
      return;
    }

    // 🗑 Call server to delete
    const res = await fetch("/api/delete-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userData?.user?.id,
      }),
    });

    if (!res.ok) {
      setError("Failed to delete account");
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);

    // ⏳ Redirect after 3 seconds
    setTimeout(async () => {
      await supabase.auth.signOut();
      window.location.href = "/";
    }, 3000);
  };

  // ✅ SUCCESS SCREEN (Like Name Update)
  if (success) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-[#F3F5EC] w-full max-w-[800px] rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 lg:p-16 text-center">

          <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto bg-[#1CB91C] rounded-full flex items-center justify-center mb-6 sm:mb-10">
            <Image
              src="/success-check.svg"
              alt="Deleted"
              width={40}
              height={40}
              className="sm:w-12 sm:h-12"
            />
          </div>

          <h2 className="text-[26px] sm:text-[40px] lg:text-[52px] font-medium text-[#33470B] mb-4 break-words">
            Account Deleted
          </h2>

          <p className="text-[14px] sm:text-[16px] text-[#3E3E3E] leading-relaxed break-words">
            Your account has been permanently deleted.
            Redirecting to homepage...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F3F5EC] w-full max-w-[800px] rounded-[24px] p-10">

        <h2 className="text-[52px] font-medium text-[#33470B] mb-6">
          Delete Account
        </h2>

        <p className="text-[#3E3E3E] text-[14px] mb-6">
          Deleting your Buddy’s Burrow account will permanently remove:
        </p>

        <ul className="list-disc ml-6 text-[#00360C] font-medium text-[14px] space-y-2 mb-8">
          <li>Your profile and personal details</li>
          <li>Your course progress and activity history</li>
          <li>Access to earned certificates</li>
        </ul>

        <p className="text-[#00360C] text-[20px] font-medium mb-4">
          Enter your password to confirm account deletion.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-[12px] border border-[#CFE2A7] px-6 py-5 mb-2"
          placeholder="Enter password"
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <p className="text-[#FF5A1E] text-[18px] font-medium mb-6">
          This action is permanent and cannot be undone.
        </p>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="w-full bg-[#B91C1C] text-white rounded-[16px] py-4 font-medium text-[20px] hover:opacity-90 transition"
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
