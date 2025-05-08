import { useEffect, useState } from "react";
import ModalScheduleForm from "./ModalScheduleForm";
import ModalScheduleList from "./ModalScheduleList";

export default function ModalSchedule({
  selectedDate,
  setSelectedDate,
  selectedSchedule,
  setSelectedSchedule,
  setModalState,
  modalState,
  isUpdated,
  setIsUpdated,
}) {
  // 일정을 저장/수정
  const saveSchedule = async () => {
    let res = "";

    if (selectedSchedule.id) {
      res = await fetch(
        `http://localhost:3000/api/schedules/${selectedSchedule.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedSchedule),
        }
      );
    } else {
      res = await fetch(`http://localhost:3000/api/schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedSchedule),
      });
    }

    if (res.ok) {
      alert("일정이 반영되었습니다.");
      setIsUpdated(!isUpdated);
      setModalState(null);
      setSelectedSchedule({
        user_id: localStorage.getItem("userPK"),
        date: selectedDate.date,
      });
    }
  };

  // 일정 삭제
  const deleteSchedule = async () => {
    const res = await fetch(
      `http://localhost:3000/api/schedules/${selectedSchedule.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      alert("일정이 삭제되었습니다!");
      setIsUpdated(!isUpdated);
      setModalState(null);
      setSelectedSchedule({
        user_id: localStorage.getItem("userPK"),
        date: selectedDate.date,
      });
    }
  };

  return (
    <div
      className="modal"
      id="scheduleModal"
      onClick={() => setModalState(null)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{modalState === "schedule-list" ? "일정 목록" : "일정 상세"}</h3>
          {modalState === "schedule-form" && selectedSchedule.id ? (
            <button
              onClick={() => {
                deleteSchedule();
              }}
            >
              삭제
            </button>
          ) : null}
        </div>
        {modalState === "schedule-list" ? (
          <ModalScheduleList
            selectedDate={selectedDate}
            setSelectedSchedule={setSelectedSchedule}
            setModalState={setModalState}
          />
        ) : (
          <ModalScheduleForm
            selectedSchedule={selectedSchedule}
            setSelectedSchedule={setSelectedSchedule}
          />
        )}
        <div className="modal-footer">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => {
                setModalState(null);
                setSelectedSchedule({
                  user_id: localStorage.getItem("userPK"),
                });
              }}
              className="btn btn-cancel"
            >
              {modalState === "schedule-list" ? "닫기" : "취소"}
            </button>

            {modalState === "schedule-form" ? (
              <button
                onClick={() => saveSchedule()}
                className="btn btn-confirm"
              >
                저장
              </button>
            ) : (
              <button
                className="btn btn-confirm"
                onClick={() => setModalState("schedule-form")}
              >
                추가
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
