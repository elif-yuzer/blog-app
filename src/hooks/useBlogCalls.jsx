import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { toast } from "react-toastify";

import {
  fetchStart,
  fetchSuccess,
  fetchFail,
  updatelike,
} from "../features/blog/blogSlice.jsx";
import useAxios from "./useAxios";

export const useBlogCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithoutToken, axiosWithToken } = useAxios();

  ///thunk--usecallback
  const getBlogData = useCallback(
    async (url) => {
      try {
        dispatch(fetchStart());
        const { data } = await axiosWithoutToken.get(url);
        dispatch(fetchSuccess({ url, data: data.data }));
        console.log(data.data[0]._id);
        console.log(Object.keys(data));
      } catch (error) {
        dispatch(fetchFail(error.response?.data?.message || error.message));
      }
    },
    [dispatch],
  );

  const postlikeById = async (id, userId) => {
    try {
      const { data } = await axiosWithToken.post(`/blogs/${id}/postLike`);
      console.log(data);
      dispatch(
        updatelike({
          blogId: id,
          userId: userId,
          didUserLike: data.didUserLike,
        }),
      );
    } catch (error) {
      dispatch(fetchFail(error.response?.data?.message || error.message));
    }
  };
  const getBlogDataById = async (id) => {
    try {
      dispatch(fetchStart());
      const { data } = await axiosWithoutToken.get(`/blogs/${id}`);
      console.log(data);
      return data.data;
    } catch (error) {
      dispatch(fetchFail(error.response?.data?.message || error.message));
    }
  };

  const getComments = async (url) => {
    try {
      dispatch(fetchStart());
      const { data } = await axiosWithToken.get(url);
      dispatch(fetchSuccess({ url: "comments", data: data.data }));
    } catch (error) {
      dispatch(fetchFail(error.response?.data?.message || error.message));
    }
  };

  const postComments = async (blogId, comment) => {
    try {
      dispatch(fetchStart());
      const { data } = await axiosWithToken.post("/comments/", {
        blogId,
        comment,
      });
      console.log(data);
      return data.data;
    } catch (error) {
      dispatch(fetchFail(error.response?.data?.message || error.message));
    }
  };

  const patchComment = useCallback(
    async (blogId, id, comment) => {
      try {
        const { data } = await axiosWithToken.patch(`/comments/${id}`, {
          blogId: blogId,
          comment: comment,
        });

        await getComments("comments");
      } catch (error) {
        dispatch(fetchFail(error.response?.data?.message || error.message));
      }
    },
    [dispatch],
  );

  /*  const postBlogs=useCallback(async({categoryId,title,content,isPublish,image})=>{



    try {const { data } = await axiosWithToken.post("/blogs/", {
    
    categoryId,
    title,
    content,
    isPublish,
    image

      });

      
    } catch (error) {
      dispatch(fetchFail(error.response?.data?.message || error.message));
    }
  },[dispatch]) */

  const postBlogs = async ({
    categoryId,
    title,
    content,
    isPublish,
    image,
  }) => {
    try {
      const { data } = await axiosWithToken.post("/blogs/", {
        categoryId,
        title,
        content,
        isPublish,
        image,
      });
    } catch (error) {
      dispatch(fetchFail(error.response?.data?.message || error.message));
    }
  };

  const deleteComment = async (url, id, page) => {
    try {
      await axiosWithToken.delete(`${url}/${id}`);
      toast.success("Deleted Successfully!");
      await getComments(`comments?page=${page}&limit=10`);
    } catch (error) {
      console.log(error);

      dispatch(fetchFail(error));
      toast.error("Delete Failed!");
    }
  };

  const putBlog = async ({
    categoryId,
    title,
    content,
    isPublish,
    image,
    id,
  }) => {
    try {
      const { data } = await axiosWithToken.put(`/blogs/${id}`, {
        categoryId,
        title,
        content,
        isPublish,
        image,
      });
      return true;
    } catch (error) {
      dispatch(fetchFail(error.response?.data?.message || error.message));
    }
    return false;
  };

  const deleteBlog = async (id) => {
    try {
      await axiosWithToken.delete(`/blogs/${id}`);
      toast.success("Deleted Successfully!");
      await getBlogData("blogs");
      return true
    } catch (error) {
      console.log(error);

      dispatch(fetchFail(error));
      toast.error("Delete Failed!");
    }
    return false
  };

  return {
    getBlogData,
    postlikeById,
    getBlogDataById,
    postComments,
    getComments,
    patchComment,
    postBlogs,
    updatelike,
    deleteComment,
    putBlog,
    deleteBlog,
  };
};
