import { createContext, useContext, useState, useMemo } from "react";

type School = {
  id_school: number;
  name: string;
  role: "teacher" | "director";
};

type SchoolContextType = {
  activeSchool: School | null;
  selectSchool: (school: School) => void;
  leaveSchool: () => void;
};

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error("useSchool debe ser usado dentro de un SchoolProvider");
  }
  return context;
};

export const SchoolProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSchool, setActiveSchool] = useState<School | null>(null);

  const selectSchool = (school: School) => setActiveSchool(school);
  const leaveSchool = () => setActiveSchool(null);

  const value = useMemo(
    () => ({
      activeSchool,
      selectSchool,
      leaveSchool,
    }),
    [activeSchool]
  );

  return (
    <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>
  );
};