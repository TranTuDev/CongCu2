import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    MapPin,
    CreditCard,
    Download,
    Search,
    Filter,
    Eye,
    Star
} from 'lucide-react';
import './BookingHistory.css';

const BookingHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Dữ liệu lịch sử đặt vé
    const bookingHistory = [
        {
            id: 'BK001',
            movieTitle: 'Avatar: The Way of Water',
            poster: '/api/placeholder/80/120',
            showtime: '2024-12-15 19:30',
            theater: 'CGV Vincom Center',
            hall: 'Hall 3',
            seats: ['G7', 'G8'],
            totalAmount: 180000,
            status: 'completed',
            bookingDate: '2024-12-10',
            rating: 4.5,
            paymentMethod: 'Credit Card',
            transactionId: 'TXN12345'
        },
        {
            id: 'BK002',
            movieTitle: 'Black Panther: Wakanda Forever',
            poster: '/api/placeholder/80/120',
            showtime: '2024-12-20 21:00',
            theater: 'Lotte Cinema Nam Định',
            hall: 'Hall 1',
            seats: ['F5', 'F6', 'F7'],
            totalAmount: 270000,
            status: 'upcoming',
            bookingDate: '2024-12-12',
            rating: null,
            paymentMethod: 'MoMo',
            transactionId: 'TXN12346'
        },
        {
            id: 'BK003',
            movieTitle: 'Top Gun: Maverick',
            poster: '/api/placeholder/80/120',
            showtime: '2024-11-25 16:45',
            theater: 'Galaxy Cinema Nguyễn Du',
            hall: 'Hall 2',
            seats: ['H10', 'H11'],
            totalAmount: 200000,
            status: 'completed',
            bookingDate: '2024-11-20',
            rating: 5.0,
            paymentMethod: 'ZaloPay',
            transactionId: 'TXN12347'
        },
        {
            id: 'BK004',
            movieTitle: 'Spider-Man: No Way Home',
            poster: '/api/placeholder/80/120',
            showtime: '2024-11-15 14:30',
            theater: 'BHD Star Bitexco',
            hall: 'Hall 5',
            seats: ['D3', 'D4'],
            totalAmount: 160000,
            status: 'cancelled',
            bookingDate: '2024-11-10',
            rating: null,
            paymentMethod: 'Banking',
            transactionId: 'TXN12348'
        },
        {
            id: 'BK005',
            movieTitle: 'The Batman',
            poster: '/api/placeholder/80/120',
            showtime: '2024-10-30 20:15',
            theater: 'CGV Aeon Mall',
            hall: 'Hall 4',
            seats: ['E8', 'E9'],
            totalAmount: 190000,
            status: 'completed',
            bookingDate: '2024-10-25',
            rating: 4.0,
            paymentMethod: 'Credit Card',
            transactionId: 'TXN12349'
        }
    ];

    // Lọc và sắp xếp dữ liệu
    const filteredBookings = bookingHistory
        .filter(booking => {
            const matchesSearch = booking.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.theater.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.bookingDate) - new Date(a.bookingDate);
            } else if (sortBy === 'oldest') {
                return new Date(a.bookingDate) - new Date(b.bookingDate);
            } else if (sortBy === 'amount') {
                return b.totalAmount - a.totalAmount;
            }
            return 0;
        });

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#22c55e';
            case 'upcoming': return '#3b82f6';
            case 'cancelled': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Đã xem';
            case 'upcoming': return 'Sắp chiếu';
            case 'cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderStars = (rating) => {
        if (!rating) return null;

        return (
            <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                    <Star
                        key={star}
                        size={14}
                        className={star <= rating ? 'star-filled' : 'star-empty'}
                    />
                ))}
                <span className="rating-text">({rating})</span>
            </div>
        );
    };

    return (
        <div className="booking-history">
            <div className="booking-history-header">
                <h1>Lịch Sử Đặt Vé</h1>
                <p>Quản lý và theo dõi các đơn đặt vé của bạn</p>
            </div>

            {/* Thanh tìm kiếm và lọc */}
            <div className="booking-controls">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên phim hoặc rạp..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-controls">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="completed">Đã xem</option>
                        <option value="upcoming">Sắp chiếu</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="oldest">Cũ nhất</option>
                        <option value="amount">Giá cao nhất</option>
                    </select>
                </div>
            </div>

            {/* Danh sách lịch sử đặt vé */}
            <div className="booking-list">
                {filteredBookings.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🎬</div>
                        <h3>Không tìm thấy vé nào</h3>
                        <p>Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
                    </div>
                ) : (
                    filteredBookings.map(booking => (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-poster">
                                <img
                                    src={booking.poster}
                                    alt={booking.movieTitle}
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgODAgMTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yOCA0NEg1MlY1Nkg0NFY2OEg1MlY4MEgyOFY2OEgzNlY1NkgyOFY0NFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+';
                                    }}
                                />
                            </div>

                            <div className="booking-details">
                                <div className="booking-main-info">
                                    <h3 className="movie-title">{booking.movieTitle}</h3>

                                    <div className="booking-status">
                                        <span
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(booking.status) }}
                                        >
                                            {getStatusText(booking.status)}
                                        </span>
                                        {booking.rating && renderStars(booking.rating)}
                                    </div>
                                </div>

                                <div className="booking-info-grid">
                                    <div className="info-item">
                                        <Calendar size={16} />
                                        <span>{formatDate(booking.showtime)}</span>
                                    </div>

                                    <div className="info-item">
                                        <Clock size={16} />
                                        <span>{formatTime(booking.showtime)}</span>
                                    </div>

                                    <div className="info-item">
                                        <MapPin size={16} />
                                        <span>{booking.theater} - {booking.hall}</span>
                                    </div>

                                    <div className="info-item">
                                        <span className="seat-icon">🎫</span>
                                        <span>Ghế: {booking.seats.join(', ')}</span>
                                    </div>

                                    <div className="info-item">
                                        <CreditCard size={16} />
                                        <span>{booking.paymentMethod}</span>
                                    </div>

                                    <div className="info-item">
                                        <span className="amount">{formatCurrency(booking.totalAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="booking-actions">
                                <button className="action-btn view-btn">
                                    <Eye size={16} />
                                    Chi tiết
                                </button>

                                {booking.status === 'completed' && (
                                    <button className="action-btn download-btn">
                                        <Download size={16} />
                                        Tải vé
                                    </button>
                                )}

                                <div className="booking-id">
                                    ID: {booking.id}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Thống kê tóm tắt */}
            <div className="booking-summary">
                <div className="summary-card">
                    <h4>Tổng số vé đã đặt</h4>
                    <span className="summary-number">{bookingHistory.length}</span>
                </div>

                <div className="summary-card">
                    <h4>Tổng chi tiêu</h4>
                    <span className="summary-number">
                        {formatCurrency(bookingHistory.reduce((sum, booking) =>
                            booking.status !== 'cancelled' ? sum + booking.totalAmount : sum, 0
                        ))}
                    </span>
                </div>

                <div className="summary-card">
                    <h4>Phim đã xem</h4>
                    <span className="summary-number">
                        {bookingHistory.filter(b => b.status === 'completed').length}
                    </span>
                </div>

                <div className="summary-card">
                    <h4>Vé sắp chiếu</h4>
                    <span className="summary-number">
                        {bookingHistory.filter(b => b.status === 'upcoming').length}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BookingHistory;
