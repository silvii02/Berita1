import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configUrl from '../configUrl';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    axios.get(`${configUrl.beBaseUrl}/api/articles`)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });

    axios.get(`${configUrl.beBaseUrl}/api/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Tidak ada Category';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `Pada: ${day}-${month}-${year} / ${hours}:${minutes}`;
  };


  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

      // Render untuk tampilan desktop
  const renderDesktopView = () => (
    <div className="article-list">
      {currentArticles.map(article => (
        <div key={article.id} className="article-card-home">
          <div className='category-btn'>{getCategoryName(article.category_id)}</div>
          <span className='title-article'>
            <Link to={`/articles/${article.id}/${encodeURIComponent(article.slug)}`} style={{ textTransform: 'capitalize' }}>
              {article.title}
            </Link>
          </span>
          <p className="article-meta">
            Penulis: {article.author_name}
          </p>
          <div className='body-article'>
            <div className='article-image-wrap'>
              <img 
                src={`${configUrl.beBaseUrl}${article.image_url}`} 
                alt={article.title} 
                className="article-image"
              />
            </div>
            <span style={{textAlign: "justify"}}>{article.body.substring(0, 300)}...
              <div style={{marginTop: "20px", fontSize: "12px", color: "#888"}}>
                {formatDate(article.created_at)}
              </div>
            </span>
          </div>
        </div>
      ))}
      <Pagination 
        articlesPerPage={articlesPerPage} 
        totalArticles={articles.length} 
        paginate={paginate} 
        currentPage={currentPage}
      />
    </div>
  );

  // Render untuk tampilan mobile
      const renderMobileView = () => (
        <div className="article-list-mobile">
          {currentArticles.map(article => (
            <div key={article.id} className="article-card-mobile">
              
              <div className='category-btn-mobile'>{getCategoryName(article.category_id)}</div>
              
              <div className='body-article-mobile'>
                <Link to={`/articles/${article.id}/${encodeURIComponent(article.slug)}`}>
                <div className='article-image-wrap-mobile'>
                  <img 
                    src={`${configUrl.beBaseUrl}${article.image_url}`} 
                    alt={article.title} 
                    className="article-image-mobile"
                  />
                </div>
                <span className='title-article-mobile'>
                    {article.title}
                </span>
                  </Link>
              </div>
            </div>
          ))}
          <Pagination 
            articlesPerPage={articlesPerPage} 
            totalArticles={articles.length} 
            paginate={paginate} 
            currentPage={currentPage}
          />
        </div>
      );

  return (
    <>
      {isMobile ? renderMobileView() : renderDesktopView()}
    </>
  );
};

const Pagination = ({ articlesPerPage, totalArticles, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
        <nav>
          <div className='pagination'>
            {pageNumbers.map(number => (
              <span key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <button onClick={() => paginate(number)} className='page-link'>
                  {number}
                </button>
              </span>
            ))}
          </div>
        </nav>
      );
    };

export default ArticleList;
