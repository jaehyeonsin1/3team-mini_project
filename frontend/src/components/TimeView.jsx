import { getFormattedDate } from "../utils/dateUtils";
export default function TimeView({
  today,
  currentDate,
  schedules,
  setSelectedDate,
  setSelectedSchedule,
  setModalState,
}) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  return (
    <div className="time-view-container">
      <div className="time-col first-col">
        <div className="time-cell"></div>
        {hours.map((h) => (
          <div className="time-cell">{h.toString().padStart(2, "0")}:00</div>
        ))}
      </div>
      {days.map((d, idx) => {
        const tmp = new Date(currentDate);
        tmp.setDate(tmp.getDate() + idx);
        return (
          <div className="time-col">
            <div className="time-cell">
              {d} ({tmp.getMonth() + 1}/{tmp.getDate()})
            </div>
            {hours.map((h) => {
              const s1 =
                schedules[
                  `${getFormattedDate(tmp)}/${h.toString().padStart(2, "0")}`
                ];
              const s2 = s1?.[0];
              return (
                <div
                  className="time-cell"
                  onClick={() => {
                    setSelectedSchedule({
                      ...s2,
                      userId: 1,
                      date: getFormattedDate(tmp),
                      time: `${String(h).padStart(2, "0")}:00`,
                    });
                    setModalState("schedule-form");
                  }}
                  style={{ backgroundColor: s2?.color }}
                >
                  {s2?.title}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
