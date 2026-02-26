import './App.css'
import {Outlet} from "react-router";
import { Toaster } from "@/components/ui/sonner"

function App() {

  return (
    <>
    {/* redireccion a las rutas */}
      <Outlet />
      {/* comopente que permite aparecer las notificaciones */}
      <Toaster/>
    </>
  )
}

export default App
