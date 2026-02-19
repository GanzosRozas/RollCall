import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
function Signin() {
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    lastName2: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  //   const {signup}= useAuth()
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Creating account...");
    try {
      //   await signup(formValues); // 👈 usa el context
      navigate("/hours-register"); // 👈 redirige
    } catch (error) {
      setStatus("Credenciales incorrectas");
    }
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      <form onSubmit={handleSubmit} id="signupForm">
        <div className="flex flex-col gap-6 text-secondary">
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
            <Label htmlFor="lastName">Apellido Paterno</Label>
            <Input
            className="border-t-0  border-x-0 rounded-none"
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Tu apellido paterno"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName2">Apellido Materno</Label>
            <Input
            className="border-t-0  border-x-0 rounded-none"
              id="lastName2"
              type="text"
              name="lastName2"
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
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <Input
            className="border-t-0 border-x-0 rounded-none"
              id="password"
              type="password"
              name="password"
              required
              onChange={handleInputChange}
            />
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
