import { HTMLProps, ReactNode } from "react"
import Sidebar from "../Sidebar"

interface Props extends HTMLProps<HTMLDivElement> {
    children: ReactNode
}

export const SidebarLayout = ({ children }: Props) => {
    return (
        <div className="flex gap-5 min-h-screen overflow-hidden">
            <Sidebar />
            <div className="right flex flex-col flex-1">
                <nav className="flex justify-end items-center py-2 px-5">
                    <div className="flex flex-col">
                        <div>username</div>
                        <div>email</div>
                    </div>
                    <div>
                        foto
                    </div>
                </nav>
                <div className="content">{children}</div>
            </div>
        </div>
    )
}