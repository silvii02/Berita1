import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from '../dashboard/article-card';

const CategoryArticles = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/categories/${slug}/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-articles">
      <h1>Artikel-artikel dalam Kategori "{slug}" </h1>
      <div className="article-list">
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            index={index}
            showControls={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryArticles;
