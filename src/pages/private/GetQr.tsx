import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SingleQR from "@/components/SingleQR";
import MultipleQR from "@/components/MultipleQR.tsx";
import MainLayout from "@/layouts/MainLayout";
import {useState} from "react";
function GetQr() {
const views: Record<string,React.ReactNode> = {
  "SingleQR": <SingleQR/>,
  "MultiQR": <MultipleQR/>
}
const [plan, setPlan] = useState("SingleQR");
  return (
    <MainLayout title="Generador de QR">
      <div>
        <RadioGroup defaultValue="SingleQR" onValueChange={(value)=>setPlan(value)} className=" flex">
          <FieldLabel htmlFor="SingleQR">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Unica Cansulta</FieldTitle>
                <FieldDescription>
                  Selecciona esta opcion si ocupas imprimir o descargar un unico QR por hoja
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="SingleQR" id="SingleQR" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="MultiQR">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Multiple consulta</FieldTitle>
                <FieldDescription>Selecciona esta opcion si ocupas imprimir o descargar multiples QR por hoja </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="MultiQR" id="MultiQR" />
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

export default GetQr;

