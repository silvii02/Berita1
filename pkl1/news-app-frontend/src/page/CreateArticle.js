import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { IoMdCreate } from "react-icons/io";
import '../assets/css/style.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [authorId, setAuthorId] = useState('2');
  const [body, setBody] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token,'token dari halaman creatartikel');
    // if (!token) {
      // navigate('/login'); // Redirect ke halaman login jika token tidak ada
    // }
  }, [navigate]);

  useEffect(() => {
    // Fetch categories from API
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handleEditorChange = (content) => {
    setBody(content);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      axios.post('http://localhost:8000/api/createcategory', { name: newCategory })
        .then(response => {
          console.log(response,'response category');
          setCategories([...categories, response.data]);
          setNewCategory('');
        })
        .catch(error => {
          console.error('There was an error adding the new category!', error);
        });
    }
  };

  const handleSubmit = () => {
    

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('category_id', selectedCategory);
    formData.append('author_id', authorId);
    formData.append('tags', tags);

    if (image) {
      formData.append('image', image);
    }

    axios.post('http://localhost:8000/api/articles', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    
    .then(response => {
    console.log(response.data,'ini response data');
    })

      .catch(error => {
        console.error('There was an error creating the article!', error);
      });
  };

  
  return (
    <div>
      <form className='form1'>
      <div className="header-container">
        <IoMdCreate className="MdCreate" />
        <h1>Create Article</h1>
      </div>


        {/* Input untuk Title */}
        <div>
          <label className="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title"
          />
        </div>

        {/* Input untuk Tags */}
        <div className='formGroup'>
          <label className="tags">Tags</label>
          <input className='input'
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Contoh: viral, trending, terkini"
          />
        </div>

        {/* Input untuk Gambar */}
        <div>
          <label className="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <p>Selected Image: {image.name}</p>}
        </div>

        {/* Input untuk Kategori Baru */}
        <div>
          <label className='newCategory'>New Category</label>
          <input
            type="text"
            id="newCategory"
            name="newCategory"
            value={newCategory}
            onChange={handleNewCategoryChange}
            placeholder="Enter new category"
          />
          <button type="submit" onClick={addCategory}>Add Category</button>
        </div>

        {/* Select untuk Category */}
        <div>
          <label className='category'>Category</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

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
          initialValue="Welcome to TinyMCE!"
          onEditorChange={handleEditorChange}
        />

        {/* Tombol Save dan Reset */}
        <div style={{ marginTop: '20px' }}>
          <button type="button" onClick={handleSubmit}>Simpan</button>
          <button type="reset">Batalkan</button>
        </div>
      </form>
    </div>
  );
}
