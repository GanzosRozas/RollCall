import React from "react";
import {InitialNavigation} from "@/components/Navigation";
import SiteHeader from "@/components/SiteHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
  title: string;
};

function InitialLayout({ children, title }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <InitialNavigation />
      <SidebarInset className="flex flex-col ">
        <SiteHeader title={title} />
        {/* Agregamos 'flex flex-col' para que herede la altura perfecta */}
        <main className="flex flex-1 flex-col min-h-0 overflow-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default InitialLayout;