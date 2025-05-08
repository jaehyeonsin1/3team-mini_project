// 회원탈퇴 Header 구문에 Authorization 추가
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { AiOutlineUser } from "react-icons/ai";

function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [modalType, setModalType] = useState(""); // 'logout' or 'withdraw'
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    const token = localStorage.getItem("token");
    const userPK = localStorage.getItem("userPK");
    const user_id = localStorage.getItem("user_id");

    setShowModal(false);

    if (modalType === "logout") {
      // 로그아웃 처리
      fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then(() => {
          // localStorage에서 필요한 항목만 제거
          localStorage.removeItem("token");
          localStorage.removeItem("userPK");
          localStorage.removeItem("user_id");
          navigate("/");
        })
        .catch((err) => console.error("로그아웃 실패:", err));
    } else if (modalType === "withdraw") {
      // 회원탈퇴 처리
      fetch(`http://localhost:3000/api/users/${user_id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // 필수 헤더 추가
        }
      })
        .then(() => {
          // 탈퇴 후에도 필요한 항목만 제거
          localStorage.removeItem("token");
          localStorage.removeItem("userPK");
          localStorage.removeItem("user_id");
          navigate("/");
        })
        .catch((err) => console.error("탈퇴 실패:", err));
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoBox}>
          <img
            src="/calendar_icon.png"
            className={styles.icon}
            alt="calendar"
          />
          <h1 className={styles.logoText}>MiniPlan</h1>
        </div>
        <div className={styles.userButton}>
          <button
            className={styles.userIconBtn}
            onClick={() => setShowMenu(!showMenu)}
          >
            <AiOutlineUser size={28} />
          </button>
          {showMenu && (
            <ul className={styles.userMenu}>
              <li onClick={() => navigate("/edit-profile")}>회원정보 수정</li>
              <li
                onClick={() => {
                  setModalType("logout");
                  setShowModal(true);
                }}
              >
                로그아웃
              </li>
              <li
                onClick={() => {
                  setModalType("withdraw");
                  setShowModal(true);
                }}
              >
                회원탈퇴
              </li>
            </ul>
          )}
        </div>
      </header>

      {/* 로그아웃/탈퇴 확인 모달 */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <p className={styles.modalMessage}>
              {modalType === "logout"
                ? "로그아웃 하시겠습니까?"
                : "정말 탈퇴하시겠습니까?"}
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.cancel}
                onClick={() => setShowModal(false)}
              >
                취소
              </button>
              <button className={styles.confirm} onClick={handleConfirm}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
