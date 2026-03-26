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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getGroups, getGrades } from "@/services/get_info.service";
import { CreateStudent } from "@/services/post_info.service";
import { useSchool } from "@/context/SchoolContext";
import { QrGenerator } from "@/components/QrGenerator";
type Group = {
  id_group_class: number;
  name: string;
  id_school: number;
};
type Grade = {
  id_grade: number;
  name: string;
};
function StudentEnroll() {
  const [studentCreated, setStudentCreated] = useState<{
    name: string;
    curp: string;
  } | null>(null);

  const { activeSchool } = useSchool();
  const [groupsAvailable, setGroups] = useState<[Group]>();
  const [gradeAvailable, setGrades] = useState<[Grade]>();
  const [formValues, setFormValues] = useState({
    id_school: activeSchool?.id_school,
    name: "",
    lastName_P: "",
    lastName_M: "",
    curp: "",
    grade: "",
    group: "",
  });

  useEffect(() => {
    if (!activeSchool) return; // espera a que el context tenga la escuela

    const groups = async () => {
      const result = await getGroups(activeSchool.id_school);
      setGroups(result);
    };
    const grade = async () => {
      const result = await getGrades(activeSchool.id_school);
      setGrades(result);
    };

    grade();
    groups();
  }, [activeSchool?.id_school]); // 👈 se dispara cuando cambia la escuela

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
      await CreateStudent(formValues); // 👈 usa el context
      console.log(formValues);

      setStudentCreated({
        name: `${formValues.name} ${formValues.lastName_P}`,
        curp: formValues.curp,
      });

      toast.success("Estudiante registrado");
    } catch (error) {
      toast.error("" + error);
    }
  };

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="flex justify-center content-center items-center w-full m-3">
        <FieldSet>
          <FieldLegend>Registro del alumno</FieldLegend>
          <FieldDescription>
            Ingresa toda la informacion necesaria para registrar al alumno en el
            sistema. Asegurate de que toda la informacion sea correcta antes de
            enviar el formulario.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input
                onChange={handleInputChange}
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Javier "
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName_P">
                Apellido paterno completo
              </FieldLabel>
              <Input
                onChange={handleInputChange}
                id="lastName_P"
                name="lastName_P"
                autoComplete="off"
                placeholder="Rosas"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName_M">
                Apellido materno completo
              </FieldLabel>
              <Input
                id="lastName_M"
                name="lastName_M"
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Diaz"
              />
            </Field>
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
            <Field>
              <FieldLabel htmlFor="grado">Grado</FieldLabel>
              <Select
                onValueChange={(value) =>
                  setFormValues({
                    ...formValues,
                    grade: value,
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccione un grupo disponible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {gradeAvailable?.map((grade) => (
                      <SelectItem
                        key={grade.id_grade}
                        value={grade.id_grade.toString()}
                      >
                        {grade.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="group">Grupo</FieldLabel>
              <Select
                value={formValues.group}
                onValueChange={(value) =>
                  setFormValues({
                    ...formValues,
                    group: value,
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccione un grupo disponible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {groupsAvailable?.map((group) => (
                      <SelectItem key={group.id_group_class} value={group.name}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field orientation={"horizontal"}>
              <Button onClick={handleSubmit}>Registrar alumno</Button>
              <Button variant="outline">Limpiar campos</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
      <div className="flex flex-col space-y-4 justify-center content-center items-center w-full">
        {studentCreated ? (
          <QrGenerator
            mode="single"
            value={{curp:studentCreated.curp}}
            
          />
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

export { StudentEnroll };
