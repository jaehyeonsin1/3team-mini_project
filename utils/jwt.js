const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = '2h'; // 2시간

const jwtUtil = {
  // 토큰 생성
  generateToken: (userId) => {
    return jwt.sign({ sub: userId }, JWT_SECRET, {
      expiresIn: EXPIRES_IN,
    });
  },

  // 토큰에서 userId 추출
  getUserIdFromToken: (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.sub;
  },

  // 유효성 검사
  validateToken: (token) => {
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch (err) {
      return false;
    }
  },
};

module.exports = jwtUtil;
