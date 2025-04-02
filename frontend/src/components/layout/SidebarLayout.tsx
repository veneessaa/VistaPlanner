import { HTMLProps, ReactNode } from "react"
import Sidebar from "../Sidebar"
import userPhoto from "../../assets/images/Profile.png"
import { useAuth } from "../../context/AuthContext";

interface Props extends HTMLProps<HTMLDivElement> {
    // user: {
    //     firstName: string;
    //     lastName: string;
    //     email: string;
    //     // photo: string;
    // };
    children: ReactNode;
    pageName: string;
}

export const SidebarLayout = ({ children, pageName }: Props) => {
    const {user} = useAuth()

    return (
        <div className="flex gap-8 min-h-screen overflow-hidden bg-light">
            <Sidebar />
            <div className="right flex flex-col flex-1 max-h-screen">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{pageName}</h1>
                    <nav className="flex justify-end items-center p-4 pr-8 gap-5">
                        <div className="flex flex-col items-end">
                            <div className="font-semibold">{user?.name}</div>
                            <div>{user?.email}</div>
                        </div>
                        <div>
                            <img src={userPhoto} alt="" className="h-[40px]" />
                        </div>
                    </nav>
                </div>
                <div className="content">{children}</div>
            </div>
        </div>
    )
}