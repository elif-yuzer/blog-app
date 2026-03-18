import React, { useEffect } from 'react'
import Hero from "../../components/layout/Hero"
import { useBlogCalls } from '../../hooks/useBlogCalls'
import { useSelector } from 'react-redux'
import { selectBlogs, selectLoading } from '../../features/blogs/blogSlice'
import BlogCard from '../../components/blog/BlogCard'

const Home = () => {
  const { getBlogData } = useBlogCalls()
  const blogs = useSelector(selectBlogs)
  const loading = useSelector(selectLoading)

  useEffect(() => {
    getBlogData("blogs")
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    )
  }

  return blogs.length > 0 && (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="lg:col-span-2">
        <Hero blog={blogs[0]} />
      </section>
       <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
       
      < BlogCard  blogs={blogs} />
      
  </div>
</section>
    </div>
  )
}

export default Home