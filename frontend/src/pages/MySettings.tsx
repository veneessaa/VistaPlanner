import { useState } from "react";
import { SidebarLayout } from "../components/layout/SidebarLayout";
import userPhoto from "../assets/images/Profile.png"

function MySettings() {
  const [user, setUser] = useState({
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
    setUser((prev) => ({ ...prev, [name]: value }));
  };


  const handleUpdate = () => {
    alert("user updated successfully!");
  };

  return (
    <SidebarLayout pageName="User Profile">
      <div className="flex flex-wrap min-h-screen overflow-hidden">
        {/* <div className="container mx-auto"> */}
        <div className="flex flex-col w-full pr-8 overflow-hidden">
          <div className="flex gap-5">
            <div className="flex flex-col justify-center items-center p-4 bg-blue-200 rounded-lg px-40">
              <img src={userPhoto} alt="user" className="w-50 rounded-full border-4 border-white" />
              <h2 className="text-xl font-bold mt-2">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600">{user.phone}</p>
              <p className="text-gray-500">{user.location}</p>
            </div>

            <div className="bg-blue-200 rounded-lg flex-1 p-7">
              <h3 className="font-bold mb-4">General Information</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={user.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    value={user.birthDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-blue-200 p-7 rounded-lg mt-4">
              <h3 className="font-bold mb-4">Security</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>

            <button onClick={handleUpdate} className="w-full mt-4 bg-button-primary hover:bg-button-hover text-white p-2 rounded-4xl">
              Save Changes
            </button>
          </div>
        </div>
        {/* </div> */}
      </div>

    </SidebarLayout>
  );
}

export default MySettings;
