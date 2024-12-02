import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../features/blog/blogSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // Validate form inputs
    if (title.trim() === '' || content.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    // Dispatch the action to add a new blog
    dispatch(addBlog({ 
      title, 
      body: content, 
      author: user.name 
    }));

    // Notify user and redirect
    alert('Blog added successfully!');
    navigate('/');
  };

  return (
    <div className="add-blog-container">
      <div className="add-blog-box">
        <h1 className="add-blog-title">Add New Blog</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-blog-input"
            required
          />
          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="add-blog-textarea"
            required
          />
          <input
            type="text"
            value={user?.name || ''}
            readOnly
            className="add-blog-input add-blog-author"
          />
          <button type="submit" className="add-blog-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
