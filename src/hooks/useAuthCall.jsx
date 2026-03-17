import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { fillAuth} from "../features/auth/authSlice";
import useAxios from "./useAxios";

const BASE_URL = import.meta.env.VITE_API_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { axiosWithoutToken } = useAxios();



  const signIn = async (userCredentials) => {
    try {
      const { data } = await axiosWithoutToken.post(
        `auth/login`,
        userCredentials
      );

      console.log(data);

      dispatch(fillAuth(data));

      toast.success("Login Successful!", {
        description: `Welcome back, ${data.user.username}`,
      });

      navigate("/adminHome");
    } catch (error) {
      toast.error("Login Failed!", {
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Please check your credentials",
      });
    }
  };

  return { signIn };
};

export default useAuthCall;