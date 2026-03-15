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
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getForeignSchools, searchSchool } from "@/services/get_info.service";
import { number } from "framer-motion";
import { JoinToSchool } from "@/services/post_info.service";
type School = {
  director_id: number;
  education_level_id: number;
  id_school: number;
  last_name: string;
  last_name2: string;
  name: String;
  school_name: String;
};

function JoinSchool() {
  const [schools, setSchools] = useState<School[]>([]);
  const { user } = useAuth();
  const [search,setSearch]=useState('')
  const[loading,setLoading]=useState(false)
  useEffect(() => {

    if (!user?.id_teacher) return;
    const getSchools = async () => {
      const result = await getForeignSchools(user ? user.id_teacher : 0);

      setSchools(
        result.map((school: any) => ({
          director_id: school.director_id,
          education_level_id: school.education_level_id,
          id_school: school.id_school,
          last_name: school.last_name,
          last_name2: school.last_name2,
          name: school.name,
          school_name: school.school_name,
        })),
      );
    };
    getSchools();
  }, [user]);

  useEffect(()=>{
    if(!user?.id_teacher)return

    if(!search.trim()){
      const getAll =async()=>{
        const result = await getForeignSchools(user.id_teacher)
        setSchools(result)
      }
      getAll()
      return
    }
    const timer = setTimeout(async()=>{
      setLoading(true)
      const result = await searchSchool(search,user.id_teacher)
      console.log(result)
      setSchools(result)
      setLoading(false)
    },400)
    return ()=> clearTimeout(timer)
  },[search,user])

  const Join = async (id_school: number) => {
    const id_teacher = user ? user.id_teacher : 0;

    const result = await JoinToSchool({ id_school, id_teacher });
    console.log(result);
    toast(result);
  };
  return (
    <InitialLayout title="Unirse a una Escuela">
      <div>
        <div className=" p-5 flex flex-col gap-4">
          <Label>Buscar Escuela</Label>
          <InputGroup  className="max-w-xs">
            <InputGroupInput name="search" value={search} onChange={(e)=> setSearch(e.target.value)} id="search" placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end"></InputGroupAddon>
          </InputGroup>
        </div>
        <div className=" flex flex-col gap-4 mt-4">
          <h1 className="text-xl font-bold pl-5">Escuelas disponibles</h1>
          <div className="flex flex-wrap w-full p-5 gap-4 mt-1">
            {schools.map((school) => (
              <div key={school.id_school}>
                <Drawer>
                  <DrawerTrigger>
                    <Card
                      className="cursor-pointer w-80 hover:shadow-lg transition-shadow"
                      onClick={() => console.log("hola" + school.id_school)}
                    >
                      <CardHeader>
                        <CardTitle>{school.school_name}</CardTitle>
                        <CardDescription>
                          Director:{" "}
                          {`${school.name}  ${school.last_name}  ${school.last_name2}`}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>{school.school_name}</DrawerTitle>
                      <DrawerDescription>
                        Director:{" "}
                        {`${school.name}  ${school.last_name}  ${school.last_name2}`}
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <button
                        className="bg-primary text-primary-foreground cursor-pointer px-4 py-2 rounded"
                        onClick={() => {
                          console.log(school.id_school);
                          Join(school.id_school);
                        }}
                      >
                        Solicitar Unirse
                      </button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InitialLayout>
  );
}

export default JoinSchool;
