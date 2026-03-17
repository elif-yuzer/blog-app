import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {  selectCurrentUser } from "../../features/auth/authSlice"

import { FaGithub, FaLinkedin } from "react-icons/fa"
import { PiPinterestLogo } from "react-icons/pi"


const Navbar = () => {
  const currentUser=useSelector(selectCurrentUser)

  return (
    <div className="navbar text-brand font-header tracking-wide  bg-background shadow-sm sticky top-0 z-50">
      

      <div className="flex-1   ">
      
       <div className=" flex-row flex gap-4 ">
          <a
      href="https://linkedin.com/in/kullaniciadiniz"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xl hover:text-brand transition"
    >
      <FaLinkedin />
    </a>
         <a
      href="https://github.com/in/kullaniciadiniz"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xl hover:text-brand transition"
    >
      <FaGithub />
    </a>
         <a
      href="https://github.com/in/kullaniciadiniz"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xl hover:text-brand transition"
    >
      <PiPinterestLogo />
    </a>
       </div>
        </div>
      

      




      <div className="hidden md:flex gap-1">
        <Link to="/" className="btn btn-ghost btn-sm">Home</Link>
        <Link to="/blog" className="btn btn-ghost btn-sm">Blog</Link>
        <Link to="/about" className="btn btn-ghost btn-sm">About</Link>
      </div>

     

       
        {!currentUser ? (
          <div className="flex gap-2">
            <Link to="/sign-in" className="btn btn-ghost btn-sm">Sign In</Link>
            <Link to="/sign-up" className="btn btn-ghost btn-sm">Sign Up</Link>
          </div>
        ) : (
          /* Giriş yapılmışsa — dropdown */
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li className="menu-title px-2 py-1">
                <span className="text-xs opacity-60">{currentUser.username}</span>
              </li>
              {currentUser.isAdmin && (
                <li><Link to="/admin">Admin Panel</Link></li>
              )}
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button onClick={signOut} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Mobil menü */}
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
           
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

      </div>
     
  
  )
}

export default Navbar