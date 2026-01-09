'use client'

import { LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { apiLogout } from '../api/auth'
import { useAuth } from '../AuthProvider'
import AdminRoute from './AdminRoute'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { logout: feLogout } = useAuth()

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/reservations', label: 'Reservations' },
    { href: '/admin/messages', label: 'Contact Messages' },
    { href: '/admin/settings', label: 'Settings' },
  ]

  async function logout() {
    //call BE for logout
    await apiLogout()

    // call FE for logout
    feLogout()

    router.push('/login')
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-100">
        {/* NAVBAR */}
        <nav className="flex items-center justify-between bg-gray-900 px-6 py-4 text-white">
          {/* LEFT — LOGO OR TITLE */}
          <div className="text-lg font-semibold">Admin Panel</div>

          {/* DESKTOP NAV */}
          <div className="hidden gap-6 font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-blue-400 ${
                  pathname === item.href ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* LOGOUT BUTTON (desktop) */}
          <button
            onClick={logout}
            className="hidden items-center gap-2 rounded bg-red-600 px-4 py-2 hover:bg-red-700 md:flex"
          >
            <LogOut size={18} />
            Logout
          </button>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* MOBILE DROPDOWN */}
        {open && (
          <div className="space-y-4 bg-gray-800 px-6 py-4 text-white md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block transition hover:text-blue-400 ${
                  pathname === item.href ? 'text-blue-400' : 'text-gray-300'
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={() => {
                setOpen(false)
                logout()
              }}
              className="flex w-full items-center justify-center gap-2 rounded bg-red-600 px-4 py-2 hover:bg-red-700"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}

        {/* PAGE CONTENT */}
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </AdminRoute>
  )
}
