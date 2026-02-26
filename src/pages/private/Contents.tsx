
import MainLayout from "@/layouts/MainLayout";

function Contents() {
  return (
    <MainLayout title="Contenido">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Contenido de la aplicación</h1>
        <p>Este es el contenido principal de la aplicación.</p>
      </div>
    </MainLayout>
  );
}

export default Contents;