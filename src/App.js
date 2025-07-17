import logo from './logo.svg';
import './App.css';
import Home from './home/Home';
import { Route, Router, Routes } from 'react-router-dom';
import Chi_tiet_phim from './chi-tiet-phim/Chi_tiet_phim';
import Qr from './qr/Qr.jsx';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/movie/:id" element={<Chi_tiet_phim/>}/>
      <Route path="/pay" element={<Qr/>}/>
    </Routes>
    </div>
  );
}

export default App;
