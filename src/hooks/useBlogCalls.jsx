import { useDispatch, useSelector } from "react-redux"
/* import { selectAuthToken } from '../features/auth/authSlice' */
import { fetchStart,fetchSuccess,fetchFail } from "../features/blogs/blogSlice"
import useAxios from "./useAxios"




const BASE_URL = import.meta.env.VITE_API_URL

export const useBlogCalls = () => {
    const dispatch = useDispatch()
   /*  const token = useSelector(selectAuthToken) */
    const { axiosWithoutToken } = useAxios();

    const getBlogData = async (url) => {
        try {

            dispatch(fetchStart())
            const { data } = await axiosWithoutToken(url)
            console.log(data);

            dispatch(fetchSuccess({ url, data: data.data }))
            console.log(   data);

        } catch (error) {
            dispatch(fetchFail(error.response?.data?.message || error.message))
        }
    }


return {getBlogData}

}
