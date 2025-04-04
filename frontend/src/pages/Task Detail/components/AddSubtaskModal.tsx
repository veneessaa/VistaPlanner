import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";

export const createSubtaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["Not Started", "In Progress", "Done"]),
  userId: z.string().optional(),
  taskId: z.string().min(1, "Task ID is required"),
});

export type CreateSubtaskDTO = z.infer<typeof createSubtaskSchema>;

interface AddSubtaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSubtaskDTO) => void;
  taskId: string;
  collabUsers: any;
}

export const AddSubtaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  taskId,
  collabUsers,
}: AddSubtaskModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubtaskDTO>({
    resolver: zodResolver(createSubtaskSchema),
    defaultValues: {
      status: "Not Started",
      taskId,
    },
  });

  if (!isOpen) return null;

  console.log(collabUsers);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add Subtask</h2>

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

          {/* Optional userId */}
          <div className="mb-4">
            <label className="block font-medium">Assign to User</label>
            <select
              {...register("userId")}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">-- Select User --</option>
              {collabUsers.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.userId && (
              <p className="text-red-500 text-sm">{errors.userId.message}</p>
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
