import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blogs.css';
import Navbar from '../Navbar/Navbar';

const Blogs = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('access_token');
  const isLoggedIn = token !== null; // Check if user is logged in

  useEffect(() => {
    // Fetch existing blogs when the component mounts
    axios.get('http://127.0.0.1:5000/api/getblogs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setBlogs(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      content,
    };

    // Send the new blog data to the backend
    axios.post('http://127.0.0.1:5000/api/blogs', newBlog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // Fetch the updated list of blogs after successfully adding a new blog
      axios.get('http://127.0.0.1:5000/api/blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      setTitle('');
      setContent('');
    })
    .catch(error => {
      console.error(error);
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // ... (existing imports and code)

  return (
    <div className="blog-m">
      <Navbar />
      <div className="blogs-container" >
        <div className="main-content">
          <div className="form-container">
            {isLoggedIn && (
              <>
                <h2>Add a New Blog</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button className="add-blog-btn" type="submit">Add Blog</button>
                </form>
              </>
            )}
          </div>
          <h2 className="section-title">Latest Blogs</h2>
          <div className="blog-list">
            {blogs.map(blog => (
              <div key={blog.id} className="blog-item">
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p className="blog-date">Posted on: {formatDate(blog.created_at)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="side-content">
          <div className="quote-container">
            <p className="quote" style={{ fontSize: '22px' }}>"Yoga is the journey of the self, through the self, to the self."</p>
            <p className="quote-author">- The Bhagavad Gita</p>
          </div>
          <div className="quote-container">
            <p className="quote" style={{ fontSize: '22px' }}>"The body is your temple. Keep it pure and clean for the soul to reside in."</p>
            <p className="quote-author">- B.K.S. Iyengar</p>
          </div>
          <div className="quote-container">
            <p className="quote" style={{ fontSize: '22px' }}>"Yoga is the art of living a happy and peaceful life."</p>
            <p className="quote-author">- Amit Ray</p>
          </div> 
          <div className="quote-container">
            <p className="quote" style={{ fontSize: '22px' }}>"Yoga teaches us to cure what need not be endured and endure what cannot be cured."</p>
            <p className="quote-author">- B.K.S. Iyengar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
