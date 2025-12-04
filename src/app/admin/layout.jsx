"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/reservations", label: "Reservations" },
    { href: "/admin/messages", label: "Contact Messages" },
    { href: "/admin/settings", label: "Settings" },
  ];

  function logout() {
    cookieStore.removeItem("token")
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-gray-900 px-6 py-4 text-white flex items-center justify-between">
        
        {/* LEFT — LOGO OR TITLE */}
        <div className="font-semibold text-lg">Admin Panel</div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-6 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-blue-400 ${
                pathname === item.href ? "text-blue-400" : "text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* LOGOUT BUTTON (desktop) */}
        <button
          onClick={logout}
          className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          <LogOut size={18} />
          Logout
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-gray-800 text-white px-6 py-4 space-y-4">

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block transition hover:text-blue-400 ${
                pathname === item.href ? "text-blue-400" : "text-gray-300"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full justify-center"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

      {/* PAGE CONTENT */}
      <main className="p-6 md:p-8">{children}</main>
    </div>
  );
}
