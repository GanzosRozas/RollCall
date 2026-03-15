const API_URL = "http://localhost:3001";

const CreateSchoolService = async (data: {
  id_teacher: number;
  name_school: string;
  education_level: string;

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
  //   const result = await response.json();
  //   console.log(result)
  console.log(response.json);
  return;
};

const JoinToSchool = async (data: {
  id_school:number
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
    console.log(result)
  console.log(response.json);
  return result
};


export {CreateSchoolService,JoinToSchool}
