import React from 'react';

const Footer = () => {
    return (
        <footer id='main-footer' onClick={() => window.location.href = '/'}>
            <img className='footer-logo' src='https://res.cloudinary.com/dzkrz6yzs/image/upload/v1712689723/i7aoytljyzrxnxngk2r3.png' alt='Logo' />
            <span>Conheça mais restaurantes com o <span className='menumaster-span'>Menu Master</span></span>
            <span><span className='copyright'>©️</span> 2024</span>
        </footer>
    );
};

export default Footer;