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
import { useSchool } from "@/context/SchoolContext";
import { useEffect, useRef, useState } from "react";
import { useQRScanner } from "@/hooks/UseQrScanner";
import { RollCall } from "@/services/post_info.service";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type RollCallType = {
  id_school: number | null;
  curp: string;
  date: string;
  time: string;
};

interface QRData {
  raw: string;
  parsed: Record<string, string> | null;
  timestamp: Date;
}
type Student = {
  name: string;
  group: string;
  grade: string;
  curp: string;
};
function Scanner() {
  // const information = false;

  const [information, setInformation] = useState(false);
  const { activeSchool } = useSchool();
  const [scans, setScans] = useState<QRData[]>([]);
  const [last, setLast] = useState<string | null>(null);
  const [weekAttendance, setWeekAttendance] = useState<
    { day: number; status: string }[]
  >([]);

  const todayNumber = new Date().getDay();

  const days = [
    { label: "L", dayNumber: 0 },
    { label: "M", dayNumber: 1 },
    { label: "Mi", dayNumber: 2 },
    { label: "J", dayNumber: 3 },
    { label: "V", dayNumber: 4 },
  ];
  const [studentValid, setStudent] = useState<Student>({
    name: "",
    group: "",
    grade: "",
    curp: "",
  });
  const [formValues, setFormValues] = useState<RollCallType>({
    id_school: activeSchool?.id_school ?? 0,
    curp: "",
    date: "",
    time: "",
  });

  useQRScanner({
    onScan: (data) => {
      const entry: QRData = {
        raw: data,
        parsed: null,
        timestamp: new Date(),
      };
      setLast(data);
      const day = new Date();
      const onlyDate = format(day, "yyyy-MM-dd"); // "2026-03-24"
      const onlyTime = format(day, "HH:mm:ss"); // "14:02:25"
      setFormValues({
        ...formValues,
        curp: data,
        date: onlyDate,
        time: onlyTime,
      });
      setScans((prev) => [entry, ...prev]);
    },
    minLength: 3,
    charInterval: 50,
  });

  useEffect(() => {
    const Query = async () => {
      const { status, result } = await RollCall(formValues);
      if (status == 200) {
        setInformation(true);
        setStudent({
          ...studentValid,
          name: `${result.studentInfo.student_name} ${result.studentInfo.last_name_p} ${result.studentInfo.last_name_m}`,
          curp: result.studentInfo.curp,
          group: result.studentInfo.group_name,
          grade: result.studentInfo.grade_name,
        });

        const formatted = result.attendance.map((day:{ date: string, status: string }) => {
          const date = day.date.split("T")[0];
          const dayNumber = new Date(date).getDay();
          return { day: dayNumber, status: day.status };
        });

        setWeekAttendance(formatted);
        // [
        //   { day: 1, status: "presente" },  // lunes
        //   { day: 2, status: "ausente" },   // martes
        //   ...
        // ]
      }
      else{
        setInformation(false)
      }
    };
    Query();
  }, [last]);

  function getAvatarColor(dayNumber: number) {
    if (dayNumber > todayNumber) return "bg-gray-300 text-gray-500";

    const found = weekAttendance.find((d) => d.day === dayNumber);

    if (!found) return "bg-gray-300 text-gray-500";
    if (found.status === "presente") return "bg-green-500 text-white";
    return "bg-red-500 text-white";
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    const day = new Date();
    const onlyDate = format(day, "yyyy-MM-dd"); // "2026-03-24"
    const onlyTime = format(day, "HH:mm:ss"); // "14:02:25"
    setFormValues({
      ...formValues,
      curp: value,
      date: onlyDate,
      time: onlyTime,
    });
    setLast(value);
  };
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
            <div className="m-5 gap-4 flex flex-col">
              <Label>Escaneo manual</Label>
              <Input name="preuba" onChange={handleInputChange}></Input>
            </div>
            <div className="flex h-full items-center justify-center p-6">
              <Card className="relative mx-auto w-full max-w-sm pt-0">
                {last ? (
                  <>
                    <strong>Último escaneo:</strong> {last}
                  </>
                ) : (
                  <em>Esperando escaneo...</em>
                )}
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
                      <p>Nombre:{studentValid.name}</p>
                      <p>Grupo: {studentValid.group}</p>
                      <p>Grado: {studentValid.grade}</p>
                      <p>CURP: {studentValid.curp}</p>
                      {/* <p>Hora de entrada: {entryTime}</p>{" "} */}
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
                          {days.map(({ label, dayNumber }) => (
                            <Avatar key={dayNumber}>
                              <AvatarImage src="" />
                              <AvatarFallback
                                className={getAvatarColor(dayNumber)}
                              >
                                {label}
                              </AvatarFallback>
                            </Avatar>
                          ))}
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
              {/* <ResizablePanel defaultSize={50}>

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
                          <p className="text-red-500">
                            {studentValid.name} tiene un reporte pendiente
                          </p>
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
              </ResizablePanel> */}
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </MainLayout>
  );
}

export default Scanner;
