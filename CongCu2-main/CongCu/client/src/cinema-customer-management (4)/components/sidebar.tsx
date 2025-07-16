"use client"

import { usePathname } from "next/navigation"
import { Users, Film, Calendar, BarChart3, Settings, Ticket, MapPin, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: BarChart3, label: "Tổng quan", href: "/dashboard" },
  { icon: Users, label: "Khách hàng", href: "/" },
  { icon: Film, label: "Phim", href: "/movies" },
  { icon: Calendar, label: "Lịch chiếu", href: "/showtimes" },
  { icon: Ticket, label: "Vé", href: "/tickets" },
  { icon: MapPin, label: "Rạp & Phòng", href: "/theaters" },
  { icon: CreditCard, label: "Thanh toán", href: "/payments" },
  { icon: Settings, label: "Cài đặt", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}
