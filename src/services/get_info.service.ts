const API_URL = "http://localhost:3001";

const getUser = async (): Promise<any> => {
  const response = await fetch(`${API_URL}/protected/getUser`, {
    method: "GET",
    credentials: "include",
  });
  const result = await response.json();

  return result.teacher;
};

const getOwnSchools = async (id_teacher: number): Promise<any> => {
  const response = await fetch(
    `${API_URL}/protected/getOwnSchool?id_teacher=${id_teacher}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const result = await response.json();
  // console.log(result);
  return result;
};
const getForeignSchools = async (id_teacher:number): Promise<any> => {
  const response = await fetch(
    `${API_URL}/protected/getForeignSchool?id_teacher=${id_teacher}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

const searchSchool = async(queary:string, id_teacher:number):Promise<any>=>{
    const response = await fetch(
    `${API_URL}/protected/searchSchool?q=${encodeURIComponent(queary)}&teacher=${id_teacher}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const result = await response.json();
  // console.log(result);
  return result;
}


export { getUser, getOwnSchools,getForeignSchools,searchSchool };
