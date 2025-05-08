// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const authMiddleware = require('./middleware/mwAuth');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', authMiddleware); // 사용자 정보 관련 라우트만 인증 필요
app.use('/api/protected', authMiddleware); // 보호된 리소스

// 라우트 설정
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userInfoRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('MiniPlan Backend Server Running');
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: '인터넷 서버 오류입니다.' 
  });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});