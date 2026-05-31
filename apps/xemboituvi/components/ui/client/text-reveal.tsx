"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, ReactElement, ReactNode } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface TextAnimatedProps {
	children: ReactNode;
	animateOnScroll?: boolean;
	delay?: number;
	className?: string;
}

export default function TextReveal({
	children,
	animateOnScroll = true,
	delay = 0.3,
	className = "",
}: TextAnimatedProps) {
	const lines = useRef<HTMLElement[]>([]);
	const splitRefs = useRef<SplitText[]>([]);
	const elementRefs = useRef<HTMLElement[]>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			if (!containerRef.current) return;

			const initSplitText = () => {
				splitRefs.current = [];
				lines.current = [];
				elementRefs.current = [];

				let elements: HTMLElement[] = [];
				if (containerRef.current!.hasAttribute("data-copy-wrapper")) {
					elements = Array.from(
						containerRef.current!.children,
					) as HTMLElement[];
				} else {
					elements = [containerRef.current!];
				}

				elements.forEach((element: HTMLElement) => {
					elementRefs.current.push(element);

					const split = new SplitText(element, {
						type: "lines",
						mask: "lines",
						linesClass: "line++",
						lineThreshold: 0.1,
					});

					splitRefs.current.push(split);

					const computedStyle = window.getComputedStyle(element);
					const textIndent = computedStyle.textIndent;

					if (textIndent && textIndent !== "0px") {
						if (split.lines.length > 0) {
							(split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
						}
						element.style.textIndent = "0";
					}

					lines.current.push(...(split.lines as HTMLElement[]));
				});

				gsap.set(lines.current, { y: "100%" });

				const animationProps = {
					y: "0%",
					duration: 1,
					stagger: 0.1,
					ease: "power4.out",
					delay: delay,
				};

				if (animateOnScroll) {
					gsap.to(lines.current, {
						...animationProps,
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 75%",
							once: true,
						},
					});
				} else {
					gsap.to(lines.current, animationProps);
				}
			};

			// Wait for fonts to load before initializing SplitText
			if (document.fonts && document.fonts.ready) {
				document.fonts.ready.then(initSplitText);
			} else {
				// fallback if fonts API is unavailable
				setTimeout(initSplitText, 300);
			}

			return () => {
				splitRefs.current.forEach((split) => {
					if (split) {
						split.revert();
					}
				});
			};
		},
		{ scope: containerRef, dependencies: [animateOnScroll, delay] },
	);

	if (React.Children.count(children) === 1) {
		return (
			<div
				className={className}
				ref={containerRef}>
				{children}
			</div>
		);
	}

	return (
		<div
			className={className}
			ref={containerRef}
			data-copy-wrapper="true">
			{children}
		</div>
	);
}
