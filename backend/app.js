const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const authMiddleware = require("./middleware/mwAuth");

dotenv.config(); // .env 설정 로딩

const app = express();

// 미들웨어 등록
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", authMiddleware); // 사용자 정보 관련 라우트만 인증 필요
app.use("/api/protected", authMiddleware); // 보호된 리소스

// // 기본 라우트
app.get("/", (req, res) => {
  res.send("MiniPlan Backend Server Running");
});

// API 라우터 등록
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/schedules", scheduleRoutes);

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "인터넷 서버 오류입니다.",
  });
});

// 기본 포트로 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
