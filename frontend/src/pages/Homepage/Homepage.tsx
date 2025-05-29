import { MdFilterAlt, MdSort } from "react-icons/md";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import { useAuth } from "../../context/AuthContext";
import { MyTaskCard } from "./components/MyTaskCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Homepage() {
  const { user } = useAuth();
  const [myTasks, setMyTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/tasks/all-tasks/${user?.id}`
        );
        setMyTasks(res.data.tasks);
      } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  console.log(myTasks);
  

  return (
    <SidebarLayout pageName={`Welcome, ${user?.name}`}>
      <div className="flex flex-col h-[calc(100vh-110px)] gap-4">
        <div className="h-3/5 grid grid-cols-2 gap-4">
          <div className="bg-third p-5 rounded-xl flex flex-col gap-2 h-full min-h-0">
            <div className="flex justify-between">
              <div className="text-primary font-bold text-xl">My Tasks</div>
              <div className="flex gap-2">
                <MdFilterAlt size={25} color="#163979"></MdFilterAlt>
                <MdSort size={25} color="#163979"></MdSort>
              </div>
            </div>
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : myTasks.length == 0 ? (
              <div className="text-gray-500">No task found...</div>
            ) : (
              <div className="flex flex-col gap-2 overflow-auto overflow-x-hidden flex-1 min-h-0">
                {myTasks.map((task) => (
                  <MyTaskCard task={task}/>
                ))}
              </div>
            )}
          </div>
          <div className="bg-third p-5 rounded-xl">
            <div className="text-primary font-bold text-xl">Calendar</div>
            <div>abc kalender pokoknya</div>
          </div>
        </div>
        <div className="bg-third flex-1 p-5 rounded-xl"></div>
      </div>
    </SidebarLayout>
  );
}

export default Homepage;
