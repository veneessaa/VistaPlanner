import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const taskModalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum([
    "Assignment",
    "Class Schedule",
    "Meeting",
    "Project",
    "Exam/Quiz",
    "Others",
  ]),
  priority: z.enum(["High", "Medium", "Low"]),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.enum(["Not Started", "In Progress", "Done"]),
});

export type TaskModalFormData = z.infer<typeof taskModalSchema>;

interface TaskModalProps {
  onClose: () => void;
  onSubmit: (data: TaskModalFormData) => void;
}

export const TaskModal = ({ onClose, onSubmit }: TaskModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskModalFormData>({
    resolver: zodResolver(taskModalSchema),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-4">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <input
              type="text"
              {...register("description")}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block font-medium">Category</label>
            <select
              {...register("category")}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="Assignment">Assignment</option>
              <option value="Project">Project</option>
              <option value="Meeting">Meeting</option>
              <option value="Exam/Quiz">Exam/Quiz</option>
              <option value="Class Schedule">Class Schedule</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Priority */}
          <div className="mb-4">
            <label className="block font-medium">Priority</label>
            <select
              {...register("priority")}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority.message}</p>
            )}
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label className="block font-medium">Due Date</label>
            <input
              type="datetime-local"
              {...register("dueDate")}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block font-medium">Status</label>
            <select
              {...register("status")}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
