import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../assets/css/style.css';
import configUrl from '../configUrl';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/articles/${id}`);
        setArticle(response.data);
        
        // Fetch related articles
        const relatedResponse = await axios.get(`${configUrl.beBaseUrl}/api/articles/related/${response.data.category_id}/${id}`);
        setRelatedArticles(relatedResponse.data);

        setLoading(false);

      } catch (error) {
        console.error('Error fetching article or related articles:', error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${configUrl.beBaseUrl}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchArticle();
    fetchCategories();
    
  }, [id]);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `Pada: ${day}-${month}-${year} / ${hours}:${minutes}`;
  };

  const imageUrl = `${configUrl.beBaseUrl}${article.image_url}`;
  const halDetail = `${configUrl.beBaseUrl}${article.slug}`;

  return (
    <div className="article-container">
          <div className="article-detail">
            <div className='category-btn'>{getCategoryName(article.category_id)}</div>
            <h1 style={{ textTransform: 'capitalize' }}>{article.title}</h1>
            <p className="article-meta">
              Penulis: {article.author_name}
            </p>
      
            <img src={imageUrl} alt={article.title} className="article-image-full" />
      
            <p className='article-body'>{article.body}</p>
      
            <div className='footer-detail-artikel'>
              <p className="article-meta">
                {formatDate(article.created_at)} 
              </p>
              <p className="article-meta">
                - Dibaca: {article.views} Kali
              </p>
            </div>
          </div>

          <div className="fb-comments" data-href={halDetail} data-width="780" data-numposts="5"></div>
      
          <div className="related-articles">
            <h3>Artikel Terkait</h3>
            {relatedArticles.length > 0 ? (
              <ul>
                {relatedArticles.map(relatedArticle => (
                  <li key={relatedArticle.id}>
                    <Link to={`/articles/${relatedArticle.id}/${encodeURIComponent(relatedArticle.slug)}`} style={{ textTransform: 'capitalize' }}>
                      {relatedArticle.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada artikel terkait.</p>
            )}
          </div>
        </div>
    );
  };

export default ArticleDetail;
