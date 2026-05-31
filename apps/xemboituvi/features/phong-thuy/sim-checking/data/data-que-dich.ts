export interface QueDich {
  id: number;
  tenQue: string;
  hanTu: string;
  yNghia: string;
  loiKhuyen: string;
  loaiQue: "Đại Cát" | "Cát" | "Bình Hòa" | "Hung" | "Đại Hung";
}

export const DATA_64_QUE: Record<number, QueDich> = {
  1: {
    id: 1,
    tenQue: "Thuần Càn",
    hanTu: "乾為天",
    yNghia: "Tượng trưng cho Trời, sự khởi đầu mạnh mẽ, vạn vật hanh thông. Rồng bay trên trời, thời cơ rực rỡ đã đến.",
    loiKhuyen: "Cần giữ vững tâm đức, tránh kiêu ngạo để duy trì đại nghiệp lâu dài.",
    loaiQue: "Đại Cát",
  },
  2: {
    id: 2,
    tenQue: "Thuần Khôn",
    hanTu: "坤為地",
    yNghia: "Tượng trưng cho Đất, sự bao dung, mềm mỏng và bền bỉ. Mọi việc nên thuận theo tự nhiên, không nên cưỡng cầu.",
    loiKhuyen: "Hãy kiên trì, nhẫn nại như đất mẹ, thành công sẽ đến muộn nhưng chắc chắn.",
    loaiQue: "Cát",
  },
  11: {
    id: 11,
    tenQue: "Địa Thiên Thái",
    hanTu: "地天泰",
    yNghia: "Trời đất giao hòa, âm dương hòa hợp. Đây là quẻ của sự thái bình, thịnh vượng và may mắn tột bực.",
    loiKhuyen: "Thời cơ vàng để thực hiện các dự định lớn, tài lộc đang ở đỉnh cao.",
    loaiQue: "Đại Cát",
  },
  12: {
    id: 12,
    tenQue: "Thiên Địa Bĩ",
    hanTu: "天地否",
    yNghia: "Trời đất không giao nhau, mọi việc bế tắc, tiểu nhân đắc thế, quân tử khốn cùng.",
    loiKhuyen: "Nên ẩn nhẫn chờ thời, tránh tranh chấp hay đầu tư lớn vào lúc này.",
    loaiQue: "Đại Hung",
  },
  63: {
    id: 63,
    tenQue: "Thủy Hỏa Ký Tế",
    hanTu: "水火既濟",
    yNghia: "Mọi việc đã thành công, trật tự đã được thiết lập. Nước trên lửa dưới, sự phối hợp hoàn hảo.",
    loiKhuyen: "Thành công rồi cần phải đề phòng sự suy thoái, 'no quá hóa mất ngon'.",
    loaiQue: "Cát",
  },
  64: {
    id: 64,
    tenQue: "Hỏa Thủy Vị Tế",
    hanTu: "火水未濟",
    yNghia: "Mọi việc chưa xong, còn dang dở. Tuy nhiên, đây là quẻ mở ra hy vọng và những khởi đầu mới.",
    loiKhuyen: "Cần cẩn trọng trong những bước cuối cùng để đạt được kết quả như ý.",
    loaiQue: "Bình Hòa",
  },
  // Bạn có thể bổ sung đầy đủ 64 quẻ dựa trên danh mục chuẩn Kinh Dịch
};