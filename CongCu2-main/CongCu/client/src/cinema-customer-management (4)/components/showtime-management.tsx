"use client"

import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { ShowtimeTable } from "./showtime-table"
import { ShowtimeDialog } from "./showtime-dialog"
import { ShowtimeStats } from "./showtime-stats"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface Showtime {
  id: string
  movieId: string
  movieTitle: string
  moviePoster: string
  theaterId: string
  theaterName: string
  roomNumber: string
  date: string
  time: string
  price: number
  totalSeats: number
  bookedSeats: number
  status: "active" | "cancelled" | "completed"
}

const mockShowtimes: Showtime[] = [
  {
    id: "1",
    movieId: "1",
    movieTitle: "Avengers: Endgame",
    moviePoster: "/placeholder.svg?height=400&width=300",
    theaterId: "theater1",
    theaterName: "CGV Vincom",
    roomNumber: "Phòng 1",
    date: "2024-01-15",
    time: "14:30",
    price: 120000,
    totalSeats: 120,
    bookedSeats: 85,
    status: "active",
  },
  {
    id: "2",
    movieId: "1",
    movieTitle: "Avengers: Endgame",
    moviePoster: "/placeholder.svg?height=400&width=300",
    theaterId: "theater1",
    theaterName: "CGV Vincom",
    roomNumber: "Phòng 2",
    date: "2024-01-15",
    time: "18:00",
    price: 150000,
    totalSeats: 150,
    bookedSeats: 120,
    status: "active",
  },
  {
    id: "3",
    movieId: "2",
    movieTitle: "Spider-Man: No Way Home",
    moviePoster: "/placeholder.svg?height=400&width=300",
    theaterId: "theater2",
    theaterName: "Lotte Cinema",
    roomNumber: "Phòng 3",
    date: "2024-01-16",
    time: "20:30",
    price: 130000,
    totalSeats: 100,
    bookedSeats: 45,
    status: "active",
  },
  {
    id: "4",
    movieId: "3",
    movieTitle: "Tết Ở Làng Địa Ngục",
    moviePoster: "/placeholder.svg?height=400&width=300",
    theaterId: "theater1",
    theaterName: "CGV Vincom",
    roomNumber: "Phòng 1",
    date: "2024-01-14",
    time: "16:00",
    price: 100000,
    totalSeats: 120,
    bookedSeats: 120,
    status: "completed",
  },
]

export function ShowtimeManagement() {
  const [showtimes, setShowtimes] = useState<Showtime[]>(mockShowtimes)
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("")

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    showtime: Showtime | null
    action: "cancel" | "delete"
  }>({
    isOpen: false,
    showtime: null,
    action: "cancel",
  })

  const handleAddShowtime = () => {
    setSelectedShowtime(null)
    setIsDialogOpen(true)
  }

  const handleEditShowtime = (showtime: Showtime) => {
    setSelectedShowtime(showtime)
    setIsDialogOpen(true)
  }

  const handleCancelShowtime = (showtime: Showtime) => {
    setConfirmDialog({
      isOpen: true,
      showtime,
      action: "cancel",
    })
  }

  const handleDeleteShowtime = (showtime: Showtime) => {
    setConfirmDialog({
      isOpen: true,
      showtime,
      action: "delete",
    })
  }

  const handleConfirmAction = () => {
    if (confirmDialog.showtime) {
      if (confirmDialog.action === "cancel") {
        setShowtimes(
          showtimes.map((s) => (s.id === confirmDialog.showtime!.id ? { ...s, status: "cancelled" as const } : s)),
        )
      } else {
        setShowtimes(showtimes.filter((s) => s.id !== confirmDialog.showtime!.id))
      }
    }
    setConfirmDialog({ isOpen: false, showtime: null, action: "cancel" })
  }

  const handleCancelAction = () => {
    setConfirmDialog({ isOpen: false, showtime: null, action: "cancel" })
  }

  const handleSaveShowtime = (showtimeData: Omit<Showtime, "id">) => {
    if (selectedShowtime) {
      setShowtimes(
        showtimes.map((s) => (s.id === selectedShowtime.id ? { ...showtimeData, id: selectedShowtime.id } : s)),
      )
    } else {
      const newShowtime: Showtime = {
        ...showtimeData,
        id: Date.now().toString(),
      }
      setShowtimes([...showtimes, newShowtime])
    }
    setIsDialogOpen(false)
  }

  const filteredShowtimes = showtimes.filter((showtime) => {
    const matchesSearch =
      showtime.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showtime.theaterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showtime.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || showtime.status === statusFilter
    const matchesDate = !dateFilter || showtime.date === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý lịch chiếu</h1>
                <p className="text-gray-600 mt-1">Quản lý lịch chiếu phim và phòng chiếu</p>
              </div>
            </div>

            <ShowtimeStats showtimes={showtimes} />

            <ShowtimeTable
              showtimes={filteredShowtimes}
              onEdit={handleEditShowtime}
              onCancel={handleCancelShowtime}
              onDelete={handleDeleteShowtime}
              onAdd={handleAddShowtime}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
            />

            <ShowtimeDialog
              showtime={selectedShowtime}
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onSave={handleSaveShowtime}
            />
          </div>
        </main>
      </div>

      <AlertDialog open={confirmDialog.isOpen} onOpenChange={(open) => !open && handleCancelAction()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.action === "cancel" ? "Hủy lịch chiếu" : "Xóa lịch chiếu"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.action === "cancel"
                ? `Bạn có chắc chắn muốn hủy lịch chiếu "${confirmDialog.showtime?.movieTitle}" lúc ${confirmDialog.showtime?.time} ngày ${confirmDialog.showtime?.date}? Khách hàng đã đặt vé sẽ được hoàn tiền.`
                : `Bạn có chắc chắn muốn xóa lịch chiếu "${confirmDialog.showtime?.movieTitle}"? Hành động này không thể hoàn tác.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelAction}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction} className="bg-red-600 hover:bg-red-700">
              {confirmDialog.action === "cancel" ? "Hủy lịch chiếu" : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
