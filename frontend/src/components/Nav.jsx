export default function Nav({ dates, currentDate }) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <aside className="sidebar">
      <h4 id="miniCalendarLabel">
        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
      </h4>
      <div id="miniCalendar" className="sidebar-calendar">
        {days.map((e) => (
          <div key={`mini_` + e}>{e}</div>
        ))}
        {dates.map((d, idx) => (
          <div
            className={
              "mini-cell" +
              (d.isCurrentMonth ? "" : " gray") +
              (d.isToday ? " today" : "")
            }
            key={`mini_date_` + idx}
          >
            {d.date.getDate()}
          </div>
        ))}
      </div>
    </aside>
  );
}
