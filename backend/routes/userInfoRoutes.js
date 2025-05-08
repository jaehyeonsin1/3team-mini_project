// 사용자 조회, 수정, 삭제 라우트
const router = require('express').Router();
const auth = require('../middleware/mwAuth');
const userModel = require('../models/user');
const userInfoController = require('../controllers/userInfoController');

router.put('/:user_id', userInfoController.updateUser);

router.delete('/:user_id', userInfoController.deleteUser);

router.get('/:user_id', userInfoController.getUserInfo);

module.exports = router;
