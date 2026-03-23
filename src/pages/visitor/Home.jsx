import React, { useEffect, useState } from "react";
import Hero from "../../components/layout/Hero";
import BlogCard from "../../components/blog/BlogCard";
import { useBlogCalls } from "../../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import {
  selectBlogs,
  selectCategories,
  selectLoading,
} from "../../features/blog/blogSlice";
import { NavLink, useNavigate } from "react-router-dom";

import { LogOut } from "lucide-react";
import { selectCurrentUser } from "../../features/auth/authSlice";
import Profile from "../dashboard/Profile";
import ProfileCard from "../../components/blog/ProfileCard";

const Home = () => {
  const { getBlogData } = useBlogCalls();
  const blogs = useSelector(selectBlogs);
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(blogs);
  const currentUser = useSelector(selectCurrentUser);

  const categories = useSelector(selectCategories);
  console.log(categories);
  const loading = useSelector(selectLoading);
  console.log(loading);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
  };
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  useEffect(() => {
    getBlogData("blogs");
    getBlogData("categories");
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  console.log(sortedBlogs.image);

  /* const newDate=blogs.slice(0,4).map((b)=>(
  new Date(b.createdAt).toLocaleDateString("en-US", {
  month: "long", day: "numeric", year: "numeric"
})
)) */
  /* console.log(deneme); */

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    );
  }
  if (!blogs || blogs.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {currentUser && (
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-base-content/50 hover:bg-base-300 hover:text-base-content transition-all"
        >
          <LogOut size={17} />
          <span>Go to Dashboard</span>
        </NavLink>
      )}

      <section>
        <Hero
          sortedBlogs={sortedBlogs[activeIndex]}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </section>

      <div className="text-center space-y-4 font-header tracking-wide">
        <h2 className="font-header text-2xl">Discover topics</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category?._id}
              className="badge badge-xl cursor-pointer transition-all hover:bg-black hover:text-white font-header bg-base-300"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-body">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sortedBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              category={categories.find((cat) => cat._id === blog.categoryId)}
            />
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-base-200 rounded-2xl p-5">
            <h3 className="font-bold font-header text-base mb-4">
              Latest Posts
            </h3>
            <div className="space-y-8">
              {sortedBlogs.slice(0, 4).map((blog) => (
                <div
                  key={blog?._id}
                  className="flex gap-3 cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <img
                    src={blog.image || null}
                    className="w-16 h-14 object-cover rounded-lg `flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium line-clamp-2 leading-snug">
                      {blog.title}
                    </p>
                    <p className="text-xs text-base-content/40 mt-1">
                      {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
            
          <div className="bg-base-200 rounded-2xl p-5">
           <h3 className="font-bold font-header text-base mb-4">
              Who to follow
            </h3>
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
