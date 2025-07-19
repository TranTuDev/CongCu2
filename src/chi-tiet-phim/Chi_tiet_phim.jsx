import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import "./Chi_tiet.scss";
Chi_tiet_phim.propTypes = {};

function Chi_tiet_phim(props) {
  const id = useParams();
  const fullMoviesData = [
    {
      id: 1,
      title: "Nhà Bà Nữ",
      image:
        "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2023/5/15/nha-ba-nu-16841439622621923991295.jpeg",
      description:
        "Một câu chuyện gia đình với mâu thuẫn giữa các thế hệ, tập trung vào người mẹ đơn thân và cô con gái nổi loạn.",
      director: "Trấn Thành",
      year: 2023,
      genre: "Tâm lý, Hài",
      duration: 120,
    },
    {
      id: 2,
      title: "Đất Rừng Phương Nam",
      image: "https://i.imgur.com/OgGI7YS.jpg",
      description:
        "Chuyển thể từ tiểu thuyết nổi tiếng cùng tên, kể về hành trình phiêu lưu của cậu bé An trong rừng U Minh.",
      director: "Nguyễn Quang Dũng",
      year: 2023,
      genre: "Phiêu lưu, Gia đình",
      duration: 115,
    },
    {
      id: 3,
      title: "Trạng Quỳnh",
      image:
        "https://d1j8r0kxyu9tj8.cloudfront.net/images/1566809317niNpzY2khA3tzMg.jpg",
      description:
        "Trạng Quỳnh lên kinh ứng thí, nhưng gặp nhiều rắc rối dở khóc dở cười và phải dùng mưu mẹo để vượt qua.",
      director: "Đức Thịnh",
      year: 2019,
      genre: "Hài hước, Dân gian",
      duration: 110,
    },
    {
      id: 4,
      title: "Tấm Cám",
      image:
        "https://afamilycdn.com/150157425591193600/2024/8/8/batch1-tam-camcharacter-poster-17230931183721225916918-1723107849756-17231078548101089014597-1723108987612-172310898877047010926.png",
      description:
        'Phiên bản hiện đại hóa của câu chuyện cổ tích "Tấm Cám", pha trộn hành động và giả tưởng.',
      director: "Ngô Thanh Vân",
      year: 2016,
      genre: "Cổ tích, Hành động",
      duration: 112,
    },
    {
      id: 5,
      title: "Hai Muối",
      image:
        "http://sandien24h.vn/uploads/images/HAI-MUOI-TUNG-POSTER%20(6).jpg",
      description:
        "Bộ phim hài về hai người bạn già cùng chia sẻ những trải nghiệm và ký ức hài hước cuối đời.",
      director: "Lê Hoàng",
      year: 2024,
      genre: "Hài, Tâm lý",
      duration: 100,
    },
    {
      id: 6,
      title: "Bố Già",
      image: "https://vnp.1cdn.vn/2023/03/15/h1_qish.jpeg",
      description:
        "Bộ phim về tình cảm cha con trong một gia đình lao động, gợi cảm xúc mạnh mẽ và nhiều thông điệp nhân văn.",
      director: "Trấn Thành",
      year: 2021,
      genre: "Tâm lý, Gia đình",
      duration: 128,
    },
  ];
  const Province = [
    { id: 1, name: "Hồ Chí Minh" },
    { id: 2, name: "Hà Nội" },
    { id: 3, name: "Đà Nẵng" },
  ];
  const Theater = [
    { id: 1, name: "CGV Nguyễn Trãi", provinceId: 1 },
    { id: 2, name: "Lotte Mart Quận 7", provinceId: 1 },
    { id: 3, name: "CGV Royal City", provinceId: 2 },
  ];
  const showtimes = [
    {
      id: 1,
      movieId: 1,
      theaterId: 1,
      date: "2025-07-17",
      times: ["09:00", "13:30", "18:00"],
    },
    {
      id: 2,
      movieId: 2,
      theaterId: 1,
      date: "2025-07-17",
      times: ["10:00", "16:00", "20:00"],
    },
    {
      id: 3,
      movieId: 3,
      theaterId: 2,
      date: "2025-07-17",
      times: ["08:30", "14:00", "19:30"],
    },
    {
      id: 4,
      movieId: 4,
      theaterId: 2,
      date: "2025-07-17",
      times: ["11:00", "15:30", "21:00"],
    },
    {
      id: 5,
      movieId: 5,
      theaterId: 3,
      date: "2025-07-17",
      times: ["09:30", "12:00", "17:00"],
    },
    {
      id: 6,
      movieId: 6,
      theaterId: 3,
      date: "2025-07-17",
      times: ["07:00", "13:00", "18:30"],
    },
  ];
  const seats = [
    {
      showtimeId: 1,
      time: "09:00",
      seats: [
        { code: "A1", status: "available" },
        { code: "A2", status: "booked" },
        { code: "A3", status: "available" },
        { code: "A4", status: "broken" },
        { code: "A5", status: "available" },
        { code: "A6", status: "available" },
        { code: "A7", status: "available" },
        { code: "A8", status: "available" },
        { code: "A9", status: "available" },
        { code: "A10", status: "available" },
        { code: "B1", status: "available" },
        { code: "B2", status: "available" },
        { code: "B3", status: "available" },
        { code: "B4", status: "available" },
        { code: "B5", status: "available" },
        { code: "B6", status: "available" },
        { code: "B7", status: "available" },
        { code: "B8", status: "available" },
        { code: "B9", status: "available" },
        { code: "B10", status: "available" },
        { code: "C1", status: "available" },
        { code: "C2", status: "available" },
        { code: "C3", status: "available" },
        { code: "C4", status: "available" },
        { code: "C5", status: "available" },
        { code: "C6", status: "available" },
        { code: "C7", status: "available" },
        { code: "C8", status: "available" },
        { code: "C9", status: "available" },
        { code: "C10", status: "available" },
        { code: "D1", status: "available" },
        { code: "D2", status: "available" },
        { code: "D3", status: "available" },
        { code: "D4", status: "available" },
        { code: "D5", status: "available" },
        { code: "D6", status: "available" },
        { code: "D7", status: "available" },
        { code: "D8", status: "available" },
        { code: "D9", status: "available" },
        { code: "D10", status: "available" },
        { code: "E1", status: "available" },
        { code: "E2", status: "available" },
        { code: "E3", status: "available" },
        { code: "E4", status: "available" },
        { code: "E5", status: "available" },
        { code: "E6", status: "available" },
        { code: "E7", status: "available" },
        { code: "E8", status: "available" },
        { code: "E9", status: "available" },
        { code: "E10", status: "available" },
        { code: "F1", status: "available" },
        { code: "F2", status: "available" },
        { code: "F3", status: "available" },
        { code: "F4", status: "available" },
        { code: "F5", status: "available" },
        { code: "F6", status: "available" },
        { code: "F7", status: "available" },
        { code: "F8", status: "available" },
        { code: "F9", status: "available" },
        { code: "F10", status: "available" },
        { code: "G1", status: "available" },
        { code: "G2", status: "available" },
        { code: "G3", status: "available" },
        { code: "G4", status: "available" },
        { code: "G5", status: "available" },
        { code: "G6", status: "available" },
        { code: "G7", status: "available" },
        { code: "G8", status: "available" },
        { code: "G9", status: "available" },
        { code: "G10", status: "available" },
      ],
    },
    {
      showtimeId: 2,
      time: "10:00",
      seats: [
        { code: "A1", status: "available" },
        { code: "A2", status: "booked" },
        { code: "A3", status: "available" },
        { code: "A4", status: "broken" },
        { code: "A5", status: "available" },
        { code: "A6", status: "available" },
        { code: "A7", status: "available" },
        { code: "A8", status: "available" },
        { code: "A9", status: "available" },
        { code: "A10", status: "available" },
        { code: "B1", status: "available" },
        { code: "B2", status: "available" },
        { code: "B3", status: "available" },
        { code: "B4", status: "available" },
        { code: "B5", status: "available" },
        { code: "B6", status: "available" },
        { code: "B7", status: "available" },
        { code: "B8", status: "available" },
        { code: "B9", status: "available" },
        { code: "B10", status: "available" },
        { code: "C1", status: "available" },
        { code: "C2", status: "available" },
        { code: "C3", status: "available" },
        { code: "C4", status: "available" },
        { code: "C5", status: "available" },
        { code: "C6", status: "available" },
        { code: "C7", status: "available" },
        { code: "C8", status: "available" },
        { code: "C9", status: "available" },
        { code: "C10", status: "available" },
        { code: "D1", status: "available" },
        { code: "D2", status: "available" },
        { code: "D3", status: "available" },
        { code: "D4", status: "available" },
        { code: "D5", status: "available" },
        { code: "D6", status: "available" },
        { code: "D7", status: "available" },
        { code: "D8", status: "available" },
        { code: "D9", status: "available" },
        { code: "D10", status: "available" },
        { code: "E1", status: "available" },
        { code: "E2", status: "available" },
        { code: "E3", status: "available" },
        { code: "E4", status: "available" },
        { code: "E5", status: "available" },
        { code: "E6", status: "available" },
        { code: "E7", status: "available" },
        { code: "E8", status: "available" },
        { code: "E9", status: "available" },
        { code: "E10", status: "available" },
        { code: "F1", status: "available" },
        { code: "F2", status: "available" },
        { code: "F3", status: "available" },
        { code: "F4", status: "available" },
        { code: "F5", status: "available" },
        { code: "F6", status: "available" },
        { code: "F7", status: "available" },
        { code: "F8", status: "available" },
        { code: "F9", status: "available" },
        { code: "F10", status: "available" },
        { code: "G1", status: "available" },
        { code: "G2", status: "available" },
        { code: "G3", status: "available" },
        { code: "G4", status: "available" },
        { code: "G5", status: "available" },
        { code: "G6", status: "available" },
        { code: "G7", status: "available" },
        { code: "G8", status: "available" },
        { code: "G9", status: "available" },
        { code: "G10", status: "available" },
      ],
    },
    {
      showtimeId: 3,
      time: "08:30",
      seats: [
        { code: "A1", status: "available" },
        { code: "A2", status: "booked" },
        { code: "A3", status: "available" },
        { code: "A4", status: "broken" },
        { code: "A5", status: "available" },
        { code: "A6", status: "available" },
        { code: "A7", status: "available" },
        { code: "A8", status: "available" },
        { code: "A9", status: "available" },
        { code: "A10", status: "available" },
        { code: "B1", status: "available" },
        { code: "B2", status: "available" },
        { code: "B3", status: "available" },
        { code: "B4", status: "available" },
        { code: "B5", status: "available" },
        { code: "B6", status: "available" },
        { code: "B7", status: "available" },
        { code: "B8", status: "available" },
        { code: "B9", status: "available" },
        { code: "B10", status: "available" },
        { code: "C1", status: "available" },
        { code: "C2", status: "available" },
        { code: "C3", status: "available" },
        { code: "C4", status: "available" },
        { code: "C5", status: "available" },
        { code: "C6", status: "available" },
        { code: "C7", status: "available" },
        { code: "C8", status: "available" },
        { code: "C9", status: "available" },
        { code: "C10", status: "available" },
        { code: "D1", status: "available" },
        { code: "D2", status: "available" },
        { code: "D3", status: "available" },
        { code: "D4", status: "available" },
        { code: "D5", status: "available" },
        { code: "D6", status: "available" },
        { code: "D7", status: "available" },
        { code: "D8", status: "available" },
        { code: "D9", status: "available" },
        { code: "D10", status: "available" },
        { code: "E1", status: "available" },
        { code: "E2", status: "available" },
        { code: "E3", status: "available" },
        { code: "E4", status: "available" },
        { code: "E5", status: "available" },
        { code: "E6", status: "available" },
        { code: "E7", status: "available" },
        { code: "E8", status: "available" },
        { code: "E9", status: "available" },
        { code: "E10", status: "available" },
        { code: "F1", status: "available" },
        { code: "F2", status: "available" },
        { code: "F3", status: "available" },
        { code: "F4", status: "available" },
        { code: "F5", status: "available" },
        { code: "F6", status: "available" },
        { code: "F7", status: "available" },
        { code: "F8", status: "available" },
        { code: "F9", status: "available" },
        { code: "F10", status: "available" },
        { code: "G1", status: "available" },
        { code: "G2", status: "available" },
        { code: "G3", status: "available" },
        { code: "G4", status: "available" },
        { code: "G5", status: "available" },
        { code: "G6", status: "available" },
        { code: "G7", status: "available" },
        { code: "G8", status: "available" },
        { code: "G9", status: "available" },
        { code: "G10", status: "available" },
      ],
    },
    {
      showtimeId: 4,
      time: "11:00",
      seats: [
        { code: "A1", status: "available" },
        { code: "A2", status: "booked" },
        { code: "A3", status: "available" },
        { code: "A4", status: "broken" },
        { code: "A5", status: "available" },
        { code: "A6", status: "available" },
        { code: "A7", status: "available" },
        { code: "A8", status: "available" },
        { code: "A9", status: "available" },
        { code: "A10", status: "available" },
        { code: "B1", status: "available" },
        { code: "B2", status: "available" },
        { code: "B3", status: "available" },
        { code: "B4", status: "available" },
        { code: "B5", status: "available" },
        { code: "B6", status: "available" },
        { code: "B7", status: "available" },
        { code: "B8", status: "available" },
        { code: "B9", status: "available" },
        { code: "B10", status: "available" },
        { code: "C1", status: "available" },
        { code: "C2", status: "available" },
        { code: "C3", status: "available" },
        { code: "C4", status: "available" },
        { code: "C5", status: "available" },
        { code: "C6", status: "available" },
        { code: "C7", status: "available" },
        { code: "C8", status: "available" },
        { code: "C9", status: "available" },
        { code: "C10", status: "available" },
        { code: "D1", status: "available" },
        { code: "D2", status: "available" },
        { code: "D3", status: "available" },
        { code: "D4", status: "available" },
        { code: "D5", status: "available" },
        { code: "D6", status: "available" },
        { code: "D7", status: "available" },
        { code: "D8", status: "available" },
        { code: "D9", status: "available" },
        { code: "D10", status: "available" },
        { code: "E1", status: "available" },
        { code: "E2", status: "available" },
        { code: "E3", status: "available" },
        { code: "E4", status: "available" },
        { code: "E5", status: "available" },
        { code: "E6", status: "available" },
        { code: "E7", status: "available" },
        { code: "E8", status: "available" },
        { code: "E9", status: "available" },
        { code: "E10", status: "available" },
        { code: "F1", status: "available" },
        { code: "F2", status: "available" },
        { code: "F3", status: "available" },
        { code: "F4", status: "available" },
        { code: "F5", status: "available" },
        { code: "F6", status: "available" },
        { code: "F7", status: "available" },
        { code: "F8", status: "available" },
        { code: "F9", status: "available" },
        { code: "F10", status: "available" },
        { code: "G1", status: "available" },
        { code: "G2", status: "available" },
        { code: "G3", status: "available" },
        { code: "G4", status: "available" },
        { code: "G5", status: "available" },
        { code: "G6", status: "available" },
        { code: "G7", status: "available" },
        { code: "G8", status: "available" },
        { code: "G9", status: "available" },
        { code: "G10", status: "available" },
      ],
    },
    {
      showtimeId: 5,
      time: "09:30",
      seats: [
        { code: "A1", status: "available" },
        { code: "A2", status: "booked" },
        { code: "A3", status: "available" },
        { code: "A4", status: "broken" },
        { code: "A5", status: "available" },
        { code: "A6", status: "available" },
        { code: "A7", status: "available" },
        { code: "A8", status: "available" },
        { code: "A9", status: "available" },
        { code: "A10", status: "available" },
        { code: "B1", status: "available" },
        { code: "B2", status: "available" },
        { code: "B3", status: "available" },
        { code: "B4", status: "available" },
        { code: "B5", status: "available" },
        { code: "B6", status: "available" },
        { code: "B7", status: "available" },
        { code: "B8", status: "available" },
        { code: "B9", status: "available" },
        { code: "B10", status: "available" },
        { code: "C1", status: "available" },
        { code: "C2", status: "available" },
        { code: "C3", status: "available" },
        { code: "C4", status: "available" },
        { code: "C5", status: "available" },
        { code: "C6", status: "available" },
        { code: "C7", status: "available" },
        { code: "C8", status: "available" },
        { code: "C9", status: "available" },
        { code: "C10", status: "available" },
        { code: "D1", status: "available" },
        { code: "D2", status: "available" },
        { code: "D3", status: "available" },
        { code: "D4", status: "available" },
        { code: "D5", status: "available" },
        { code: "D6", status: "available" },
        { code: "D7", status: "available" },
        { code: "D8", status: "available" },
        { code: "D9", status: "available" },
        { code: "D10", status: "available" },
        { code: "E1", status: "available" },
        { code: "E2", status: "available" },
        { code: "E3", status: "available" },
        { code: "E4", status: "available" },
        { code: "E5", status: "available" },
        { code: "E6", status: "available" },
        { code: "E7", status: "available" },
        { code: "E8", status: "available" },
        { code: "E9", status: "available" },
        { code: "E10", status: "available" },
        { code: "F1", status: "available" },
        { code: "F2", status: "available" },
        { code: "F3", status: "available" },
        { code: "F4", status: "available" },
        { code: "F5", status: "available" },
        { code: "F6", status: "available" },
        { code: "F7", status: "available" },
        { code: "F8", status: "available" },
        { code: "F9", status: "available" },
        { code: "F10", status: "available" },
        { code: "G1", status: "available" },
        { code: "G2", status: "available" },
        { code: "G3", status: "available" },
        { code: "G4", status: "available" },
        { code: "G5", status: "available" },
        { code: "G6", status: "available" },
        { code: "G7", status: "available" },
        { code: "G8", status: "available" },
        { code: "G9", status: "available" },
        { code: "G10", status: "available" },
      ],
    },
    {
      showtimeId: 6,
      time: "07:00",
      seats: [
        { code: "A1", status: "available" },
        { code: "A2", status: "booked" },
        { code: "A3", status: "available" },
        { code: "A4", status: "broken" },
        { code: "A5", status: "available" },
        { code: "A6", status: "available" },
        { code: "A7", status: "available" },
        { code: "A8", status: "available" },
        { code: "A9", status: "available" },
        { code: "A10", status: "available" },
        { code: "B1", status: "available" },
        { code: "B2", status: "available" },
        { code: "B3", status: "available" },
        { code: "B4", status: "available" },
        { code: "B5", status: "available" },
        { code: "B6", status: "available" },
        { code: "B7", status: "available" },
        { code: "B8", status: "available" },
        { code: "B9", status: "available" },
        { code: "B10", status: "available" },
        { code: "C1", status: "available" },
        { code: "C2", status: "available" },
        { code: "C3", status: "available" },
        { code: "C4", status: "available" },
        { code: "C5", status: "available" },
        { code: "C6", status: "available" },
        { code: "C7", status: "available" },
        { code: "C8", status: "available" },
        { code: "C9", status: "available" },
        { code: "C10", status: "available" },
        { code: "D1", status: "available" },
        { code: "D2", status: "available" },
        { code: "D3", status: "available" },
        { code: "D4", status: "available" },
        { code: "D5", status: "available" },
        { code: "D6", status: "available" },
        { code: "D7", status: "available" },
        { code: "D8", status: "available" },
        { code: "D9", status: "available" },
        { code: "D10", status: "available" },
        { code: "E1", status: "available" },
        { code: "E2", status: "available" },
        { code: "E3", status: "available" },
        { code: "E4", status: "available" },
        { code: "E5", status: "available" },
        { code: "E6", status: "available" },
        { code: "E7", status: "available" },
        { code: "E8", status: "available" },
        { code: "E9", status: "available" },
        { code: "E10", status: "available" },
        { code: "F1", status: "available" },
        { code: "F2", status: "available" },
        { code: "F3", status: "available" },
        { code: "F4", status: "available" },
        { code: "F5", status: "available" },
        { code: "F6", status: "available" },
        { code: "F7", status: "available" },
        { code: "F8", status: "available" },
        { code: "F9", status: "available" },
        { code: "F10", status: "available" },
        { code: "G1", status: "available" },
        { code: "G2", status: "available" },
        { code: "G3", status: "available" },
        { code: "G4", status: "available" },
        { code: "G5", status: "available" },
        { code: "G6", status: "available" },
        { code: "G7", status: "available" },
        { code: "G8", status: "available" },
        { code: "G9", status: "available" },
        { code: "G10", status: "available" },
      ],
    },
  ];
  const bills = [
    {
      userId: 101,
      movieId: 1,
      showtimeId: 1,
      theater: "CGV Nguyễn Trãi",
      room: "1",
      time: "09:00",
      seats: ["A2"],
      total: 90000,
    },
    {
      userId: 102,
      movieId: 2,
      showtimeId: 2,
      theater: "CGV Nguyễn Trãi",
      room: "3",
      time: "10:00",
      seats: ["B2"],
      total: 90000,
    },
    {
      userId: 103,
      movieId: 3,
      showtimeId: 3,
      theater: "Lotte Mart Quận 7",
      room: "2",
      time: "08:30",
      seats: ["C1", "C2"],
      total: 180000,
    },
    {
      userId: 104,
      movieId: 4,
      showtimeId: 4,
      theater: "Lotte Mart Quận 7",
      room: "4",
      time: "11:00",
      seats: ["D3"],
      total: 90000,
    },
    {
      userId: 105,
      movieId: 5,
      showtimeId: 5,
      theater: "CGV Royal City",
      room: "2",
      time: "09:30",
      seats: ["E2"],
      total: 90000,
    },
    {
      userId: 106,
      movieId: 6,
      showtimeId: 6,
      theater: "CGV Royal City",
      room: "1",
      time: "07:00",
      seats: ["F1", "F2"],
      total: 180000,
    },
  ];
  const [data, setData] = useState([]);
  const [item, setItem] = useState({
    province_id: "",
    theater_id: "",
    chon_ngay: "",
  });
  const [dataTheater, setDataTheater] = useState([]);
  const [dataShowtime, setDataShowtime] = useState([]);
  const [dataSeat, setDataSeat] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]); // ✅ list ghế được chọn
  const [theaterName, setTheaterName] = useState(""); // ✅ rạp chọn
  const [seatPay, setSeatPay] = useState(false); // ✅ hiển thị danh sách ghée chọn
  // Lấy movie
  useEffect(() => {
    if (!fullMoviesData || fullMoviesData.length === 0 || !id) {
      console.log("khong co du lieu", fullMoviesData, id);
      return;
    }
    const selectedMovie = fullMoviesData.find(
      (movie) => movie.id === Number(id.id)
    );
    if (selectedMovie) {
      setData([selectedMovie]);
    }
  }, [id]);

  // Lấy rạp theo tỉnh
  useEffect(() => {
    if (item.province_id) {
      setDataTheater(
        Theater.filter(
          (theater) => theater.provinceId === parseInt(item.province_id)
        )
      );
    }
  }, [item.province_id]);

  // Lấy lịch chiếu theo phim + rạp
  useEffect(() => {
    if (id && item.theater_id) {
      setDataShowtime(
        showtimes.filter(
          (showtime) =>
            showtime.movieId === Number(id.id) &&
            showtime.theaterId === parseInt(item.theater_id) &&
            showtime.date === selectedDate
        )
      );
    }
  }, [id, item.theater_id, selectedDate]);
// lấy tên rạp theo id rạp
  useEffect(() => {
    if (item.theater_id) {
      const selectedTheater = Theater.find(
        (theater) => theater.id === parseInt(item.theater_id)
      );
      if (selectedTheater) {

        setTheaterName(selectedTheater.name);
      }
    }
  }, [item.theater_id]);
  // Lấy ghế nếu chọn ngày
  useEffect(() => {
    if (item.chon_ngay) {
      const selectedShowtime = dataShowtime.find(
        (showtime) => showtime.date === item.chon_ngay
      );
      if (selectedShowtime) {
        setDataSeat(
          seats.filter(
            (seat) =>
              seat.showtimeId === selectedShowtime.id &&
              seat.time === selectedTime
          )
        );
      }
    }
  }, [selectedTime, dataShowtime]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "chon_ngay") {
      setSelectedDate(value);
    }
    setItem({
      ...item,
      [name]: value,
    });
  };
  const [total, setTotal] = useState(0);
  const handleSelect = (seat) => {
    const active = seat.status === "available";
    if (!active) return; // không cho chọn ghế đã được đặt

    if (selectedSeats.includes(seat.code)) {
      // bỏ chọn nếu đã chọn rồi
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.code));
      if(total>0){
        setTotal((prev) => prev - 50000); // trừ tiền
      }
    } else {
      // thêm vào danh sách chọn
      setSelectedSeats([...selectedSeats, seat.code]);
      setTotal((prev) => prev + 50000); // cộng tiền
    }
  };
  const handleSeatPay=()=>{
    setSeatPay(true);
  }
  const handleTimeClick = (time) => {
    setItem((prev) => ({
      ...prev,
      time: time,
    }));
    setSelectedTime(time);
  };
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const date = dayjs().add(i, "day");
      days.push({
        id: i,
        date: date.format("YYYY-MM-DD"),
        display: date.format("ddd DD/MM"),
      });
    }
    return days;
  };
  const natige=useNavigate();
  const dates = getNext7Days();
  const handlePay = () => {
    natige("/pay");
  }
  return (
    <div className="ticket_movie">
      <div className="content">nội dung phim</div>
      {data.map((movie) => (
        <div className="movie_item" key={movie.id}>
          <div className="image">
            <img src={movie.image} alt={movie.title} title={movie.title} />
          </div>
          <div className="description">
            <table>
              <tr>
                <td id="tt">Name:</td>
                <td>{movie.title}</td>
              </tr>
              <tr>
                <td id="tt">duration:</td>
                <td>{movie.duration} phút</td>
              </tr>
              <tr>
                <td id="tt">genre:</td>
                <td>{movie.genre}</td>
              </tr>
              <tr>
                <td id="tt">director:</td>
                <td>{movie.director}</td>
              </tr>
              <tr>
                <td id="tt">description:</td>
                <td>{movie.description}</td>
              </tr>
            </table>
          </div>
        </div>
      ))}
      <div className="select">
        <p>
          <span>* select province (1)</span>
          <select name="province_id" id="" onChange={handleChange}>
            <option value="">province</option>
            {Province.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </p>
        <p>
          {" "}
          <span>* select theater (2)</span>
          <select name="theater_id" id="" onChange={handleChange}>
            <option value="">Select Theater</option>
            {dataTheater.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </p>
      </div>
      <div className="date-picker">
        {dates.map((day) => (
          <label key={day.id} className="date-option">
            <input
              type="radio"
              name="chon_ngay"
              value={day.date}
              checked={selectedDate === day.date}
              onChange={handleChange}
            />
            <span
              className={`date-label ${
                selectedDate === day.date ? "active" : ""
              }`}
            >
              {day.display}
            </span>
          </label>
        ))}
      </div>
      <h3>lịch chiếu</h3>
      <div className="time">
        {dataShowtime.map((showtime) => (
          <div className="box_time_group" key={showtime.showtime_id}>
            {showtime.times.map((time, index) => (
              <div
                className="box_time"
                key={`${showtime.showtime_id}-${index}`}
              >
                <button onClick={() =>{  handleTimeClick(time); handleSeatPay()}}>{time}</button>
              </div>
            ))}
          </div>
        ))}
      </div>
{seatPay===true && <div className="seat_pay">
        <div className="seat">
        <h2>select seat</h2>
        <div className="tv">projector</div>
        <div className="select_seat">
          {dataSeat.map((showtime) =>
            showtime.seats.map((seat, idx) => {
              let className = "box_seat";

              if (selectedSeats.includes(seat.code)) {
                className = "selecting"; // đã chọn
              } else if (seat.status === "booked") {
                className = "selected"; // đang chọn
              } else if (seat.status === "broken") {
                className = "unselected";
              } 

              return (
                <div
                  key={`${seat.code}-${idx}`}
                  className={`box_seat ${className}`}
                  onClick={() => handleSelect(seat)}
                >
                  {seat.code}
                </div>
              );
            })
          )}
        </div>
        <div className="note_seat">
          <h4>note</h4>
          <p>
            <div className="selecting_seat"></div>: selecting
          </p>
          <p>
            <div className="selected_seat"></div>: selected
          </p>
          <p>
            <div className="unselected_seat"></div>: unselected
          </p>
        </div>

      </div>
        <div className="buy">
        <h2>BILL</h2>
        <p>Theater: {theaterName}</p>
        <p>Date: {item.chon_ngay}</p>
        <p id="time">time: {item.time}</p>
        <span>Bill total: {total} VND</span>
        <br />
        <button onClick={handlePay}>pay</button>
        </div>
</div>}

    </div>
  );
}

export default Chi_tiet_phim;
