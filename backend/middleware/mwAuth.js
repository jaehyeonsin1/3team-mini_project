const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(`[mwAuth] Path: ${req.path}`); // ✅ 요청 경로 로깅
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "인증이 필요합니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { user_id: decoded.user_id };
    next();
  } catch (err) {
    res.status(401).json({ error: "인증정보가 유효하지 않습니다." });
  }
};

// 아이디 중복 확인
exports.validateUserIdParam = (req, res, next) => {
  const user_id = req.query.user_id;
  if (!user_id || user_id.trim() === "") {
    return res.status(400).json({
      error: "아이디 파라미터가 필요합니다",
    });
  }
  next();
};
