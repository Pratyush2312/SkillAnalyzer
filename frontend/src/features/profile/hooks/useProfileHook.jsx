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

  const formatText = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    return String(value || "").trim();
  };

  const formatArray = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => String(item).trim()).filter(Boolean);
    }

    return String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const onSubmit = async (data) => {
    try {
      const yearMap = {
        "1st Year": 1,
        "2nd Year": 2,
        "3rd Year": 3,
        "4th Year": 4,
        Graduate: 5,
      };

      const formattedData = {
        name: formatText(data.name),

        year: yearMap[data.year] || null,

        current_course: formatText(data.current_course),

        technical_skills: formatArray(data.technical_skills),

        programming_languages: formatArray(data.programming_languages),

        soft_skills: formatArray(data.soft_skills),

        career_interest: formatText(data.career_interest),

        challenges: formatText(data.challenges),

        support_required: formatText(data.support_required),

        method: formatText(data.method),
      };

      console.log("PROFILE PAYLOAD:", formattedData);

      const res = await api.post("/api/student/profile", formattedData);

      toast.success(res.data.message || "Profile created successfully");

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

      navigate("/");

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to logout. Please try again.",
      );
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleLogout,
  };
};

export default useProfileHook;
