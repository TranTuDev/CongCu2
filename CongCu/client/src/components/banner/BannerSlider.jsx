import React, { useEffect, useState, useContext } from 'react';
import './BannerSlider.scss';
import { SlideContext } from '../../context/SlideContext';


const BannerSlider = () => {
  const { slides } = useContext(SlideContext); // lấy danh sách ảnh từ context
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5s đổi slide
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="banner-slider">
      {slides.map((slide, index) => (
        <div
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          key={index}
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} />
          <div className="overlay">{slide.caption}</div>
        </div>
      ))}

      <div className="controls">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
