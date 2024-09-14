import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import axios from 'axios';
import ArticleCard from './article-card';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem('authTokenSitusNews');

      if (!token) {
        navigate('/login');
      } else {
        try {
          const response = await axiosInstance.get('/articles', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setArticles(response.data);
        } catch (error) {
          console.error('Error fetching articles:', error.response?.data || error.message);
        }
      }
    };

    fetchArticles();
  }, [navigate]);
  const handleEdit = (articleId) => {
    navigate(`/edit-article/${articleId}`);
  };

  const  handlehapus = async (articleId) => {
   

   
    // } else if (window.confirm('Yakin akan menghapus artikel ini ?')) {
      try {
        const token = localStorage.getItem('token');
          if (!token) {
               navigate('/login');
             }

        console.log('Token digunakan untuk menghapus:', token); // Tambahkan ini untuk cek token
        console.log('sebelum di hapus');
        const response = await axios.delete(`http://localhost:8000/api/articles/${articleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response, 'ini respone delete');
        console.log('setelah di hapus');
        console.log('Article deleted successfully');
        setArticles(articles.filter(article => article.id !== articleId));
       } catch (error) {
         console.error('Error deleting article:', error.response?.data || error.message);
       }
     }
// };
  

  return (
    <div className="dashboard">
      <h1>Dashboard Artikel</h1>
      <div className="article-list">
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            index={index}
            onEdit={handleEdit}
            onDelete={handlehapus}
            showControls={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
