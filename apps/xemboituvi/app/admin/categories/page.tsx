"use client";
import { useEffect, useState } from "react";
import { TcategoryProps } from "@/types";
import getCategories from "@/features/category/actions/get-categories";
import Heading from "@/components/admin/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/category/container/columns";

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<TcategoryProps[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center justify-between">
          <Heading
            title={`Categories (${categories.length})`}
            description="Manage Categories for your website."
          />
        </div>
        <Separator />
        <DataTable columns={columns} data={categories} searchKey="title" />
      </div>
    </div>
  );
}
