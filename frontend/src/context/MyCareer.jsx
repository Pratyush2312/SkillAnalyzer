import { createContext, useEffect, useState } from "react";
import { api } from "../config/api";

export const CareerContext = createContext();

export const CareerContextProvider = ({ children }) => {
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
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

      fetchStudent();
    }, []);
    return <CareerContext.Provider value={{student, loading, setLoading, setStudent}}>
        { children}
    </CareerContext.Provider>
};
