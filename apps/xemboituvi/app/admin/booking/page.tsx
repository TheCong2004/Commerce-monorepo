"use client";
import { useEffect, useState } from "react";
import { TbookingsProps } from "@/types";
import getBookings from "@/features/booking/actions/get-bookings";
import Heading from "@/components/admin/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/booking/container/booking-columns";

export default function BookingAdminPage() {
  const [bookings, setBookings] = useState<TbookingsProps[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center justify-between">
          <Heading
            title={`Bookings (${bookings.length})`}
            description="Manage Bookings for your website."
          />
        </div>
        <Separator />
        <DataTable columns={columns} data={bookings} searchKey="name" />
      </div>
    </div>
  );
}
