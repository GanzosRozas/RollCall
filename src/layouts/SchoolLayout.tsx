import { useEffect } from "react";
import { Outlet, useParams, Navigate } from "react-router";
import { useSchool } from "@/context/SchoolContext";
import { useAuth } from "@/context/AuthContext";
import { getSchoolById } from "@/services/get_info.service";

const SchoolLayout = () => {
  const { schoolId } = useParams();
  
  console.log('layout 1 ',schoolId)

  const { activeSchool, selectSchool } = useSchool();
  const { user } = useAuth();

useEffect(() => {
  if (!activeSchool && schoolId && user) {
    getSchoolById(Number(schoolId), user.id_teacher)
      .then((school) => selectSchool(school))
      .catch(console.error);
  }
}, [schoolId]);

  // si no hay escuela activa y todavía está cargando, muestra nada
  if (!activeSchool) return null;

  return <Outlet />;
};

export default SchoolLayout;