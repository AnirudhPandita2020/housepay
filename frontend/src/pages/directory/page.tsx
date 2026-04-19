import {Button} from "@/components/ui/button.tsx";
import {Download, House, Newspaper} from "lucide-react";
import {InfoCard, type InfoCardProp} from "@/components/directory/info-card.tsx";
import ResidentDialog from "@/components/directory/resident-dialog.tsx";
import {DataTable} from "@/components/data-table/data-table.tsx";
import {RESIDENTS_TABLE_COLUMNS} from "@/components/directory/residents-data-column.tsx";
import {useState} from "react";
import type {Resident} from "@/models/resident.ts";

const dummy: InfoCardProp[] = [
    {
        heading: "Total Flats",
        count: 120,
        icon: <House/>,
        iconBg: "bg-blue-50 dark:bg-blue-950/40",
        iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
        heading: "Rented Flats",
        count: 120,
        icon: <Newspaper/>,
        iconBg: "bg-orange-50 dark:bg-orange-950/40",
        iconColor: "text-orange-600 dark:text-orange-400"
    },
];

export default function DirectoryPage() {
    const [residents, setResidents] = useState<Resident[]>([]);
    return (
        <div className="w-full p-2">
            <div className="flex justify-between">
                <div>
                    <p className="font-bold text-black dark:text-white text-3xl">Resident & Tenant Directory</p>
                    <p className="text-gray-600">Manage household occupancy details and contact information.</p>
                </div>
                {residents.length !== 0 && <div className="flex flex-row-reverse gap-2">
                    <ResidentDialog residentAction="ADD" onSubmit={(resident) => {
                        setResidents(prevState => {
                            return [...prevState, resident];
                        });
                    }}/>
                    <Button variant="secondary" className="hover:cursor-pointer">
                        <Download/> Export
                    </Button>
                </div>}
            </div>
            {residents.length !== 0 && <div className="grid grid-cols-3 gap-4 mt-4">
                {dummy.map((d) => (
                    <InfoCard
                        key={d.heading}
                        icon={d.icon}
                        heading={d.heading}
                        count={d.count}
                        iconBg={d.iconBg}
                        iconColor={d.iconColor}
                    />
                ))}
            </div>}
            <div className="mt-4">
                {residents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800">
                                <House className="w-10 h-10 text-gray-500"/>
                            </div>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                No residents found
                            </p>
                            <p className="text-sm text-gray-500 text-center max-w-sm">
                                Looks like this place is still empty. Add your first resident to get started.
                            </p>

                            <div className="mt-4">
                                <ResidentDialog residentAction="ADD" onSubmit={(resident) => {
                                    setResidents(prevState => {
                                        return [...prevState, resident];
                                    });
                                }}/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <DataTable columns={RESIDENTS_TABLE_COLUMNS} data={residents} filterOn="flatNo"/>
                )}
            </div>
        </div>
    );
}