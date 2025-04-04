// components/ConfirmDeleteModal.tsx
interface ConfirmDeleteModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    subtaskTitle: string;
  }
  
  export const ConfirmDeleteModal = ({
    onConfirm,
    onCancel,
    subtaskTitle,
  }: ConfirmDeleteModalProps) => {
    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-md w-96 text-center">
          <h2 className="text-lg font-bold mb-4">Delete Task</h2>
          <p className="mb-6">
            Are you sure you want to delete <strong>{subtaskTitle}</strong>?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };