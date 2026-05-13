import { useEffect, useMemo, useState } from "react";

import {
    ActiveTool,
    Editor,
} from "../../types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/shared/ui/scroll-area";
const Slider = ({ value, onValueChange, min = 0, max = 100, step = 1 }: { value: number[]; onValueChange: (val: number[]) => void; min?: number; max?: number; step?: number }) => (
    <input 
        type="range" 
        value={value[0]} 
        min={min}
        max={max}
        step={step}
        onChange={(e) => onValueChange([Number(e.target.value)])} 
        className="w-full"
    />
);

interface OpacitySidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

export const OpacitySidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: OpacitySidebarProps) => {
    const initialValue = editor?.getActiveOpacity() || 1;
    const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects]);

    const [opacity, setOpacity] = useState(initialValue);

    useEffect(() => {
        if (selectedObject) {
            setOpacity(selectedObject.get("opacity") || 1);
        }
    }, [selectedObject]);

    const onClose = () => {
        onChangeActiveTool("select");
    };

    const onChange = (value: number) => {
        editor?.changeOpacity(value);
        setOpacity(value);
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[10] w-[360px] h-full flex flex-col",
                activeTool === "opacity" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader
                title="Opacity"
                description="Change the opacity of the selected object"
            />
            <ScrollArea>
                <div className="p-4 space-y-4 border-b">
                    <Slider
                        value={[opacity]}
                        onValueChange={(values: number[]) => onChange(values[0])}
                        max={1}
                        min={0}
                        step={0.01}
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClose={onClose} />
        </aside>
    );
};
