"use client";
import { useEffect, useState } from "react";
// Define TsalesColumnProps here if not exported from "@/types"
import { TsalesColumnProps } from "@/types";
import getSales from "@/features/sales/actions/get-sales";
import Heading from "@/components/admin/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/sales/container/columns";

export default function SalesAdminPage() {
  const [sales, setSales] = useState<TsalesColumnProps[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await getSales();
        setSales(response);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center justify-between">
          <Heading
            title={`Sales (${sales.length})`}
            description="Manage Sales for your website."
          />
        </div>
        <Separator />
        <DataTable<TsalesColumnProps, unknown> columns={columns} data={sales} searchKey="name" />
      </div>
    </div>
  );
}
