import MainLayout from "@/layouts/MainLayout";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function Scanner() {
  const information = false;
  const name = "Juan Perez";
  const group = "A";
  const grade = "3ro";
  const curp = "PEJJ800101HDFRRL09";
  const entryTime = "08:00 AM";
  return (
    <MainLayout title="Scanner">
      {/* Usamos flex-1 en lugar de h-full para llenar el main sin desbordar */}
      <div className="flex flex-1 w-full overflow-hidden min-h-0">
        <ResizablePanelGroup
          orientation="horizontal"
          className="rounded-lg min-h-0"
        >
          {/* defaultSize debe ser NÚMERO (ej: 50 en lugar de "50%") */}
          <ResizablePanel defaultSize={50}>
            {/* <div className="flex justify-center pt-9 text-2xl">
              <h1>Informacion del alumno</h1>
            </div> */}
            <div className="flex h-full items-center justify-center p-6">
              <Card className="relative mx-auto w-full max-w-sm pt-0">
                <CardHeader>
                  <CardTitle>Informacion del alumno</CardTitle>
                  <CardDescription>
                    Se mostrara la informacion del alumno escaneado, como su
                    nombre,grupo, hora de entrada del dia de hoy, etc.
                  </CardDescription>
                  <CardAction>
                    <Badge variant="secondary">Featured</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  {information ? (
                    <>
                      {" "}
                      <p>Id</p>
                      <p>Nombre: {name}</p>
                      <p>Grupo: {group}</p>
                      <p>Grado: {grade}</p>
                      <p>CURP: {curp}</p>
                      <p>Hora de entrada: {entryTime}</p>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <Skeleton className="h-4 w-2/3 bg-primary" />
                      <Skeleton className="h-4 w-2/3 bg-primary" />
                      <Skeleton className="h-4 w-2/3 bg-primary" />
                      <Skeleton className="h-4 w-2/3 bg-primary" />
                      <Skeleton className="h-4 w-2/3 bg-primary" />
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  {information ? (
                    <p className="text-green-500">Alumno presente</p>
                  ) : (
                    <Skeleton className="h-10 w-full bg-primary" />
                  )}
                </CardFooter>
              </Card>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel defaultSize={50}>
                {/* <div className="flex justify-center pt-9 text-2xl">
                  <h1>Faltas en la semana</h1>
                </div> */}
                <div className="flex h-full items-center justify-center p-6">
                  <Card className="relative mx-auto w-full max-w-sm pt-0">
                    <CardHeader>
                      <CardAction>
                        <Badge variant="secondary">Featured</Badge>
                      </CardAction>
                      <CardTitle>Faltas en la semana</CardTitle>
                      <CardDescription>
                        Se mostrara el numero de faltas que tiene el alumno en
                        la semana, para saber si es necesario tomar alguna
                        accion.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {information ? (
                        <div className="flex space-x-8">
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>L</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>Mi</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>J</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>V</AvatarFallback>
                          </Avatar>
                        </div>
                      ) : (
                        <div className="flex space-x-8">
                          <Skeleton className="h-4 w-2/3 bg-primary" />
                          <Skeleton className="h-4 w-2/3 bg-primary" />
                          <Skeleton className="h-4 w-2/3 bg-primary" />
                          <Skeleton className="h-4 w-2/3 bg-primary" />
                          <Skeleton className="h-4 w-2/3 bg-primary" />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      {information ? (
                        <p className="text-green-500">Alumno presente</p>
                      ) : (
                        <Skeleton className="h-10 w-full bg-primary" />
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                {/* <div className="flex justify-center pt-9 text-2xl">
                  <h1>Informacion adicional</h1>
                </div> */}
                <div className="flex h-full items-center justify-center p-6">
                  <Card className="relative mx-auto w-full max-w-sm pt-0">
                    <CardHeader>
                      <CardAction>
                        <Badge variant="secondary">Featured</Badge>
                      </CardAction>
                      <CardTitle>Informacion adicional</CardTitle>
                      <CardDescription>
                        Reportes o informacion adicional del alumno, como su
                        promedio, faltas totales, etc.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {information ? (
                        <div>
                          {" "}
                          <p className="text-red-500">{name} tiene un reporte pendiente</p>
                        </div>
                      ) : (
                        <>
                          {" "}
                          <Skeleton className="h-4 w-2/3 bg-primary" />

                        </>
                      )}
                    </CardContent>
                    <CardFooter>
                      {information ? (
                        <p className="text-green-500">Alumno presente</p>
                      ) : (
                        <Skeleton className="h-10 w-full bg-primary" />
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </MainLayout>
  );
}

export default Scanner;
