import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarProvider } from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 bg-gray-50 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}