import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginMain from "./components/LoginMain";
import AuthPopup from "./components/AuthPopup";
import ProfileEdit from "./components/ProfileEdit";
import CalendarPage from "./components/CalendarPage";

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return (
    <Routes>
      {/* 로그인 또는 비로그인 관계없이 접근 가능한 페이지 */}
      <Route
        path="/"
        element={token ? <Navigate to="/main" replace /> : <LoginMain />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/main" replace /> : <AuthPopup />}
      />
      <Route
        path="/signup"
        element={token ? <Navigate to="/main" replace /> : <AuthPopup />}
      />

      {/* 로그인된 사용자만 접근 가능한 페이지 */}
      <Route
        path="/main"
        element={
          token ? (
            <CalendarPage />
          ) : (
            <Navigate to="/login" replace state={{ from: location }} />
          )
        }
      />
      <Route
        path="/edit-profile"
        element={
          token ? (
            <ProfileEdit />
          ) : (
            <Navigate to="/login" replace state={{ from: location }} />
          )
        }
      />
    </Routes>
  );
}

export default App;
