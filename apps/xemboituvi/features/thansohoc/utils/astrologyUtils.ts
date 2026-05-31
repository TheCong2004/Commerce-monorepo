const Astronomy = require('astronomy-engine');

// 1. Danh sách 12 Cung Hoàng Đạo
const ZODIAC_SIGNS = [
  "Bạch Dương", "Kim Ngưu", "Song Tử", "Cự Giải", 
  "Sư Tử", "Xử Nữ", "Thiên Bình", "Bọ Cạp", 
  "Nhân Mã", "Ma Kết", "Bảo Bình", "Song Ngư"
];

// 2. Danh sách các hành tinh cần tính
const BODIES = [
  { key: 'Sun', name: 'Mặt Trời (Sun)', icon: '☉' },
  { key: 'Moon', name: 'Mặt Trăng (Moon)', icon: '☽' },
  { key: 'Mercury', name: 'Sao Thủy (Mercury)', icon: '☿' },
  { key: 'Venus', name: 'Sao Kim (Venus)', icon: '♀' },
  { key: 'Mars', name: 'Sao Hỏa (Mars)', icon: '♂' },
  { key: 'Jupiter', name: 'Sao Mộc (Jupiter)', icon: '♃' },
  { key: 'Saturn', name: 'Sao Thổ (Saturn)', icon: '♄' },
];

export interface PlanetPosition {
  name: string;
  icon: string;
  sign: string;      // Tên cung (VD: Bạch Dương)
  signId: number;    // ID cung (0-11)
  degree: number;    // Độ trong cung (0-29.99)
  fullDegree: number;// Kinh độ hoàng đạo (0-359)
  isRetrograde: boolean; // Nghịch hành (Đi lùi)
}

// 3. Hàm chuyển đổi Kinh độ (0-360) sang Cung Hoàng Đạo
const getZodiacSign = (longitude: number) => {
  const signIndex = Math.floor(longitude / 30);
  const degreeInSign = longitude % 30;
  return {
    sign: ZODIAC_SIGNS[signIndex],
    signId: signIndex,
    degree: degreeInSign
  };
};

// 4. Hàm chính: Tính bản đồ sao
export const calculateNatalChart = (date: Date, lat: number, lng: number) => {
  const results: PlanetPosition[] = [];

  // Tạo đối tượng quan sát (Observer) tại địa điểm sinh
  const observer = new Astronomy.Observer(lat, lng, 0);

  BODIES.forEach(body => {
    // Tính vị trí so với tâm trái đất (Geocentric)
    // Lưu ý: Astronomy engine dùng chuỗi tên hành tinh chuẩn tiếng Anh
    const planetBody = (body.key === 'Sun' ? Astronomy.Body.Sun :
                       body.key === 'Moon' ? Astronomy.Body.Moon :
                       body.key === 'Mercury' ? Astronomy.Body.Mercury :
                       body.key === 'Venus' ? Astronomy.Body.Venus :
                       body.key === 'Mars' ? Astronomy.Body.Mars :
                       body.key === 'Jupiter' ? Astronomy.Body.Jupiter :
                       Astronomy.Body.Saturn);

    // Lấy tọa độ hoàng đạo (Ecliptic Coordinates)
    const equ2000 = Astronomy.Equator(planetBody, date, observer, false, true);
    const ecl = Astronomy.Ecliptic(equ2000.vec);
    
    // Tính vận tốc để xem có nghịch hành không (Retrograde)
    // Nếu vận tốc kinh độ < 0 tức là đang đi lùi so với trái đất
    // (Đây là logic đơn giản hóa, để chính xác cần so sánh 2 thời điểm)
    // Tạm thời MVP ta bỏ qua Retrograde để giảm độ phức tạp, mặc định false
    
    const zodiacInfo = getZodiacSign(ecl.elon);

    results.push({
      name: body.name,
      icon: body.icon,
      sign: zodiacInfo.sign,
      signId: zodiacInfo.signId,
      degree: zodiacInfo.degree,
      fullDegree: ecl.elon,
      isRetrograde: false // Tính năng nâng cao cập nhật sau
    });
  });

  return results;
};
