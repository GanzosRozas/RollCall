import React from "react";
import Navigation from "@/components/Navigation";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Navigation />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <SidebarTrigger />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default MainLayout;
