import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, DollarSign } from "lucide-react"
import type { Showtime } from "./showtime-management"

interface ShowtimeStatsProps {
  showtimes: Showtime[]
}

export function ShowtimeStats({ showtimes }: ShowtimeStatsProps) {
  const totalShowtimes = showtimes.length
  const activeShowtimes = showtimes.filter((s) => s.status === "active").length
  const totalBookedSeats = showtimes.reduce((sum, showtime) => sum + showtime.bookedSeats, 0)
  const totalRevenue = showtimes.reduce((sum, showtime) => sum + showtime.bookedSeats * showtime.price, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
    }).format(amount)
  }

  const stats = [
    {
      title: "Tổng lịch chiếu",
      value: totalShowtimes,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Đang hoạt động",
      value: activeShowtimes,
      icon: Clock,
      color: "text-green-600",
    },
    {
      title: "Vé đã bán",
      value: totalBookedSeats,
      icon: Users,
      color: "text-orange-600",
    },
    {
      title: "Doanh thu",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
