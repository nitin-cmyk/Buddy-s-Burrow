import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FEFFFD]">

      <AdminSidebar />

      <main className="lg:ml-64">

        <AdminNavbar />

        <div className="p-10">
          {children}
        </div>

      </main>
    </div>
  );
}
