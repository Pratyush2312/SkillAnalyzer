import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../config/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { CareerContext } from "../../../context/MyCareer";

const useAuthHook = () => {
  const navigate = useNavigate();
  const { fetchStudent } = useContext(CareerContext);
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

      switch (res.status) {
        case 201:
          toast.success("Registration successful!");
          navigate("/profile");
          break;

        default:
          toast.success(res.data.message || "Registration completed.");
      }
    } catch (error) {
      const status = error.response?.status;

      switch (status) {
        case 400:
          toast.error("Please fill in all required fields.");
          break;

        case 409:
          toast.error("An account with this email already exists.");
          break;

        case 500:
          toast.error(
            "Something went wrong on the server. Please try again later.",
          );
          break;

        default:
          toast.error("Registration failed. Please try again.");
      }

      console.error("Registration error:", error);
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      switch (res.status) {
        case 201:
          toast.success("Login successful! Welcome back.");
          await fetchStudent();
          navigate("/dashboard");
          break;

        default:
          toast.success(res.data.message || "Login completed.");
      }
    } catch (error) {
      const status = error.response?.status;

      switch (status) {
        case 400:
          toast.error("Please enter both your email and password.");
          break;

        case 401:
          if (error.response?.data?.message === "Register First") {
            toast.error("No account found. Please register first.");
          } else {
            toast.error("Invalid email or password.");
          }
          break;

        case 500:
          toast.error(
            "Something went wrong on the server. Please try again later.",
          );
          break;

        default:
          toast.error("Login failed. Please try again.");
      }

      console.error("Login error:", error);
    }
  };

  return {
    register,
    handleSubmit,
    getValues,
    errors,
    handleRegister,
    handleLogin,
  };
};

export default useAuthHook;
