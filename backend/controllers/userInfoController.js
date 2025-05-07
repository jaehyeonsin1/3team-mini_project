// 회원 정보 조회 및 수정 탈퇴

// 사용자 정보 조회
const db = require('../config/db');

module.exports = {
  createUser: async (userData) => {
    const [result] = await db.execute(
      'INSERT INTO users SET ?',
      [userData]
    );
    return result.insertId;
  },

updateUser: async (req, res) => {
  try {
    // 본인 확인
    if (req.user.userId !== req.params.user_id) {
      return res.status(403).json({
        success: false,
        error: '수정 권한이 없습니다'
      });
    }

    const result = await userModel.updateUser(req.params.user_id, req.body);
    if (result === 0) {
      return res.status(404).json({
        success: false,
        error: '업데이트 대상 없음'
      });
    }

    res.json({
      success: true,
      affectedRows: result
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
},

deleteUser: async (req, res) => {
  try {
    // 본인 확인
    if (req.user.userId !== req.params.user_id) {
      return res.status(403).json({
        success: false,
        error: '삭제 권한이 없습니다'
      });
    }

    const result = await userModel.deleteUser(req.params.user_id);
    res.json({
      success: true,
      affectedRows: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  };
}
};