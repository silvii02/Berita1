import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import Login from './components/auth/Login';
import Passwordreset from './components/auth/Passwordreset';
import About from './page/About';
import Header from './components/Header';
import Slider from './components/Slider';
import Footer from './components/Footer';
import Search from './components/Search';
import CategoryDropdown from './components/CategoryDropdown';
import ArticleList from './components/ArticleList';
import ArticleDetail from './page/ArticleDetail';
import Contact from './page/Contact';
import CreateArticle from './page/CreateArticle';
import Dashboard from './dashboard/dashboard';
import EditArticle from './dashboard/edit-article';
import PrivateRoute from './components/auth/PrivateRoute';
import SearchResults from '../src/page/SearchResults';
import './App.css';

function Home() {
  return (
    <div className="App">
      <div>
        < Header />
        < Slider />
        < ArticleList />
        < Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
     <div className="App" >
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Passwordreset" element={<Passwordreset />} />
          <Route path="/about" element={<About />} />
          <Route path="/artikellist" element={<ArticleList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/categorydropdown" element={<CategoryDropdown />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/articles/:id/:slug" element={<ArticleDetail />} />
          
        

        <Route element={<PrivateRoute />}>
        { <Route path="/create-article" element={<CreateArticle />} /> }
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-article/:id" element={<EditArticle />} />
        </Route>
        </Routes>
      </div>
  </Router>
  )
}

export default App;
