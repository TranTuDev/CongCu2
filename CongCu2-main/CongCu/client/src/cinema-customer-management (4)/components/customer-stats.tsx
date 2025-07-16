import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Crown } from "lucide-react"
import type { Customer } from "./customer-management"

interface CustomerStatsProps {
  customers: Customer[]
}

export function CustomerStats({ customers }: CustomerStatsProps) {
  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const inactiveCustomers = customers.filter((c) => c.status === "inactive").length
  const vipCustomers = customers.filter((c) => c.membershipLevel === "gold" || c.membershipLevel === "platinum").length

  const stats = [
    {
      title: "Tổng khách hàng",
      value: totalCustomers,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Đang hoạt động",
      value: activeCustomers,
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Không hoạt động",
      value: inactiveCustomers,
      icon: UserX,
      color: "text-red-600",
    },
    {
      title: "Khách VIP",
      value: vipCustomers,
      icon: Crown,
      color: "text-yellow-600",
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
