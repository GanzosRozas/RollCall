import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";

export default function Settings() {
//   const { session } = useSession();

  const  session  = 'true';
  const [section, setSection] = useState("accesibilidad");
  // ✅ RESTAURADO: Se añade "atajos" al tipo de estado
  const [subSection, setSubSection] = useState<"pantalla" | "sonido" | "dislexia" | "parkinson" | "atajos">("pantalla");


  const [AccActive, setAccActive] = useState(true);
  const [PerfilActive, setPerfilActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);



  let navigate = useNavigate();

  
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDark);
    document.documentElement.classList.toggle("dark", savedDark);

  })

  const handleSection = (Select: string) => {
    setSection(Select);
    setAccActive(Select === "accesibilidad");
    setPerfilActive(Select === "perfil");
  };

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem("darkMode", String(checked));
    document.documentElement.classList.toggle("dark", checked);
  };

  

  

  

  const renderAccesibilidadSubcontent = () => {
    switch (subSection) {
      case "pantalla":
        return (
          <div className="flex flex-col space-y-6 mt-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={darkMode}
                onCheckedChange={handleDarkModeChange}
                id="darkmode"
              />
              <Label className="text-text" htmlFor="darkmode">Modo oscuro</Label>
            </div>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (section) {
      case "accesibilidad":
        return (
          <>
            <DialogHeader className="text-text">
              <DialogTitle>Accesibilidad</DialogTitle>
              <DialogDescription>Ajustes visuales, auditivos, lectura y atajos.</DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 border-b pb-2 mt-4 flex-wrap">

              <button
                onClick={() => setSubSection("pantalla")}
                className={`px-4 py-2 rounded whitespace-nowrap  ${
                  subSection === "pantalla"
                    ?  "bg-primary text-card font-semibold shadow-md" : "hover:bg-primary hover:text-neutral text-card-foreground"
                }`}
              >
                Pantalla
              </button>






   
             
            </div>
            <div className="pb-10">{renderAccesibilidadSubcontent()}</div>
          </>
        );
      case "perfil":
        return (
          <>
            <DialogHeader>
              <DialogTitle className="">Perfil</DialogTitle>
              <DialogDescription>Opciones de cuenta.</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <button className="cursor-pointer hover:border-2  bg-primary text-primary-foreground rounded-2xl w-50 h-10 m-5" onClick={() => (navigate("/"))}>Cerrar sesión</button>
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
       
          className="mr-6 cursor-pointer hover:text-primary hover:bg-primary-foreground rounded-4xl transition-colors duration-200"
        >
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="flex h-full">
          <aside className="w-40 bg-card-foreground border-r p-4 flex flex-col space-y-3">

            <button
              onClick={() => handleSection("accesibilidad")}
              className={`block px-4 py-2 rounded  transition-colors duration-200 ${
                AccActive ? "bg-primary text-card font-semibold shadow-md" : "hover:bg-primary hover:text-neutral text-primary-foreground"
              }`}
            >
              Accesibilidad
            </button>
            {session?(

              <button
              onClick={() => handleSection("perfil")}
              className={`block px-4 py-2 rounded transition-colors duration-200 ${
                PerfilActive ?  "bg-primary text-card font-semibold shadow-md" : "hover:bg-primary hover:text-neutral text-primary-foreground"
                }`}
                >
              Perfil
            </button>
            ):null}

          </aside>
          <main className="flex-1 p-6 overflow-y-auto max-h-[80vh]">
            {renderContent()}
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}