import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { Editor } from '@tinymce/tinymce-react';
import configUrl from '../configUrl';
import { IoMdCreate } from "react-icons/io";
import ReloadButton from '../components/ReloadBtn';

const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bodyLoaded, setBodyLoaded] = useState(false);
  const navigate = useNavigate();
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchArticleAndCategories = async () => {
      try {
        const articleResponse = await axios.get(`${configUrl.beBaseUrl}/api/articles/${id}`);
        console.log(articleResponse.data, 'ini respon data'); // Log untuk memastikan data benar
        setArticle(articleResponse.data); // Pastikan data ini sesuai dengan yang diharapkan backend
  
        if (articleResponse.data.image_url) {
          setImagePreview(`${configUrl.beBaseUrl}${articleResponse.data.image_url}`);
        }
  
        const categoriesResponse = await axios.get(`${configUrl.beBaseUrl}/api/categories`);
        setCategories(categoriesResponse.data);
        setTags(articleResponse.data.tags || '');
        setBodyLoaded(true);
      } catch (error) {
        console.error('Error fetching article or categories:', error);
      }
    };
  
    fetchArticleAndCategories();
  }, [id]);
  

  const handleEditorChange = (content, editor) => {
    setArticle(prevArticle => ({
      ...prevArticle,
      body: content
    }));
  };

   let sudahdibersihkan = '';
  const sanitizeHTML = (input) => {
    // const cleanedInput = input.replace(/<script.*?>.*?<\/script>/gi, '');
     sudahdibersihkan = input.replace(/<\/?p[^>]*>/gi, '');
    return sudahdibersihkan;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevArticle => ({
      ...prevArticle,
      [name]: value
    }));
  };

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(article,'ini artikel yanga akan dikirim');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      const sanitizedBody = sanitizeHTML(article.body);
      let imageUrlToSave = article.image_url;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const uploadResponse = await axios.post(`${configUrl.beBaseUrl}/api/upload-image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        imageUrlToSave = uploadResponse.data.image_url;
      }

      const updatedArticle = {
        ...article,
        image_url: imageUrlToSave,
        body: sanitizedBody,
        tags,
      };
      console.log(token,'token');
      console.log('Updated Article:', updatedArticle);
      console.log(article,'ini artikel yang akan dikirim2');
      console.log('Data to be sent:', updatedArticle);
      await axiosInstance.put(`/articles/${id}`, updatedArticle, {
        headers: {
          Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
      });

      navigate(`/dashboard`);

    } catch (error) {
      console.error('Error updating article:', error.response?.data || error.message);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleCancel = () => {
    navigate(`/dashboard`);
  };

  return (
    <div>
      <form className='form1' onSubmit={handleSubmit} >
      <div className="header-container">
        <IoMdCreate className="MdCreate" />
        <h1>Edit Article</h1>
      </div>

        <div className='form-group'>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="tags">Tags</label>
          <input className='input'
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Masukkan tags artikel"
          />
        </div>

        <div style={{ marginBottom: "3px" }}>Image / Photo</div>
        <div className="file-upload-container">
          <label className="file-upload-box">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
            />
            {!imagePreview && <span className="upload-icon">+</span>}
            {imagePreview && <div className='wrapper-change-foto'><span className="upload-change-foto">Change Photo ?</span><div className="upload-icon"> + </div></div>}
          </label>
          {imagePreview && (
            <div className="preview-container">
              <img src={imagePreview} alt="Preview" className="preview-image" />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category_id"
            value={article.category_id}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">

          {/* Editor TinyMCE */}
          <Editor
            apiKey='pthxqalyzwo3xtrb7u6egadri1j7stnxclvxnufjktvvbs8k'
            init={{
              plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
              ],
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            }}
            initialValue={article.body || ''}
            onEditorChange={handleEditorChange}
          />
        </div>
        
        <div className="button-container">
          <button className="save-button">Update Article</button>
          <button className="reset-button" onClick={handleCancel}>Batalkan</button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
