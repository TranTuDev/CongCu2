import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import LoginRegister from "./pages/register_login/Register_login";
import BannerSlider from "./components/banner/BannerSlider"; // ✅ nhớ import nếu dùng
import { AuthProvider } from "./context/AuthContext";
import { SlideProvider } from "./context/SlideContext";


// 👉 Wrapper để useLocation hoạt động (React Router yêu cầu)
function AppWrapper() {
  return (
    <Router>
      <SlideProvider> {/* ✅ Bọc luôn SlideProvider ở đây */}
        <App />
      </SlideProvider>
    </Router>
  );
}

// 👉 App chính sử dụng useLocation để kiểm tra path
function App() {
  const location = useLocation();

  // ✅ Các route không có Header và Footer (ví dụ như trang riêng biệt, landing, login full-screen)
  const noLayoutRoutes = [""]; // ví dụ: ["/landing"]
  const noFooterRoutes = ["/register_login"]; // chỉ ẩn footer ở trang đăng nhập/đăng ký

  const hideFooter = noFooterRoutes.includes(location.pathname);
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      {/* ✅ Header hiển thị nếu không nằm trong danh sách ẩn layout */}
      {!hideLayout && <Header />}

      <Routes>
        {/* ✅ KHÔNG được để 2 route cùng path "/", sẽ lỗi hoặc cái sau đè cái trước */}
        <Route path="/" element={<><BannerSlider /><Home /></>} />

        {/* Trang login/register */}
        <Route path="/register_login" element={<LoginRegister />} />

        {/* 👉 Thêm route khác nếu có, ví dụ: */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>

      {/* ✅ Footer hiển thị nếu không nằm trong danh sách ẩn footer */}
      {!hideFooter && <Footer />}
    </AuthProvider>
  );
}

export default AppWrapper;
