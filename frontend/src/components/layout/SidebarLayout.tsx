import { HTMLProps, ReactNode, useEffect } from "react";
import Sidebar from "../Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProfilePicture } from "../ProfilePicture";
import axios from "axios";
import FlameStreakIcon from "../FlameStreakIcon";

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
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const checkStreak = async () => {
      try {
        await axios.post(`http://localhost:5000/users/check-streak`, {
          userId: user?.id,
        });
      } catch (error: any) {
        console.error(error.message);
      }
    };

    checkStreak();
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden bg-light">
      <Sidebar />
      <div className="right flex flex-col flex-1 max-h-screen">
        <div className="flex justify-between items-center px-8 py-6">
          <h1 className="text-3xl font-bold text-primary">{pageName}</h1>
          <nav
            className="flex justify-end items-center gap-5 hover: cursor-pointer"
            onClick={() => {
              navigate("/mysettings");
            }}
          >
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <FlameStreakIcon
                  count={user?.currentStreak}
                  active={user?.currentStreak!! > 0}
                />
                <div className="font-semibold">{user?.name}</div>
              </div>
              <div>{user?.email}</div>
            </div>
            <div className="w-12 h-12">
              <ProfilePicture name={user?.name} fontSize="20" />
            </div>
          </nav>
        </div>
        <div className="content px-8 overflow-y-auto overflow-x-hidden scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
