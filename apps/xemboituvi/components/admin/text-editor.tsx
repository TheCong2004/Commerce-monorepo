"use client";
import { TtextEditorProps } from "@/types";
import { SerializedEditorState } from "lexical";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "@/components/blocks/editor-x/editor";

export const initialEditorState = {
	root: {
		children: [
			{
				children: [],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "paragraph",
				version: 1,
			},
		],
		direction: "ltr",
		format: "",
		indent: 0,
		type: "root",
		version: 1,
	},
} as unknown as SerializedEditorState;

export default function TextEditor({ value, onChange }: TtextEditorProps) {
	const [initialState, setInitialState] =
		useState<SerializedEditorState>(initialEditorState);

	useEffect(() => {
		if (value && !value.startsWith("<")) {
			try {
				setInitialState(JSON.parse(value));
			} catch {
				setInitialState(initialEditorState);
			}
		}
	}, [value]);

	const handleChange = useCallback(
		(editorState: SerializedEditorState) => {
			const html = convertLexicalToHtml(editorState);
			onChange?.(html);
		},
		[onChange],
	);

	return (
		<Editor
			editorSerializedState={initialState}
			onSerializedChange={handleChange}
		/>
	);
}

function convertLexicalToHtml(editorState: SerializedEditorState): string {
	if (!editorState?.root?.children) return "<p></p>";

	const convertNode = (node: any): string => {
		if (node.type === "paragraph") {
			const content =
				node.children
					?.map?.((child: any) => convertNode(child))
					.join("") || "";
			return `<p>${content}</p>`;
		} else if (node.type === "text") {
			let text = node.text || "";
			if (node.format & 1) text = `<strong>${text}</strong>`;
			if (node.format & 2) text = `<em>${text}</em>`;
			if (node.format & 4) text = `<u>${text}</u>`;
			return text;
		} else if (node.type === "image") {
			return `<img src="${node.src}" alt="${node.altText || ''}" width="${node.width || 'auto'}" height="${node.height || 'auto'}" />`;
		} else if (node.type === "inline-image") {
			const positionClass = node.position === "left" ? " style=\"float: left; margin-right: 10px;\"" :
							   node.position === "right" ? " style=\"float: right; margin-left: 10px;\"" :
							   node.position === "full" ? " style=\"width: 100%;\"" : "";
			return `<img src="${node.src}" alt="${node.altText || ''}" width="${node.width || 'auto'}" height="${node.height || 'auto'}"${positionClass} />`;
		} else if (node.type === "layout-container") {
			const templateColumns = node.templateColumns || "1fr 1fr";
			const content =
				node.children
					?.map?.((child: any) => convertNode(child))
					.join("") || "";
			return `<div style="display: grid; grid-template-columns: ${templateColumns}; gap: 15px; margin: 20px 0;" data-lexical-layout-container="true">${content}</div>`;
		} else if (node.type === "layout-item") {
			const content =
				node.children
					?.map?.((child: any) => convertNode(child))
					.join("") || "";
			return `<div style="min-height: 40px;">${content}</div>`;
		} else if (node.children) {
			// Handle other container nodes
			const content =
				node.children
					?.map?.((child: any) => convertNode(child))
					.join("") || "";
			return content;
		}
		return "";
	};

	const elements = editorState.root.children
		.map((node: any) => convertNode(node))
		.join("");

	return elements || "<p></p>";
}
