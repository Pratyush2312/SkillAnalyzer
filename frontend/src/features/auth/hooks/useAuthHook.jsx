import React from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../config/api";
import { toast } from "react-hot-toast";
const useAuthHook = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleRegister = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async(data) => { 
    try {
      const res = await api.post("/auth/login", data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    handleSubmit,
    getValues,
    errors,
    handleRegister,
    handleLogin
  };
};

export default useAuthHook;
