// src/components/Header/Header.jsx
import React from 'react';
import './Header.scss';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // <-- import ảnh

function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="main-header">
            <Link to="/" className="logo">
                <img src={logo} alt="logo" />
            </Link>

            <input type="text" placeholder="Tìm kiếm phim..." className="search" />

            <div className="header-right">
                {user ? (
                    <>
                        <span>👋 {user.name}</span>
                        <Link to="/profile">👤 Quản lý</Link>
                        <button onClick={logout}>Đăng xuất</button>
                    </>
                ) : (
                    <>

                        <Link to="/register_login">
                            <button>Đăng nhập</button></Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
