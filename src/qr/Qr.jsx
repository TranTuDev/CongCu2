import React from 'react';
import PropTypes from 'prop-types';
// import './Qr.scss';
import ImgQr from './Ảnh chụp màn hình 2025-07-17 074834.png';

Qr.propTypes = {
    
};

function Qr(props) {
    return (
        <div className='qr'>
            <h2>Hãy quét mã QR</h2>
            <img src={ImgQr} alt="" />
            <p>TTK: Nguyễn Hoàng Huy</p>
            <p>STK: 1029727969</p>
            <p>Vietcombank</p>
        </div>
    );
}

export default Qr;