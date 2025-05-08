import { getFormattedDate } from "../utils/dateUtils";
export default function CalendarView({
  dates,
  schedules,
  currentDate,
  setSelectedDate,
  setModalState,
}) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  // 42일을 주 단위로 끊어서 가공
  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    const week = dates.slice(i, i + 7);
    weeks.push(week);
  }

  return (
    <div id="calendarView" className="calendar-view">
      <div id="dayofweek" className="week">
        {days.map((d, idx) => (
          <div className="calendar-cell" key={idx}>
            <div>{d}</div>
          </div>
        ))}
      </div>
      {weeks.map((week, idx) => (
        <div className="week" key={idx}>
          {week.map((d, i) => (
            <div
              className={
                "calendar-cell" +
                (d.isCurrentMonth ? "" : " gray") +
                (d.isToday ? " today" : "")
              }
              onClick={() => {
                setSelectedDate({
                  date: `${getFormattedDate(d.date)}`,
                  schedules: schedules[getFormattedDate(d.date)] || [],
                });
                setModalState("schedule-list");
              }}
              key={i}
            >
              <div className="cell-header">{d.date.getDate()}</div>
              <div className="cell-section">
                {schedules[getFormattedDate(d.date)] ? (
                  <div className="cell-article">
                    일정 {schedules[getFormattedDate(d.date)].length}건
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
