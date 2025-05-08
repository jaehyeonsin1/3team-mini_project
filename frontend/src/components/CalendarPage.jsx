// 로그인 완료 시 뜨는 메인 화면

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import ModalSchedule from "./modal/ModalSchedule";
import styles from "./CalendarPage.module.css";

function CalendarPage() {
  const navigate = useNavigate();

  // 선택한 날짜의 일정 목록 조회, 일정 작성에 필요한 state
  const [selectedDate, setSelectedDate] = useState({ date: "", time: "" });

  // 일정 작성/수정 form에 사용되는 state
  const [selectedSchedule, setSelectedSchedule] = useState({});

  // modal 출력에 필요한 state
  const [modalState, setModalState] = useState(null);

  // 일정이 업데이트 되었는지 여부 state
  const [isUpdated, setIsUpdated] = useState(false);

  // 날짜가 선택될 때마다 일정 작성/수정에 필요한 state 값을 갱신
  useEffect(() => {
    setSelectedSchedule({
      userId: localStorage.getItem("userPK"),
      date: selectedDate.date,
      time: selectedDate.time,
    });
  }, [selectedDate]);

  // 로그인 상태 확인용 useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");

    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles.mainLayout}>
      <Header />
      <Main
        setSelectedDate={setSelectedDate}
        setSelectedSchedule={setSelectedSchedule}
        setModalState={setModalState}
        isUpdated={isUpdated}
      />
      {modalState && (
        <ModalSchedule
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedSchedule={selectedSchedule}
          setSelectedSchedule={setSelectedSchedule}
          modalState={modalState}
          setModalState={setModalState}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
        />
      )}
    </div>
  );
}

export default CalendarPage;
