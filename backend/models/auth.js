// 로그인, 회원가입 모델
const authService = require('../service/authService');

// 회원가입
exports.register = async (req, res) => {
  try {
    const user_id = await authService.register({
      user_id: req.body.user_id,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email
    });
    
    res.status(201).json({ 
      success: true,
      user_id: user_id 
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// 아이디 중복 확인
exports.checkUserIdExists = async (user_id) => {
  const [rows] = await db.query(
    'SELECT user_id FROM users WHERE user_id = ?', 
    [user_id]
  );
  return rows.length > 0;
};

// 로그인
exports.login = async (req, res) => {
  try {
    const token = await authService.login(
      req.body.user_id,
      req.body.password
    );
    
    res.json({
      success: true,
      token: token
    });
    
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
};

// 로그아웃
exports.logout = (req, res) => {
  res.json({ 
    success: true,
    message: '로그아웃 처리되었습니다' 
  });
};