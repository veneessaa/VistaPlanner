import { format } from "date-fns";
import { ProfilePicture } from "../../../components/ProfilePicture";
import { HomeCategoryTag } from "./HomeCategoryTag";
import { HomePriorityTag } from "./HomePriorityTag";
import { HomeStatusTag } from "./HomeStatusTag";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Task {
  id: string;
  title: string;
  category:
    | "Assignment"
    | "Presentation"
    | "Meeting"
    | "Project"
    | "Exam/Quiz"
    | "Others";
  status: "Not Started" | "In Progress" | "Done" | "Late";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  collabUsers: any;
  userId: string;
}

interface Props {
  task: Task;
}

export const MyTaskCard = ({ task }: Props) => {
  const [notStarted, setNotStarted] = useState<any>([]);
  const [onProgress, setInProgress] = useState<any>([]);
  const [done, setDone] = useState<any>([]);
  const [subtasks, setSubtasks] = useState<any>([]);

  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/subtasks/${task.id}`
        );
        const subtasks = res.data.subtasks;
        setSubtasks(subtasks);

        const notStartedTasks = subtasks.filter(
          (task: { status: string }) => task.status === "Not Started"
        );
        const onProgressTasks = subtasks.filter(
          (task: { status: string }) => task.status === "In Progress"
        );
        const doneTasks = subtasks.filter(
          (task: { status: string }) => task.status === "Done"
        );

        setNotStarted(notStartedTasks);
        setInProgress(onProgressTasks);
        setDone(doneTasks);
      } catch (error) {
        console.error("Error fetching subtasks:", error);
      }
    };

    fetchSubtasks();
  }, [task.id]);

  let percentage = 0;
  if (subtasks.length > 0)
    percentage = Math.round((done.length / subtasks.length) * 100);

  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "MMMM dd, yyyy 'at' hh:mm a")
    : "No due date"; // If there's no dueDate, show this message

  return (
    <div className="rounded-xl p-4 bg-light flex flex-col gap-2 hover:border-2 border-primary transition-all">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="font-bold text-l text-primary">{task.title}</div>
          <HomePriorityTag text={task.priority}></HomePriorityTag>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <HomeStatusTag text={task.status}></HomeStatusTag>
            <HomeCategoryTag text={task.category}></HomeCategoryTag>
          </div>
          <div className="flex gap-1 items-center">
            <div className="text-sm">{percentage}%</div>
            <div className="w-30 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">{formattedDueDate}</div>
          <div className="flex">
            {task.collabUsers.map((user: any) => (
              <div key={user.id} className="relative">
                <div className="h-7 w-7 group">
                  <ProfilePicture name={user.name} fontSize="12" />
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-xs p-2 rounded shadow-lg z-50 pointer-events-none">
                    <p>
                      <strong>{user.name}</strong>
                    </p>
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
