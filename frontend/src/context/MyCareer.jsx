import { createContext, useEffect, useState } from "react";
import { api } from "../config/api";

export const CareerContext = createContext();

export const CareerContextProvider = ({ children }) => {
  const [student, setStudent] = useState({});
  const [skillIntelligence, setSkillIntelligence] = useState(null);

  const [loading, setLoading] = useState(true);
  const [skillLoading, setSkillLoading] = useState(true);

  // -----------------------------
  // Student Profile
  // -----------------------------
  const fetchStudent = async () => {
    try {
      const res = await api.get("/api/student/profile/get");
      setStudent(res.data.data);
    } catch (error) {
      console.error("Failed to fetch student profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Skill Intelligence
  // -----------------------------
  const fetchSkillIntelligence = async (role) => {
    try {
      setSkillLoading(true);

      const url = role
        ? `/api/skill-intelligence/me?role=${encodeURIComponent(role)}`
        : "/api/skill-intelligence/me";

      const res = await api.get(url);

      setSkillIntelligence(res.data.data);
    } catch (error) {
      console.error("Failed to fetch skill intelligence:", error);
    } finally {
      setSkillLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
    fetchSkillIntelligence();
  }, []);

  return (
    <CareerContext.Provider
      value={{
        // Student
        student,
        setStudent,
        fetchStudent,

        // Skill Intelligence
        skillIntelligence,
        setSkillIntelligence,
        fetchSkillIntelligence,

        // Loading
        loading,
        skillLoading,
        setLoading,
      }}>
      {children}
    </CareerContext.Provider>
  );
};
