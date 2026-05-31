"use client";
import { useEffect, useState } from "react";
import { TproductsColumnProps } from "@/types";
import getProducts from "@/features/product/actions/get-products";
import Heading from "@/components/admin/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/product/container/columns";

export default function ProductAdminPage() {
  const [products, setProducts] = useState<TproductsColumnProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center justify-between">
          <Heading
            title={`Products (${products.length})`}
            description="Manage Products for your website."
          />
        </div>
        <Separator />
        <DataTable columns={columns} data={products} searchKey="title" />
      </div>
    </div>
  );
}
