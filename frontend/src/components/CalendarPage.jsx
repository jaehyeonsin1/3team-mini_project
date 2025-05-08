// 로그인 완료 시 뜨는 메인 화면

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import styles from "./CalendarPage.module.css";

function CalendarPage() {
  const navigate = useNavigate();

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
      <main className={styles.main}>
        {/* 일정 기능 */}
        <section className={styles.calendarPanel}>
          <h2 className={styles.placeholder}>
            달력 영역 (일정 기능 구현 예정)
          </h2>
        </section>
      </main>
    </div>
  );
}

export default CalendarPage;
