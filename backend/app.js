// app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");
const mwAuth = require("./middleware/mwAuth");

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", mwAuth); // 사용자 정보 관련 라우트만 인증 필요
app.use("/api/protected", mwAuth); // 보호된 리소스

// 라우트 설정
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userInfoRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/schedules", scheduleRoutes);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("MiniPlan Backend Server Running");
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "인터넷 서버 오류입니다.",
  });
});

// 서버 포트 3000번대로 시작작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
