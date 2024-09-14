import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CategoryDropdown from './CategoryDropdown'; // Import komponen dropdown
import '../assets/css/style.css';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State untuk mengontrol visibilitas dropdown
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Fungsi untuk men-toggle visibilitas dropdown
  };

  const handleUserIconClick = () => {
    navigate('/login'); // Navigasi ke halaman login saat ikon diklik
  };

  return (
    <div className="headerContainer">
      <div className="headerTop">
        <img className="headerImage" src="/image/logo.jpg" alt="Logo" />
        <div className="icon-container">
          <FaSearch className="searchIcon" />
          {/* Tambahkan fungsi onClick untuk navigasi */}
          <FaUserCircle className="userIcon" onClick={handleUserIconClick} />
          <FaBars className="menuIcon" onClick={toggleDropdown} />
        </div>
      </div>

      <nav className="navbar">
        <ul className="navLinks">
          <li><a href="#beranda" className="link">Beranda</a></li>
          <li><a href="#terkini" className="link">Terkini</a></li>
          <li><a href="#trending" className="link">Trending</a></li>
          <li><a href="#terpopuler" className="link">Terpopuler</a></li>
        </ul>
      </nav>

      {/* Tampilkan dropdown jika showDropdown bernilai true */}
      {showDropdown && <CategoryDropdown />}
    </div>
  );
};

export default Header;
