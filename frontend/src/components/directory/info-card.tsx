import type {JSX} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";

export type InfoCardProp = {
    icon: JSX.Element,
    heading: string,
    count: number,
    iconBg: string,
    iconColor: string
}

export function InfoCard({icon, heading, count, iconBg, iconColor}: InfoCardProp) {
    return (
        <Card className="p-4">
            <CardContent className="flex items-center gap-4 p-0">
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                    {heading}
                    </span>
                    <span className="text-2xl font-bold text-black dark:text-white">
                    {count}
                  </span>
                </div>
            </CardContent>
        </Card>
    );
}