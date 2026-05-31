import { DayDetail } from './types';

// 1. Định nghĩa các loại hình xem ngày
export type XemNgayType = 
  | 'tot-xau' | 'dong-tho' | 'khai-truong' | 'mua-xe' 
  | 'mua-nha' | 'ket-hon' | 'nhan-chuc' | 'ky-hop-dong' 
  | 'hoang-dao' | 'nhap-trach' | 'an-tang' | 'xay-dung' 
  | 'dat-bep' | 'chuyen-nha' | 'do-tran' | 'xuat-hanh' 
  | 'chuyen-ban-tho';

// 2. Hàm lấy tiêu đề trang (Dùng cho SEO và tiêu đề chính)
export const getPageTitle = (type: XemNgayType) => {
  const titles: Record<XemNgayType, string> = {
    'tot-xau': "Xem Ngày Tốt Xấu",
    'dong-tho': "Xem Ngày Tốt Động Thổ",
    'khai-truong': "Xem Ngày Tốt Khai Trương",
    'mua-xe': "Xem Ngày Tốt Mua Xe",
    'mua-nha': "Xem Ngày Tốt Mua Nhà",
    'ket-hon': "Xem Ngày Tốt Kết Hôn",
    'nhan-chuc': "Xem Ngày Tốt Nhận Chức",
    'ky-hop-dong': "Xem Ngày Tốt Ký Hợp Đồng",
    'hoang-dao': "Xem Ngày Hoàng Đạo Hắc Đạo",
    'nhap-trach': "Xem Ngày Tốt Nhập Trạch",
    'an-tang': "Xem Ngày Tốt An Táng",
    'xay-dung': "Xem Ngày Tốt Xây Dựng",
    'dat-bep': "Xem Ngày Tốt Đặt Bếp Sửa Bếp",
    'chuyen-nha': "Xem Ngày Tốt Chuyển Nhà",
    'do-tran': "Xem Ngày Tốt Đổ Trần Lợp Mái",
    'xuat-hanh': "Xem Ngày Tốt Xuất Hành",
    'chuyen-ban-tho': "Xem Ngày Tốt Chuyển Bàn Thờ",
  };
  return titles[type] || "Xem Ngày Tốt";
};

// 3. Hàm lấy thông tin cho Bảng tra cứu màu be (Tự động khớp 17 mục)
export const getSearchCardInfo = (type: XemNgayType) => {
  // Tự động lấy tiêu đề từ danh sách trên và viết hoa
  const title = getPageTitle(type).toUpperCase();
  
  // Mặc định subTitle, riêng Khai Trương chỉnh lại theo ảnh mẫu của bạn
  let subTitle = "Nhập theo ngày tháng dương lịch";
  if (type === 'khai-truong') {
    subTitle = "Nhập ngày/tháng/năm dương lịch";
  }

  // Đặc biệt cho Khai Trương dùng chữ "CHỌN NGÀY" thay vì "XEM NGÀY"
  const finalTitle = type === 'khai-truong' 
    ? title.replace("XEM NGÀY TỐT", "CHỌN NGÀY") 
    : title;

  return { title: finalTitle, subTitle };
};

// 4. Logic luận giải nhanh (Cung cấp Can Chi và thông tin cơ bản)
export const resolveDayLogic = (type: XemNgayType, d: string, m: string, y: string): DayDetail => {
  const commonInfo = {
    solarDate: `${d}/${m}/${y}`,
    lunarDate: '10/11', 
    lunarYear: 'Ất Tỵ',
    dayCanChi: 'Nhâm Thân',
    monthCanChi: 'Mậu Tý',
    dayOfWeek: 'Thứ hai',
  };

  let specificInfo: Partial<DayDetail> = {};

  switch (type) {
    case 'tot-xau':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} là ngày không tốt cũng không xấu, thích hợp làm việc nhỏ.`,
        goodHours: ['Tý (23-1h)', 'Sửu (1-3h)', 'Thìn (7-9h)', 'Tỵ (9-11h)', 'Mùi (13-15h)', 'Tuất (19-21h)'],
        goodDirection: 'Hướng Tây Bắc'
      };
      break;
    case 'dong-tho':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} là ngày ĐẠI CÁT để khởi công, động thổ xây dựng.`,
        goodHours: ['Sửu (1-3h)', 'Thìn (7-9h)', 'Ngọ (11-13h)'],
        goodDirection: 'Hướng Đông Nam'
      };
      break;
    case 'khai-truong':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} rất tốt để mở hàng, khai trương cầu tài lộc.`,
        goodHours: ['Mão (5-7h)', 'Tỵ (9-11h)', 'Thân (15-17h)'],
        goodDirection: 'Hướng Chính Đông'
      };
      break;
    case 'mua-xe':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} thuận lợi để mua xe, nhận xe và làm lễ xuất hành.`,
        goodHours: ['Thìn (7-9h)', 'Mùi (13-15h)'],
        goodDirection: 'Hướng Chính Nam'
      };
      break;
    case 'mua-nha':
      specificInfo = {
        isGoodDay: false,
        message: `Ngày ${d}/${m}/${y} nên hạn chế ký hợp đồng mua nhà, đặt cọc bất động sản.`,
        goodHours: ['Tý (23-1h)', 'Tuất (19-21h)'],
        goodDirection: 'Hướng Tây Nam'
      };
      break;
    case 'ket-hon':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} là ngày lành tháng tốt để tổ chức cưới hỏi, đính hôn.`,
        goodHours: ['Dần (3-5h)', 'Tỵ (9-11h)', 'Dậu (17-19h)'],
        goodDirection: 'Hướng Chính Bắc'
      };
      break;
    case 'nhan-chuc':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} tốt cho việc cầu quan, nhận chức, khai ấn.`,
        goodHours: ['Thìn (7-9h)', 'Mùi (13-15h)'],
        goodDirection: 'Hướng Tây Bắc'
      };
      break;
    case 'ky-hop-dong':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} vượng khí, thuận lợi cho việc ký kết văn bản, giao dịch.`,
        goodHours: ['Tỵ (9-11h)', 'Thân (15-17h)'],
        goodDirection: 'Hướng Đông Bắc'
      };
      break;
    case 'hoang-dao':
      specificInfo = {
        isGoodDay: true,
        message: `Đây là ngày Hoàng Đạo, vạn sự hanh thông, trăm việc đều lợi.`,
        goodHours: ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất'],
        goodDirection: 'Hướng Tài Thần - Chính Nam'
      };
      break;
    case 'nhap-trach':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} cát lợi để làm lễ nhập trạch, về nhà mới.`,
        goodHours: ['Sửu (1-3h)', 'Thìn (7-9h)', 'Ngọ (11-13h)'],
        goodDirection: 'Hướng Đông Nam'
      };
      break;
    case 'an-tang':
      specificInfo = {
        isGoodDay: false,
        message: `Ngày ${d}/${m}/${y} là ngày không nên cử hành lễ an táng, cải táng.`,
        goodHours: ['Dần (3-5h)', 'Ngọ (11-13h)', 'Tuất (19-21h)'],
        goodDirection: 'Hướng Chính Tây'
      };
      break;
    case 'xay-dung':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} tốt để triển khai xây dựng, sửa sang công trình.`,
        goodHours: ['Mão (5-7h)', 'Tỵ (9-11h)', 'Mùi (13-15h)'],
        goodDirection: 'Hướng Đông Bắc'
      };
      break;
    case 'dat-bep':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} thích hợp để sửa bếp, đặt bếp hoặc làm lễ Táo Quân.`,
        goodHours: ['Ngọ (11-13h)', 'Dậu (17-19h)', 'Hợi (21-23h)'],
        goodDirection: 'Hướng Chính Nam'
      };
      break;
    case 'chuyen-nha':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} thuận lợi để di chuyển chỗ ở, thay đổi môi trường sống.`,
        goodHours: ['Sửu (1-3h)', 'Thìn (7-9h)', 'Ngọ (11-13h)'],
        goodDirection: 'Hướng Tây Bắc'
      };
      break;
    case 'do-tran':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} tốt để đổ trần, lợp mái, cất nóc nhà.`,
        goodHours: ['Thìn (7-9h)', 'Tỵ (9-11h)'],
        goodDirection: 'Hướng Đông Nam'
      };
      break;
    case 'xuat-hanh':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} xuất hành gặp nhiều may mắn, quý nhân phù trợ.`,
        goodHours: ['Mão (5-7h)', 'Ngọ (11-13h)', 'Thân (15-17h)'],
        goodDirection: 'Hướng Tài Thần - Chính Đông'
      };
      break;
    case 'chuyen-ban-tho':
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} thanh tịnh, tốt để di dời bàn thờ, tôn tượng.`,
        goodHours: ['Tý (23-1h)', 'Sửu (1-3h)', 'Tỵ (9-11h)'],
        goodDirection: 'Hướng Đông Bắc'
      };
      break;
    default:
      specificInfo = {
        isGoodDay: true,
        message: `Ngày ${d}/${m}/${y} tốt xấu đan xen, làm việc nên cẩn trọng.`,
        goodHours: ['Tý', 'Sửu', 'Thìn'],
        goodDirection: 'Hướng Chính Nam'
      };
  }

  return { ...commonInfo, ...specificInfo } as DayDetail;
};