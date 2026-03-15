import "./App.css";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        {/* redireccion a las rutas */}
        <Outlet />
        {/* comopente que permite aparecer las notificaciones */}
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
