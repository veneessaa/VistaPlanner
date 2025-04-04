import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import { useNavigate } from "react-router-dom";
// import "@fullcalendar/common/main.css";
// import "@fullcalendar/daygrid/main.css";

export const CalendarPage = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [taskRes, collabRes] = await Promise.all([
          axios.get(`http://localhost:5000/tasks/${user?.id}`),
          axios.get(`http://localhost:5000/tasks/collab/${user?.id}`),
        ]);

        const normalizeTask = (task: any) => ({
          id: task.id,
          title: task.title,
          start: task.dueDate,
          category: task.category,
          display: "list-item",
        });

        const ownTasks = taskRes.data.tasks.map(normalizeTask);
        const collabTasks = collabRes.data.tasks.map(normalizeTask);

        setEvents([...ownTasks, ...collabTasks]);
      } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const handleEventClick = (info: any) => {
    const taskId = info.event.id;
    navigate(`/tasks/${taskId}`);
  };

  return (
    <SidebarLayout pageName="Calendar">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          eventDidMount={(info) => {
            const category = info.event.extendedProps.category;
            console.log(category);

            const categoryColorMap: { [key: string]: string } = {
              Assignment: "#f97316", // bg-orange-500
              Project: "#a855f7", // bg-purple-500
              Meeting: "#60a5fa", // bg-blue-400
              "Exam/Quiz": "#ef4444", // bg-red-500
              "Class Schedule": "#facc15", // bg-yellow-500
              Others: "#6b7280", // bg-gray-500
            };

            const color = categoryColorMap[category] || "#3b82f6"; // fallback: blue-500

            // Update the dot color
            const dot = info.el.querySelector(
              ".fc-daygrid-event-dot"
            ) as HTMLElement;
            if (dot) dot.style.borderColor = color;
          }}
        />
      </div>
    </SidebarLayout>
  );
};
