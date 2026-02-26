
import MainLayout from "@/layouts/MainLayout";
function Calender() {

    const date = new Date();
    console.log(date);
  return (
    <MainLayout title="Calendario">
      <div className="flex w-full h-full justify-center items-center">
        Calendario
      </div>
    </MainLayout>
  );
}
export default Calender;