// 로그인 버튼과 회원 가입 버튼 두개 있음(초기화면)

import React, { useEffect } from "react";
import styles from "./LoginMain.module.css"; // CSS 모듈을 import
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅

function LoginMain() {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main"); // 이미 로그인된 사용자면 메인으로 바로 이동
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* 로고 */}
      <div className={styles.logo}>
        <img
          src="/calendar_icon.png"
          alt="캘린더 아이콘"
          className={styles.calendarIcon}
        />
        <h1 className={styles.logoText}>MiniPlan</h1>
      </div>

      {/* 로그인/회원가입 버튼 */}
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={() => navigate("/login")}>
          로그인
        </button>
        <button className={styles.btn} onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default LoginMain;
