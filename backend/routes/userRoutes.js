const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 회원가입, 로그인
router.post('/register', userController.register);
router.post('/login', userController.login);

// 사용자 조회, 수정, 삭제
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
