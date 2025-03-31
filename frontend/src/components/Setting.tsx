import { Link } from "react-router-dom";
import Profile from "../assets/images/Profile.png";

function Setting() {
    return (
        <Link to="/mysettings" className="flex items-center gap-4 translate-x-3 -translate-y-4">
            <div className="text-right">
                <p className="font-bold text-black">Jennie Kim</p>
                <p className="text-gray-500 text-sm">jennie.kim@binus.ac.id</p>
            </div>

            {/* Profile Image */}
            <img
                src={Profile}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
            />
        </Link>
    );
}
export default Setting;
