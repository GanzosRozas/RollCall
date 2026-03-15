const API_URL = "http://localhost:3001";
type User = {
  id_teacher: number;
  name: string;
  last_name: string;
  last_name2: string;
  email: string;
};

type LoginResponse = {
  teacher: User;
};

export const loginRequest = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/access/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json()
 
  if (!res.ok) {
     throw new Error(result.message);
  }

  return result
};


export const signinSet = async (data: {
  name: string;
  last_name: string;
  last_name2: string;
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/access/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }
  return result

};

export const checkAuthRequest = async (): Promise<LoginResponse | null> => {
  const res = await fetch(`${API_URL}/access/i`, {
    credentials: "include",
  });

  if (!res.ok) return null;
  const result = await res.json()

  return result
};
