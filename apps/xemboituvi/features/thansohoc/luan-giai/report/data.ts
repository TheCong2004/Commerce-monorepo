export type ReportItemType = 'text' | 'cycle_chart' | 'birth_chart' | 'progress_chart' | 'text_with_image'| 'life_cycle_chart'| 'pyramid_chart'| 'forecast_table'|'composite_chart';

export interface ReportItemData {
  index: string;
  title: string;
  type: ReportItemType;
  content: string;
  image?: string | null;
  theme?: 'light' | 'dark';
  dynamicKey?: 'personal_year' | 'life_path';
  
  // ✅ THÊM TRƯỜNG NÀY: Chứa các mục con (VD: 1.1 nằm trong 1)
  subItems?: ReportItemData[]; 
  is_vip?: boolean;
  externalData?: Array<
    | { label: string; status: string; number: number; time: string; color: string; border: string }
    | { label: string; value: number }
    | { pos: number; val: string }
  > | {
    peaks: Array<{ id: string; value: number; age: string; year: string; x: number; y: number }>;
    base: Array<{ id: string; value: number; label: string; x: number; y: number }>;
    challenges: Array<{ id: string; value: number; x: number; y: number }>;
  } | {
    nameChart: Array<{ pos: number; val: string }>;
    totalChart: Array<{ pos: number; val: string }>;
  };
}

export interface ReportSectionData {
  section_id: string;
  section_title: string;
  items: ReportItemData[];
}

export const REPORT_DATA: ReportSectionData[] = [
  {
    section_id: "A",
    section_title: "PHẦN A. PHÂN TÍCH TỔNG QUAN",
    items: [
      // --- MỤC 1: CHU KỲ VẬN SỐ ---
      {
        index: "1",
        title: "1. CHU KỲ VẬN SỐ CỦA BẠN",
        type: "cycle_chart",
        theme: "light",
        content: '',
        subItems: [
          {
            index: "1.1",
            title: "1.1. CHI TIẾT NĂM {year} - SỐ {number}",
            type: "text",
            dynamicKey: "personal_year",
            content: `<div class="italic text-gray-400">Đang tải luận giải...</div>`,
            theme: "light"
          }
        ]
      },
      // --- MỤC 2: NHÓM TÍNH CÁCH (NẰM TRONG PHẦN A) ---
      {
        index: "2",
        title: "2. NHÓM TÍNH CÁCH THEO BẢN NGÃ CỦA BẠN",
        type: "progress_chart",
        content: `<p class="text-sm text-gray-400/80 mb-6 italic">Ý nghĩa của các dao động này là ... <span class="text-blue-400 cursor-pointer underline">(Xem thêm)</span></p>`,
        subItems: [
          { index: "2.1", title: "2.1. Mạnh mẽ - Độc lập - Tự tin", type: "text", content: "15", is_vip: false },
          { index: "2.2", title: "2.2. Lắng nghe - Khéo léo - Nhạy cảm", type: "text", content: "5", is_vip: false },
          { index: "2.3", title: "2.3. Sáng tạo - Hoạt bát - Lạc quan", type: "text", content: "3", is_vip: false },
          { index: "2.4", title: "2.4. Cẩn thận - Cầu toàn - Thực tế", type: "text", content: "0", is_vip: true },
          { index: "2.5", title: "2.5. Năng động - Linh hoạt - Tò mò", type: "text", content: "0", is_vip: true },
          { index: "2.6", title: "2.6. Quan tâm - Yêu thương - Kiểm soát", type: "text", content: "0", is_vip: true },
          { index: "2.7", title: "2.7. Thông thái - Khám phá - Truyền đạt", type: "text", content: "0", is_vip: true },
          { index: "2.8", title: "2.8. Công bằng - Tập trung - Lý tưởng", type: "text", content: "0", is_vip: true },
          { index: "2.9", title: "2.9. Trách nhiệm - Rộng lượng - Hào phóng", type: "text", content: "0", is_vip: true },
        ]
      },
      // --- MỤC 3: TỈ LỆ NHÓM NGÀNH PHÙ HỢP VỚI BẠN
      {
  index: "3",
  title: "3. TỈ LỆ NHÓM NGÀNH PHÙ HỢP VỚI BẠN",
  type: "progress_chart", 
  // Phần nội dung giới thiệu quy trình 2 bước
  content: `
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm leading-relaxed text-gray-700 mb-6">
      <p class="mb-2">Việc xác định nhóm ngành được tiến hành thông qua 2 bước:</p>
      <p class="mb-1"><strong>Bước 1:</strong> Xác định điểm mạnh, điểm yếu, đặc trưng trong tính cách cũng như khao khát sâu thẳm bên trong bạn thông qua 3 chỉ số chính: chỉ số đường đời, chỉ số sứ mệnh, chỉ số linh hồn.</p>
      <p><strong>Bước 2:</strong> Sau đó dựa vào nhóm tính cách bản ngã để tìm kiếm những nghề cụ thể phù hợp với những đặc điểm của bạn thông qua hàng loạt các phân tích mối tương quan của từng nghề trong "Danh mục nghề nghiệp Việt Nam" với 3 chỉ số chính...</p>
    </div>
  `,
  subItems: [
    {
      index: "3.1",
      title: "Tỉ lệ phù hợp với nhóm ngành Quản lý:",
      type: "text",
      content: "21.42",
      is_vip: false,
    },
    {
      index: "3.2",
      title: "Tỉ lệ phù hợp với ngành Kỹ thuật:",
      type: "text",
      content: "0",
      is_vip: true,
    },
    {
      index: "3.3",
      title: "Tỉ lệ phù hợp với ngành Xã hội:",
      type: "text",
      content: "0",
      is_vip: true,
    },
    {
      index: "3.4",
      title: "Tỉ lệ phù hợp với ngành Nghiệp vụ:",
      type: "text",
      content: "0",
      is_vip: true,
    },
    {
      index: "3.5",
      title: "Tỉ lệ phù hợp với ngành Nghiên cứu:",
      type: "text",
      content: "0",
      is_vip: true,
    },
    {
      index: "3.6",
      title: "Tỉ lệ phù hợp với ngành Nghệ thuật:",
      type: "text",
      content: "0",
      is_vip: true,
    }
  ]
}
    ]
  },
  // PHẦN B có thể để trống hoặc thêm các nội dung chuyên sâu khác sau này
 {
  section_id: "B",
  section_title: "PHẦN B. PHÂN TÍCH ĐƯỜNG ĐỜI",
  items: [
    {
      index: "4",
      title: "CHỈ SỐ ĐƯỜNG ĐỜI (SỐ CHỦ ĐẠO) CỦA BẠN LÀ: {number}",
      type: "text",
      dynamicKey: "life_path",
      content: `
        <p class="text-blue-500 mb-4 cursor-pointer underline">Ý nghĩa của chỉ số này là ... (Xem thêm)</p>
        <div class="space-y-4">
          <p class="font-bold uppercase">• ĐIỂM MẠNH CỦA BẠN:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li>22 được xem là con số mạnh nhất trong tất cả các con số...</li>
            <li>Bạn có tiềm năng hầu như vô giới hạn để đạt được...</li>
            <li>Khả năng chịu trách nhiệm của bạn hầu như vô giới hạn...</li>
          </ul>
        </div>
      `,
    },
    {
  index: "5",
  title: "CHU KỲ ĐƯỜNG ĐỜI",
  type: "life_cycle_chart", // Loại mới để nhận diện component
  content: `
    <div class="space-y-4">
      <p class="font-bold italic">Chu kỳ đầu tiên (GIEO HẠT) từ Đầu đời - 32 tuổi (2036), ứng với số 9</p>
      <p>Đây là một sự rung động cao đối với một người trẻ tuổi phải chịu đựng. Giai đoạn này quá kỳ vọng vào bạn về lòng nhân ái và sự bao dung...</p>
    </div>
  `,
  // Dữ liệu cho 3 vòng tròn
  externalData: [
    { label: "Chu kỳ 1", status: "GIEO HẠT", number: 9, time: "Đầu đời - 32 tuổi (2036)", color: "text-red-500", border: "border-red-400" },
    { label: "Chu kỳ 2", status: "CHÍN", number: 7, time: "33 - 59 tuổi (2037 - 2063)", color: "text-purple-600", border: "border-purple-500" },
    { label: "Chu kỳ 3", status: "THU HOẠCH", number: 6, time: "60 tuổi về sau (2064 trở đi)", color: "text-green-600", border: "border-green-500" }
  ]
},
{
  index: "6",
  title: "KIM TỰ THÁP THẦN SỐ HỌC",
  type: "pyramid_chart",
  content: `
    <div class="space-y-3 text-sm text-gray-700 leading-relaxed italic">
      <p>Kim tự tháp cho thấy 4 giai đoạn trong cuộc đời bạn sẽ tương ứng với đỉnh cao là số nào và thử thách là con số nào...</p>
      <p>Mức độ thành tựu trong 4 giai đoạn được thể hiện khác nhau:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Giai đoạn 1 - Đỉnh cao của tuổi trẻ...</li>
        <li>Giai đoạn 2 - Đỉnh cao của kinh nghiệm...</li>
        <li>Giai đoạn 3 và 4 - Đỉnh cao của sự trưởng thành...</li>
      </ul>
    </div>
  `,
  // Dữ liệu tọa độ và giá trị cho các nút trên Kim Tự Tháp
externalData: {
  // Các đỉnh cao (Purple) — từ TRÊN XUỐNG (tuổi tăng dần)
  peaks: [
    { id: "P4", value: 6, age: "51-59 tuổi", year: "2063", x: 50, y: 15 },   // Đỉnh cao nhất
    { id: "P3", value: 11, age: "42-50 tuổi", year: "2054", x: 35, y: 35 },  // Trái
    { id: "P2", value: 4, age: "33-41 tuổi", year: "2045", x: 65, y: 35 },   // Phải
    { id: "P1", value: 7, age: "24-32 tuổi", year: "2036", x: 50, y: 55 }    // Gần đáy
  ],

  // Nền tảng (Blue) — tầng cơ bản
  base: [
    { id: "B1", value: 9, label: "Tháng 09", x: 25, y: 75 },
    { id: "B2", value: 7, label: "Ngày 16", x: 50, y: 75 },
    { id: "B3", value: 6, label: "2004", x: 75, y: 75 }
  ],

  // Thử thách (Challenges) — mở rộng từ đáy
  challenges: [
  
  ]
}
},
{
  index: "7",
  title: "CÁC CHỈ SỐ NĂM",
  type: "forecast_table",
  content: "Những con số này cho biết ở mỗi năm bạn nên tập trung định hướng phát triển theo con số nào...",
  externalData: [
    { label: "Năm 2026", value: 8 },
    { label: "Năm 2027", value: 9 },
    { label: "Năm 2028", value: 1 }
  ]
},
{
  index: "8",
  title: "CÁC CHỈ SỐ THÁNG",
  type: "forecast_table",
  content: "Những con số này cho biết ở mỗi tháng sẽ có những điều gì có khả năng xảy ra và bạn nên tập trung làm việc như thế nào...",
  externalData: [
    { label: "Tháng 1/2026", value: 9 },
    { label: "Tháng 2/2026", value: 1 },
    { label: "Tháng 3/2026", value: 2 }
  ]
}
  ]
},
{
  section_id: "C",
  section_title: "PHẦN C. PHÂN TÍCH SỨ MỆNH",
  items: [
    {
      index: "9",
      title: "CHỈ SỐ SỨ MỆNH CỦA BẠN LÀ: 6",
      type: "text",
      content: `
        <p>Trong Thần số học, chỉ số sứ mệnh giúp bạn biết cách đạt được mục tiêu của bạn, lớn và nhỏ...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "10",
      title: "TƯƠNG QUAN ĐƯỜNG ĐỜI - SỨ MỆNH: 22 & 6",
      type: "text",
      content: `
        <p>Chỉ số đường đời và chỉ số sứ mệnh là hai yếu tố có mối quan hệ chặt chẽ với nhau, cùng tồn tại trong một người...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "11",
      title: "CHỈ SỐ THỬ THÁCH SỨ MỆNH CỦA BẠN LÀ: 0",
      type: "text",
      content: `
        <p>Chỉ số này cho biết những kiểu thử thách thường gặp nhất trong suốt cuộc đời mà bạn sẽ phải vượt qua nó...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "12",
      title: "CHỈ SỐ TRƯỞNG THÀNH CỦA BẠN LÀ: 1",
      type: "text",
      content: `
        <p>Số trưởng thành của bạn cho biết hướng thành công và mong muốn tiềm ẩn dần dần xuất hiện vào khoảng tuổi từ 40 trở lên...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "13",
      title: "CHỈ SỐ NĂNG LỰC TRƯỞNG THÀNH CỦA BẠN LÀ: 2",
      type: "text",
      content: `
        <p>Chỉ số này cho bạn biết cần phải làm gì để có thể nhanh chóng đưa các bài học mà cuộc đời đã dạy bạn vào việc hoàn thành sứ mệnh của cuộc đời...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "14",
      title: "CHỈ SỐ LINH HỒN CỦA BẠN LÀ: 5",
      type: "text",
      content: `
        <p>Linh hồn, sự khao khát từ sâu bên trong của mỗi người. Chỉ số này hé lộ linh hồn hay sâu thẳm trong bạn mong muốn bạn trở thành con người như thế nào...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "15",
      title: "TƯƠNG QUAN ĐƯỜNG ĐỜI - LINH HỒN: 22 & 5",
      type: "text",
      content: `
        <p>Chỉ số đường đời và chỉ số linh hồn là hai yếu tố có mối quan hệ chặt chẽ với nhau, cùng tồn tại trong một người...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "16",
      title: "CHỈ SỐ THỬ THÁCH LINH HỒN CỦA BẠN LÀ: 0",
      type: "text",
      content: `
        <p>Linh hồn mong muốn được trải nghiệm và trưởng thành, mọi nguyên liệu cho sự trưởng thành đó không bao giờ hoàn hảo...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "17",
      title: "CHỈ SỐ NHÂN CÁCH CỦA BẠN LÀ: 1",
      type: "text",
      content: `
        <p>Bạn biết bạn là ai. Bạn biết tâm trí của bạn, suy nghĩ của bạn và có một cảm giác về tính cách của bạn...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "18",
      title: "CHỈ SỐ THỬ THÁCH NHÂN CÁCH CỦA BẠN LÀ: 🚫",
      type: "text",
      content: `
        <p>Thái độ và suy nghĩ của bất kỳ một ai về bản thân đều ảnh hưởng tới sức khỏe, sự thịnh vượng, mối quan hệ...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "19",
      title: "CÁC CHỈ SỐ ĐIỂM YẾU CỦA BẠN LÀ: 🚫",
      type: "text",
      content: `
        <p>Các chỉ số này thể hiện những điểm yếu của bạn mà kiếp trước bạn chưa khắc phục được hoặc có thể ngay ở kiếp này còn tồn đọng...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "20",
      title: "CÁC CHỈ SỐ NỢ NGHIỆP CỦA BẠN LÀ: 🚫",
      type: "text",
      content: `
        <p>Chỉ số này thể hiện các bài học cụ thể mà bạn cần chinh phục trong kiếp này vì đã không được học chúng ở kiếp trước...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    }
  ]
},
{
  section_id: "D_CAPACITY",
  section_title: "PHẦN D. PHÂN TÍCH NĂNG LỰC",
  items: [
    {
      index: "21",
      title: "BIỂU ĐỒ SỨC MẠNH CỦA BẠN (rất quan trọng)",
      type: "birth_chart",
      content: "Biểu đồ này còn được gọi là biểu đồ ngày sinh do được tạo ra từ ngày sinh...",
      externalData: [
        { pos: 1, val: "1" }, { pos: 4, val: "4" }, { pos: 7, val: "" },
        { pos: 2, val: "2" }, { pos: 5, val: "" }, { pos: 8, val: "" },
        { pos: 3, val: "" }, { pos: 6, val: "6" }, { pos: 9, val: "9" }
      ]
    },
    {
      index: "22",
      title: "BIỂU ĐỒ TÊN VÀ BIỂU ĐỒ TỔNG HỢP",
      type: "composite_chart",
      content: "Mục này giải thích chi tiết về sự bù trừ của tên vào ngày sinh của bạn...",
      externalData: {
        nameChart: [
          { pos: 1, val: "" }, { pos: 4, val: "4" }, { pos: 7, val: "7" },
          { pos: 2, val: "2" }, { pos: 5, val: "55" }, { pos: 8, val: "8" },
          { pos: 3, val: "3" }, { pos: 6, val: "66" }, { pos: 9, val: "" }
        ],
        totalChart: [
          { pos: 1, val: "1" }, { pos: 4, val: "44" }, { pos: 7, val: "7" },
          { pos: 2, val: "22" }, { pos: 5, val: "55" }, { pos: 8, val: "8" },
          { pos: 3, val: "3" }, { pos: 6, val: "666" }, { pos: 9, val: "9" }
        ]
      }
    },
    {
      index: "23",
      title: "CHỈ SỐ  THÁI ĐỘ CỦA BẠN",
      type: "text",
      content: `
        <p>Chỉ số này cho biết những kiểu thử thách thường gặp nhất trong suốt cuộc đời mà bạn sẽ phải vượt qua nó...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "24",
      title: "CHỈ SỐ NĂNG LỰC TỰ NHIÊN CỦA BẠN",
      type: "text",
      content: `
        <p>Số trưởng thành của bạn cho biết hướng thành công và mong muốn tiềm ẩn dần dần xuất hiện vào khoảng tuổi từ 40 trở lên...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "25",
      title: "CHỈ SỐ VƯỢT KHÓ CỦA BẠN ",
      type: "text",
      content: `
        <p>Chỉ số này cho bạn biết cần phải làm gì để có thể nhanh chóng đưa các bài học mà cuộc đời đã dạy bạn vào việc hoàn thành sứ mệnh của cuộc đời...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "26",
      title: "CHỈ SỐ NĂNG LỤC TƯ DUY",
      type: "text",
      content: `
        <p>Linh hồn, sự khao khát từ sâu bên trong của mỗi người. Chỉ số này hé lộ linh hồn hay sâu thẳm trong bạn mong muốn bạn trở thành con người như thế nào...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "27",
      title: "CHỈ SỐ ĐỘNG LỤC TIẾP CẬN",
      type: "text",
      content: `
        <p>Chỉ số đường đời và chỉ số linh hồn là hai yếu tố có mối quan hệ chặt chẽ với nhau, cùng tồn tại trong một người...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "28",
      title: "CHỈ SỐ NĂNG LỰC TIẾP CẬN",
      type: "text",
      content: `
        <p>Linh hồn mong muốn được trải nghiệm và trưởng thành, mọi nguyên liệu cho sự trưởng thành đó không bao giờ hoàn hảo...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
    {
      index: "29",
      title: "CHỈ SỐ THÁI ĐỘ TIẾP CẬN",
      type: "text",
      content: `
        <p>Bạn biết bạn là ai. Bạn biết tâm trí của bạn, suy nghĩ của bạn và có một cảm giác về tính cách của bạn...</p>
        <p class="mt-4 text-red-500 italic font-medium">Bạn cần nâng cấp Vip để xem được luận giải của mục này!</p>
      `,
    },
  ]
}

];