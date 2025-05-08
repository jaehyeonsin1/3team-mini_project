import { useEffect } from "react";

export default function ModalSchedule({
  selectedSchedule,
  setSelectedSchedule,
}) {
  const colorList = [
    "#f44336",
    "#fb8c00",
    "#fdd835",
    "#43a047",
    "#2196f3",
    "#3f51b5",
    "#ba68c8",
  ];
  useEffect(() => {
    setSelectedSchedule({
      ...selectedSchedule,
      color: selectedSchedule.color || "#f44336",
    });
  }, []);
  return (
    <div className="modal-section">
      <input
        type="text"
        id="titleInput"
        placeholder="제목"
        value={selectedSchedule.title || ""}
        onChange={(e) =>
          setSelectedSchedule({ ...selectedSchedule, title: e.target.value })
        }
      />
      <input
        type="date"
        id="dateInput"
        value={selectedSchedule.date || ""}
        onChange={(e) =>
          setSelectedSchedule({ ...selectedSchedule, date: e.target.value })
        }
      />
      <input
        type="time"
        id="timeInput"
        value={selectedSchedule.time || ""}
        onChange={(e) =>
          setSelectedSchedule({ ...selectedSchedule, time: e.target.value })
        }
      />
      <input
        type="text"
        id="locationInput"
        placeholder="장소"
        value={selectedSchedule.location || ""}
        onChange={(e) =>
          setSelectedSchedule({ ...selectedSchedule, location: e.target.value })
        }
      />
      <input
        type="hidden"
        id="colorInput"
        value={selectedSchedule.color || "#f44336"}
        onChange={(e) =>
          setSelectedSchedule({ ...selectedSchedule, color: e.target.value })
        }
      />
      <div className="color-picker">
        {colorList.map((c) => (
          <div
            className={`color-option ${
              c === selectedSchedule.color ? "selected" : ""
            }`}
            data-color={c}
            style={{ backgroundColor: c }}
            onClick={() => {
              setSelectedSchedule({ ...selectedSchedule, color: c });
            }}
            key={c}
          ></div>
        ))}
      </div>
      <textarea
        id="descInput"
        rows="3"
        placeholder="설명"
        value={selectedSchedule.description || ""}
        onChange={(e) =>
          setSelectedSchedule({
            ...selectedSchedule,
            description: e.target.value,
          })
        }
      ></textarea>
    </div>
  );
}
