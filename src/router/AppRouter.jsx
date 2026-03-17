import { createBrowserRouter, RouterProvider } from "react-router-dom"
import VisitorLayout from "../layout/VisitorLayout"
import AdminLayout from "../layout/AdminLayout"
import {PublicOnlyRoute} from "./PublicOnlyRoute"
import AuthRouter from "./AuthRouter"

import Home from "../pages/visitor/Home"
import About from "../pages/visitor/About"
import BlogList from "../pages/visitor/BlogList"
import Category from "../pages/visitor/Category"
import Search from "../pages/visitor/Search"
import NotFound from "../pages/visitor/NotFound"
import PostDetail from "../pages/admin/PostDetail"

import SignIn from "../pages/auth/SignIn"
import SignUp from "../pages/auth/SignUp"

import Dashboard from "../pages/admin/Dashboard"
import BlogEdit from "../pages/admin/BlogEdit"
import BlogNew from "../pages/admin/BlogNew"
import Comments from "../pages/admin/Comments"
import Categories from "../pages/admin/Categories"
import UsersPage from "../pages/admin/UsersPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <VisitorLayout />,
    children: [
      
      { index: true, element: <Home /> },
      { path: "blog", element: <BlogList /> },
      { path: "blog/:id", element: <PostDetail /> },
      { path: "category/:id", element: <Category /> },
      { path: "search", element: <Search /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
  {
    path: "admin",
    element: <AuthRouter />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "blog-edit/:id", element: <BlogEdit /> },
          { path: "blog-new", element: <BlogNew /> },
          { path: "comments", element: <Comments /> },
          { path: "categories", element: <Categories /> },
          { path: "users", element: <UsersPage /> },
        ],
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
