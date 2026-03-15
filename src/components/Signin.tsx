import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { toast } from "sonner"
import { useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
function Signin() {
  const [formValues, setFormValues] = useState({
    name: "",
    last_name: "",
    last_name2: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    try {
      await signin(formValues); // 👈 usa el context
      toast.success('Cuenta creada con exito')
      //   await signup(formValues); // 👈 usa el context
      navigate("/crear-escuela"); // 👈 redirige
    } catch (error) {
      toast.error(''+error);

    }
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      <form onSubmit={handleSubmit} id="signupForm">
        <div className="flex flex-col gap-6 text-secondary">
          <h1 className=" justify-center  flex text-2xl font-semibold">
            Registrate
          </h1>
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              className="border-t-0  border-x-0 rounded-none  w-115"
              id="name"
              type="text"
              name="name"
              placeholder="Tu nombre"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last_name">Apellido Paterno</Label>
            <Input
              className="border-t-0  border-x-0 rounded-none"
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Tu apellido paterno"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last_name2">Apellido Materno</Label>
            <Input
              className="border-t-0  border-x-0 rounded-none"
              id="last_name2"
              type="text"
              name="last_name2"
              placeholder="Tu apellido materno"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="border-t-0  border-x-0 rounded-none"
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <InputGroup>
              <Input
                className="border-t-0 border-x-0 rounded-none"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleInputChange}
              />

              <InputGroupAddon align="inline-end">
                {showPassword ? (
                  <Eye
                    onClick={() => {
                      setShowPassword(false);
                    }}
                    className="cursor-pointer"
                  />
                ) : (
                  <EyeClosed
                    onClick={() => {
                      setShowPassword(true);
                    }}
                    className="cursor-pointer"
                  />
                )}
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <Button type="submit" className="w-full mt-6 border cursor-pointer">
          Crear cuenta
        </Button>
      </form>
    </div>
  );
}

export default Signin;
