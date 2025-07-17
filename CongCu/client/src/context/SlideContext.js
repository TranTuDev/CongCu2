import { createContext, useState } from 'react';

// Import đúng ảnh từ thư mục assets
import slider1 from '../assets/images/slider1.jpg';
import slider2 from '../assets/images/slider2.jpg';
import slider3 from '../assets/images/slider3.jpg';
import slider4 from '../assets/images/slider4.jpg';

export const SlideContext = createContext();

export const SlideProvider = ({ children }) => {
    const [slides, setSlides] = useState([
        {
            image: slider1,
        },
        {
            image: slider2,

        },
        {
            image: slider3,
        },
        {
            image: slider4,
        }
    ]);

    return (
        <SlideContext.Provider value={{ slides, setSlides }}>
            {children}
        </SlideContext.Provider>
    );
};
