import { Button, } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import {Input } from "@/components/ui/input";
import {useState} from 'react'
import { Link,useNavigate } from "react-router";

function Login() {
    const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
//   const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Logging in...");

    try {
    //   await login(formValues); // 👈 usa el context
      navigate("/hours-register"); // 👈 redirige
    } catch (error) {
      setStatus("Credenciales incorrectas");
    }
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
         <form id="loginForm" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6 text-secondary">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  className="border-t-0  border-x-0 rounded-none  w-115"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                  className="border-t-0  border-x-0 rounded-none  w-115"
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6 border cursor-pointer">
                Iniciar sesión
              </Button>
            </form>
    </div>
)
}

export default Login;
