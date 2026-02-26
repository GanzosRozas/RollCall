import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { IterationCw } from "lucide-react";

import Settings from "@/components/Settings";
// import {getUser} from "@/services/Information.services.ts"
import { useState, useEffect } from 'react';
const user = {
  id: 1,
  name: "Javier Rosas",
  email: "javier.rosas@example.com",
  roll: "Director"
}
const itemsMain = [
  {
    title: "Scanner",
    url: "scanner",
    icon: IterationCw,
  },
  {
    title: "Matriculación",
    url: "matriculation",
    icon: IterationCw,
  },

  {
    title: "Generar QR",
    url: "QRgenerator",
    icon: IterationCw,
  },
    {
    title: "Calendario",
    url: "Calender",
    icon: IterationCw,
  },
  {    title: "Contenido",
    url: "contents",
    icon: IterationCw,  },
...(user.roll ==="Director" ? [{
    title: "Graficas",
    url: "graphs",
    icon: IterationCw,
  }] : [])

];
const itemsInitial = [
  {
    title: "Unirse a una escuela",
    url: "unirse-escuela",
    icon: IterationCw,
  },
  {
    title: "Crear Escuela",
    url: "crear-escuela",
    icon: IterationCw,
  },

  {
    title: "Mostrar escuela a la que perteneces",
    url: "escuela-perteneciente",
    icon: IterationCw,
  },
];

function MainNavigation() {
  interface User {
  id: number;
  name: string;
  email: string;
}

// const [user, setUser] = useState<User | null>(null);

//       useEffect(() => {
//     // Llamada asincrónica a getUser
//     getUser().then((res) => {
//       setUser(res); // Guardamos el usuario en el estado
//     });
//   }, []); 
  return (
    <Sidebar collapsible="icon" variant="inset" className="bg-primary text-primary-foreground  ">
      <SidebarHeader className="bg-primary" title="Titulo">Menu</SidebarHeader>

      <SidebarContent className="bg-primary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground opacity-50">Application</SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu>
              {itemsMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter title="Footer" className="bg-primary">
       {/* <p>Bienvenido, {user ? user.name : 'Cargando...'}</p>
       <p>{user ? user.email : 'Cargando...'}</p> */}

        <Settings/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
function InitialNavigation() {
  interface User {
  id: number;
  name: string;
  email: string;
}

// const [user, setUser] = useState<User | null>(null);

//       useEffect(() => {
//     // Llamada asincrónica a getUser
//     getUser().then((res) => {
//       setUser(res); // Guardamos el usuario en el estado
//     });
//   }, []); 
  return (
    <Sidebar collapsible="icon" variant="inset" className="bg-primary text-primary-foreground ">
      <SidebarHeader className="bg-primary " title="Titulo">Menu</SidebarHeader>

      <SidebarContent className="bg-primary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground  opacity-50">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsInitial.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter title="Footer" className="bg-primary">
       {/* <p>Bienvenido, {user ? user.name : 'Cargando...'}</p>
       <p>{user ? user.email : 'Cargando...'}</p> */}

        <Settings/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
export { MainNavigation, InitialNavigation };
