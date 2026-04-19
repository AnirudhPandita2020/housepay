import type {ColumnDef} from '@tanstack/react-table';
import type {Resident, ResidentType} from "@/models/resident.ts";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Eye, House, Newspaper, Pencil} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DataTableColumnHeader} from "@/components/data-table/data-table-header.tsx";

export const RESIDENTS_TABLE_COLUMNS: ColumnDef<Resident>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'flatNo',
        header: ({column}) => {
            return (
                <DataTableColumnHeader column={column} title='Flat No.'/>
            );
        },
        cell: ({row}) => {
            return <div className="font-bold">{row.getValue('flatNo')}</div>;
        }
    },
    {
        accessorKey: 'residentName',
        header: 'RESIDENT NAME',
        cell: ({row}) => {
            const residentName = row.getValue<string>('residentName');
            const residentNameSplit = residentName.split(' ');
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarFallback>{residentNameSplit.length > 1 ? (residentNameSplit[0][0] + residentNameSplit[1][0]).toUpperCase() : residentNameSplit[0][0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {residentName}
                </div>
            );
        }
    },
    {
        accessorKey: 'email',
        header: 'EMAIL'
    },
    {
        accessorKey: 'type',
        header: 'Status',
        cell: ({row}) => {
            const type = row.getValue<ResidentType>('type');
            if (type === 'OWNER') {
                return (
                    <Badge className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40">
                        <House/>
                        OWNER-OCCUPIED
                    </Badge>
                );
            } else {
                return (
                    <Badge className="text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40">
                        <Newspaper/>
                        RENTED
                    </Badge>
                );
            }
        }
    },
    {
        accessorKey: 'ownerName',
        header: 'OWNER NAME',
        cell: ({row}) => {
            const type = row.getValue<ResidentType>('type');

            if (type === 'OWNER') {
                return <span className="text-gray-400 italic">Self</span>;
            }

            return row.getValue('ownerName');
        },
    },
    {
        accessorKey: 'ownerEmail',
        header: 'OWNER EMAIL',
        cell: ({row}) => {
            const type = row.getValue<ResidentType>('type');
            if (type === 'OWNER') {
                return <span className="text-gray-400 italic">Self</span>;
            }
            return row.getValue('ownerEmail');
        }
    },
    {
        header: 'ACTIONS',
        cell: () => {
            return (
                <div className="flex gap-2 items-center">
                    <Button variant="outline" size="icon" className="hover:cursor-pointer">
                        <Eye/>
                    </Button>
                    <Button variant="outline" size="icon" className="hover:cursor-pointer">
                        <Pencil/>
                    </Button>
                </div>
            );
        }
    }
];