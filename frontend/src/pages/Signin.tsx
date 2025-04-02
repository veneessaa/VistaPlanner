import Logo from "../assets/images/logo_white.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

// Define validation schema using Zod
const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

function Signin() {
    const { login } = useAuth();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        console.log("Form Submitted", data);

        try {
            const res = await axios.post('http://localhost:5000/auth/signin', data);
            toast.success(res.data.message)
            login(res.data.user)
            navigate("/homepage");
        } catch (error: any) {
            toast.error(error.data.message)
        }
    };

    return (
        <div className="flex flex-wrap min-h-screen">
            {/* Welcome Section */}
            <div className="flex flex-col items-center justify-center bg-primary text-white w-full md:w-1/2 p-10 text-center px-15">
                <img src={Logo} alt="Vista Planner" className="w-60 -mt-12 mb-10" />
                <div className="flex flex-wrap justify-center items-center text-2xl">
                    <p className="mr-2 font-semibold">Hello, welcome to</p>
                    <h1 className="text-4xl font-bold">VISTA Planner</h1>
                    <p className="mt-5 text-lg w-full">
                        VISTA helps you stay on top of your tasks, schedules, and study goals with powerful productivity tools. Track progress, collaborate with peers, and optimize your learning experience. All in one place.
                    </p>
                    <p className="mt-6 text-xl font-semibold">Sign in to access your personalized dashboard and supercharge your study routine!</p>
                </div>
            </div>

            {/* Register Section */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-10 bg-white">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold text-primary text-center mb-6">SIGN IN</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <p>Email</p>
                            <input type="text" {...register("email")} placeholder="Enter your email" className="w-full h-12 border border-primary rounded-xl px-4 focus:border-2" />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <p>Password</p>
                            <input type="password" {...register("password")} placeholder="Enter your password" className="w-full h-12 border border-primary rounded-xl px-4 focus:border-2" />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        <button type="submit" className="w-full mt-3 px-6 py-3 bg-button-primary text-white rounded-4xl hover:bg-button-hover">
                            Sign In
                        </button>
                    </form>
                    <div className="flex flex-col items-center text-center mt-4">
                        <div className="flex">
                            <p>Don't have an account?</p>
                            <Link to="/signup" className="ml-1 font-bold text-link hover:underline">Sign Up</Link>
                            <p className="ml-1">now</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;