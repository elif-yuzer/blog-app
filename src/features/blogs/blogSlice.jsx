import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:null,
    blogs:[],
    categories:[],
    comments:[],
    likes:[],
    countOfVisitors:[]
}

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
   
    fetchSuccess: (state, { payload: { url, data } }) => {
     console.log(url, data);
      state.loading = false;
      state[url] = data;  //blogslar categories ler için
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
    fetchStart,
    fetchFail,
    fetchSuccess
}=blogSlice.actions

export const selectLoading=(state)=>state.blog.loading
export const selectError=(state)=>state.blog.error
export const selectBlogs=(state)=>state.blog.blogs
export const selectCategories=(state)=>state.blog.categories
export const selectComments=(state)=>state.blog.comments





export default blogSlice.reducer;