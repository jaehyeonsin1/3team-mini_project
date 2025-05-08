// 로그인, 회원가입 처리
const authService = require('../service/authService');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

// 회원가입
exports.register = async (req, res) => {
  try {
    const userId = await authService.register(req.body);
    res.status(201).json({ user_id: userId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 아이디 중복 확인
exports.checkDuplicateId = async (req, res) => {
  try {
    const user = await userModel.findByUserId(req.query.user_id);
    res.json({ duplicate: !!user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// JWT 토큰 재발급
exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(401).json({ error: "인증이 필요합니다" });
  
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { user_id: decoded.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ token: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: "인증정보 갱신 실패" });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body.user_id, req.body.password);
    res.json({ token,
      id: user.id, // DB에서 조회한 실제 사용자 PK
      user_id: req.body.user_id // DB에서 조회한 실제 사용자 ID
     });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// 로그아웃
exports.logout = (req, res) => {
  res.json({ message: '성공적으로 로그아웃 했습니다.' });
};
