import { cn } from "@/lib/utils";

type SeparatorMode = "left" | "center" | "right";

type TextSeparatorProps = {
    label: string;
    mode?: SeparatorMode;
    className?: string;
};

export function TextSeparator({
                                  label,
                                  mode = "center",
                                  className,
                              }: TextSeparatorProps) {
    return (
        <div className={cn("flex items-center w-full gap-2", className)}>
            {mode === "center" && (
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            )}
            {mode === "right" && (
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            )}
            {mode === "left" && (
                <div className="w-6 h-px bg-gray-300 dark:bg-gray-700" />
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {label}
      </span>
            {mode === "center" && (
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            )}
            {mode === "left" && (
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            )}
            {mode === "right" && (
                <div className="w-6 h-px bg-gray-300 dark:bg-gray-700" />
            )}
        </div>
    );
}