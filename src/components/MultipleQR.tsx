import { columns, type Student } from "@/components/studentsTable/columns";
import { DataTable } from "@/components/studentsTable/data-table";
import { useEffect, useState } from "react";
import { useSchool } from "@/context/SchoolContext";
import { getDataStudent } from "@/services/get_info.service";
import { QrGenerator } from "./QrGenerator";
// async function getData(): Promise<Student[]> {
//   // Fetch data from your API here.
//   return [
//     {
//   id_student: 1,
//   curp: 'paorijpafp324',
//   student_name: 'pepe',
//   last_name_p: 'ochoa',
//   last_name_m: 'perez',
//   grade_name: '1ro',
//   group_name: 'A',
//   school_id: 12,
//     },
//     // ...
//   ]
// }

function MultipleQR() {
  const [data, SetData] = useState<Student[]>();
  const { activeSchool } = useSchool();
  const [curps,SetCurp]= useState<Student[]>()
  useEffect(() => {
    const func = async () => {
      const data = await getDataStudent(activeSchool?.id_school ?? 0);
      SetData(data);
      return;
    };
    func();
  }, [activeSchool?.id_school]);
  if (data) {
    return (
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data}
          onSelectionChange={(selected) => {
            console.log("Seleccionados:", selected);
           SetCurp(selected)
          }}
        />
        <QrGenerator mode="multiple" students={curps ?? []} />
      </div>
    );
  } else {
    return <div>hoal</div>;
  }
}

export default MultipleQR;
