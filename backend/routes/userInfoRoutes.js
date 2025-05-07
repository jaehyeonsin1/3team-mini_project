// 사용자 조회, 수정, 삭제 라우트
const router = require('express').Router();
const auth = require('../middleware/mwAuth');
const userModel = require('../models/user');

router.put('/', auth, async (req, res) => {
  try {
    if (req.user.userId !== req.body.user_id) {
      return res.status(403).json({ error: '권한이 없습니다.' });
    }
    
    const result = await userModel.updateUser(req.body.user_id, req.body);
    res.json({ affectedRows: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const result = await userModel.deleteUser(req.user.userId);
    res.json({ affectedRows: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
