import "../styles/index.css";
import { useState } from "react";
import Logo from "../assets/images/logo_white.png";
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { FaRegCalendarDays } from "react-icons/fa6";
import { IoLogoBuffer } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: <IoHomeOutline size={30} />, label: "Home", to: "/homepage"},
  { icon: <MdLibraryBooks size={30} />, label: "Tasks", to: "/tasks" },
  { icon: <FaRegCalendarDays size={30} />, label: "Calendar", to: "/calendar" },
  // { icon: <FaBookReader size={30} />, label: "Study Zone", to: "/" },
  { icon: <IoLogoBuffer size={30} />, label: "Collab & Sharing", to: "/collab" },
  // { icon: <TbReportSearch size={30} />, label: "Resource Center", to: "/" },
  { icon: <CiSettings size={30} />, label: "My Settings", to: "/mysettings" },
];

function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <nav className={`shadow-md p-2 flex flex-col duration-500 bg-primary text-white ${open ? "w-60" : "w-18"}`}>
      <div className={`px-2 py-2 h-20 flex justify-between items-center ${!open ? "justify-center" : "mb-3"}`}>
        <img src={Logo} alt="Logo" className={`${open ? "w-38" : "w-0"} mt-4`} />
        <MdMenuOpen size={35} className={`cursor-pointer duration-500 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
      </div>
      <ul className="flex-1 p-1">
        {menuItems.map((item, index) => (
          <Link to={item.to}>
          <li key={index} className="px-2 py-2 my-3 hover:bg-mid rounded-md duration-300 cursor-pointer flex gap-5 items-center">
            <div>{item.icon}</div>
            <p className={`${!open && "w-0 hidden"} duration-300`}>{item.label}</p>
          </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;