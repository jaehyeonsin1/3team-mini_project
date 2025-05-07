// 로그인, 회원가입 처리
const authService = require('../service/authService');

// 회원가입
exports.register = async (req, res) => {
  try {
    const userId = await authService.register(req.body);
    res.status(201).json({ user_id: userId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const token = await authService.login(req.body.user_id, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// 로그아웃
exports.logout = (req, res) => {
  res.json({ message: '성공적으로 로그아웃 했습니다.' });
};
