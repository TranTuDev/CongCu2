import './App.css';
import TrangChu from './TrangChu/tu';
import Statistics from './Admin/Statictcs/statistics';
import BookingHistory from './TrangChu/BookingHistory/BookingHistory';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/booking-history" element={<BookingHistory />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
