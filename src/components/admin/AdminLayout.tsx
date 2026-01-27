import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { ProtectedRoute } from "./ProtectedRoute";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8 lg:ml-0 pt-16 lg:pt-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
