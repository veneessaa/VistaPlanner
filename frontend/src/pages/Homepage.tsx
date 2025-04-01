import { useState } from 'react';
import Profile from "../assets/images/Profile.png";
import list from "../assets/images/list.png";
import calendar from "../assets/images/calendar.png";
import colab from "../assets/images/colab.png";
import profile1 from "../assets/images/profile1.png";
import profile2 from "../assets/images/profile2.png";
import profile3 from "../assets/images/profile3.png";
import profile4 from "../assets/images/profile4.png";
import { Link } from "react-router-dom";
import Setting from '../components/Setting';

function Homepage() {
  return (
    <div>content</div>
    // <>
    //   {/* Main Content */}
    //   <div className="flex-1 p-6 relative mt-6-[6px]">
    //     {/* Top Bar (Search & Profile Section) */}
    //     <div className="flex items-center justify-between w-full">
    //       {/* Search Bar */}
    //       <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 w-full max-w-[290px] shadow-sm mt-[-10px]">
    //         <span className="text-gray-400 text-sm">🔍</span>
    //         <input
    //           type="text"
    //           placeholder="Search or type command"
    //           className="bg-transparent outline-none text-gray-500 text-sm w-full ml-2"
    //         />
    //       </div>

    //       {/* Right Section (Icons + Profile) */}
    //       <div className="flex items-center gap-2">
    //         {/* Icons (Help, Notifications, Settings) */}
    //         <div className="flex items-center gap-2 mt-[-20px] left-10">
    //           <button className="text-gray-500 hover:text-gray-700 text-sm">❓</button>
    //           <button className="text-gray-500 hover:text-gray-700 text-sm">🔔</button>
    //         </div>

    //         {/* Profile Info */}
    //         <Setting />
    //       </div>
    //     </div>

    //     {/* Welcome Section */}
    //     <div className="flex justify-between items-start mt-5">
    //       {/* Left Side - Welcome Text */}
    //       <div className="flex flex-col">
    //         <h1 className="text-3xl font-bold">Welcome back,</h1>
    //         <h2 className="text-3xl font-bold text-gray-700">Jennie Kim</h2>
    //         <p className="text-gray-500">Student at Bina Nusantara University</p>
    //       </div>

    //       {/* Right Side - Boxes */}
    //       <div className="grid grid-cols-4 gap-4 flex-shrink-0 w-[500px] mt-6 ">
    //         {/* Box 1 */}
    //         <div className="bg-blue-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-32 h-32 transform -translate-x-45 -translate-y-10">
    //           <span className="text-blue-600 text-2xl font-bold scale-150">+</span>
    //         </div>

    //         {/* Box 2 */}
    //         <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center w-32 h-32 flex flex-col justify-center items-center transform -translate-x-40 -translate-y-10">
    //           <img src={list} alt="Icon 2" className="w-10 h-10 mb-2" />
    //           <p className="font-semibold text-sm">Stay organized</p>
    //           <p className="text-gray-500 text-xs">A clear structure for your notes</p>
    //         </div>

    //         {/* Box 3 */}
    //         <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center w-32 h-32 flex flex-col justify-center items-center transform -translate-x-35 -translate-y-10">
    //           <img src={calendar} alt="Icon 3" className="w-8 h-8 mb-2" />
    //           <p className="font-semibold text-sm">Sync your calendar</p>
    //           <p className="text-gray-500 text-xs">Ensure that notes are synced</p>
    //         </div>

    //         {/* Box 4 */}
    //         <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center w-32 h-32 flex flex-col justify-center items-center transform -translate-x-30 -translate-y-10">
    //           <img src={colab} alt="Icon 4" className="w-8 h-8 mb-2" />
    //           <p className="font-semibold text-sm">Collaborate and Share</p>
    //           <p className="text-gray-500 text-xs">Share notes with colleagues</p>
    //         </div>
    //       </div>
    //     </div>


    //     {/* Notification Box*/}
    //     <div className="w-72 bg-blue-100 p-2 rounded-lg shadow-md -translate-y-12">
    //       {/* Header */}
    //       <div className="flex justify-between items-center mb-2">
    //         <h2 className="font-semibold text-[15px]">Notifications</h2>
    //         <button className="text-gray-500 hover:text-gray-700 text-xs flex items-center gap-1 bg-transparent p-0 m-0 border-none shadow-none">
    //           <span className="material-icons text-sm bg-blue-100">Delete Clear</span>
    //         </button>
    //       </div>


    //       {/* Notification 1 */}
    //       <div className="bg-white p-2 rounded-md shadow-sm mb-1">
    //         <p className="font-semibold text-[10px]">Upcoming Event <span className="text-green-500">●</span></p>
    //         <p className="text-[9px] text-gray-500">SE standup meeting | 15 min</p>
    //         <div className="flex items-center text-[8px] text-gray-600 mt-1">
    //           <span className="material-icons text-[8px] mr-1">📅 Tue, 18 Feb</span>
    //           <span className="font-bold ml-1">| 🕐 20:00 - 20:15</span>
    //         </div>
    //       </div>

    //       {/* Notification 2 */}
    //       <div className="bg-white p-2 rounded-md shadow-sm">
    //         <p className="font-semibold text-[10px]">Message | Product Design</p>
    //         <p className="text-[9px] text-gray-500">From Jiso Kim</p>
    //         <div className="bg-blue-200 p-1 rounded-md mt-1 text-[8px] text-gray-700">
    //           Hey Jennie! Just wanted to check in...
    //         </div>
    //       </div>
    //     </div>


    //     {/* Assignment Box*/}
    //     <div className="flex justify-between items-start mt-5">
    //       <div className="w-100 h-86 bg-blue-100 p-3 rounded-xl shadow-md -translate-y-55 ml-75">
    //         {/* Header */}
    //         <div className="flex justify-between items-center mb-2">
    //           <h2 className="font-semibold text-[15px]">Assignments</h2>
    //           {/* Avatars */}
    //           <div className="flex -space-x-2 -translate-x-10">
    //             <img src={Profile} className="w-6 h-6 rounded-full border-2 border-white" alt="Avatar 1" />
    //             <img src={profile1} className="w-6 h-6 rounded-full border-2 border-white" alt="Avatar 2" />
    //             <img src={profile2} className="w-6 h-6 rounded-full border-2 border-white" alt="Avatar 3" />
    //             <img src={profile3} className="w-6 h-6 rounded-full border-2 border-white" alt="Avatar 4" />
    //             <img src={profile4} className="w-6 h-6 rounded-full border-2 border-white" alt="Avatar 5" />
    //             <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
    //               +
    //             </div>
    //           </div>
    //           <button className="text-gray-500 hover:text-gray-700 text-xs flex items-center gap-1 bg-transparent p-0 m-0 border-none shadow-none">
    //             <span className="material-icons text-sm bg-blue-100">Delete Clear</span>
    //           </button>
    //         </div>

    //         {/* Assignment 1 */}
    //         <div className="bg-blue-600 p-3 rounded-lg shadow-sm mb-2">
    //           <p className="font-semibold text-[12px] text-white">Research Paper On AI Ethics <span className="text-white ml-[150px]">●●●</span></p>
    //           <div className="font-semibold bg-gray-200 p-1 rounded-lg mt-1 text-[10px] text-blue-700 w-30">Research Methodology </div>
    //         </div>

    //         {/* Assignment 1 */}
    //         <div className="bg-blue-600 p-3 rounded-lg shadow-sm mb-2">
    //           <p className="font-semibold text-[12px] text-white">Group Presentation<span className="text-white ml-[205px]">●●●</span></p>
    //           <p className="font-semibold text-[12px] text-white">Computational Biology</p>

    //           {/* Tools */}
    //           <div className="flex gap-1 mt-2">
    //             <span className="bg-purple-300 text-black text-[10px] px-2 py-[2px] rounded-lg">Canva</span>
    //             <span className="bg-pink-300 text-black text-[10px] px-2 py-[2px] rounded-lg">Google</span>
    //           </div>

    //           {/* Anggota */}
    //           <div className="flex items-center gap-1 mt-2">
    //             {/* Avatar */}
    //             <img src={Profile} alt="avatar1" className="w-5 h-5 rounded-full" />
    //             <img src={profile1} alt="avatar2" className="w-5 h-5 rounded-full -ml-2" />
    //             <img src={profile2} alt="avatar3" className="w-5 h-5 rounded-full -ml-2" />
    //             {/* Jumlah lebih banyak */}
    //             <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white text-[10px] text-white flex justify-center items-center rounded-full -ml-2">
    //               +5
    //             </div>
    //           </div>

    //           {/* Due Date */}
    //           <div className="mt-2 bg-white text-blue-600 text-[10px] font-bold px-2 py-[2px] rounded-lg inline-block">
    //             DUE DATE: 26 MARCH
    //           </div>
    //           <div className="font-semibold bg-gray-200 p-1 rounded-lg mt-1 text-[10px] text-blue-700 w-30">Computational Biology</div>

    //         </div>

    //         {/* Add Task */}
    //         <div className="w-94 h-8 bg-blue-600 p-3 rounded-lg shadow-sm mb-2 flex justify-center items-center">
    //           <div className="flex items-center gap-2">

    //             <div className="w-5 h-5 flex justify-center items-center font-semibold bg-gray-200 rounded-lg text-blue-700 text-[10px]">
    //               +
    //             </div>
    //             <p className="font-semibold text-[10px] text-white">Add New Assignment</p>
    //           </div>
    //         </div>

    //         {/* Reminders Box */}
    //         <div className="w-72  bg-blue-100 p-3 rounded-xl shadow-md -translate-x-78 -translate-y-45">
    //           {/* Header */}
    //           <div className="flex justify-between items-center mb-2">
    //             <h2 className="font-semibold text-[15px]">Reminders</h2>
    //             <button className="text-gray-500 hover:text-gray-700 text-xs flex items-center gap-1 bg-transparent p-0 m-0 border-none shadow-none">
    //               <span className="material-icons text-sm bg-blue-100">Delete Clear</span>
    //             </button>
    //           </div>

    //           {/* Reminder 1 */}
    //           <div className="bg-white p-2 rounded-md shadow-sm mb-1">
    //             <p className="font-semibold text-[10px]">SE - Daily Progress Check <span className="text-green-500">●</span></p>
    //             <p className="text-[9px] text-gray-500">17 Feb 2025, Mon</p>
    //           </div>

    //           {/* Reminder 2 */}
    //           <div className="bg-white p-2 rounded-md shadow-sm">
    //             <p className="font-semibold text-[10px]">CompBio - Submit Assignment <span className="text-green-500">●</span></p>
    //             <p className="text-[9px] text-gray-500">17 Feb 2025, Mon</p>
    //           </div>
    //         </div>
    //       </div>

    //       {/*Collab Box */}
    //       <div className="w-72 h-19 bg-blue-100 p-3 rounded-xl shadow-md -translate-x-214 translate-y-24">
    //         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 w-full">
    //           <div className="flex-1">
    //             <h2 className="font-semibold text-gray-900 text-sm -translate-y-2">Collab board</h2>
    //             <p className="text-gray-500 text-[10px] flex items-center gap-1 -translate-y-2">
    //               📅 Feb 20 at 18.00
    //             </p>
    //             <p className="text-gray-700 text-[10px] -translate-y-2">SM Entertainment</p>
    //             <p className="text-gray-700 text-[10px] -translate-y-2">18th floor, Room 123</p>
    //           </div>
    //           <div className="w-full sm:w-auto">
    //             <button className="w-18 h-5 bg-gray-300 text-gray-800 px-2 py-1 rounded text-[10px] font-xs hover:bg-gray-400 mr-3">
    //               Reschedule
    //             </button>
    //             <button className="w-18 h-5 bg-gray-300 text-gray-800 px-3 py-1 rounded text-[10px] font-xs hover:bg-blue-400">
    //               Accept
    //             </button>
    //           </div>
    //         </div>

    //         {/* Edit Button */}
    //         <button className="absolute top-2 right-3 text-blue-100 hover:text-blue-100 text-xs">
    //           ✏️
    //         </button>
    //       </div>

    //     </div>
    //   </div>
    // </>

  );
}

export default Homepage;