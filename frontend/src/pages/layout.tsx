import Header from "@/components/ui/header.tsx";
import {Outlet} from "react-router";

export default function RootLayout(){
    return (
        <div className="flex flex-col h-screen">
            <Header/>
            <main className="flex flex-1 flex-col p-4 gap-2">
                <Outlet/>
            </main>
        </div>
    );
}