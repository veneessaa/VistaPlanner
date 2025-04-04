import { CategoryTag } from "../pages/Tasks/components/CategoryTag";
import { PriorityTag } from "../pages/Tasks/components/PriorityTag";
import { StatusTag } from "../pages/Tasks/components/StatusTag";
import { ProfilePicture } from "./ProfilePicture";
import { format } from "date-fns";
import { MdEdit, MdDelete } from "react-icons/md";

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
  description?: string;
  owner: any;
  collabUsers: any;
  userId: string;
}

interface Props {
  task: Task;
  onUpdateButtonClick: any;
  onDeleteButtonClick: (task: Task) => void;
  currUserId: string | undefined;
}

export const TaskCard = ({
  task,
  onUpdateButtonClick,
  onDeleteButtonClick,
  currUserId,
}: Props) => {
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "MMMM dd, yyyy 'at' hh:mm a")
    : "No due date"; // If there's no dueDate, show this message

  return (
    <div className="shadow-lg rounded-3xl p-8 bg-third flex flex-col gap-2 hover:border-2 border-primary transition-all">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl text-primary pr-3">{task.title}</h1>
          <PriorityTag text={task.priority} />
          <p className="pl-3 border-l-1 border-l-primary text-primary">
            {task.owner.name}
          </p>
        </div>
        {currUserId === task.userId && (
          <div className="flex">
            <MdEdit
              size={32}
              className="cursor-pointer p-1 rounded-lg hover:bg-sec text-primary"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onUpdateButtonClick(task);
              }}
            />
            <MdDelete
              size={32}
              className="cursor-pointer p-1 rounded-lg hover:bg-sec text-primary"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDeleteButtonClick(task);
              }}
            />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500">
          {task.description ? task.description : "No description"}
        </p>
        <div className="flex gap-5">
          <StatusTag text={task.status} />
          <CategoryTag text={task.category} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between w-full items-center mt-2">
          <h4 className="flex gap-2 font-semibold text-red-700">
            Due:<div className="font-light text-black">{formattedDueDate}</div>
          </h4>
          <div className="flex gap-1 relative items-center">
            <div className="text-primary font-semibold mr-2">
              {!(task.collabUsers.length == 0) && "Collaborator "}
            </div>
            {task.collabUsers.map((user: any) => (
              <div key={user.id} className="relative">
                <div className="h-10 w-10 group">
                  <ProfilePicture name={user.name} fontSize="17" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-xs p-2 rounded shadow-lg z-50 pointer-events-none">
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
