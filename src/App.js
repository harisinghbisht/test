import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Home';
import Login from './pages/Login';
import AddBlog from './pages/AddBlog';
import Header from './components/Header';
import BlogDetails from './pages/BlogDetails';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <Provider store={store}>
    <Router>
      {/* Include Header as a global component */}
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:blogId" element={<BlogDetails />} />

        {/* Protected Route */}
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddBlog />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </Provider>
);

export default App;
