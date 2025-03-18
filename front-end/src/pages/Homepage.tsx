import { useState } from 'react';
import Logo from "../assets/images/logo_white.png";
import Profile from "../assets/images/Profile.png";
import list from "../assets/images/list.png";
import calendar from "../assets/images/calendar.png";
import colab from "../assets/images/colab.png";

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
    <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 w-full max-w-[290px] shadow-sm mt-[-10px]">
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
      <div className="flex items-center gap-2  relative mt-[-20px] left-3">
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
  <div className="flex justify-between items-start mt-5">
    {/* Left Side - Welcome Text */}
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Welcome back,</h1>
      <h2 className="text-3xl font-bold text-gray-700">Jennie Kim</h2>
      <p className="text-gray-500">Student at Bina Nusantara University</p>
    </div>

    {/* Right Side - Boxes */}
    <div className="grid grid-cols-4 gap-4 flex-shrink-0 w-[500px] mt-6 ">
    {/* Box 1 */}
    <div className="bg-blue-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-32 h-32 transform -translate-x-45 -translate-y-10">
      <span className="text-blue-600 text-2xl font-bold scale-150">+</span>
    </div>

    {/* Box 2 */}
    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center w-32 h-32 flex flex-col justify-center items-center transform -translate-x-40 -translate-y-10">
      <img src={list} alt="Icon 2" className="w-10 h-10 mb-2" />
      <p className="font-semibold text-sm">Stay organized</p>
      <p className="text-gray-500 text-xs">A clear structure for your notes</p>
    </div>

    {/* Box 3 */}
    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center w-32 h-32 flex flex-col justify-center items-center transform -translate-x-35 -translate-y-10">
      <img src={calendar} alt="Icon 3" className="w-8 h-8 mb-2" />
      <p className="font-semibold text-sm">Sync your calendar</p>
      <p className="text-gray-500 text-xs">Ensure that notes are synced</p>
    </div>

    {/* Box 4 */}
    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center w-32 h-32 flex flex-col justify-center items-center transform -translate-x-30 -translate-y-10">
      <img src={colab} alt="Icon 4" className="w-8 h-8 mb-2" />
      <p className="font-semibold text-sm">Collaborate and Share</p>
      <p className="text-gray-500 text-xs">Share notes with colleagues</p>
    </div>
  </div>
</div>


 {/* Notification Box - Positioned Below Welcome Section */}
 <div className="w-80 bg-blue-100 p-3 rounded-xl shadow-md -translate-y-8">
    {/* Header */}
    <div className="flex justify-between items-center mb-2">
      <h2 className="font-semibold text-[15px]">Notifications</h2>
      <button className="text-gray-500 hover:text-gray-700 text-xs flex items-center gap-1 bg-transparent p-0 m-0 border-none shadow-none">
        <span className="material-icons text-sm bg-blue-100">Delete Clear</span>
      </button>
    </div>

    {/* Notification 1 */}
    <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
      <p className="font-semibold text-[12px] ">Upcoming event <span className="text-green-500">●</span></p>
      <p className="text-[9px] text-gray-500 ">SE standup meeting | Time: 15 min</p>
      <div className="flex items-center text-[9px] text-gray-600 mt-1">
        <span className="material-icons text-[9px] mr-1 ">calendar_today</span>
        <span className= "Tue, 18 Feb "></span>
        <span className="font-bold">20.00 PM - 20.15 PM</span>
      </div>
    </div>

    {/* Notification 2 */}
    <div className="bg-white p-3 rounded-lg shadow-sm">
      <p className="font-semibold text-[12px]">Message | Product design</p>
      <p className="text-xs text-gray-500">Message from Jiso Kim</p>
      <div className="bg-blue-200 p-2 rounded-lg mt-1 text-[8px] text-gray-700">
        Hey Jennie! Just wanted to check in and see how it is...
      </div>
    </div>
</div>

{/* Assugnment Box - Positioned Below Welcome Section */}
<div className="w-100 h-65 bg-blue-100 p-3 rounded-xl shadow-md -translate-y-62 ml-85">
    {/* Header */}
    <div className="flex justify-between items-center mb-2">
      <h2 className="font-semibold text-[15px]">Assignments</h2>
      <button className="text-gray-500 hover:text-gray-700 text-xs flex items-center gap-1 bg-transparent p-0 m-0 border-none shadow-none">
        <span className="material-icons text-sm bg-blue-100">Delete Clear</span>
      </button>
    </div>

    {/* Assignment 1 */}
    <div className="bg-blue-600 p-3 rounded-lg shadow-sm mb-2">
      <p className="font-semibold text-[12px] text-white">Research Paper On AI Ethics <span className="text-white ml-[150px]">●●●</span></p>
      <div className="font-semibold bg-gray-200 p-1 rounded-lg mt-1 text-[10px] text-blue-700 w-30">Research Methodology </div>
    </div>
    
    {/* Assignment 1 */}
    <div className="bg-blue-600 p-3 rounded-lg shadow-sm mb-2">
      <p className="font-semibold text-[12px] text-white">Group Presentation<span className="text-white ml-[205px]">●●●</span></p>
      <p className="font-semibold text-[12px] text-white">Computational Biology</p>
      <div className="font-semibold bg-gray-200 p-1 rounded-lg mt-1 text-[10px] text-blue-700 w-30">Computational Biology</div>
    </div>
    
    {/* Add Task  */}
<div className="w-94 h-8 bg-blue-600 p-3 rounded-lg shadow-sm mb-2 flex justify-center items-center">
  <div className=" flex justify-center items-center font-semibold bg-gray-200 p-2 rounded-lg text-[10px] text-blue-700 w-5 h-5 flex justify-center items-center">
    +
  </div>
</div>
 
</div>
</div>
</div>

  );
}

export default Homepage;