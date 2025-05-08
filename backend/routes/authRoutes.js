// 회원가입, 로그인, 로그아웃 라우트
const router = require('express').Router();
const authController = require('../controllers/authController');
const validateUserIdParam = require('../middleware/mwAuth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check-id', 
    validateUserIdParam, // 미들웨어 추가
    authController.checkUserId
);

module.exports = router;
