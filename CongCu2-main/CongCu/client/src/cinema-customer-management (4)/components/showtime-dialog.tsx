"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Showtime } from "./showtime-management"

interface ShowtimeDialogProps {
  showtime: Showtime | null
  isOpen: boolean
  onClose: () => void
  onSave: (showtime: Omit<Showtime, "id">) => void
}

const mockMovies = [
  { id: "1", title: "Avengers: Endgame", poster: "/placeholder.svg?height=400&width=300" },
  { id: "2", title: "Spider-Man: No Way Home", poster: "/placeholder.svg?height=400&width=300" },
  { id: "3", title: "Tết Ở Làng Địa Ngục", poster: "/placeholder.svg?height=400&width=300" },
]

const mockTheaters = [
  { id: "theater1", name: "CGV Vincom", rooms: ["Phòng 1", "Phòng 2", "Phòng 3"] },
  { id: "theater2", name: "Lotte Cinema", rooms: ["Phòng 1", "Phòng 2", "Phòng 3", "Phòng 4"] },
  { id: "theater3", name: "Galaxy Cinema", rooms: ["Phòng 1", "Phòng 2"] },
]

export function ShowtimeDialog({ showtime, isOpen, onClose, onSave }: ShowtimeDialogProps) {
  const [formData, setFormData] = useState({
    movieId: "",
    movieTitle: "",
    moviePoster: "",
    theaterId: "",
    theaterName: "",
    roomNumber: "",
    date: "",
    time: "",
    price: 0,
    totalSeats: 120,
    bookedSeats: 0,
    status: "active" as "active" | "cancelled" | "completed",
  })

  useEffect(() => {
    if (showtime) {
      setFormData({
        movieId: showtime.movieId,
        movieTitle: showtime.movieTitle,
        moviePoster: showtime.moviePoster,
        theaterId: showtime.theaterId,
        theaterName: showtime.theaterName,
        roomNumber: showtime.roomNumber,
        date: showtime.date,
        time: showtime.time,
        price: showtime.price,
        totalSeats: showtime.totalSeats,
        bookedSeats: showtime.bookedSeats,
        status: showtime.status,
      })
    } else {
      setFormData({
        movieId: "",
        movieTitle: "",
        moviePoster: "",
        theaterId: "",
        theaterName: "",
        roomNumber: "",
        date: "",
        time: "",
        price: 120000,
        totalSeats: 120,
        bookedSeats: 0,
        status: "active",
      })
    }
  }, [showtime, isOpen])

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

  const handleMovieChange = (movieId: string) => {
    const movie = mockMovies.find((m) => m.id === movieId)
    if (movie) {
      setFormData((prev) => ({
        ...prev,
        movieId,
        movieTitle: movie.title,
        moviePoster: movie.poster,
      }))
    }
  }

  const handleTheaterChange = (theaterId: string) => {
    const theater = mockTheaters.find((t) => t.id === theaterId)
    if (theater) {
      setFormData((prev) => ({
        ...prev,
        theaterId,
        theaterName: theater.name,
        roomNumber: "",
      }))
    }
  }

  const selectedTheater = mockTheaters.find((t) => t.id === formData.theaterId)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{showtime ? "Chỉnh sửa lịch chiếu" : "Thêm lịch chiếu mới"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin phim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="movie">Chọn phim *</Label>
                <Select value={formData.movieId} onValueChange={handleMovieChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phim" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMovies.map((movie) => (
                      <SelectItem key={movie.id} value={movie.id}>
                        {movie.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin rạp & phòng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theater">Chọn rạp *</Label>
                  <Select value={formData.theaterId} onValueChange={handleTheaterChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn rạp" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTheaters.map((theater) => (
                        <SelectItem key={theater.id} value={theater.id}>
                          {theater.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room">Chọn phòng *</Label>
                  <Select
                    value={formData.roomNumber}
                    onValueChange={(value) => handleInputChange("roomNumber", value)}
                    disabled={!selectedTheater}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTheater?.rooms.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thời gian & Giá vé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Ngày chiếu *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Giờ chiếu *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Giá vé (VNĐ) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", Number.parseInt(e.target.value) || 0)}
                    placeholder="120000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalSeats">Tổng số ghế *</Label>
                  <Input
                    id="totalSeats"
                    type="number"
                    value={formData.totalSeats}
                    onChange={(e) => handleInputChange("totalSeats", Number.parseInt(e.target.value) || 0)}
                    placeholder="120"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">{showtime ? "Cập nhật" : "Thêm mới"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
