const userService = require('../services/userService');
const jwt = require('../utils/jwt');

// 회원가입
exports.register = async (req, res) => {
  try {
    const newUser = await userService.register(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: '회원가입 실패' });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const success = await userService.login(userId, password);
    if (success) {
      const token = jwt.generateToken(userId);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: '로그인 실패' });
    }
  } catch (err) {
    res.status(500).json({ error: '서버 오류' });
  }
};

// 사용자 조회
exports.getUser = async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: '사용자 없음' });
    }
  } catch (err) {
    res.status(500).json({ error: '조회 실패' });
  }
};

// 사용자 수정
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: '수정 실패' });
  }
};

// 사용자 삭제
exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: '삭제 실패' });
  }
};
