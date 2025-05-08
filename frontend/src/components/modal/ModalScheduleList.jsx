export default function ModalSchedule({
  selectedDate,
  setSelectedDate,
  setModalState,
  modalState,
  setSelectedSchedule,
}) {
  return (
    <div className="modal-section">
      {selectedDate.schedules.length > 0 ? (
        selectedDate.schedules.map((s, idx) => (
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
        ))
      ) : (
        <div
          style={{
            backgroundColor: "#f8f8f8",
            borderRadius: "6px",
            height: "100%",
            margin: "0 0 40px 0",
            display: "flex",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div>일정이 없습니다</div>
        </div>
      )}
    </div>
  );
}
