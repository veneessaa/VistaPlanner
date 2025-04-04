import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

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

interface UpdateTaskModalProps {
  task: TaskModalFormData;
  onClose: () => void;
  onUpdate: (data: TaskModalFormData) => void;
}

export const UpdateTaskModal = ({
  task,
  onClose,
  onUpdate,
}: UpdateTaskModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskModalFormData>({
    resolver: zodResolver(taskModalSchema),
    defaultValues: task,
  });

  useEffect(() => {
    setValue("title", task.title);
    setValue("description", task.description || "");
    setValue("category", task.category);
    setValue("priority", task.priority);
    setValue("dueDate", task.dueDate);
    setValue("status", task.status);
  }, [task, setValue]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Update Task</h2>

        <form onSubmit={handleSubmit(onUpdate)}>
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

          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <input
              type="text"
              {...register("description")}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

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
          </div>

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
          </div>

          <div className="mb-4">
            <label className="block font-medium">Due Date</label>
            <input
              type="datetime-local"
              {...register("dueDate")}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

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
          </div>

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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
