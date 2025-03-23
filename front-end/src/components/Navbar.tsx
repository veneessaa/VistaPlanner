import "../styles/index.css";
import { useState } from "react";
import Logo from "../assets/images/logo_white.png";
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

const menuItems = [
  { icon: <IoHomeOutline size={30} />, label: "Home" },
  { icon: <MdLibraryBooks size={30} />, label: "Tasks" },
  { icon: <FaRegCalendarDays size={30} />, label: "Calendar" },
  { icon: <FaBookReader size={30} />, label: "Study Zone" },
  { icon: <IoLogoBuffer size={30} />, label: "Collab & Sharing" },
  { icon: <TbReportSearch size={30} />, label: "Resource Center" },
  { icon: <CiSettings size={30} />, label: "My Settings" },
];

function Navbar() {
  const [open, setOpen] = useState(true);

  return (
    <nav className={`shadow-md p-2 flex flex-col duration-500 bg-blue-600 text-white ${open ? "w-60" : "w-16"}`}>
      <div className="px-2 py-2 h-20 flex justify-between items-center">
        <img src={Logo} alt="Logo" className={`${open ? "w-38" : "w-0"} rounded-md`} />
        <MdMenuOpen size={34} className={`cursor-pointer duration-500 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
      </div>
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <li key={index} className="px-2 py-2 my-3 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-5 items-center">
            <div>{item.icon}</div>
            <p className={`${!open && "w-0 translate-x-24"} duration-500 overflow-hidden`}>{item.label}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;