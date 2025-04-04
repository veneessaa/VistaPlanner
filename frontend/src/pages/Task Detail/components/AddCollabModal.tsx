import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailSchema = z.object({
    email: z.string().email("Invalid email format"),
});

type EmailForm = z.infer<typeof emailSchema>;

interface AddCollabModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EmailForm) => void;
}

export const AddCollabModal: React.FC<AddCollabModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">Enter Email</h2>
                <form
                    onSubmit={handleSubmit((data) => {
                        onSubmit(data);
                        reset();
                    })}
                >
                    <input
                        type="text"
                        {...register("email")}
                        className="border p-2 w-full rounded"
                        placeholder="Enter email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-gray-400 text-white rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
