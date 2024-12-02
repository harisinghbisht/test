import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogs } from '../features/blog/blogSlice';
import '../App.css';

const BlogDetails = () => {
  const { blogId } = useParams(); // Fetch the blog ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, status } = useSelector((state) => state.blog);

  const blog = blogs.find((b) => b.id === parseInt(blogId));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs()); // Fetch the blogs if not already available
    }
  }, [dispatch, status]);

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <>
    <h1 style={{textAlign:"center"}}>Details Page</h1>
    <div className="blog-details-container">
        
        <h1 className="blog-details-title">{blog.title}</h1>
        <p className="blog-details-content">{blog.body}</p>
        <div className="blog-details-footer">
          <p>
            <strong>Author:</strong> {blog.author}
          </p>
          <p>
          <strong>Created At:</strong> {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
          </p>
        </div>
        <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
      </div>
    
    </>
   
  );
};

export default BlogDetails;
