
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

function QrGenerator() {
    return (
        <MainLayout title="Generador de QR">
         <div className="flex gap-4 w-full h-full">
      <div className="flex justify-center content-center items-center w-full m-3">
        <FieldSet>
          <FieldLegend>Generar QR del alumno</FieldLegend>
          <FieldDescription>
            Ingresa toda la informacion necesaria para generar el QR del alumno. Asegurate de que toda la informacion sea correcta antes de
            enviar el formulario.
          </FieldDescription>
          <FieldGroup>
            {/* <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input id="name" autoComplete="off" placeholder="Javier " />
            </Field>
            <Field>
              <FieldLabel htmlFor="apellido-paterno">
                Apellido paterno completo
              </FieldLabel>
              <Input
                id="apellido-paterno"
                autoComplete="off"
                placeholder="Rosas"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="apellido-materno">
                Apellido materno completo
              </FieldLabel>
              <Input
                id="apellido-materno"
                autoComplete="off"
                placeholder="Diaz"
              />
            </Field> */}
            <Field>
              <FieldLabel htmlFor="CURP">CURP</FieldLabel>
              <Input
                id="CURP"
                autoComplete="off"
                placeholder="RODJ920101HDFRRL09"
              />
            </Field>
            {/* <Field>
              <FieldLabel htmlFor="grado">Grado</FieldLabel>
              <Input type="number" max={6} min={1} id="grado" autoComplete="off" placeholder="1" />
            </Field>
            <Field>
              <FieldLabel htmlFor="grupo">Grupo</FieldLabel>
              <Input id="grupo" autoComplete="off" placeholder="A" />
            </Field> */}
            <Field orientation={"horizontal"}>
              <Button>Generar QR</Button>
              <Button variant="outline">Limpiar campos</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
      <div className="flex flex-col space-y-4 justify-center content-center items-center w-full">
        {

          <>
          <p>AGregar Boton de descarga para mandar a imprimir en un formato de 200px x 200px</p>
            <Skeleton className="h-8 bg-primary w-[200px]" />
            <Skeleton className=" bg-primary w-150 h-150" />
            <Skeleton className="h-8 bg-primary w-[200px]" />
          </>
        }
      </div>
    </div>
        </MainLayout>
    );
}

export default QrGenerator;