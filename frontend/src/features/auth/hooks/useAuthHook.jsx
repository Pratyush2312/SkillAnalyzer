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

  const onSubmit = async (data) => {
    const res = await api.post("/auth/register", data);
    toast.success(res.data.message);
  };

  return {
    register,
    handleSubmit,
    getValues,
    errors,
    onSubmit,
  };
};

export default useAuthHook;
