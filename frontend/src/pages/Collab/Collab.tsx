import { useEffect, useState } from "react";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { CategoryTag } from "../Tasks/components/CategoryTag";
import { StatusTag } from "../Tasks/components/StatusTag";
import { TaskModal, TaskModalFormData } from "../Tasks/components/AddTaskModal";
import { toast } from "react-toastify";
import { TaskCard } from "../../components/TaskCard";
import { Link } from "react-router-dom";

function Collab() {
  const { user } = useAuth(); // Get the authenticated user
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/tasks/collab/${user?.id}`
        );
        setTasks(res.data.tasks);
      } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const handleAddTask = async (data: TaskModalFormData) => {
    try {
      const newTask = { ...data, userId: user?.id }; // Add userId manually
      const res = await axios.post("http://localhost:5000/tasks", newTask);
      setTasks((prev) => [...prev, newTask]); // Update UI
      setIsModalOpen(false); // Close modal
      toast.success(res.data.message);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <SidebarLayout pageName="Collab Tasks List">
      <div className="mb-8">
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : tasks.length == 0 ? (
          <div className="text-gray-500">No collab task found...</div>
        ) : (
          <div className="flex flex-col gap-6">
            {tasks.map((task) => (
              <Link to={`/tasks/${task.id}`}>
                <TaskCard
                  key={task.id}
                  currUserId={user?.id}
                  task={task}
                  onUpdateButtonClick={undefined}
                  onDeleteButtonClick={() => {}}
                />
              </Link>
            ))}
          </div>
        )}
        {isModalOpen && (
          <TaskModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddTask}
          />
        )}
      </div>
    </SidebarLayout>
  );
}

export default Collab;
