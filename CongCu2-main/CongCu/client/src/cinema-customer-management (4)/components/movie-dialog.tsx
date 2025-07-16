"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Movie } from "./movie-management"

interface MovieDialogProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
  onSave: (movie: Omit<Movie, "id">) => void
}

export function MovieDialog({ movie, isOpen, onClose, onSave }: MovieDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    originalTitle: "",
    genre: [] as string[],
    duration: 0,
    director: "",
    cast: [] as string[],
    description: "",
    poster: "",
    trailer: "",
    releaseDate: "",
    rating: "G" as "G" | "PG" | "PG-13" | "R",
    language: "",
    status: "coming-soon" as "now-showing" | "coming-soon" | "ended",
    revenue: 0,
    totalShows: 0,
    averageRating: 0,
  })

  const [newGenre, setNewGenre] = useState("")
  const [newCast, setNewCast] = useState("")

  const allGenres = ["Hành động", "Hài", "Kinh dị", "Tình cảm", "Phiêu lưu", "Khoa học viễn tưởng", "Hoạt hình"]

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        originalTitle: movie.originalTitle,
        genre: movie.genre,
        duration: movie.duration,
        director: movie.director,
        cast: movie.cast,
        description: movie.description,
        poster: movie.poster,
        trailer: movie.trailer,
        releaseDate: movie.releaseDate,
        rating: movie.rating,
        language: movie.language,
        status: movie.status,
        revenue: movie.revenue,
        totalShows: movie.totalShows,
        averageRating: movie.averageRating,
      })
    } else {
      setFormData({
        title: "",
        originalTitle: "",
        genre: [],
        duration: 0,
        director: "",
        cast: [],
        description: "",
        poster: "",
        trailer: "",
        releaseDate: "",
        rating: "G",
        language: "",
        status: "coming-soon",
        revenue: 0,
        totalShows: 0,
        averageRating: 0,
      })
    }
  }, [movie, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addGenre = (genre: string) => {
    if (genre && !formData.genre.includes(genre)) {
      setFormData((prev) => ({
        ...prev,
        genre: [...prev.genre, genre],
      }))
    }
    setNewGenre("")
  }

  const removeGenre = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.filter((g) => g !== genre),
    }))
  }

  const addCast = () => {
    if (newCast && !formData.cast.includes(newCast)) {
      setFormData((prev) => ({
        ...prev,
        cast: [...prev.cast, newCast],
      }))
    }
    setNewCast("")
  }

  const removeCast = (actor: string) => {
    setFormData((prev) => ({
      ...prev,
      cast: prev.cast.filter((c) => c !== actor),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{movie ? "Chỉnh sửa phim" : "Thêm phim mới"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tên phim *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Nhập tên phim"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalTitle">Tên gốc</Label>
                  <Input
                    id="originalTitle"
                    value={formData.originalTitle}
                    onChange={(e) => handleInputChange("originalTitle", e.target.value)}
                    placeholder="Nhập tên gốc"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Thời lượng (phút) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", Number.parseInt(e.target.value) || 0)}
                      placeholder="120"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">Phân loại</Label>
                    <Select value={formData.rating} onValueChange={(value) => handleInputChange("rating", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="G">G - Mọi lứa tuổi</SelectItem>
                        <SelectItem value="PG">PG - Có sự hướng dẫn</SelectItem>
                        <SelectItem value="PG-13">PG-13 - Trên 13 tuổi</SelectItem>
                        <SelectItem value="R">R - Hạn chế</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <Input
                    id="language"
                    value={formData.language}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                    placeholder="Tiếng Việt, Tiếng Anh..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coming-soon">Sắp chiếu</SelectItem>
                      <SelectItem value="now-showing">Đang chiếu</SelectItem>
                      <SelectItem value="ended">Đã kết thúc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin chi tiết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="director">Đạo diễn</Label>
                  <Input
                    id="director"
                    value={formData.director}
                    onChange={(e) => handleInputChange("director", e.target.value)}
                    placeholder="Nhập tên đạo diễn"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="releaseDate">Ngày khởi chiếu</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => handleInputChange("releaseDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="poster">URL Poster</Label>
                  <Input
                    id="poster"
                    value={formData.poster}
                    onChange={(e) => handleInputChange("poster", e.target.value)}
                    placeholder="https://example.com/poster.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trailer">URL Trailer</Label>
                  <Input
                    id="trailer"
                    value={formData.trailer}
                    onChange={(e) => handleInputChange("trailer", e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thể loại</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.genre.map((genre) => (
                  <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                    {genre}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeGenre(genre)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={newGenre} onValueChange={setNewGenre}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Chọn thể loại" />
                  </SelectTrigger>
                  <SelectContent>
                    {allGenres
                      .filter((genre) => !formData.genre.includes(genre))
                      .map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={() => addGenre(newGenre)} disabled={!newGenre}>
                  Thêm
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Diễn viên</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.cast.map((actor) => (
                  <Badge key={actor} variant="secondary" className="flex items-center gap-1">
                    {actor}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeCast(actor)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newCast}
                  onChange={(e) => setNewCast(e.target.value)}
                  placeholder="Nhập tên diễn viên"
                  className="flex-1"
                />
                <Button type="button" onClick={addCast} disabled={!newCast}>
                  Thêm
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mô tả</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Nhập mô tả phim..."
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">{movie ? "Cập nhật" : "Thêm mới"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
