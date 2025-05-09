// 회원정보 수정 페이지 컴포넌트
// userId -> user_id로 변경
// ProfileEdit.jsx fetch 호출 수정
// 회원정보 저장 Header 구문에 Authorization 추가

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileEdit.module.css";

function ProfileEdit() {
  const navigate = useNavigate();

  // 사용자 정보 상태
  const [form, setForm] = useState({
    user_id: "", // 사용자 아이디 (수정 불가)
    password: "", // 비밀번호
    name: "", // 이름
    email: "", // 이메일
  });

  // 유효성 오류 메시지 상태
  const [errors, setErrors] = useState({});

  // 페이지 로딩 시 사용자 정보 불러오기
  useEffect(() => {
    const user_id = localStorage.getItem("user_id"); // 로그인된 사용자 PK 가져오기
    if (!user_id) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3000/api/users/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // 토큰 추가
      }
    })
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.error("사용자 정보 로드 실패", err));
  }, [navigate]);

  // input 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(
        form.password
      )
    )
      newErrors.password = "8~20자, 영문+숫자+특수문자(!@#$%^&*) 모두 포함";
    if (!/^[가-힣a-zA-Z]{2,10}$/.test(form.name))
      newErrors.name = "2~10자, 한글 또는 영문";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "이메일 형식이 올바르지 않습니다";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 저장 버튼 클릭 시 실행
  const handleSubmit = () => {
    if (!validate()) return;

    const user_id = localStorage.getItem("user_id"); // 사용자 식별
    fetch(`http://localhost:3000/api/users/${user_id}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json' // 필수 헤더 추가
      },
      body: JSON.stringify({
        password: form.password,
        name: form.name,
        email: form.email,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("수정 실패");
        return res.json();
      })
      .then(() => {
        alert("회원정보 수정이 완료되었습니다!");
        navigate("/main");
      })
      .catch(() => alert("회원정보 수정 중 오류 발생"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/calendar_icon.png" alt="calendar" className={styles.icon} />
        <h1 className={styles.logoText}>MiniPlan</h1>
      </div>
      <div className={styles.formBox}>
        <h2>회원정보 수정</h2>
        <label>아이디</label>
        <input type="text" name="user_id" value={form.user_id} disabled />
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className={
            errors.password
              ? styles.errorInput
              : form.password && !errors.password
              ? styles.successInput
              : ""
          }
        />
        <p className={styles.error}>{errors.password}</p>
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={
            errors.name
              ? styles.errorInput
              : form.name && !errors.name
              ? styles.successInput
              : ""
          }
        />
        <p className={styles.error}>{errors.name}</p>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={
            errors.email
              ? styles.errorInput
              : form.email && !errors.email
              ? styles.successInput
              : ""
          }
        />
        <p className={styles.error}>{errors.email}</p>
        <div className={styles.buttonRow}>
          <button className={styles.cancel} onClick={() => navigate("/main")}>
            취소
          </button>
          <button className={styles.confirm} onClick={handleSubmit}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
