import React from 'react';
import { FaInstagram, FaFacebookMessenger, FaYoutube, FaTiktok } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import '../assets/css/style.css';

const CategoryDropdown = ({ onClose }) => { // Tambahkan props onClose
  return (
    <div className="menu">
      <div className="header">
      <img className="headerImage" src="/image/logo.jpg" alt="Logo" />
        
        <AiOutlineClose size={24} className="close-icon" onClick={onClose} />
      </div>
      <div className="menu-lists">
        <ul className="menu-list">
          <li>Terkini</li>
          <li>Populer</li>
          <li>Hiburan</li>
          <li>Politik</li>
          <li>Edukasi</li>
          <li>Kesehatan</li>
          <li>Internasional</li>
        </ul>
        <ul className="menu-list">
          <li>Bola</li>
          <li>Otomotif</li>
          <li>Travel</li>
          <li>Video</li>
          <li>About Us</li>
          <li>Help</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="social-media-icons">
      <a href="https://www.instagram.com/nrintnslvnn?igsh=MTQ3bjExdXc4dzNsMQ==" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookMessenger size={24} />
        </a>
        <a href="https://youtube.com/@nurintan2296?si=r4jBFQUIVn61fflt" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={24} />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <FaTiktok size={24} />
        </a>
      </div>
    </div>
  );
};

export default CategoryDropdown;
