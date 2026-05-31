"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import toast from "react-hot-toast";
import { TuserProps } from "@/types";
import { useForm } from "react-hook-form";
import { getToken } from "@/features/auth/lib/get-token";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { TUserProfileProps, userProfileSchema } from "@/features/auth/schemas";
import { getUserProfile, updateUserProfile } from "../services/profileService";
import { getImageUrl } from "@/features/user/services/urlService";


export default function Setting() {
    const router = useRouter();
    const token = getToken("authToken");
    const [user, setUser] = useState<TuserProps>();
    
    // State lưu file gốc để gửi lên server (nhẹ hơn blob logic cũ)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // State để hiển thị ảnh preview
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string>("");

    // 1. Fetch dữ liệu dùng Service
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const data = await getUserProfile(token);
                setUser(data.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [token]);

    const form = useForm<TUserProfileProps>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: user || { name: "", email: "", image: "" },
        values: user ? { ...user, image: "" } : undefined, // Update form khi có data user
    });

    const { formState: { isSubmitting } } = form;

    // 2. Xử lý khi chọn ảnh (Logic gọn hơn)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageError("");
        const file = e.target.files?.[0];

        if (!file) return;

        // Validate cơ bản
        if (!file.type.startsWith("image/")) {
            setImageError("File must be an image");
            return;
        }

        // Lưu file gốc để tí gửi cho Service
        setSelectedFile(file);

        // Tạo preview ảnh (chỉ để hiển thị)
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    // 3. Submit Form dùng Service
    const onSubmits = async (data: TUserProfileProps) => {
        if (!user?.id || !token) return;

        try {
            // Gọi Service update, truyền file gốc vào
            await updateUserProfile(user.id.toString(), data, selectedFile, token);
            
            toast.success("Profile updated.");
            router.refresh();
            // window.location.reload(); // Không nên dùng reload trong Next.js, router.refresh() là đủ
        } catch (error: any) {
            console.error(error);
            // Xử lý lỗi trả về từ API (đã lược bớt cho gọn, em có thể giữ nguyên logic cũ nếu muốn)
            const msg = error?.response?.data?.messages?.email?.[0] || "Something went wrong";
            toast.error(msg);
        }
    };

    // Xử lý link ảnh hiển thị (Ưu tiên: Preview -> Ảnh từ DB -> Placeholder)
    const displayImage = previewImage || getImageUrl(user?.image) || 'https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png';

    return (
        <div className="w-[60%] padding-x padding-y">
            <div className="flex items-center justify-between py-2">
                <AnimatedText
                    className="heading font-gradient-regular tracking-tight leading-tight text-black"
                    text="Profile Settings"
                />
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmits)} className="space-y-4 w-full py-5">
                    {/* Các field Name, Email giữ nguyên */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl><Input placeholder="Name" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input placeholder="Email" type="email" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Field Image đã được làm gọn */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Profile Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            handleFileChange(e);
                                            // field.onChange(e.target.files); // Không cần thiết bind vào form state nếu gửi file riêng
                                        }}
                                    />
                                </FormControl>
                                {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center gap-2">
                        <Image
                            src={displayImage}
                            alt="Profile"
                            className="w-40 h-40 object-cover rounded-md" // Thêm rounded cho đẹp
                            width={160}
                            height={160}
                        />
                    </div>

                    <Button disabled={isSubmitting} type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
        </div>
    );
}