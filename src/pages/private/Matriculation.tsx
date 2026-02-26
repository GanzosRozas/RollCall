import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {RegistroAlumnos } from "@/components/Matriculacion";
import MainLayout from "@/layouts/MainLayout";
import {useState} from "react";
function Matriculation() {
const views: Record<string,React.ReactNode> = {
  "plus": <RegistroAlumnos />
}
const [plan, setPlan] = useState("plus");
  return (
    <MainLayout title="Matriculación">
      <div>
        <RadioGroup defaultValue="plus" onValueChange={(value)=>setPlan(value)} className=" flex">
          <FieldLabel htmlFor="plus-plan">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Registro por primera vez</FieldTitle>
                <FieldDescription>
                  Selecciona esta opcion si es que el alumno nunca antes habia sido registrado en el sistema.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="plus" id="plus-plan" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="pro-plan">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Promocion de grado</FieldTitle>
                <FieldDescription>Selecciona esta opcion</FieldDescription>
              </FieldContent>
              <RadioGroupItem value="pro" id="pro-plan" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="enterprise-plan">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Dar de baja</FieldTitle>
                <FieldDescription>
                  Dar de baja a un alumno que ya esta registrado.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="enterprise" id="enterprise-plan" />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </div>
      <div className="flex w-full h-full ">
        {views[plan]}
      </div>
    </MainLayout>
  );
}

export default Matriculation;
