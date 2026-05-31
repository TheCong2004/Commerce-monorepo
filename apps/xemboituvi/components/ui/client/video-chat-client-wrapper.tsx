"use client";
import dynamic from "next/dynamic";

const Videochat = dynamic<{ slug: string; JWT: string }>(
	() => import("./video-chat"),
	{ ssr: false },
);

export default function VideoChatClientWrapper({
	slug,
	JWT,
}: {
	slug: string;
	JWT: string;
}) {
	return (
		<>
			<Videochat
				slug={slug}
				JWT={JWT}
			/>
		</>
	);
}
