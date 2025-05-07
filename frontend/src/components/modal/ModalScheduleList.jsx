export default function ModalSchedule({
  selectedDate,
  setSelectedDate,
  setModalState,
  modalState,
  setSelectedSchedule,
}) {
  return (
    <div className="modal-section">
      {selectedDate.schedules.map((s, idx) => (
        <div
          className="schedule-element"
          onClick={() => {
            setSelectedSchedule({ ...s, date: s.date.substring(0, 10) });
            setModalState("schedule-form");
          }}
          style={{ borderRight: `8px solid ${s.color}` }}
          key={idx}
        >
          <p>{s.title} </p>
          <p>
            {s.date.substring(0, 10)} | {s.time}{" "}
          </p>
        </div>
      ))}
    </div>
  );
}
