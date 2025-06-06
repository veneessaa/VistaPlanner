import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ProfilePicture } from "../../components/ProfilePicture";

const schema = z.object({
  name: z.string().min(1, "Name is required"),

  gender: z
    .string()
    .optional()
    .refine((val) => !val || val === "Male" || val === "Female", {
      message: "Gender must be either 'Male' or 'Female'",
    }),

  bio: z.string().optional(),

  birthDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const inputDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // agar hanya membandingkan tanggal, bukan waktu
        return inputDate <= today;
      },
      {
        message: "Birth date cannot be in the future",
      }
    ),

  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password must be at least 6 characters",
    }),

  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{11,}$/.test(val), {
      message:
        "Phone number must be at least 11 digits and contain only numbers",
    }),
});

type FormData = z.infer<typeof schema>;

function MySettings() {
  const { user, login, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
      gender: "",
      bio: "",
      birthDate: "",
      email: user?.email || "",
      password: "",
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/users/${user?.id}`,
        data
      );
      toast.success(res.data.message);
      login(res.data.user);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <SidebarLayout pageName="User Profile">
      <div className="flex flex-wrap overflow-hidden max-h-screen">
        <div className="flex flex-col w-full overflow-hidden">
          <div className="flex gap-5">
            <div className="flex flex-col justify-center items-center p-4 bg-third rounded-lg px-40">
              <div className="w-50 h-50">
                <ProfilePicture name={user?.name} fontSize="70" />
              </div>

              <h2 className="text-xl font-bold mt-2">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>

            <div className="bg-third rounded-lg flex-1 p-6">
              <h3 className="font-bold mb-3">General Information</h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    {...register("name")}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender">Gender</label>
                  <input
                    {...register("gender")}
                    placeholder="Enter your gender"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="bio">Bio</label>
                  <input
                    {...register("bio")}
                    placeholder="Enter your bio"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="birthDate">Date of Birth</label>
                  <input
                    type="date"
                    {...register("birthDate")}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.birthDate && (
                    <p className="text-red-500 text-sm">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-third p-6 rounded-lg mt-4">
              <h3 className="font-bold mb-2">Security</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    {...register("phoneNumber")}
                    placeholder="Enter your phone number"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Enter your new password"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => logout()}
                className="w-full mt-4 bg-red-700 hover:bg-red-800 text-white p-2 rounded-4xl"
              >
                Logout
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full mt-4 bg-button-primary hover:bg-button-hover text-white p-2 rounded-4xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default MySettings;
