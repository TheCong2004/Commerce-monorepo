"use client";
import Heading from "@/components/admin/heading";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-4 flex-col">
        <Heading
          title="Admin Dashboard"
          description="Welcome to the admin dashboard."
        />
        <Separator />
        <div className="mt-4">
          {/* Add dashboard widgets or summary here */}
          <p>This is the admin dashboard page.</p>
        </div>
      </div>
    </div>
  );
}
