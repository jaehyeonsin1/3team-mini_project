import { useEffect, useRef, useState } from "react";
import CalendarView from "./CalendarView";
import TimeView from "./TimeView";
import { getFormattedDate } from "../utils/dateUtils";
export default function Calendar({
  today,
  dates,
  setDates,
  currentDate,
  setCurrentDate,
  setSelectedDate,
  setModalState,
  isUpdated,
  setSelectedSchedule,
}) {
  // 날짜별, 시간별 전환 state
  const [viewMode, setViewMode] = useState("date");

  // 해당 캘린더 범위내의 일정 데이터 state
  const [schedules, setSchedules] = useState({});

  const didMountRef = useRef(false);

  // 날짜 이동, 일정 수정, 캘린더 전환 시 일정 목록을 조회해서 가져옴
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const getData = async () => {
      const data = await getSchedules();
      setSchedules(data);
    };

    if (dates.length > 0) {
      getData();
    }
  }, [dates, isUpdated, viewMode]);

  // 일정 가져옴
  const getSchedules = async () => {
    const start_d =
      viewMode === "date"
        ? getFormattedDate(dates[0].date)
        : getFormattedDate(currentDate);
    const end_d =
      viewMode === "date"
        ? getFormattedDate(dates[dates.length - 1].date)
        : getFormattedDate(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() + 6
            )
          );

    const res = await fetch(
      `http://localhost:3000/api/schedules?user_id=${localStorage.getItem(
        "user_id"
      )}&start_date=${start_d}&end_date=${end_d}`
    );

    const data = await res.json();
    const scheduleMap = {};
    for (const s of data) {
      let d = s.date.substring(0, 10);
      let h = s.time.substring(0, 2);
      let dh = `${d}/${h}`;
      if (!scheduleMap[d]) {
        if (viewMode === "time") {
          scheduleMap[dh] = [];
        } else {
          scheduleMap[d] = [];
        }
      }
      if (viewMode === "time") {
        scheduleMap[dh].push(s);
      } else {
        scheduleMap[d].push(s);
      }
    }

    return scheduleMap;
  };

  // 시간별 캘린더에서 주차 계산
  function getWeekNumber() {
    const first = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const dayOffset = first.getDay();
    const current = currentDate.getDate();
    return Math.ceil((current + dayOffset) / 7);
  }

  // 캘린더 이동
  function changeMonth(offset) {
    if (viewMode === "date") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
      );
    } else {
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + offset * 7
        )
      );
    }
  }

  return (
    <section className="calendar-panel">
      <div className="calendar-header">
        <div className="today-toggle">
          <button onClick={() => setCurrentDate(today)}>오늘</button>
        </div>
        <div className="move-toggle">
          <button onClick={() => changeMonth(-1)}>◀</button>
          <strong id="yearMonthLabel">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월{" "}
            {viewMode === "time" ? `${getWeekNumber()} 주차` : null}
          </strong>
          <button onClick={() => changeMonth(1)}>▶</button>
        </div>
        <div className="view-toggle">
          <button
            onClick={() => setViewMode("date")}
            className={viewMode === "date" ? "active" : null}
          >
            날짜 뷰
          </button>
          <button
            onClick={() => setViewMode("time")}
            className={viewMode === "time" ? "active" : null}
          >
            시간 뷰
          </button>
        </div>
      </div>
      {viewMode === "date" ? (
        <CalendarView
          today={today}
          dates={dates}
          schedules={schedules}
          currentDate={currentDate}
          setSelectedDate={setSelectedDate}
          setModalState={setModalState}
        />
      ) : (
        <TimeView
          today={today}
          schedules={schedules}
          currentDate={currentDate}
          setSelectedDate={setSelectedDate}
          setSelectedSchedule={setSelectedSchedule}
          setModalState={setModalState}
        />
      )}
    </section>
  );
}
