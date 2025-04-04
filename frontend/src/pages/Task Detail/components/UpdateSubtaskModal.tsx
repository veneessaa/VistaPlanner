import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface UpdateSubtaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateSubtaskDTO) => void;
  initialData: {
    title: string;
    status: "Not Started" | "In Progress" | "Done";
    userId?: string;
  };
  taskId: string;
  collabUsers: any[];
}

export const updateSubtaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["Not Started", "In Progress", "Done"]),
  userId: z.string().optional(),
  taskId: z.string().min(1, "Task ID is required"),
});

export type UpdateSubtaskDTO = z.infer<typeof updateSubtaskSchema>;

export const UpdateSubtaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  taskId,
  collabUsers,
}: UpdateSubtaskModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateSubtaskDTO>({
    resolver: zodResolver(updateSubtaskSchema),
    defaultValues: {
      title: initialData.title,
      status: initialData.status,
      userId: initialData.userId || "",
      taskId: taskId,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        status: initialData.status,
        userId: initialData.userId || "",
        taskId: taskId,
      });
    }
  }, [initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Update Subtask</h2>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit({ ...data, taskId });
          })}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              {...register("title")}
              className="w-full border rounded px-3 py-2"
              placeholder="Subtask title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Status</label>
            <select
              {...register("status")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Assigned User</label>
            <select
              {...register("userId")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Unassigned</option>
              {collabUsers.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.userId && (
              <p className="text-red-500 text-sm">{errors.userId.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
