"use client";

import ZoomVideo, {
	type VideoClient,
	type VideoPlayer,
	VideoQuality,
} from "@zoom/videosdk";
import { Button } from "../button";
import { PhoneOff } from "lucide-react";
import { useRef, useState } from "react";

const videoPlayerStyle: React.CSSProperties = {
	width: "100%",
	height: "600px",
	backgroundColor: "#000",
};

const Videocall = ({ slug, JWT }: { slug: string; JWT: string }) => {
	const session = slug;
	const jwt = JWT;

	const [inSession, setInSession] = useState(false);
	const client = useRef<ReturnType<typeof ZoomVideo.createClient>>(
		ZoomVideo.createClient(),
	);
	const videoContainerRef = useRef<HTMLDivElement>(null);

	const [isVideoMuted, setIsVideoMuted] = useState(true);
	const [isAudioMuted, setIsAudioMuted] = useState(true);

	// Join session
	const startCall = async () => {
		await client.current.init("en-US", "Global", { patchJsMedia: true });
		client.current.on("peer-video-state-change", renderVideo);

		const userName = `User-${new Date().getTime().toString().slice(-4)}`;
		await client.current.join(session, jwt, userName);

		setInSession(true);

		const mediaStream = client.current.getMediaStream();
		await mediaStream.startAudio();
		await mediaStream.startVideo();

		const currentUser = client.current.getCurrentUserInfo();
		setIsAudioMuted(currentUser?.muted ?? true);
		setIsVideoMuted(!currentUser?.bVideoOn);

		await renderVideo({ action: "Start", userId: currentUser?.userId });
	};

	// Render video
	const renderVideo = async (event: {
		action: "Start" | "Stop";
		userId: number;
	}) => {
		const mediaStream = client.current.getMediaStream();
		if (event.action === "Stop") {
			const element = await mediaStream.detachVideo(event.userId);
			(Array.isArray(element) ? element : [element]).forEach((el) =>
				el?.remove(),
			);
		} else {
			const userVideo = await mediaStream.attachVideo(
				event.userId,
				VideoQuality.Video_360P,
			);
			if (videoContainerRef.current && userVideo) {
				videoContainerRef.current.appendChild(userVideo as VideoPlayer);
			}
		}
	};

	// Leave session
	const leaveSession = async () => {
		client.current.off("peer-video-state-change", renderVideo);
		await client.current.leave();
		window.location.href = "/";
	};

	return (
		<div className="p-4">
			<h1 className="text-lg font-bold mb-4">Session: {session}</h1>

			{inSession && (
				<div className="mb-4">
					<div
						ref={videoContainerRef}
						style={videoPlayerStyle}
						className="rounded overflow-hidden"
					/>
				</div>
			)}

			{!inSession ? (
				<Button onClick={startCall}>Join</Button>
			) : (
				<div className="flex gap-2">
					<CameraButton
						client={client}
						isVideoMuted={isVideoMuted}
						setIsVideoMuted={setIsVideoMuted}
						renderVideo={renderVideo}
					/>
					<MicButton
						client={client}
						isAudioMuted={isAudioMuted}
						setIsAudioMuted={setIsAudioMuted}
					/>
					<Button
						onClick={leaveSession}
						variant="destructive">
						<PhoneOff />
					</Button>
				</div>
			)}
		</div>
	);
};
export default Videocall;

import { type Dispatch, type RefObject, type SetStateAction } from "react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

const MicButton = (props: {
	client: RefObject<typeof VideoClient>;
	isAudioMuted: boolean;
	setIsAudioMuted: Dispatch<SetStateAction<boolean>>;
}) => {
	const { client, isAudioMuted, setIsAudioMuted } = props;
	const onMicrophoneClick = async () => {
		const mediaStream = client.current.getMediaStream();
		isAudioMuted
			? await mediaStream?.unmuteAudio()
			: await mediaStream?.muteAudio();
		setIsAudioMuted(client.current.getCurrentUserInfo().muted ?? true);
	};
	return (
		<button
			onClick={onMicrophoneClick}
			title="microphone">
			{isAudioMuted ? <MicOff /> : <Mic />}
		</button>
	);
};

const CameraButton = (props: {
	client: RefObject<typeof VideoClient>;
	isVideoMuted: boolean;
	setIsVideoMuted: Dispatch<SetStateAction<boolean>>;
	renderVideo: (event: {
		action: "Start" | "Stop";
		userId: number;
	}) => Promise<void>;
}) => {
	const { client, isVideoMuted, setIsVideoMuted, renderVideo } = props;

	const onCameraClick = async () => {
		const mediaStream = client.current.getMediaStream();
		if (isVideoMuted) {
			await mediaStream.startVideo();
			setIsVideoMuted(false);
			await renderVideo({
				action: "Start",
				userId: client.current.getCurrentUserInfo().userId,
			});
		} else {
			await mediaStream.stopVideo();
			setIsVideoMuted(true);
			await renderVideo({
				action: "Stop",
				userId: client.current.getCurrentUserInfo().userId,
			});
		}
	};

	return (
		<button
			onClick={onCameraClick}
			title="camera">
			{isVideoMuted ? <VideoOff /> : <Video />}
		</button>
	);
};
