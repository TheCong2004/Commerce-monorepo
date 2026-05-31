import {
	Dialog,
	DialogContent,
} from "@/components/ui/dialog";
import { TmodallProps } from "@/types";

export default function Modal({
	children,
	isOpen,
	onClose,
}: TmodallProps) {
	const onChange = (open: boolean) => {
		if (!open) {
			onClose();
		}
	};
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onChange}>
			<DialogContent
    className="border-0 bg-transparent p-0 shadow-none outline-none ring-0"
>
    {children}
</DialogContent>
		</Dialog>
	);
}
