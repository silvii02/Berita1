import React from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/css/style.css';

const SearchResults = () => {
    const location = useLocation();
    const query = location.state?.query || 'test';
    const results = location.state?.results || [];
  
    // Menggunakan data statis untuk tes
    // const results = [];
  
    return (
      <div className="search-results-page">
        <h1>Hasil Pencarian</h1>
        {query && <p>Hasil pencarian untuk: <strong>{query}</strong></p>}
        <ul>
          {results.length > 0 ? (
            results.map(result => (
              <li key={result.id}>
                <a href={`/articles/${result.id}/${encodeURIComponent(result.slug)}`} style={{ textTransform: 'capitalize' }}>{result.title}</a>
              </li>
            ))
          ) : (
            <p>Tidak ada hasil yang ditemukan.</p>
          )}
        </ul>
      </div>
    );
  };
  

export default SearchResults;
