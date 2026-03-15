import InitialLayout from "@/layouts/InitialLayout";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { useSchool } from "@/context/SchoolContext"; // 👈 agregado
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getOwnSchools } from "@/services/get_info.service";
type School = {
  id_school: number;
  name: string;
  role: "teacher" | "director";
  // director: string;
};
function ShowSchoolBelonging() {
  const { user } = useAuth();
  const { selectSchool } = useSchool();
  const navigate = useNavigate();
  const [schools, setSchools] = useState<School[]>([]);
  useEffect(() => {
    if (!user?.id_teacher) return;

    const getSchools = async () => {
      const result = await getOwnSchools(user ? user.id_teacher : 0);
      console.log("resultado", result);
      setSchools(
        result.map((school: any) => ({
          id_school: school.id_school, // renombras aquí
          name: school.school_name,
          role: school.role,
        })),
      );
    };
    getSchools();
  }, [user]);

  const handleEnterSchool = (school: School) => {
    selectSchool(school);
    toast.success(`ingresando a ${school.name}`);
    navigate(`/escuela/${school.id_school}/scanner`);
  };

  return (
    <InitialLayout title="Monstrar Escuela a la que Pertenezco">
      <div>
        <div className=" flex flex-col gap-4 mt-4">
          <h1 className="text-xl font-bold pl-5">Escuelas disponibles</h1>
          <div className="flex flex-wrap w-full p-5 gap-4 mt-1">
            {schools ? (
              schools.map((school) => (
                <div key={school.id_school}>
                  <Drawer>
                    <DrawerTrigger>
                      <Card
                        className="cursor-pointer w-80 hover:shadow-lg transition-shadow"

                      >
                        <CardHeader>
                          <CardTitle>{school.name}</CardTitle>
                          <CardDescription>
                            {/* Director: {school.director} */}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>{school.name}</DrawerTitle>
                        <DrawerDescription>
                          {/* Director: {school.director} */}
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <button
                          className="bg-primary text-primary-foreground cursor-pointer px-4 py-2 rounded"
                          onClick={() => handleEnterSchool(school)}
                        >
                          Ir al menu de la escuela
                        </button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              ))
            ) : (
            <p className="pl-5 text-muted-foreground">No tienes escuelas asignadas.</p>
            )}
          </div>
        </div>
      </div>
    </InitialLayout>
  );
}

export default ShowSchoolBelonging;
