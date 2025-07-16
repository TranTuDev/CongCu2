"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Filter, XCircle } from "lucide-react"
import type { Showtime } from "./showtime-management"

interface ShowtimeTableProps {
  showtimes: Showtime[]
  onEdit: (showtime: Showtime) => void
  onCancel: (showtime: Showtime) => void
  onDelete: (showtime: Showtime) => void
  onAdd: () => void
  searchTerm: string
  onSearchChange: (term: string) => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  dateFilter: string
  onDateFilterChange: (date: string) => void
}

export function ShowtimeTable({
  showtimes,
  onEdit,
  onCancel,
  onDelete,
  onAdd,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
}: ShowtimeTableProps) {
  const getStatusBadge = (status: Showtime["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    }

    const labels = {
      active: "Hoạt động",
      cancelled: "Đã hủy",
      completed: "Hoàn thành",
    }

    return <Badge className={variants[status]}>{labels[status]}</Badge>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  const getOccupancyRate = (booked: number, total: number) => {
    return Math.round((booked / total) * 100)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Danh sách lịch chiếu</CardTitle>
          <Button onClick={onAdd} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm lịch chiếu
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo phim, rạp hoặc phòng..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
              className="w-[150px]"
            />

            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phim</TableHead>
                <TableHead>Rạp & Phòng</TableHead>
                <TableHead>Ngày & Giờ</TableHead>
                <TableHead>Giá vé</TableHead>
                <TableHead>Tỷ lệ lấp đầy</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {showtimes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Không tìm thấy lịch chiếu nào
                  </TableCell>
                </TableRow>
              ) : (
                showtimes.map((showtime) => (
                  <TableRow key={showtime.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={showtime.moviePoster || "/placeholder.svg"}
                          alt={showtime.movieTitle}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{showtime.movieTitle}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{showtime.theaterName}</div>
                        <div className="text-sm text-gray-500">{showtime.roomNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatDate(showtime.date)}</div>
                        <div className="text-sm text-gray-500">{showtime.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(showtime.price)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>
                            {showtime.bookedSeats}/{showtime.totalSeats}
                          </span>
                          <span>{getOccupancyRate(showtime.bookedSeats, showtime.totalSeats)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${getOccupancyRate(showtime.bookedSeats, showtime.totalSeats)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(showtime.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {}}>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          {showtime.status === "active" && (
                            <>
                              <DropdownMenuItem onClick={() => onEdit(showtime)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onCancel(showtime)} className="text-orange-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Hủy lịch chiếu
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem onClick={() => onDelete(showtime)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
