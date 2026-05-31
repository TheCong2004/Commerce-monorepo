"use client";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/admin/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import toast from "react-hot-toast";
import { TuserProps } from "@/types";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Check lại import AvatarFallback
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { logoutAdmin } from "../services/authService";
import { getImageUrl } from "../services/urlService";



export function NavUser({ user }: { user: TuserProps }) {
    const router = useRouter();
    const { isMobile } = useSidebar();

    // 1. Xử lý Logic Logout tách biệt
    const handleLogOut = () => {
        logoutAdmin(); // Component không cần biết xóa cookie tên gì, service lo
        toast.success("Logged out");
        router.push("/admin/login");
    };

    // 2. Xử lý Link ảnh một lần duy nhất
    const avatarUrl = getImageUrl(user.image);
    
    // 3. Tạo component con hoặc biến để render Avatar đỡ phải copy-paste 2 lần
    const UserAvatarBlock = () => (
        <Avatar className="h-8 w-8 rounded-lg">
            {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={user.name} />
            ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-primary text-primary-foreground">
                     {user.name.charAt(0).toUpperCase()}
                </div>
            )}
        </Avatar>
    );

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            
                            {/* Dùng lại block avatar */}
                            <UserAvatarBlock />

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}>
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                
                                {/* Dùng lại block avatar lần 2 -> Code ngắn hơn hẳn */}
                                <UserAvatarBlock />

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/dashboard/account`}>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Settings />
                                    Account
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </Link>
                        <DropdownMenuSeparator />
                        {/* Gọi hàm handleLogOut đã tách logic */}
                        <DropdownMenuItem onClick={handleLogOut}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}