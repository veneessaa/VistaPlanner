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
import { MdFilterAlt } from "react-icons/md";

const defaultFilters = {
  status: ["Not Started", "In Progress", "Done", "Late"],
  category: [
    "Assignment",
    "Presentation",
    "Meeting",
    "Project",
    "Exam/Quiz",
    "Others",
  ],
  priority: ["High", "Medium", "Low"],
};

function Tasks() {
  const { user } = useAuth(); // Get the authenticated user
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toUpdateTask, setToUpdateTask] = useState<Task>();
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (
    type: "status" | "category" | "priority",
    value: string
  ) => {
    setFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filters.status.length > 0 && !filters.status.includes(task.status))
        return false;
      if (
        filters.category.length > 0 &&
        !filters.category.includes(task.category)
      )
        return false;
      if (
        filters.priority.length > 0 &&
        !filters.priority.includes(task.priority)
      )
        return false;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        <div className="flex mb-4 justify-between items-center">
          <button
            className="bg-button-primary hover:bg-button-hover text-white font-semibold px-15 py-2 rounded-4xl"
            onClick={() => setIsModalOpen(true)}
          >
            Add Task
          </button>
          <div className="flex">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-4 px-4 py-2 border rounded-md w-60 border-gray-400 text-gray-500 bg-white"
            />
            <MdFilterAlt
              size={45}
              color="#163979"
              className="cursor-pointer ml-4"
              onClick={() => setShowFilter((v) => !v)}
            />
          </div>
        </div>

        {showFilter && (
          <div className="absolute top-35 right-0 z-20 bg-white p-4 rounded-md shadow-md w-72 max-h-80 overflow-auto text-gray-700 text-sm">
            <button
              onClick={resetFilters}
              className="mb-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reset Filter
            </button>

            <div className="mb-3">
              <div className="font-semibold mb-1">Status</div>
              {["Not Started", "In Progress", "Done", "Late"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.status.includes(opt)}
                    onChange={() => toggleFilter("status", opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className="mb-3">
              <div className="font-semibold mb-1">Category</div>
              {[
                "Assignment",
                "Presentation",
                "Meeting",
                "Project",
                "Exam/Quiz",
                "Others",
              ].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.category.includes(opt)}
                    onChange={() => toggleFilter("category", opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div>
              <div className="font-semibold mb-1">Priority</div>
              {["High", "Medium", "Low"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.priority.includes(opt)}
                    onChange={() => toggleFilter("priority", opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : tasks.length == 0 ? (
          <div className="text-gray-500">No task found...</div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredTasks.map((task) => (
              <Link to={`/tasks/${task.id}`} key={task.id}>
                <TaskCard
                  onUpdateButtonClick={handleUpdateButtonClick}
                  onDeleteButtonClick={(task) => setTaskToDelete(task)}
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
