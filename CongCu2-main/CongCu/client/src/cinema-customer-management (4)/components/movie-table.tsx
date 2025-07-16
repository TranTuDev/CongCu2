"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Filter, Star } from "lucide-react"
import type { Movie } from "./movie-management"

interface MovieTableProps {
  movies: Movie[]
  onEdit: (movie: Movie) => void
  onDelete: (movie: Movie) => void
  onAdd: () => void
  searchTerm: string
  onSearchChange: (term: string) => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  genreFilter: string
  onGenreFilterChange: (genre: string) => void
}

export function MovieTable({
  movies,
  onEdit,
  onDelete,
  onAdd,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  genreFilter,
  onGenreFilterChange,
}: MovieTableProps) {
  const getStatusBadge = (status: Movie["status"]) => {
    const variants = {
      "now-showing": "bg-green-100 text-green-800",
      "coming-soon": "bg-blue-100 text-blue-800",
      ended: "bg-gray-100 text-gray-800",
    }

    const labels = {
      "now-showing": "Đang chiếu",
      "coming-soon": "Sắp chiếu",
      ended: "Đã kết thúc",
    }

    return <Badge className={variants[status]}>{labels[status]}</Badge>
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
    }).format(amount)
  }

  const allGenres = ["Hành động", "Hài", "Kinh dị", "Tình cảm", "Phiêu lưu", "Khoa học viễn tưởng", "Hoạt hình"]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Danh sách phim</CardTitle>
          <Button onClick={onAdd} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm phim
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo tên phim, đạo diễn hoặc diễn viên..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="now-showing">Đang chiếu</SelectItem>
                <SelectItem value="coming-soon">Sắp chiếu</SelectItem>
                <SelectItem value="ended">Đã kết thúc</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genreFilter} onValueChange={onGenreFilterChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Thể loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {allGenres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
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
                <TableHead>Thể loại</TableHead>
                <TableHead>Thời lượng</TableHead>
                <TableHead>Đạo diễn</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Doanh thu</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Không tìm thấy phim nào
                  </TableCell>
                </TableRow>
              ) : (
                movies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={movie.poster || "/placeholder.svg"}
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{movie.title}</div>
                          <div className="text-sm text-gray-500">{movie.language}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {movie.genre.slice(0, 2).map((g) => (
                          <Badge key={g} variant="outline" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                        {movie.genre.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{movie.genre.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDuration(movie.duration)}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{movie.director}</TableCell>
                    <TableCell>{getStatusBadge(movie.status)}</TableCell>
                    <TableCell>
                      {movie.averageRating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{movie.averageRating}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">Chưa có</span>
                      )}
                    </TableCell>
                    <TableCell>{formatCurrency(movie.revenue)}</TableCell>
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
                          <DropdownMenuItem onClick={() => onEdit(movie)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDelete(movie)} className="text-red-600">
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
