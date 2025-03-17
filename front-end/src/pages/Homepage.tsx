import { useState } from 'react';
import Logo from "../assets/images/logo_white.png";
import Profile from "../assets/images/Book.png";

// icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { FaRegCalendarDays } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FaBookReader } from "react-icons/fa";

const menuItems = [
  { icons: <IoHomeOutline size={30} />, label: 'HOME' },
  { icons: <MdLibraryBooks size={30} />, label: 'TASKS' },
  { icons: <FaRegCalendarDays size={30} />, label: 'CALENDAR' },
  { icons: <FaBookReader size={30} />, label: 'STUDY ZONE' },
  { icons: <IoLogoBuffer size={30} />, label: 'COLAB & SHARING' },
  { icons: <TbReportSearch size={30} />, label: 'RESOURCE CENTER' },
  { icons: <CiSettings size={30} />, label: 'MY SETTINGS' }
];

function Homepage(){
    const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className={`shadow-md p-2 flex flex-col duration-500 bg-blue-600 text-white ${open ? 'w-60' : 'w-16'}`}>

        {/* Header */}
        <div className='px-2 py-2 h-20 flex justify-between items-center'>
          <img src={Logo} alt="Logo" className={`${open ? 'w-38' : 'w-0'} rounded-md`} />
          <MdMenuOpen size={34} className={`duration-500 cursor-pointer ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />
        </div>

        {/* Body */}
        <ul className='flex-1'>
          {menuItems.map((item, index) => (
            <li key={index} className='px-2 py-2 my-3 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
              <div>{item.icons}</div>
              <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
              <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>
                {item.label}
              </p>
            </li>
          ))}
        </ul>

      </nav>

{/* Main Content */}
<div className="flex-1 p-6 relative mt-6-[6px]">
  {/* Top Bar (Search & Profile Section) */}
  <div className="flex items-center justify-between w-full">
    {/* Search Bar */}
    <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 w-full max-w-[290px] shadow-sm mt-[-30px]">
      <span className="text-gray-400 text-sm">🔍</span>
      <input 
        type="text" 
        placeholder="Search or type command" 
        className="bg-transparent outline-none text-gray-500 text-sm w-full ml-2"
      />
    </div>

    {/* Right Section (Icons + Profile) */}
    <div className="flex items-center gap-2">
      {/* Icons (Help, Notifications, Settings) */}
      <div className="flex items-center gap-2 mt-[-20px] left-10">
        <button className="text-gray-500 hover:text-gray-700 text-sm">❓</button>
        <button className="text-gray-500 hover:text-gray-700 text-sm">🔔</button>
        <button className="text-gray-500 hover:text-gray-700 text-sm">⚙️</button>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md relative mt-[-20px] left-3">
        <div className="text-right">
          <p className="font-bold text-black text-sm">Jennie Kim</p>
          <p className="text-gray-500 text-[10px] leading-tight">jennie.kim@binus.ac.id</p>
        </div>

        {/* Profile Image */}
        <img
          src={Profile} 
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
        />
      </div>
    </div>
  </div>

  {/* Welcome Section */}
  <div className="relative mt-[-10px] ">
    <h1 className="text-3xl font-bold">Welcome back,</h1>
    <h2 className="text-3xl font-bold text-gray-700">Jennie Kim</h2>
    <p className="text-gray-500">Student at Bina Nusantara University</p>
  </div>
</div>
</div>
  );
}

export default Homepage;