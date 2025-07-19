import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import './hom.scss';

Movie_view.propTypes = {
    
};

function Movie_view(props) {
    // const navigate = useNavigate();
const data = [
  {
    id: 1,
    image: 'https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2023/5/15/nha-ba-nu-16841439622621923991295.jpeg',
    title: 'Nhà Bà Nữ',
  },
  {
    id: 2,
    image: 'https://i.imgur.com/OgGI7YS.jpg',
    title: 'Đất Rừng Phương Nam',
  },
  {
    id: 3,
    image: 'https://d1j8r0kxyu9tj8.cloudfront.net/images/1566809317niNpzY2khA3tzMg.jpg',
    title: 'Trạng Quỳnh',
  },
  {
    id: 4,
    image: 'https://afamilycdn.com/150157425591193600/2024/8/8/batch1-tam-camcharacter-poster-17230931183721225916918-1723107849756-17231078548101089014597-1723108987612-172310898877047010926.png',
    title: 'Tấm Cám',
  },
  {
    id: 5,
    image: 'http://sandien24h.vn/uploads/images/HAI-MUOI-TUNG-POSTER%20(6).jpg',
    title: 'Hai Muối',
  },
  {
    id: 6,
    image: 'https://vnp.1cdn.vn/2023/03/15/h1_qish.jpeg',
    title: 'Bố Già',
  }
];

    const [use, setUse] = useState([]);
    const natige=useNavigate();
    const handleClick=(id)=>{
        natige(`/movie/${id}`)
    }
    return (
        <div className="movie-view">
            <div className="navbar">
                <h1>Movies</h1>
                <p>đang chiếu</p>
                <p>sắp chiếu</p>
            </div>
            <div className="movie-list">
                {data.map((movie) => (
                    <div  className="movie-item" key={movie.movie_id} onClick={()=>handleClick(movie.id)}>
                        <img src={movie.image} alt={movie.title} title={movie.title} />
                        <button > <FontAwesomeIcon icon={faTicket} className='icon' />ticket</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Movie_view;