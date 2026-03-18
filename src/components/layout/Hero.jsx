import React from 'react'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../../features/auth/authSlice'





const Hero = ({blog}) => {
  const navigate=useNavigate()
  const currentUser=useSelector(selectCurrentUser)
const getFirstParagraph = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  return doc.querySelector("p")?.outerHTML || ""
}

const firstParagraph = getFirstParagraph(blog.content)
  
  
  if(!blog) return 
   
   console.log(firstParagraph);
   console.log(blog.content);
    return (
    <div className=" items-center bg-base-200 grid grid-cols-1 md:grid-cols-2 gap-6  w-full  ">
  <div className="hero-content flex-col flex ıtems-center justify-center lg:flex-row">
    <img
      src={blog.image}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div className='flex flex-col gap-2'>
      <h1 className="text-5xl font-bold">{blog.title}</h1>
    <div dangerouslySetInnerHTML={{ __html:firstParagraph }} />
     <button onClick={()=>currentUser ? navigate(`/blog/${blog._id}`) : navigate("/sign-in")} className="btn btn-primary">Read More</button>
    </div>
  </div>
</div>
  )

  
  
  
}

export default Hero