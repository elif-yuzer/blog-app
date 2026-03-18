import React from 'react'
import { useSelector } from 'react-redux'
import { blogSlice, selectBlogs } from '../../features/blogs/blogSlice'

const BlogCard = () => {
    const { blogs } = useSelector(selectBlogs)
    console.log(blogs);
    return (
        <div>BlogCard</div>
    )
}

export default BlogCard