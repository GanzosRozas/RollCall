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
import { QrGenerator } from "@/components/QrGenerator";
import { useState } from "react";
import { toast } from "sonner";
function SingleQR() {
  const [studentCreated, setStudentCreated] = useState<{
    name: string;
    curp: string;
  } | null>(null);
  const [formValues, setFormValues] = useState({
    curp: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target.name, e.target.value);
    setFormValues({
      ...formValues,
      [name]: name === "group" ? value.toUpperCase() : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setStudentCreated({
        name: `${formValues.curp} `,
        curp: formValues.curp,
      });

      toast.success("QR Creado");
    } catch (error) {
      toast.error("" + error);
    }
  };

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="flex justify-center content-center items-center w-full m-3">
        <FieldSet>
          <FieldLegend>Generar QR del alumno</FieldLegend>
          <FieldDescription>
            Ingresa toda la informacion necesaria para generar el QR del alumno.
            Asegurate de que toda la informacion sea correcta antes de enviar el
            formulario.
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
              <FieldLabel htmlFor="curp">CURP</FieldLabel>
              <Input
                id="curp"
                name="curp"
                onChange={handleInputChange}
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
              <Button onClick={handleSubmit}>Generar QR</Button>
              <Button variant="outline">Limpiar campos</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
      <div className="flex flex-col space-y-4 justify-center content-center items-center w-full">
        {studentCreated ? (
          <QrGenerator mode="single" value={formValues} />
        ) : (
          // tus skeletons actuales mientras no hay alumno registrado
          <>
            <Skeleton className="h-8 bg-primary w-[200px]" />
            <Skeleton className="bg-primary w-150 h-150" />
            <Skeleton className="h-8 bg-primary w-[200px]" />
          </>
        )}
      </div>
    </div>
  );
}

export default SingleQR;
