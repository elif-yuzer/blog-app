import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { fillAuth, cleanAuth } from "../features/auth/authSlice";
import useAxios from "./useAxios";

const BASE_URL = import.meta.env.VITE_API_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithoutToken, axiosWithToken } = useAxios();

  const signIn = async (userCredentials) => {
    try {
      const { data } = await axiosWithoutToken.post(
        `auth/login`,
        userCredentials
      );
    console.log("LOGIN DATA:", data)
    
           
  
     


      dispatch(fillAuth(data));

      toast.success("Login Successful!", {
        description: `Welcome back, ${data.user.username}`,
      });

      navigate("/admin");
    } catch (error) {
      toast.error("Login Failed!", {
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Please check your credentials",
      });
    }
  };
  const signUp = async (userCredentials) => {
    try {
      const { data } = await axiosWithoutToken.post(`users`, userCredentials);
      console.log(data);


      dispatch(fillAuth(data));

      toast.success("Login Successfull!", {
        description: `Welcome back, ${data.data.username}`,
      });

      navigate("/");
    } catch (error) {

      toast.error("Login Faild", {
        description:
          error.response?.data?.message ||
          error?.message ||
          "Please check your credentials",
      });
    }
  };




  const signOut = async () => {
    try {
      await axiosWithToken.get(`auth/logout`)
      dispatch(cleanAuth())
      navigate("/")
    } catch (error) {
      toast.error("Logout Failed")
    }
  }

  return { signIn, signOut, signUp };
};

export default useAuthCall;