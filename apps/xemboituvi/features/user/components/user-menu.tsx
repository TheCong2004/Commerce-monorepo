"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image.js";
import toast from "react-hot-toast";
import { TuserProps } from "@/types";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { Book, Settings } from "lucide-react";
import { getToken } from "@/features/auth/lib/get-token";
import { GoListOrdered } from "react-icons/go";
import { getUserData } from "@/features/user/actions/get-user";
import { MdLogin, MdLogout } from "react-icons/md";
import useLoginModal from "@/features/auth/hooks/use-login-modal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { actionIconVariants, iconVariants, wrapperVariants } from "@/motion";
import { getImageUrl } from "@/features/user/services/urlService";

export default function UserMenu() {
	const token = getToken("authToken");
	const loginModal = useLoginModal();
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState<TuserProps>();

	const logOut = () => {
		Cookies.remove("authToken");
		toast.success("Logged out");
		setOpen(false);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			if (token) {
				try {
					const userData = await getUserData(token);
					setUser(userData);
				} catch (error) {
					console.error("Error fetching user data:", error);
					setUser(undefined);
				}
			}
		};
		fetchUserData();
	}, [token]);
const userAvatar = getImageUrl(user?.image) || 'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg';
	return (
		<div>
			<motion.div
				animate={open ? "open" : "closed"}
				className="relative">
				<button onClick={() => setOpen((pv) => !pv)}>
					<motion.span>
						<Image
                        src={userAvatar} // Code sạch bong, không còn hardcode
                        alt="user"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
					</motion.span>
				</button>
				<motion.ul
					initial={wrapperVariants.closed}
					variants={wrapperVariants}
					style={{ originY: "top", translateX: "-50%" }}
					className="flex flex-col p-2 rounded-lg bg-[#c7a743] text-white shadow-xl absolute top-[120%] -left-0 items-start overflow-hidden">
					{user ? (
						<>
							<Link
								className="w-full"
								href="/my-orders">
								<Option
									setOpen={setOpen}
									Icon={GoListOrdered}
									text="My Orders"
								/>
							</Link>
							<Link
								className="w-full"
								href="/my-bookings">
								<Option
									setOpen={setOpen}
									Icon={Book}
									text="My Bookings"
								/>
							</Link>
							<Link
								className="w-full"
								href="/setting">
								<Option
									setOpen={setOpen}
									Icon={Settings}
									text="Setting"
								/>
							</Link>
							<button
								className="w-full"
								type="button"
								onClick={logOut}>
								<Option
									setOpen={setOpen}
									Icon={MdLogout}
									text="Log Out"
								/>
							</button>
						</>
					) : (
						<button
							type="button"
							onClick={() => {
								setOpen(false);
								loginModal.onOpen();
							}}>
							<Option
								setOpen={setOpen}
								Icon={MdLogin}
								text="LogIn"
							/>
						</button>
					)}
				</motion.ul>
			</motion.div>
		</div>
	);
}

const Option = ({
	text,
	Icon,
	setOpen,
}: {
	text: string;
	Icon: IconType;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<motion.li
			variants={iconVariants}
			onClick={() => setOpen(false)}
			className="flex items-center gap-2 w-full py-2 px-4 text-[17px] font-medium font-sans whitespace-nowrap rounded-md hover:bg-indigo-100 text-white hover:text-indigo-500 transition-colors cursor-pointer">
			<motion.span variants={actionIconVariants}>
				<Icon />
			</motion.span>
			<span>{text}</span>
		</motion.li>
	);
};
