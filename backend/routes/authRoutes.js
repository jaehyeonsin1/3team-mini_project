// 회원가입, 로그인, 로그아웃 라우트
const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check-id', authController.checkDuplicateId);

module.exports = router;
