import { getServerSession } from "next-auth";
import { DashboardHeader } from "./components/header";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }
    return (
        <>
            <DashboardHeader />
            {children}
        </>
    )
}