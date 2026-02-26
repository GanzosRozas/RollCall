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
} from "@/components/ui/drawer"
import { toast } from "sonner"
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
} from "@/components/ui/card"
import { Search } from "lucide-react";

function JoinSchool() {
  const schools = [
    {
      id: 1,
      name: "Escuela Primaria ABC",
      director: "Juan Pérez",
    },
    {
      id: 2,
      name: "Instituto Secundario XYZ",
      director: "María Gómez",
    }
  ]
  return (
    <InitialLayout title="Unirse a una Escuela">
      <div>
        <div className=" p-5 flex flex-col gap-4">
          <Label>Buscar Escuela</Label>
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
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
            <div key={school.id}>
              <Drawer>
                <DrawerTrigger>
              <Card className="cursor-pointer w-80 hover:shadow-lg transition-shadow" onClick={() => console.log('hola'+school.id)}>
                <CardHeader>
                  <CardTitle>{school.name}</CardTitle>
                  <CardDescription>Director: {school.director}</CardDescription>
                </CardHeader>
              </Card>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{school.name}</DrawerTitle>
                  <DrawerDescription>
                    Director: {school.director}
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <button
                    className="bg-primary text-primary-foreground cursor-pointer px-4 py-2 rounded"
                    onClick={() => {
                      toast.success(`Has solicitado unirte a ${school.name}`);
                    }}
                  >
                    Solicitar Unirse
                  </button>
                </DrawerFooter>
              </DrawerContent>
              </Drawer>
            </div>
          ))
        }
        </div>
        </div>
      </div>
    </InitialLayout>
  );
}

export default JoinSchool;
