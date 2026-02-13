import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <header className="bg-primary h-24">
       
                  <img
            src="/src/assets/logo-_1_.svg"
            alt="teacher"
            className="max-h-24"
            
          />
      </header>

      {/* Contenido que ocupa lo restante */}
      <div className="flex flex-1 items-center px-10">
        
        <div className="flex flex-col gap-6 max-w-xl mx-25">
          <h1 className="text-[64px] ">
            Tecnología al servicio de las escuelas
          </h1>

          <p className="opacity-75">
            Asistencia sin papel, con datos claros y ordenados,
            actividades bajo control, todo en un solo sistema.
          </p>

          <div className="flex justify-evenly w-full">
            <Button className="rounded-2xl px-15">Comenzar</Button>
            <Button className="rounded-2xl px-15">Aprende más</Button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="/src/assets/teacher.jpg"
            alt="teacher"
            className="max-h-[680px] max-w-[580px] rounded-2xl object-cover"
          />
        </div>

      </div>
    </div>
  );
}
export default HomePage;
