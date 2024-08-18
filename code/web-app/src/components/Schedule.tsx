import React from "react";
import Calendar from "./Calendar";
import moment from "moment";
import employeeslist from "./Employeeslist";

const employeeEvents = employeeslist.flatMap((employee) => {
  return Object.entries(employee.workingHours).flatMap(([day, hours]) => {
    if (hours === "Unavailable") return []; // Skip if unavailable

    const times = hours.split("-");
    if (times.length !== 2) {
      console.error(
        `Invalid time format for ${employee.name} on ${day}: ${hours}`
      );
      return [];
    }

    const [startHour, endHour] = times.map((time) => moment(time, "HH:mm"));
    if (!startHour.isValid() || !endHour.isValid()) {
      console.error(
        `Invalid time format for ${employee.name} on ${day}: ${hours}`
      );
      return [];
    }

    // Get the day of the week as a number (0 = Sunday, 1 = Monday, etc.)
    const targetDay = moment().day(day);

    // If the target day is in the past, move to next week
    if (targetDay.isBefore(moment(), "day")) {
      targetDay.add(1, "week");
    }

    const start = targetDay
      .clone()
      .set({ hour: startHour.hour(), minute: startHour.minute() });
    const end = targetDay
      .clone()
      .set({ hour: endHour.hour(), minute: endHour.minute() });

    return {
      start: start.toDate(),
      end: end.toDate(),
      title: `${employee.name} - ${employee.position}`,
    };
  });
});

const Schedule: React.FC = () => {
  return (
    <div className="h-[90vh] w-[80vh]  flex flex-col flex-grow justify-center mt-10 pl-10">
      <Calendar events={employeeEvents} />
    </div>
  );
};

export default Schedule;
