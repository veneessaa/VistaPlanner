import { MdFilterAlt, MdSort } from "react-icons/md";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import { useAuth } from "../../context/AuthContext";
import { MyTaskCard } from "./components/MyTaskCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MiniCalendar from "./components/MiniCalendar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

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

const defaultFilters = {
  status: ["Not Started", "In Progress"],
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

function Homepage() {
  const { user } = useAuth();
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk toggle tampilnya filter modal
  const [showFilter, setShowFilter] = useState(false);

  // State filter checkbox
  const [filters, setFilters] = useState(defaultFilters);

  const colorMap: Record<string, string> = {
    Assignment: "#f97316", // orange-500
    Project: "#a855f7", // purple-500
    Meeting: "#60a5fa", // blue-400
    "Exam/Quiz": "#ef4444", // red-500
    Presentation: "#facc15", // yellow-500
    Others: "#9ca3af", // gray-500
  };

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

  // Function toggle checkbox filter
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

  // Reset filter ke default
  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Filter options sesuai interface Task
  const statusOptions = ["Not Started", "In Progress", "Done", "Late"];
  const categoryOptions = [
    "Assignment",
    "Presentation",
    "Meeting",
    "Project",
    "Exam/Quiz",
    "Others",
  ];
  const priorityOptions = ["High", "Medium", "Low"];

  // Filter tasks sesuai filter yang dipilih
  const filteredTasks = myTasks.filter((task) => {
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
  });

  const statusLabels = ["Not Started", "In Progress", "Done", "Late"];

  const data = statusLabels.map((status) => ({
    name: status,
    value: myTasks.filter((task) => task.status === status).length,
  }));

  const COLORS = ["#9ca3af", "#3b82f6", "#4ade80", "#dc2626"];

  const categoryData = [
    {
      category: "Assignment",
      value: myTasks.filter((t) => t.category === "Assignment").length,
    },
    {
      category: "Presentation",
      value: myTasks.filter((t) => t.category === "Presentation").length,
    },
    {
      category: "Meeting",
      value: myTasks.filter((t) => t.category === "Meeting").length,
    },
    {
      category: "Project",
      value: myTasks.filter((t) => t.category === "Project").length,
    },
    {
      category: "Exam/Quiz",
      value: myTasks.filter((t) => t.category === "Exam/Quiz").length,
    },
    {
      category: "Others",
      value: myTasks.filter((t) => t.category === "Others").length,
    },
  ];

  const priorityColorMap: Record<string, string> = {
    High: "#ef4444", // red-500
    Medium: "#f59e0b", // amber-500
    Low: "#10b981", // green-500
  };

  const priorityData = [
    {
      priority: "High",
      value: myTasks.filter((t) => t.priority === "High").length,
    },
    {
      priority: "Medium",
      value: myTasks.filter((t) => t.priority === "Medium").length,
    },
    {
      priority: "Low",
      value: myTasks.filter((t) => t.priority === "Low").length,
    },
  ];

  return (
    <SidebarLayout pageName={`Welcome, ${user?.name}`}>
      <div className="flex flex-col h-[calc(100vh-110px)] gap-4">
        <div className="h-5/8 flex gap-4">
          <div className="bg-third p-5 rounded-xl flex flex-col gap-2 h-full min-h-0 relative flex-1">
            <div className="flex justify-between items-center">
              <div className="text-primary font-bold text-xl">
                My Task's Progress
              </div>
              <MdFilterAlt
                size={25}
                color="#163979"
                className="cursor-pointer mr-2.5"
                onClick={() => setShowFilter((v) => !v)}
              />
            </div>

            {/* Filter modal */}
            {showFilter && (
              <div className="absolute top-12 right-0 z-20 bg-white p-4 rounded-md shadow-md w-72 max-h-80 overflow-auto text-gray-700 text-sm">
                {/* Tombol reset */}
                <button
                  onClick={resetFilters}
                  className="mb-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reset Filter
                </button>

                {/* Status */}
                <div className="mb-3">
                  <div className="font-semibold mb-1">Status</div>
                  {statusOptions.map((opt) => (
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

                {/* Category */}
                <div className="mb-3">
                  <div className="font-semibold mb-1">Category</div>
                  {categoryOptions.map((opt) => (
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

                {/* Priority */}
                <div>
                  <div className="font-semibold mb-1">Priority</div>
                  {priorityOptions.map((opt) => (
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

            {/* Tampilkan task */}
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-gray-500">No task found...</div>
            ) : (
              <div className="scrollbar flex flex-col gap-2 overflow-auto overflow-x-hidden flex-1 min-h-0 pr-1 mt-2">
                {filteredTasks.map((task) => (
                  <Link key={task.id} to={`/tasks/${task.id}`}>
                    <MyTaskCard task={task} />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col bg-third p-5 rounded-xl gap-1">
            <div className="text-primary font-bold text-xl">Calendar</div>
            <MiniCalendar myTasks={myTasks} />
          </div>
        </div>
        <div className="bg-third p-5 rounded-xl">
          <div className="text-primary font-bold text-xl">Statistics</div>
          <div className="flex items-center justify-evenly">
            <PieChart width={230} height={230}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={90}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip />
              {/* Text tengah */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-primary"
                fontSize={28}
                fontWeight="600"
                fill="#163979"
              >
                {`${myTasks.filter((t) => t.status === "Done").length} / ${
                  myTasks.length
                }`}
              </text>
            </PieChart>
            <BarChart
              width={500}
              height={290}
              data={categoryData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fill: "#163979" }} />
              <YAxis
                tick={{ fill: "#163979" }}
                dataKey="category"
                type="category"
              />
              <Tooltip />
              <Bar dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorMap[entry.category]} />
                ))}
              </Bar>
            </BarChart>
            <BarChart width={300} height={270} data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="priority" tick={{ fill: "#163979" }} />
              <YAxis tick={{ fill: "#163979" }} />
              <Tooltip />
              <Bar dataKey="value" fill="#000">
                {priorityData.map((entry, index) => (
                  <Cell
                    key={`cell-priority-${index}`}
                    fill={priorityColorMap[entry.priority]}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default Homepage;
