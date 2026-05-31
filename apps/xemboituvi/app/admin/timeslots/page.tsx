"use client";
import { useEffect, useState } from "react";
import { TtimeslotsColumnProps } from "@/types";
import getTimeSlots from "@/features/timeslots/actions/get-timeslots";
import Heading from "@/components/admin/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/timeslots/container/timeslots-columns";

export default function TimeslotsAdminPage() {
  const [timeslots, setTimeslots] = useState<TtimeslotsColumnProps[]>([]);

  useEffect(() => {
    const fetchTimeslots = async () => {
      try {
        const response = await getTimeSlots();
        setTimeslots(response);
      } catch (error) {
        console.error("Error fetching timeslots:", error);
      }
    };
    fetchTimeslots();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center justify-between">
          <Heading
            title={`Timeslots (${timeslots.length})`}
            description="Manage Timeslots for your website."
          />
        </div>
        <Separator />
        <DataTable columns={columns} data={timeslots} searchKey="status" />
      </div>
    </div>
  );
}
