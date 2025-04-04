import { MdEdit, MdDelete } from "react-icons/md";
import { ProfilePicture } from "../../../components/ProfilePicture";

interface Subtask {
  id: string;
  title: string;
  userId?: string;
  status: "Not Started" | "In Progress" | "Done";
  taskId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface Props {
  subtask: Subtask;
  onEdit: (subtask: Subtask) => void;
  onDelete: (subtask: Subtask) => void;
}

export const SubtaskCard = ({ subtask, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-third shadow-md rounded-lg p-4 flex flex-col gap-4 transition-all border-[0.5px] border-mid">
      <div className="text-lg text-primary">{subtask.title}</div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {subtask.user && (
            <div className="relative">
              <div className="h-8 w-8 group cursor-pointer">
                <ProfilePicture name={subtask.user.name} fontSize="14" />
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-xs p-2 rounded shadow-lg z-50 pointer-events-none">
                  <p>
                    <strong>{subtask.user.name}</strong>
                  </p>
                  <p>{subtask.user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex">
          <MdEdit
            size={32}
            className="cursor-pointer p-1 rounded-md hover:bg-sec text-primary"
            onClick={() => onEdit(subtask)}
          />
          <MdDelete
            size={32}
            className="cursor-pointer p-1 rounded-md hover:bg-sec text-primary"
            onClick={() => onDelete(subtask)}
          />
        </div>
      </div>
    </div>
  );
};
