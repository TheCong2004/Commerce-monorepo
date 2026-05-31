"use client";
import {
	FaPlay,
	FaPause,
	FaVolumeUp,
	FaVolumeMute,
	FaEllipsisV,
} from "react-icons/fa";
import { useRef, useState } from "react";

export default function MediaPlayer({ src }: { src: string }) {
	const [volume, setVolume] = useState(1);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const togglePlay = () => {
		if (!audioRef.current) return;

		if (audioRef.current.paused) {
			audioRef.current.play();
			setIsPlaying(true);
		} else {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};

	const toggleMute = () => {
		if (!audioRef.current) return;
		audioRef.current.muted = !audioRef.current.muted;
		setIsMuted(!isMuted);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = Number(e.target.value);
		setVolume(newVolume);
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
			setIsMuted(newVolume === 0);
		}
	};

	const updateProgress = () => {
		if (audioRef.current) {
			setProgress(
				(audioRef.current.currentTime / audioRef.current.duration) * 100,
			);
			setDuration(audioRef.current.duration);
		}
	};

	return (
		<div className="flex items-center gap-3 bg-gray-100 p-4 rounded-full shadow-md w-1/3">
			<button
				onClick={togglePlay}
				className="text-gray-700 text-xl hover:text-gray-900 focus:outline-none">
				{isPlaying ? <FaPause /> : <FaPlay />}
			</button>
			<span className="text-gray-700 text-sm">
				{new Date((audioRef.current?.currentTime || 0) * 1000)
					.toISOString()
					.substr(14, 5)}
				{" / "}
				{new Date(duration * 1000).toISOString().substr(14, 5)}
			</span>
			<input
				type="range"
				value={progress}
				max="100"
				className="flex-1 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
				onChange={(e) => {
					if (audioRef.current) {
						const time =
							(Number(e.target.value) * audioRef.current.duration) / 100;
						audioRef.current.currentTime = time;
						setProgress(Number(e.target.value));
					}
				}}
			/>
			<div className="flex items-center gap-2">
				<button
					onClick={toggleMute}
					className="text-gray-700 text-lg hover:text-gray-900 focus:outline-none">
					{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
				</button>
				<input
					type="range"
					min="0"
					max="1"
					step="0.1"
					value={volume}
					className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
					onChange={handleVolumeChange}
				/>
			</div>
			<div className="relative">
				<button
					onClick={() => setShowOptions(!showOptions)}
					className="text-gray-700 text-lg hover:text-gray-900 focus:outline-none">
					<FaEllipsisV />
				</button>
				{showOptions && (
					<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
						<button
							onClick={() => {
								if (audioRef.current) {
									audioRef.current.playbackRate = 0.5;
								}
							}}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
							0.5x Speed
						</button>
						<button
							onClick={() => {
								if (audioRef.current) {
									audioRef.current.playbackRate = 1;
								}
							}}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
							Normal Speed
						</button>
						<button
							onClick={() => {
								if (audioRef.current) {
									audioRef.current.playbackRate = 1.5;
								}
							}}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
							1.5x Speed
						</button>
						<button
							onClick={() => {
								if (audioRef.current) {
									audioRef.current.playbackRate = 2;
								}
							}}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
							2x Speed
						</button>
					</div>
				)}{" "}
			</div>
			<audio
				ref={audioRef}
				onTimeUpdate={updateProgress}
				onLoadedMetadata={updateProgress}>
				<source
					src={src}
					type="audio/mp3"
				/>
			</audio>
		</div>
	);
}
