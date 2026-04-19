import {Book, Building2, Coins, LayoutDashboardIcon} from "lucide-react";
import {ModeToggle} from "@/components/dark-mode-toggle.tsx";
import {NavigationMenu, NavigationMenuItem, NavigationMenuList,} from "@/components/ui/navigation-menu.tsx"
import {NavLink} from "react-router";
import type {JSX} from "react";

type NavigationMenu = {
    name: string,
    path: string,
    icon: JSX.Element
};

const NAVIGATION_MENUS: NavigationMenu[] = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboardIcon size={18}/>
    },
    {
        name: "Expenses",
        path: "/expenses",
        icon: <Coins size={18}/>
    },
    {
        name: "Directory",
        path: "/directory",
        icon: <Book size={18}/>
    }
];

export default function Header() {
    return (
        <header className="flex justify-between items-center p-5 border-b">
            <div className="flex justify-center items-center p-1 gap-3">
                <Building2 className="text-blue-700"/>
                <span className="font-bold text-xl">HousePay</span>
                <div className="flex justify-center items-center">
                    <NavigationMenu>
                        <NavigationMenuList className="flex w-full">
                            {
                                NAVIGATION_MENUS.map(MENU => {
                                    return (
                                        <NavigationMenuItem className="flex-1">
                                            <NavLink
                                                to={MENU.path}
                                                className={({isActive}) =>
                                                    `relative flex items-center gap-2 px-4 py-2 text-sm font-medium justify-center transition-colors rounded-md
                                                     ${isActive ? "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40 after:opacity-100" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-950/30 after:opacity-0"}`}>
                                                <span className="w-4 h-4">{MENU.icon}</span>
                                                <span>{MENU.name}</span>
                                            </NavLink>
                                        </NavigationMenuItem>
                                    );
                                })
                            }
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <div className="flex gap-3 justify-center items-center">
                <ModeToggle/>
            </div>
        </header>
    );
}