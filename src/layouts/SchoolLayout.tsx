import { useEffect } from "react";
import { Outlet, useParams, Navigate } from "react-router";
import { useSchool } from "@/context/SchoolContext";
import { useAuth } from "@/context/AuthContext";

const SchoolLayout = () => {
  const { schoolId } = useParams();
  const { activeSchool, selectSchool } = useSchool();
  const { user } = useAuth();

  useEffect(() => {
    // si recargó la página y perdió el context, lo recupera
    if (!activeSchool && schoolId && user) {
      fetch(`/api/schools/${schoolId}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => selectSchool(data.school))
        .catch(console.error);
    }
  }, [schoolId]);

  // si no hay escuela activa y todavía está cargando, muestra nada
  if (!activeSchool) return null;

  return <Outlet />;
};

export default SchoolLayout;