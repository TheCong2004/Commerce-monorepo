// src/utils/mbtiUtils.ts
import { MBTI_PROFILES } from '../data/mbtiData';

export const calculateMbtiResult = (answers: Record<number, string>) => {
  // 1. Khởi tạo điểm
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  // 2. Cộng điểm từ câu trả lời
  Object.values(answers).forEach((val) => {
    // val là 'E', 'I', 'S', 'N', ...
    if (scores[val as keyof typeof scores] !== undefined) {
      scores[val as keyof typeof scores]++;
    }
  });

  // 3. So sánh từng cặp để ra mã (Tie-breaker: Ưu tiên I, N, F, P)
  const typeE_I = scores.E > scores.I ? 'E' : 'I';
  const typeS_N = scores.S > scores.N ? 'S' : 'N';
  const typeT_F = scores.T > scores.F ? 'T' : 'F';
  const typeJ_P = scores.J > scores.P ? 'J' : 'P';

  const finalCode = `${typeE_I}${typeS_N}${typeT_F}${typeJ_P}`;

  // 4. Tính phần trăm để vẽ biểu đồ
  // Tổng mỗi trục là 5 câu (theo data hiện tại)
  const totalPerAxis = 5; 
  const stats = [
    { left: 'E', right: 'I', leftVal: scores.E, rightVal: scores.I, labelL: 'Hướng Ngoại', labelR: 'Hướng Nội' },
    { left: 'S', right: 'N', leftVal: scores.S, rightVal: scores.N, labelL: 'Thực Tế', labelR: 'Trực Giác' },
    { left: 'T', right: 'F', leftVal: scores.T, rightVal: scores.F, labelL: 'Lý Trí', labelR: 'Cảm Xúc' },
    { left: 'J', right: 'P', leftVal: scores.J, rightVal: scores.P, labelL: 'Nguyên Tắc', labelR: 'Linh Hoạt' },
  ].map(stat => ({
    ...stat,
    leftPercent: (stat.leftVal / totalPerAxis) * 100,
    rightPercent: (stat.rightVal / totalPerAxis) * 100
  }));

  return {
    code: finalCode,
    profile: MBTI_PROFILES[finalCode],
    stats: stats
  };
};