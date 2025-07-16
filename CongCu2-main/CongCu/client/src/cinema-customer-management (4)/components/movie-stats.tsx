import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Film, Play, Clock, TrendingUp } from "lucide-react"
import type { Movie } from "./movie-management"

interface MovieStatsProps {
  movies: Movie[]
}

export function MovieStats({ movies }: MovieStatsProps) {
  const totalMovies = movies.length
  const nowShowing = movies.filter((m) => m.status === "now-showing").length
  const comingSoon = movies.filter((m) => m.status === "coming-soon").length
  const totalRevenue = movies.reduce((sum, movie) => sum + movie.revenue, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
    }).format(amount)
  }

  const stats = [
    {
      title: "Tổng số phim",
      value: totalMovies,
      icon: Film,
      color: "text-blue-600",
    },
    {
      title: "Đang chiếu",
      value: nowShowing,
      icon: Play,
      color: "text-green-600",
    },
    {
      title: "Sắp chiếu",
      value: comingSoon,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Doanh thu",
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
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
