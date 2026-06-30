"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const BARE_ROUTES = ["/login"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.includes(pathname);

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <div className="ml-60">
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </>
  );
}
