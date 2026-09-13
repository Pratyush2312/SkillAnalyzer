import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { api } from "../../../config/api";
import { toast } from "react-hot-toast";

const useProfileHook = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/api/student/profile", data);

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save profile. Please try again.",
      );
    }
  };

  const handleLogout = async () => { 
    try {
      const res = await api.post("/auth/logout");
      navigate('/');
      toast.success(res.message);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleLogout
  };
};

export default useProfileHook;
