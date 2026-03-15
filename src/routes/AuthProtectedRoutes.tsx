import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { SchoolProvider } from "@/context/SchoolContext";

const AuthProtectedRoutes = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/acceso" replace />;
  }

  return (
    <SchoolProvider>
      <Outlet />
    </SchoolProvider>
  );
};

export default AuthProtectedRoutes;