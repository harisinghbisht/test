


// export default blogSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../../services/blogService';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', blogService.fetchBlogs);
export const addBlog = createAsyncThunk('blogs/addBlog', blogService.addBlog);


const blogSlice = createSlice({
   name: 'blog',
   initialState: {
   blogs: [],
   status: 'idle',
   currentPage: 1, // Track current page for pagination
  },
  reducers: {

    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
       state.blogs = action.payload;
       state.status = 'succeeded';
     })
     .addCase(fetchBlogs.pending, (state) => {
       state.status = 'loading';
     })
     .addCase(addBlog.fulfilled, (state, action) => {
       state.blogs.push(action.payload);
     });
 },
});

export const { setPage } = blogSlice.actions;
export default blogSlice.reducer;
