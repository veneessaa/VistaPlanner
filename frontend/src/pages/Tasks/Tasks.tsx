import { useEffect, useState } from "react";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { TaskModal, TaskModalFormData } from "./components/AddTaskModal";
import { toast } from "react-toastify";
import { Task, TaskCard } from "../../components/TaskCard";
import { UpdateTaskModal } from "./components/UpdateTaskModal";
import { Link } from "react-router-dom";
import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal";

function Tasks() {
  const { user } = useAuth(); // Get the authenticated user
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toUpdateTask, setToUpdateTask] = useState<Task>();
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/tasks/${user?.id}`);
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
      setTasks((prev) => [...prev, res.data.task]); // Update UI
      setIsModalOpen(false); // Close modal
      toast.success(res.data.message);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleUpdateTask = async (data: TaskModalFormData) => {
    try {
      const updatedTask = { ...data, userId: user?.id }; // Add userId manually
      const res = await axios.put(
        `http://localhost:5000/tasks/${toUpdateTask?.id}`,
        updatedTask
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === toUpdateTask?.id ? { ...task, ...updatedTask } : task
        )
      );
      setIsEditModalOpen(false); // Close modal
      toast.success(res.data.message);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleUpdateButtonClick = (task: any) => {
    setToUpdateTask(task);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/tasks/${taskToDelete.id}`
      );
      setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
      toast.success(res.data.message || "Task deleted!");
      setTaskToDelete(null);
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <SidebarLayout pageName="Tasks List">
      <div className="mb-8">
        <div className="flex mb-6">
          <button
            className="bg-button-primary hover:bg-button-hover text-white font-semibold px-15 py-3 rounded-4xl"
            onClick={() => setIsModalOpen(true)}
          >
            Add Task
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : tasks.length == 0 ? (
          <div>No task found...</div>
        ) : (
          <div className="flex flex-col gap-6">
            {tasks.map((task) => (
              <Link to={`/tasks/${task.id}`}>
                <TaskCard
                  onUpdateButtonClick={handleUpdateButtonClick}
                  onDeleteButtonClick={(task) => setTaskToDelete(task)}
                  key={task.id}
                  task={task}
                  currUserId={user?.id}
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
        {isEditModalOpen && toUpdateTask && (
          <UpdateTaskModal
            onUpdate={handleUpdateTask}
            task={toUpdateTask}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
        {taskToDelete && (
          <ConfirmDeleteModal
            taskTitle={taskToDelete.title}
            onCancel={() => setTaskToDelete(null)}
            onConfirm={handleDeleteTask}
          />
        )}
      </div>
    </SidebarLayout>
  );
}

export default Tasks;
