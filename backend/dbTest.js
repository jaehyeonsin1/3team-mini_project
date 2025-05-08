const db = require('./config/db'); // 위에서 작성한 db 연결 코드

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('DB 연결 성공:', rows);
  } catch (err) {
    console.error('❌ DB 연결 실패:', err);
  }
})();