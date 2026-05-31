"use client";
import { useEffect, useState } from "react";
import { TserviceColumnProps } from "@/types";
import getServices from "@/features/service/actions/get-services";
import Heading from "@/components/admin/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/service/container/columns";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<TserviceColumnProps[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center justify-between">
          <Heading
            title={`Services (${services.length})`}
            description="Manage Services for your website."
          />
        </div>
        <Separator />
        <DataTable columns={columns} data={services} searchKey="title" />
      </div>
    </div>
  );
}
