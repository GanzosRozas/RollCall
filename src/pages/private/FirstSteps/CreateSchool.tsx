import { useState } from "react";
import InitialLayout from "@/layouts/InitialLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
function CreateSchool() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <InitialLayout title="Crear Escuela">
      <div className="flex h-full m-3">
        <div className=" w-1/2 border">
          <h1 className="text-2xl font-bold mb-2">
            ¡Bienvenido al proceso de creación de tu escuela!
          </h1>
          <p className="text-gray-600 mb-6">
            Sigue los pasos para configurar tu escuela y empezar a gestionar tus
            clases.
          </p>
        </div>

        <div className=" w-1/2 mx-auto space-y-6 border ">
          <div className="relative overflow-hidden min-h-[200px] h-3/4 p-5">
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
                  <Label>Nombre de la Escuela</Label>
                  <Input placeholder="Escuela Primaria Benito Juárez" />
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
                  <Label>Cantidad de Grados</Label>
                  <Input required type="number" max={6} min={1} placeholder="6" />

                  <Label >Cantidad de Grupos por Grado</Label>
                  <Label className="text-sm text-gray-500">
                    (Ejemplo: si tienes los grados A, B y C, ingresa A,B,C sin olvidar las comas)
                  </Label>
                  <Input required placeholder="A,B,C,D,E,F" className="uppercase"/>

                  
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
                  <h3 className="text-lg font-semibold">
                    Confirmar información
                  </h3>


                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="">
            <Progress value={(step / totalSteps) * 100} />
            <div className="m-5 space-x-5">

            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Atrás
              </Button>
            )}
            {step === 3 ? (
              <Button onClick={() => toast.success("¡Escuela creada!")}>Finalizar</Button>
            ) : (
              <Button className="position-" onClick={nextStep}>Siguiente</Button>
            )}
            </div>
          </div>
        </div>
      </div>
    </InitialLayout>
  );
}

export default CreateSchool;
