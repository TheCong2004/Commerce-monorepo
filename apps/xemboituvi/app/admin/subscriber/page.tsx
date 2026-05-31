"use client";
import { useEffect, useState } from "react";
import { TsubscribersColumnProps } from "@/types";
import getSubscriber from "@/features/subscriber/actions/get-subscriber";
import Heading from "@/components/admin/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/subscriber/container/subscriber-columns";

export default function SubscriberAdminPage() {
  const [subscribers, setSubscribers] = useState<TsubscribersColumnProps[]>([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await getSubscriber();
        setSubscribers(response);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };
    fetchSubscribers();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center justify-between">
          <Heading
            title={`Subscribers (${subscribers.length})`}
            description="Manage Subscribers for your website."
          />
        </div>
        <Separator />
        <DataTable columns={columns} data={subscribers} searchKey="email" />
      </div>
    </div>
  );
}
