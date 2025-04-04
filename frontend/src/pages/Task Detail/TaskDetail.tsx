import { useEffect, useState } from "react";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProfilePicture } from "../../components/ProfilePicture";
import { AddCollabModal } from "./components/AddCollabModal";
import { toast } from "react-toastify";
import { PriorityTag } from "../Tasks/components/PriorityTag";
import { StatusTag } from "../Tasks/components/StatusTag";
import { CategoryTag } from "../Tasks/components/CategoryTag";
import { format } from "date-fns";
import {
  AddSubtaskModal,
  CreateSubtaskDTO,
} from "./components/AddSubtaskModal";
import { SubtaskCard } from "./components/SubtaskCard";
import {
  UpdateSubtaskDTO,
  UpdateSubtaskModal,
} from "./components/UpdateSubtaskModal";
import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal";

const TaskDetail = () => {
  const [task, setTask] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);
  const { taskId } = useParams();

  const [notStarted, setNotStarted] = useState<any>([]);
  const [onProgress, setInProgress] = useState<any>([]);
  const [done, setDone] = useState<any>([]);

  const [editingSubtask, setEditingSubtask] = useState<any | null>(null);
  const [subtaskToDelete, setSubtaskToDelete] = useState<any | null>(null);

  const formattedDueDate = task?.dueDate
    ? format(new Date(task.dueDate), "MMMM dd, yyyy 'at' hh:mm a")
    : "No due date"; // If there's no dueDate, show this message

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/tasks/task/${taskId}`
        );
        setTask(res.data.task);
      } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [taskId]);

  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/subtasks/${taskId}`);
        const subtasks = res.data.subtasks;

        console.log(subtasks);

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
  }, [taskId]);

  const handleEmailSubmit = async (data: { email: string }) => {
    try {
      const body = { ...data, taskId: task.id };
      const res = await axios.post(
        "http://localhost:5000/tasks/add-user",
        body
      );

      setIsModalOpen(false);
      toast.success(res.data.message);
      setTask((prev: any) => ({
        ...prev,
        collabUsers: [...prev.collabUsers, res.data.user],
      }));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddSubTaskSubmit = async (data: CreateSubtaskDTO) => {
    try {
      const res = await axios.post("http://localhost:5000/subtasks", data);
      toast.success(res.data.message);

      const newSubtask = res.data.subtask;

      if (newSubtask.status === "Not Started") {
        setNotStarted((prev: any) => [...prev, newSubtask]);
      } else if (newSubtask.status === "In Progress") {
        setInProgress((prev: any) => [...prev, newSubtask]);
      } else {
        setDone((prev: any) => [...prev, newSubtask]);
      }

      setIsSubtaskModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add subtask");
    }
  };

  const handleUpdateSubtask = async (updatedData: UpdateSubtaskDTO) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/subtasks/${editingSubtask.id}`,
        updatedData
      );
      toast.success(res.data.message);

      const updatedSubtask = res.data.subtask;

      setNotStarted((prev: any) =>
        prev.filter((s: any) => s.id !== editingSubtask.id)
      );
      setInProgress((prev: any) =>
        prev.filter((s: any) => s.id !== editingSubtask.id)
      );
      setDone((prev: any) =>
        prev.filter((s: any) => s.id !== editingSubtask.id)
      );

      if (updatedSubtask.status === "Not Started") {
        setNotStarted((prev: any) => [...prev, updatedSubtask]);
      } else if (updatedSubtask.status === "In Progress") {
        setInProgress((prev: any) => [...prev, updatedSubtask]);
      } else {
        setDone((prev: any) => [...prev, updatedSubtask]);
      }

      setEditingSubtask(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update subtask");
    }
  };

  const handleDeleteSubtask = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:5000/subtasks/${id}`);
      setSubtaskToDelete(null);
      toast.success(res.data.message);
      setNotStarted((prev: any) => prev.filter((s: any) => s.id !== id));
      setInProgress((prev: any) => prev.filter((s: any) => s.id !== id));
      setDone((prev: any) => prev.filter((s: any) => s.id !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete subtask");
    }
  };

  const handleShowDeleteModal = (subtask: any) => {
    setSubtaskToDelete(subtask);
  };

  return (
    <SidebarLayout pageName={!task ? "Loading..." : task.title}>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className=" flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <PriorityTag text={task.priority} />
                  <p className="pl-3 border-l-1 border-l-primary text-primary">
                    {task.owner.name}
                  </p>
                </div>
                <p className="text-gray-500">
                  {task.description ? task.description : "No description"}
                </p>
                <h4 className="flex gap-2 font-semibold text-red-700">
                  Due:
                  <div className="font-light text-black">
                    {formattedDueDate}
                  </div>
                </h4>
              </div>

              <div className="flex gap-1 flex-col items-end">
                <div className="flex gap-5 mb-4">
                  <StatusTag text={task.status} />
                  <CategoryTag text={task.category} />
                </div>
                <div className="flex text-primary font-semibold mr-2">
                  {!(task.collabUsers.length == 0) && "Collaborator"}
                </div>
                <div className="flex gap-1">
                  {task.collabUsers.map((user: any) => (
                    <div key={user.id} className="h-10 w-10 relative group">
                      <ProfilePicture name={user.name} fontSize="17" />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-xs p-2 rounded">
                        <p>
                          <strong>{user.name}</strong>
                        </p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full relative bg-mid hover:bg-primary cursor-pointer">
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white -translate-y-1/2 text-[25px]"
                      onClick={() => setIsModalOpen(true)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                className="bg-button-primary hover:bg-button-hover text-white px-10 py-2 rounded-4xl"
                onClick={() => setIsSubtaskModalOpen(true)}
              >
                Add Subtasks
              </button>
            </div>

            <div className="grid grid-cols-3 mt-3 gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex justify-center font-semibold p-2 rounded-lg bg-mid text-white text-lg">
                  Not Started
                </div>
                <div className="flex flex-col gap-3">
                  {notStarted.map((subtask: any) => (
                    <SubtaskCard
                      subtask={subtask}
                      onEdit={(s) => setEditingSubtask(s)}
                      onDelete={handleShowDeleteModal}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-center font-semibold p-2 rounded-lg bg-mid text-white text-lg">
                  In Progress
                </div>
                <div className="flex flex-col gap-3">
                  {onProgress.map((subtask: any) => (
                    <SubtaskCard
                      subtask={subtask}
                      onEdit={(s) => setEditingSubtask(s)}
                      onDelete={handleShowDeleteModal}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-center font-semibold p-2 rounded-lg bg-mid text-white text-lg">
                  Done
                </div>
                <div className="flex flex-col gap-3">
                  {done.map((subtask: any) => (
                    <SubtaskCard
                      subtask={subtask}
                      onEdit={(s) => setEditingSubtask(s)}
                      onDelete={handleShowDeleteModal}
                    />
                  ))}
                </div>
              </div>
            </div>

            {subtaskToDelete && (
              <ConfirmDeleteModal
                subtaskTitle={subtaskToDelete.title}
                onCancel={() => setSubtaskToDelete(null)}
                onConfirm={() => handleDeleteSubtask(subtaskToDelete.id)}
              />
            )}

            {editingSubtask && (
              <UpdateSubtaskModal
                isOpen={!!editingSubtask}
                onClose={() => setEditingSubtask(null)}
                onSubmit={handleUpdateSubtask}
                initialData={{
                  title: editingSubtask.title,
                  status: editingSubtask.status,
                  userId: editingSubtask.userId || "",
                }}
                taskId={task.id}
                collabUsers={[...task.collabUsers, task.owner]}
              />
            )}

            <AddSubtaskModal
              isOpen={isSubtaskModalOpen}
              onClose={() => setIsSubtaskModalOpen(false)}
              onSubmit={handleAddSubTaskSubmit}
              taskId={task.id}
              collabUsers={[...task.collabUsers, task.owner]}
            />

            <AddCollabModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleEmailSubmit}
            />
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default TaskDetail;
