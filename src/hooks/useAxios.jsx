import axios from "axios"
import { useSelector } from "react-redux"

const useAxios=()=>{
    const token=useSelector(selectAuthToken)
    const baseURL=import.meta.env.VITE_BASE_URL

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