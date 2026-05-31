"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { TuserProps } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/admin/alert-modal";
import { MoreHorizontal, Trash } from "lucide-react";
import { deleteUser } from "@/features/user/services/userService";

export default function CellAction({ data }: { data: TuserProps }) {
	const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Thêm loading cho chuyên nghiệp

    const onDelete = async () => {
        try {
            setLoading(true);
            // Component chỉ việc gọi hàm, không cần biết axios hay link gì cả
			await deleteUser(data.id.toString()); 
            toast.success("User deleted.");
            router.refresh();
        } catch (error) {
            console.error(error); // Em có thể log error chi tiết hơn nếu muốn
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
				loading={loading} // Truyền loading vào để disable nút khi đang xóa
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
						onClick={() => setOpen(true)}>
						<Trash className="w-4 h-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
