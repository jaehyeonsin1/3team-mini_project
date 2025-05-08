// 로그인, 회원가입 처리
const authService = require('../services/authService');

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
exports.checkUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    const exists = await authService.checkUserIdExists(userId);
    res.status(200).json({
      duplicate: exists,
      message: exists ? '이미 사용 중인 아이디입니다' : '사용 가능한 아이디입니다',
      valid: !exists
    });
    
  } catch (error) {
    res.status(500).json({
      error: '서버 오류가 발생했습니다',
      details: error.message
    });
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
    const token = await authService.login(req.body.user_id, req.body.password);
    res.json({ token,
      user_id: req.body.user_id // 사용자 식별자 추가
     });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// 로그아웃
exports.logout = (req, res) => {
  res.json({ message: '성공적으로 로그아웃 했습니다.' });
};