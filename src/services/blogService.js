
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

const fetchBlogs = async () => {
  const response = await axios.get(BASE_URL);
  return response.data.slice(0, 20).map((blog, index) => ({
    ...blog,
    author: `Author ${index + 1}`, // Mock author names
    createdAt: new Date(Date.now() - index * 86400000).toISOString(), // Mock creation dates
  }));
};

const addBlog = async (blog) => {
  const response = await axios.post(BASE_URL, blog);
  return response.data;
};

export default { fetchBlogs, addBlog };

