import { useState } from "react";
import Profile from "../assets/images/Profile.png";
import Navbar from "../components/Sidebar";

function MySettings() {
  const [profile, setProfile] = useState({
    firstName: "Jennie",
    lastName: "Kim",
    username: "jenniekim",
    birthDate: "1996-01-16",
    email: "jennie.kim@binus.ac.id",
    password: "********",
    phone: "+82108999730",
    location: "Seoul, South Korea",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };


  const handleUpdate = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex h-screen bg-blue-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between w-full mb-6">
          <div>
            <h1 className="text-3xl font-bold translate-x-5 -translate-y-2">User Profile</h1>
            <h2 className="text-gray-500 text-sm translate-x-5">Manage your details, view your tier status and change your password</h2>
          </div>
          <div className="flex items-center gap-4 translate-x-3 -translate-y-4">
            <div className="text-right">
              <p className="font-bold text-black">{profile.firstName} {profile.lastName}</p>
              <p className="text-gray-500 text-sm">{profile.email}</p>
            </div>
            <img src={Profile} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
          </div>
        </div>

        {/* Profile Form */}
        <div className=" w-100 h-68 flex flex-col items-center p-4 bg-blue-200 rounded-lg translate-x-20 -translate-y-3">
          <img src={Profile} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white translate-y-2" />
          <h2 className="text-xl font-bold mt-2 translate-y-4">{profile.firstName} {profile.lastName}</h2>
          <p className="text-gray-600 translate-y-4">{profile.phone}</p>
          <p className="text-gray-500 translate-y-4">{profile.location}</p>
        </div>

        {/* General Information */}
        <div className="w-100 bg-blue-200 p-4 rounded-lg translate-x-130 -translate-y-70">
          <h3 className="font-bold mb-4">General Information</h3>
          <div className="grid grid-cols-2 gap-2">

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Username */}
            <div className="col-span-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Birth Date */}
            <div className="col-span-2">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                value={profile.birthDate}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="w-210 bg-blue-200 p-4 rounded-lg mt-4 translate-x-20 -translate-y-70">
          <h3 className="font-bold mb-4">Security</h3>
          <div className="grid grid-cols-3 gap-4">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={profile.password}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handleUpdate} className="w-210 mt-4 bg-blue-400 text-black p-2 rounded-lg font-bold -translate-y-70 translate-x-20">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default MySettings;
