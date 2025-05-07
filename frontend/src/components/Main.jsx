import { useEffect, useState } from "react";
import Nav from "./Nav";
import Calendar from "./Calendar";
import { calDates } from "../utils/dateUtils";

export default function Main({
  setSelectedDate,
  setModalState,
  isUpdated,
  setIsUpdated,
  setSelectedSchedule,
}) {
  // 오늘 날짜 state
  const [today, setToday] = useState(new Date());

  // 현재 캘린더에 보여줄 기준이 되는 날짜 state
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // 캘린더에 출력될 날짜 state
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates(calDates(today, currentDate));
  }, [today, currentDate]);

  return (
    <main>
      <Nav dates={dates} currentDate={currentDate} />
      <Calendar
        today={today}
        dates={dates}
        setDates={setDates}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setSelectedDate={setSelectedDate}
        setSelectedSchedule={setSelectedSchedule}
        setModalState={setModalState}
        isUpdated={isUpdated}
      />
    </main>
  );
}
