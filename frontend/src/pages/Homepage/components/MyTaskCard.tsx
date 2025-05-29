import { format } from "date-fns";
import { ProfilePicture } from "../../../components/ProfilePicture";
import { HomeCategoryTag } from "./HomeCategoryTag";
import { HomePriorityTag } from "./HomePriorityTag";
import { HomeStatusTag } from "./HomeStatusTag";

export interface Task {
  id: string;
  title: string;
  category:
    | "Assignment"
    | "Class Schedule"
    | "Meeting"
    | "Project"
    | "Exam/Quiz"
    | "Others";
  status: "Not Started" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  collabUsers: any;
  userId: string;
}

interface Props {
  task: Task;
}

export const MyTaskCard = ({ task }: Props) => {
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
          <div className="flex gap-1">
            <div>100%</div>
            <div>bar</div>
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
