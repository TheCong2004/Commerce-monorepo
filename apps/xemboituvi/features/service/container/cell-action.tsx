"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import toast from "react-hot-toast";
import { TserviceColumnProps } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/admin/alert-modal";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { deleteService } from "../services/businessService";


export default function CellAction({ data }: { data: TserviceColumnProps }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Thêm loading

    const onDelete = async () => {
        try {
            setLoading(true);

            // Gọi hàm đã tách -> Code ngắn gọn, không lộ URL
            await deleteService(String(data.id));
            
            toast.success("Service deleted."); // Sửa text cho đúng ngữ cảnh
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading} // Disable nút khi đang xóa
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="flex items-center gap-x-2"
                        // Link edit này là chuyển trang nội bộ Next.js nên giữ nguyên
                        onClick={() => router.push(`/dashboard/services/${data.id}`)}>
                        <Edit className="w-4 h-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center gap-x-2"
                        onClick={() => setOpen(true)}>
                        <Trash className="w-4 h-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}