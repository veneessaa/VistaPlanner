import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ProfilePicture } from "../../../components/ProfilePicture";

interface DeleteCollabModalProps {
  isOpen: boolean;
  onClose: () => void;
  collabUsers: { id: string; name: string; email: string }[];
  taskId: string;
  onDeleteSuccess: (deletedIds: string[]) => void;
}

export const DeleteCollabModal = ({
  isOpen,
  onClose,
  collabUsers,
  taskId,
  onDeleteSuccess,
}: DeleteCollabModalProps) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleCheckboxChange = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDelete = async () => {
    try {
      const res = await axios.post("http://localhost:5000/tasks/remove-users", {
        taskId,
        userIds: selectedUserIds,
      });

      toast.success(res.data.message);
      onDeleteSuccess(selectedUserIds);
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete users");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Delete Collaborators
        </h2>
        <div className="space-y-3">
          {collabUsers.length > 0 ? (
            collabUsers.map((user) => (
              <label
                key={user.id}
                className="flex items-center gap-3 p-2 border rounded-md cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
                <div className="h-10 w-10">
                  <ProfilePicture name={user.name} fontSize="17" />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </label>
            ))
          ) : (
            <p className="text-center text-gray-500">No collaborators found.</p>
          )}
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              selectedUserIds.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={selectedUserIds.length === 0}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
