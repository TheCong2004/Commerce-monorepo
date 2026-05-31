"use client";
import { useEffect, useState } from "react";
import { TordersProps } from "@/types";
import getOrders from "@/features/order/actions/get-orders";
import Heading from "@/components/admin/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/order/container/columns";

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<TordersProps[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center justify-between">
          <Heading
            title={`Orders (${orders.length})`}
            description="Manage Orders for your website."
          />
        </div>
        <Separator />
        <DataTable columns={columns} data={orders} searchKey="name" />
      </div>
    </div>
  );
}
