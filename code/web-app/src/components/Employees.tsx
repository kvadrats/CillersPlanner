import React, { useEffect, useState } from "react";
import employeeslist from "./Employeeslist"; // Adjust the path as necessary
import gallery2 from "../public/gallery2.jpg";
// import EmployeeSchedule from "./Schedule";

interface WorkingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

interface Employee {
  name: string;
  position: string;
  location: string;
  workingHours: WorkingHours;
  image: string;
}
const Employees: React.FC = () => {
  const employeeList: Employee[] = employeeslist as Employee[];
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    setFadeIn(true); // Trigger the fade-in effect when the component mounts
  }, []);

  const handleProfileClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div
      className={`fade-in ${
        fadeIn ? "fade-in-active" : ""
      } h-screen flex flex-col flex-grow justify-center pl-10`}
    >
      <div
        style={{ border: "3px solid #1c6b59" }}
        className="h-[90%] w-[90%] border border-black bg-[#1c6b59]  ml-7 text-white rounded-2xl"
      >
        <div className="flex flex-col mx-6 my-7">
          <h2 className="tracking-wide">Manage your employees</h2>
          <p className="tracking-wider font-thin mt-4">@Pasta La Vista Baby</p>
        </div>
        <div className="flex justify-center flex-col items-center">
          {employeeList.map((employee, index) => (
            <div
              key={index}
              className="w-[96%] py-2 px-6 border mt-4 bg-white opacity-90 rounded-xl flex items-center"
            >
              {/* Image Section */}
              <div className="relative w-[100px] h-[100px] ml-[-12px] rounded-lg hover:scale-110 transition duration-300">
                <img
                  className="h-full rounded-lg"
                  src={employee.image}
                  alt=""
                />
              </div>

              {/* Text Section */}
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-black">
                  {employee.name}{" "}
                </h2>
                <p className="text-sm text-gray-700">{employee.position}</p>
                <p className="text-sm text-gray-500">{employee.location}</p>
              </div>

              <div>
                <button
                  onClick={() => handleProfileClick(employee)}
                  className="py-2 px-4 bg-orange-500 hover:bg-orange-400 transition duration-300 text-white rounded-full"
                >
                  Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Employees;
