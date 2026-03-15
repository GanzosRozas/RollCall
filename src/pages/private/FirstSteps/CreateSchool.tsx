import { useEffect, useState } from "react";
import InitialLayout from "@/layouts/InitialLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { CreateSchoolService } from "@/services/post_info.service";
// import { getUser } from "@/services/get_info.service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateSchool() {
  const { user, loading } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const nextStep = () => {
    const currentInputs = document.querySelectorAll(
      "#school input",
    ) as NodeListOf<HTMLInputElement>;

    for (const input of currentInputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }

    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const [formValues, setFormValues] = useState({
    id_teacher: 0,
    name_school: "",

    education_level: "",
    group: "",
  });

  useEffect(() => {
    const funsion = async () => {
      //   const result = await getUser();
      //   console.log("resultado de useffect", result.id_teacher);
      // setFormValues({...formValues,id_teacher:result.id_teacher})
      console.log("useEffect", user?.id_teacher);
      setFormValues({ ...formValues, id_teacher: user ? user.id_teacher : 0 });
    };
    funsion();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target.name, e.target.value);
    setFormValues({
      ...formValues,
      [name]: name === "group" ? value.toUpperCase().replace(/\s/g, "") : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // await signin(formValues); // 👈 usa el context
      await CreateSchoolService(formValues);
      toast.success("Escuela creada con exito");
    } catch (error) {
      toast.error("" + error);
    }
  };
  if (loading) {
    console.log("cargando");
    return <div> no pues todavia no</div>;
  } else {
    // console.log(JSON.stringify(user))
    return (
      <InitialLayout title="Crear Escuela">
        <div className="flex h-full m-3">
          <div className=" w-1/2 border">
            <h1 className="text-2xl font-bold mb-2">
              ¡Bienvenido al proceso de creación de tu escuela!
            </h1>
            <p className="text-gray-600 mb-6">
              Sigue los pasos para configurar tu escuela y empezar a gestionar
              tus clases.
            </p>
          </div>

          <div className=" w-1/2 mx-auto space-y-6 border ">
            <div className="relative overflow-hidden  min-h-50 h-3/4 p-5">
              <form action="" id="school" noValidate>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <Label htmlFor="name_school">Nombre de la Escuela</Label>
                      <Input
                        id="name_school"
                        type="text"
                        name="name_school"
                        onChange={handleInputChange}
                        required
                        value={formValues.name_school}
                        placeholder="Escuela Primaria Benito Juárez"
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <Label htmlFor="grade">Cantidad de Grados</Label>
                      {/* <Input
                      required
                      type="number"
                      id="grade"
                      name="grade"
                      onChange={handleInputChange}
                      value={formValues.grade}
                      max={6}
                      min={1}
                      placeholder="6"
                    /> */}
                      <Select
                        value={formValues.education_level}
                        onValueChange={(value) =>
                          setFormValues({
                            ...formValues,
                            education_level: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione el nivel educativo" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Primaria">Primaria</SelectItem>
                            <SelectItem value="Secundaria">
                              Secundaria
                            </SelectItem>
                            <SelectItem value="Preparatoria">
                              Preparatoria
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Label htmlFor="group">
                        Cantidad de Grupos por Grado
                      </Label>
                      <Label className="text-sm  text-gray-500">
                        (Ejemplo: si tienes los grados A, B y C, ingresa A,B,C
                        sin olvidar las comas) ademas se creara un grupo por
                        grado que tenga el nivel academico
                      </Label>
                      <Label className="text-sm  text-gray-500">
                        Ejemplo (primaria y A) = 1A,2A,3A,4A,5A,6A
                      </Label>
                      <Label className="text-sm  text-gray-500">
                        Ejemplo (primaria y A,B) = 1A,2A,3A,4A,5A,6A y
                        1B,2B,3B,4B,5B,6B y asi por cada grupo agregado
                      </Label>
                      <Input
                        type="text"
                        name="group"
                        id="group"
                        onChange={handleInputChange}
                        value={formValues.group}
                        required
                        placeholder="A,B,C,D,E,F"
                        className="uppercase"
                      />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <h1 className="text-lg font-semibold">
                        Confirmar información
                      </h1>
                      <h2>Nombre de la escuela: {formValues.name_school}</h2>
                      <h2>
                        Nombre del director:{" "}
                        {user
                          ? `${user.name} ${user.last_name} ${user.last_name2}`
                          : ""}
                      </h2>
                      <h2>Nivel educativo: {formValues.education_level}</h2>
                      <h2>Cantidad de grupos: {formValues.group}</h2>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
            <div className="">
              <Progress value={(step / totalSteps) * 100} />
              <div className="m-5 space-x-5">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Atrás
                  </Button>
                )}
                {step === 3 ? (
                  <Button onClick={handleSubmit}>Finalizar</Button>
                ) : (
                  <Button
                    className="position-"
                    type="button"
                    onClick={nextStep}
                  >
                    Siguiente
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </InitialLayout>
    );
  }
}

export default CreateSchool;
