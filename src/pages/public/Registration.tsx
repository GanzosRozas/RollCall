import Login from "@/components/Login";
import Signin from "@/components/Signin";
import { Button } from "@/components/ui/button";
import { useState } from "react";
function Access() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Fondo fijo */}
      
      <div
        className="absolute inset-0 
                      bg-[url('/src/assets/libraryOP.webp')] 
                      bg-cover bg-center bg-no-repeat"
      />

 
        <Button
          onClick={() => setIsLogin(!isLogin)}
          className={`absolute top-6 z-50 
                      px-6 py-2 text-sm font-medium
                      cursor-pointer hover:border-primary border
                      transition-all duration-700 ease-in-out
                      ${isLogin 
                        ? "left-1/2 -translate-x-full" 
                        : "left-1/2 translate-x-0"}`}
        >
          {isLogin ? "Registrate" : "Iniciar sesion "}
        </Button>
      {/* Panel que SIEMPRE existe */}
      <div
        className={`absolute top-0 h-full w-1/2 
                    bg-primary shadow-2xl
                    transition-all duration-700 ease-in-out
                    ${isLogin ? "left-0" : "left-1/2"}`}
      >
        <div className="h-full flex items-center  justify-center">
          {isLogin ? <Login /> : <Signin />}
        </div>
        {/* BOTÓN centrado en la división */}
      </div>
    </div>
  );
}

export default Access;
