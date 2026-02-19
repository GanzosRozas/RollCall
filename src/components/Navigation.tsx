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

const items = [
  {
    title: "Hours Register",
    url: "hours-register",
    icon: IterationCw,
  },
  {
    title: "History",
    url: "history",
    icon: IterationCw,
  },
  // {
  //   title: "Complete Record",
  //   url: "CompleteRecord",
  //   icon: IterationCw,
  // },
  {
    title: "Pays Records",
    url: "pays-records",
    icon: IterationCw,
  },
  // {
  //   title:'test table',
  //   url: 'test',
  //   icon: IterationCw,
  // }
];

function Navigation() {
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
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader title="Titulo">Menu</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
      <SidebarFooter title="Footer">
       {/* <p>Bienvenido, {user ? user.name : 'Cargando...'}</p>
       <p>{user ? user.email : 'Cargando...'}</p> */}

        <Settings/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default Navigation;
