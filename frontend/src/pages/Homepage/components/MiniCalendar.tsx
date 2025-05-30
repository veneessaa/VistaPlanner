import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  dueDate: string | Date;
  category: string;
}

interface Props {
  myTasks: Task[];
}

const MiniCalendar = ({ myTasks }: Props) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Konversi dueDate ke Date object
  const taskDueDates = myTasks.map((task) =>
    typeof task.dueDate === "string" ? new Date(task.dueDate) : task.dueDate
  );

  // Cek apakah ada event (task) di tanggal ini
  const hasEvent = (date: Date) => {
    return taskDueDates.some(
      (due) =>
        due.getFullYear() === date.getFullYear() &&
        due.getMonth() === date.getMonth() &&
        due.getDate() === date.getDate()
    );
  };

  // Dapatkan semua task pada tanggal tertentu
  const tasksOnDate = (date: Date) => {
    return myTasks.filter((task) => {
      const due =
        typeof task.dueDate === "string"
          ? new Date(task.dueDate)
          : task.dueDate;
      return (
        due.getFullYear() === date.getFullYear() &&
        due.getMonth() === date.getMonth() &&
        due.getDate() === date.getDate()
      );
    });
  };

  // Handler klik tile
  const onTileClick = (dateClicked: Date) => {
    if (hasEvent(dateClicked)) {
      setSelectedDate(dateClicked);
      setModalOpen(true);
    } else {
      setModalOpen(false);
      setSelectedDate(null);
    }
    setDate(dateClicked);
  };

  return (
    <div className="w-full max-w-xs rounded-xl relative">
      <Calendar
        className="rounded-xl w-full"
        onChange={(value) => onTileClick(value as Date)}
        value={date}
        tileClassName={({ date }) => {
          const today = new Date();
          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return "bg-blue-200 text-blue-900 rounded-md";
          }
          return undefined;
        }}
        tileContent={({ date, view }) =>
          view === "month" && hasEvent(date) ? (
            <div className="relative w-full h-full">
              <span className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none event-dot"></span>
            </div>
          ) : null
        }
      />

      {/* Modal */}
      {modalOpen && selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
          <div className="bg-light rounded-lg p-6 w-80 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary">
                Tasks on {selectedDate.toDateString()}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ul>
              {tasksOnDate(selectedDate).map((task) => {
                const due =
                  typeof task.dueDate === "string"
                    ? new Date(task.dueDate)
                    : task.dueDate;
                const formattedTime = due.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <Link key={task.id} to={`/tasks/${task.id}`}>
                    <li className="border-gray-400 border-b py-2 hover:bg-light">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-xs text-gray-500">
                        {task.category} — {formattedTime}
                      </div>
                    </li>
                  </Link>
                );
              })}
              {tasksOnDate(selectedDate).length === 0 && (
                <li className="text-gray-500">No tasks on this day.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCalendar;
