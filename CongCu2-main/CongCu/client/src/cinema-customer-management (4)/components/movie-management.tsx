"use client"

import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { MovieTable } from "./movie-table"
import { MovieDialog } from "./movie-dialog"
import { MovieStats } from "./movie-stats"
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

export interface Movie {
  id: string
  title: string
  originalTitle: string
  genre: string[]
  duration: number // minutes
  director: string
  cast: string[]
  description: string
  poster: string
  trailer: string
  releaseDate: string
  rating: string // G, PG, PG-13, R
  language: string
  status: "now-showing" | "coming-soon" | "ended"
  revenue: number
  totalShows: number
  averageRating: number
}

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Avengers: Endgame",
    originalTitle: "Avengers: Endgame",
    genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    duration: 181,
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
    description: "Sau những sự kiện tàn khốc của Infinity War, vũ trụ đang trong tình trạng hỗn loạn...",
    poster: "/placeholder.svg?height=400&width=300",
    trailer: "https://youtube.com/watch?v=example",
    releaseDate: "2024-01-15",
    rating: "PG-13",
    language: "Tiếng Anh",
    status: "now-showing",
    revenue: 15000000000,
    totalShows: 120,
    averageRating: 4.8,
  },
  {
    id: "2",
    title: "Spider-Man: No Way Home",
    originalTitle: "Spider-Man: No Way Home",
    genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    duration: 148,
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    description: "Peter Parker phải đối mặt với những thử thách lớn nhất trong cuộc đời...",
    poster: "/placeholder.svg?height=400&width=300",
    trailer: "https://youtube.com/watch?v=example2",
    releaseDate: "2024-02-01",
    rating: "PG-13",
    language: "Tiếng Anh",
    status: "coming-soon",
    revenue: 0,
    totalShows: 0,
    averageRating: 0,
  },
  {
    id: "3",
    title: "Tết Ở Làng Địa Ngục",
    originalTitle: "Tết Ở Làng Địa Ngục",
    genre: ["Hài", "Kinh dị"],
    duration: 110,
    director: "Nguyễn Văn A",
    cast: ["Trấn Thành", "Hari Won", "Tuấn Trần"],
    description: "Câu chuyện hài hước về một gia đình trong dịp Tết...",
    poster: "/placeholder.svg?height=400&width=300",
    trailer: "https://youtube.com/watch?v=example3",
    releaseDate: "2023-12-01",
    rating: "PG",
    language: "Tiếng Việt",
    status: "ended",
    revenue: 8000000000,
    totalShows: 85,
    averageRating: 4.2,
  },
]

export function MovieManagement() {
  const [movies, setMovies] = useState<Movie[]>(mockMovies)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [genreFilter, setGenreFilter] = useState<string>("all")

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    movie: Movie | null
    action: "delete"
  }>({
    isOpen: false,
    movie: null,
    action: "delete",
  })

  const handleAddMovie = () => {
    setSelectedMovie(null)
    setIsDialogOpen(true)
  }

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsDialogOpen(true)
  }

  const handleDeleteMovie = (movie: Movie) => {
    setConfirmDialog({
      isOpen: true,
      movie,
      action: "delete",
    })
  }

  const handleConfirmDelete = () => {
    if (confirmDialog.movie) {
      setMovies(movies.filter((m) => m.id !== confirmDialog.movie!.id))
    }
    setConfirmDialog({ isOpen: false, movie: null, action: "delete" })
  }

  const handleCancelDelete = () => {
    setConfirmDialog({ isOpen: false, movie: null, action: "delete" })
  }

  const handleSaveMovie = (movieData: Omit<Movie, "id">) => {
    if (selectedMovie) {
      setMovies(movies.map((m) => (m.id === selectedMovie.id ? { ...movieData, id: selectedMovie.id } : m)))
    } else {
      const newMovie: Movie = {
        ...movieData,
        id: Date.now().toString(),
      }
      setMovies([...movies, newMovie])
    }
    setIsDialogOpen(false)
  }

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.cast.some((actor) => actor.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || movie.status === statusFilter
    const matchesGenre = genreFilter === "all" || movie.genre.includes(genreFilter)

    return matchesSearch && matchesStatus && matchesGenre
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
                <h1 className="text-3xl font-bold text-gray-900">Quản lý phim</h1>
                <p className="text-gray-600 mt-1">Quản lý thông tin phim và lịch chiếu</p>
              </div>
            </div>

            <MovieStats movies={movies} />

            <MovieTable
              movies={filteredMovies}
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
              onAdd={handleAddMovie}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              genreFilter={genreFilter}
              onGenreFilterChange={setGenreFilter}
            />

            <MovieDialog
              movie={selectedMovie}
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onSave={handleSaveMovie}
            />
          </div>
        </main>
      </div>

      <AlertDialog open={confirmDialog.isOpen} onOpenChange={(open) => !open && handleCancelDelete()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa phim</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa phim "{confirmDialog.movie?.title}"? Hành động này không thể hoàn tác và sẽ xóa
              tất cả lịch chiếu liên quan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Xóa phim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
