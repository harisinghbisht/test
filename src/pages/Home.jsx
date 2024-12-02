import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, setPage } from '../features/blog/blogSlice';
import '../App.css';

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, status, currentPage } = useSelector((state) => state.blog);

  const postsPerPage = 5;
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + postsPerPage);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [dispatch, status]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const totalPages = Math.ceil(blogs.length / postsPerPage);

  return (
    <div className="home-container">
      <h1 className="home-title">Blog Posts</h1>
      {status === 'loading' ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="blog-grid">
          {paginatedBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-description">{blog.body.substring(0, 100)}...</p>
              <div className="blog-footer">
                <p>
                  <strong>Author:</strong> {blog.author}
                </p>
                <p>
                  <strong>Created At:</strong>{' '}
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </p>
              </div>
              {/* Read More Link */}
              <Link to={`/blog/${blog.id}`} className="read-more-link">
                Read More...
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
