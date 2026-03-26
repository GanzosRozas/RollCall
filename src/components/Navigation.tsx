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
import { icons, IterationCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Settings from "@/components/Settings";
import { getUser } from "@/services/get_info.service.ts";
import { useState, useEffect, useMemo } from "react";
import { useSchool } from "@/context/SchoolContext";
// const user = {
//   id: 1,
//   name: "Javier Rosas",
//   email: "javier.rosas@example.com",
//   roll: "Director"
// }

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
  const { user } = useAuth(); // 👈 del context, sin fetch extra
  const { activeSchool } = useSchool(); // 👈 para construir las URLs

  const itemsMain = [
    {
      title: "Scanner",
      url: `/escuela/${activeSchool?.id_school}/scanner`,
      icon: IterationCw,
    },
    {
      title: "Matriculación",
      url: `/escuela/${activeSchool?.id_school}/matriculation`,
      icon: IterationCw,
    },
    {
      title: "Generar QR",
      url: `/escuela/${activeSchool?.id_school}/QRgenerator`,
      icon: IterationCw,
    },
    {
      title: "Calendario",
      url: `/escuela/${activeSchool?.id_school}/calender`,
      icon: IterationCw,
    },
    {
      title: "Contenido",
      url: `/escuela/${activeSchool?.id_school}/contents`,
      icon: IterationCw,
    },
    // solo visible para directores
    ...(activeSchool?.role === "director"
      ? [
          {
            title: "Gráficas",
            url: `/escuela/${activeSchool?.id_school}/graphs`,
            icon: IterationCw,
          },
          {
            title:"Configuraciones de la escuela",
            url:`/escuela/${activeSchool?.id_school}/SchoolSettings`,
            icon:IterationCw
          }
        ]
      : []),
  ];

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="bg-primary text-primary-foreground"
    >
      <SidebarHeader className="bg-primary">
        {activeSchool?.name} {/* 👈 nombre de la escuela activa */}
      </SidebarHeader>

      <SidebarContent className="bg-primary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground opacity-50">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {" "}
                      {/* 👈 Link en lugar de <a> */}
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-primary">
        <p>
          Bienvenido,{" "}
          {user
            ? `${user.name} ${user.last_name} ${user.last_name2}`
            : "Cargando..."}
        </p>
        <p>{user?.email}</p>
        {/* 👈 botón para cambiar de escuela */}
        <Link
          to="/escuela-perteneciente"
          className="text-sm opacity-70 hover:opacity-100"
        >
          Cambiar escuela
        </Link>
        <Settings />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function InitialNavigation() {
  const { user } = useAuth();

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="bg-primary text-primary-foreground "
    >
      <SidebarHeader className="bg-primary " title="Titulo">
        Menu
      </SidebarHeader>

      <SidebarContent className="bg-primary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground  opacity-50">
            Application
          </SidebarGroupLabel>
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
        <p>
          Bienvenido,{" "}
          {user
            ? `${user.name} ${user.last_name} ${user.last_name2}`
            : "Cargando..."}
        </p>
        <p>{user ? user.email : "Cargando..."}</p>

        <Settings />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
export { MainNavigation, InitialNavigation };
