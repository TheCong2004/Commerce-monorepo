"use client";


import Modal from "@/components/admin/modal";
import { LoginForm } from "@/components/ui/client";
import RegisterForm from "@/components/ui/client/register-form";
import useLoginModal from "@/features/auth/hooks/use-login-modal";

import useRegisterModal from "@/features/auth/hooks/use-register-modal";

export default function AuthModal() {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	return (
		<>
			<Modal
				isOpen={loginModal.isOpen}
				onClose={loginModal.onClose}
				
			>
				<LoginForm onClose={loginModal.onClose} />
			</Modal>
			<Modal
				isOpen={registerModal.isOpen}
				onClose={registerModal.onClose}
			
			>
				<RegisterForm onClose={registerModal.onClose} />
			</Modal>
		</>
	);
}
