import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (isAuthenticated) {

    navigate("/crear-escuela");
  }
}, [isAuthenticated]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
          await login(formValues); // 👈 usa el context
    
      toast.success("Inicio de sesion exitoso");
    } catch (error) {
      toast.error("" + error);
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
  );
}

export default Login;
