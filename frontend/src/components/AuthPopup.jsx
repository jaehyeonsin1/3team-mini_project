// 로그인/회원가입 팝업 모달 (조건부 렌더링으로 구분) <-- 조건부 렌더링 안되면 파일 두개 만들면 됩니다
// 전체 user_id -> user_id로 변경
// fetch의 url에서 api/users -> api/auth로 변경
// localStorage에 저장하는 userPK값 추가

import React, { useState, useEffect } from "react";
import styles from "./AuthPopup.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // 닫기 아이콘

function AuthPopup() {
  const navigate = useNavigate();
  const { pathname } = useLocation(); // 현재 경로 가져오기
  const isLogin = pathname === "/login"; // 경로에 따라 로그인/회원가입 판단

  // 사용자 입력값 상태
  const [form, setForm] = useState({
    user_id: "",
    password: "",
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({ user_id: false });
  const [duplicateId, setDuplicateId] = useState(false);

  // 로그인된 사용자가 로그인/회원가입 페이지 접근 못 하도록 차단
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/main");
  }, [navigate]);

  // 경로 바뀔 때마다 입력값 초기화 (로그인/회원가입 전환 시)
  useEffect(() => {
    setForm({
      user_id: "",
      password: "",
      name: "",
      email: "",
    });
    setErrors({});
  }, [pathname]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // form 상태 업데이트
    setErrors((prev) => ({ ...prev, [name]: "" })); // 에러 초기화
    // 아이디 중복 체크
    if (name === "user_id" && value.length >= 5 && !isLogin) {
      // !isLogin 조건 추가
      checkDuplicateId(value);
    }
  };

  // 아이디 중복 확인 API
  const checkDuplicateId = (user_id) => {
    const isValid = /^(?=.*[a-z])(?=.*\d)[a-z0-9]{5,20}$/.test(user_id); // 유효성 검사 먼저 수행
    setValid((prev) => ({ ...prev, user_id: isValid })); // 유효성 검사 통과 여부 저장

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        user_id: "5~20자, 영문 소문자+숫자 모두 포함",
      }));
      setDuplicateId(false);
      return;
    }

    fetch(`http://localhost:3000/api/users/check-id?user_id=${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.duplicate) {
          setDuplicateId(true);
          setErrors((prev) => ({
            ...prev,
            user_id: "이미 사용 중인 아이디입니다",
          }));
        } else {
          setDuplicateId(false);
          setErrors((prev) => ({
            ...prev,
            user_id: "", // 중복 아님 + 유효성 통과 시 오류 제거
          }));
        }
      });
  };

  // 유효성 검사
  const validate = () => {
    const newErrors = {};
    const { user_id, password, name, email } = form;

    if (!/^(?=.*[a-z])(?=.*\d)[a-z0-9]{5,20}$/.test(user_id))
      newErrors.user_id = "5~20자, 영문 소문자+숫자 모두 포함";
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(
        password
      )
    )
      newErrors.password = "8~20자, 영문+숫자+특수문자(!@#$%^&*) 모두 포함";
    if (!/^[가-힣a-zA-Z]{2,10}$/.test(name))
      newErrors.name = "2~10자, 한글 또는 영문";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "이메일 형식이 올바르지 않습니다";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 로그인 제출
  const handleLogin = () => {
    if (!form.user_id || !form.password) {
      setErrors({
        user_id: !form.user_id ? "필수 입력" : "",
        password: !form.password ? "필수 입력" : "",
      });
      return;
    }

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: form.user_id, password: form.password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("로그인 실패");
        return res.json();
      })
      .then((data) => {
        // 토큰 및 userPK 저장 (user.id 없을 경우 data.id fallback 처리)
        localStorage.setItem("token", data.token);
        localStorage.setItem("userPK", data.id);
        localStorage.setItem("user_id", data.user_id);
        navigate("/main");
      })
      .catch(() =>
        setErrors((prev) => ({
          ...prev,
          password: "아이디 혹은 비밀번호가 맞지 않습니다!",
        }))
      );
  };

  // 회원가입 제출
  const handleRegister = () => {
    if (!validate()) return;

    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // 이 부분 추가해야 회원가입이 정상적으로 작동함
        user_id: form.user_id,
        password: form.password,
        name: form.name,
        email: form.email,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("회원가입 실패");
        return res.json();
      })
      .then(() => {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      })
      .catch(() => alert("회원가입 오류"));
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
        {/* X 아이콘 */}
        <AiOutlineClose
          className={styles.closeIcon}
          onClick={() => navigate("/")}
        />

        {/* 타이틀 */}
        <h2>{isLogin ? "로그인" : "회원가입"}</h2>

        {/* 아이디 */}
        {
          <div className={styles.inputRow}>
            <div className={styles.labelWithMsg}>
              <label htmlFor="user_id">아이디</label>
              {/* 회원가입일 때만 중복/유효성 메시지 표시 */}
              {!isLogin &&
                form.user_id.length >= 5 &&
                valid.user_id &&
                !duplicateId && (
                  <span className={styles.successMsg}>
                    사용할 수 있는 아이디입니다
                  </span>
                )}
              {!isLogin && form.user_id.length >= 5 && duplicateId && (
                <span className={styles.errorMsg}>
                  이미 사용 중인 아이디입니다
                </span>
              )}
            </div>
            <input
              type="text"
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              className={`${styles.inputBox} ${
                errors.user_id
                  ? styles.errorInput
                  : valid.user_id && !duplicateId
                  ? styles.successInput
                  : ""
              }`}
            />
            {/* 일반적인 유효성 오류 메시지만 인풋 밑에 표시 (중복 제외) */}
            {errors.user_id && !duplicateId && (
              <p className={styles.errorId}>{errors.user_id}</p>
            )}
          </div>
        }

        {/* 비밀번호 */}
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요"
          className={errors.password ? styles.errorInput : ""}
        />
        <p className={styles.error}>{errors.password}</p>

        {/* 회원가입일 때만 이름/이메일 보이게 */}
        {!isLogin && (
          <>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              className={errors.name ? styles.errorInput : ""}
            />
            <p className={styles.error}>{errors.name}</p>

            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              className={errors.email ? styles.errorInput : ""}
            />
            <p className={styles.error}>{errors.email}</p>
          </>
        )}

        {/* 버튼 */}
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={() => navigate("/")}>
            취소
          </button>
          {isLogin ? (
            <button className={styles.confirm} onClick={handleLogin}>
              로그인
            </button>
          ) : (
            <button className={styles.confirm} onClick={handleRegister}>
              저장
            </button>
          )}
        </div>

        {/* 로그인/회원가입 이동 링크 */}
        <p className={styles.bottomText}>
          {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
          <span
            className={styles.linkText}
            onClick={() => navigate(isLogin ? "/signup" : "/login")}
          >
            {isLogin ? " 회원가입" : " 로그인"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPopup;
