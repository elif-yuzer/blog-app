import axios from "axios"
import { useSelector } from "react-redux"



import { selectAuthToken } from "../features/auth/authSlice"

const useAxios=()=>{
   
    const token=useSelector(selectAuthToken)
    const baseURL=import.meta.env.VITE_API_URL
    console.log(baseURL);

    const axiosWithToken=axios.create({
        baseURL,
        headers:{
            Authorization: `Token ${token}`
        }
    })
    const axiosWithoutToken = axios.create({ baseURL });

  return { axiosWithToken, axiosWithoutToken };
}



  export default useAxios