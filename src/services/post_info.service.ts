const API_URL = "http://localhost:3001";

const CreateSchoolService = async (data: {
  id_teacher: number;
  name_school: string;
  education_level: string;
      ICycle: string,
    FCycle: string,
    IPeriod1: string,
    IPeriod2: string,
    IPeriod3: string,
    FPeriod1: string,
    FPeriod2: string,
    FPeriod3: string,

  group: string;
}) => {
  const response = await fetch(`${API_URL}/protected/createSchool`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result;
};

const JoinToSchool = async (data: {
  id_school: number;
  id_teacher: number;
}) => {
  const response = await fetch(`${API_URL}/protected/joinToSchool`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
  console.log(response.json);
  return result;
};
const CreateStudent = async (data: {
  name: string;
  lastName_P: string;
  lastName_M: string;
  curp: string;
  grade: string;
  group: string;
}) => {
  const response = await fetch(`${API_URL}/protected/createStudent`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
  console.log(response.json);
  return result;
};
const RollCall= async(data:{id_school:number|null,curp:string,date:string})=>{
  // console.log('datos del sevice',data)
    const response = await fetch(`${API_URL}/protected/rollCall`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log('respuesta',response);
  const status = await response.status
  const result = await response.json();
  console.log('result',result)
  // console.log(response.json);
  // return result;
  return {result,status}
}

export { CreateSchoolService, JoinToSchool, CreateStudent,RollCall };
