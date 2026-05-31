export const getSaoHan = (year: number, gender: string) => {
  const currentYear = 2025;
  const tuoiMu = currentYear - year + 1;
  const remainder = tuoiMu % 9;

  let sao = { ten: "", tinhChat: "", hanh: "", loiKhuyen: "" };
  let han = { ten: "", mucDo: "", chiTiet: "" };

  // Logic tính Sao Cửu Diệu
  if (gender === "Nam") {
    const saoNam: any = {
      1: { ten: "La Hầu", tinhChat: "Hung", hanh: "Kim", loiKhuyen: "Chủ về khẩu thiệt, bệnh tật, thị phi. Cẩn trọng tháng 1 và tháng 7." },
      2: { ten: "Thổ Tú", tinhChat: "Trung", hanh: "Thổ", loiKhuyen: "Gia đạo có chút bất hòa, cẩn thận tiểu nhân quấy phá." },
      3: { ten: "Thủy Diệu", tinhChat: "Cát", hanh: "Thủy", loiKhuyen: "Chủ về tài lộc, hỷ sự. Rất tốt cho công việc kinh doanh." },
      4: { ten: "Thái Bạch", tinhChat: "Hung", hanh: "Kim", loiKhuyen: "Của đi thay người, cẩn trọng tiền bạc. Tháng 5 âm lịch xấu nhất." },
      5: { ten: "Thái Dương", tinhChat: "Cát", hanh: "Hỏa", loiKhuyen: "Phước tinh tốt nhất. Danh lợi hiển đạt, vạn sự như ý." },
      6: { ten: "Vân Hán", tinhChat: "Trung", hanh: "Hỏa", loiKhuyen: "Làm ăn trung bình, cần chú ý lời ăn tiếng nói, tránh kiện tụng." },
      7: { ten: "Kế Đô", tinhChat: "Hung", hanh: "Thổ", loiKhuyen: "Chủ về ám muội, buồn khổ, tai nạn bất ngờ." },
      8: { ten: "Thái Âm", tinhChat: "Cát", hanh: "Thủy", loiKhuyen: "Gặp nhiều may mắn, được phụ nữ trợ giúp về tiền bạc." },
      0: { ten: "Mộc Đức", tinhChat: "Cát", hanh: "Mộc", loiKhuyen: "Hỷ sự trùng phùng, sức khỏe tốt, gia đạo an vui." }
    };
    sao = saoNam[remainder];
  } else {
    const saoNu: any = {
      1: { ten: "Kế Đô", tinhChat: "Hung", hanh: "Thổ", loiKhuyen: "Nữ giới cực kỵ sao này. Dễ gặp chuyện bi ai, thị phi tự đến." },
      2: { ten: "Vân Hán", tinhChat: "Trung", hanh: "Hỏa", loiKhuyen: "Đề phòng đau ốm, thương tật. Không nên đầu tư lớn vào tháng 2." },
      3: { ten: "Mộc Đức", tinhChat: "Cát", hanh: "Mộc", loiKhuyen: "Nhiều tin vui về công việc và tình cảm. Tháng 12 cực tốt." },
      4: { ten: "Thái Âm", tinhChat: "Cát", hanh: "Thủy", loiKhuyen: "Cầu tài có tài, cầu lộc có lộc. Vạn sự hanh thông." },
      5: { ten: "Thổ Tú", tinhChat: "Trung", hanh: "Thổ", loiKhuyen: "Tâm trạng bất an, hay lo âu vô cớ. Cần giữ bình tĩnh." },
      6: { ten: "La Hầu", tinhChat: "Hung", hanh: "Kim", loiKhuyen: "Tháng giêng, tháng bảy cẩn thận lời ăn tiếng nói kẻo vướng lao lý." },
      7: { ten: "Thái Dương", tinhChat: "Cát", hanh: "Hỏa", loiKhuyen: "Hỷ sự đến nhà, làm ăn thuận lợi, sức khỏe ổn định." },
      8: { ten: "Thái Bạch", tinhChat: "Hung", hanh: "Kim", loiKhuyen: "Hung tinh gây hao tài, tốn của. Nên cẩn thận trong đầu tư." },
      0: { ten: "Thủy Diệu", tinhChat: "Cát", hanh: "Thủy", loiKhuyen: "Hỷ sự lâm môn. Nữ giới mệnh Mộc gặp sao này cực tốt." }
    };
    sao = saoNu[remainder];
  }

  // Logic tính Hạn (Tám hạn)
  const hanIndex = tuoiMu % 8;
  const hanList: any = {
    1: { ten: "Huỳnh Tuyền", mucDo: "Đại hạn", chiTiet: "Bệnh nặng, hao tài. Tránh đi sông nước." },
    2: { ten: "Tam Kheo", mucDo: "Tiểu hạn", chiTiet: "Đau mắt, tay chân. Chú ý va chạm xe cộ." },
    3: { ten: "Ngũ Mộ", mucDo: "Tiểu hạn", chiTiet: "Hao tài, mất của. Không nên cho người ngủ nhờ." },
    4: { ten: "Thiên Tinh", mucDo: "Tiểu hạn", chiTiet: "Thị phi, kiện cáo. Cẩn trọng ăn uống, ngộ độc." },
    5: { ten: "Tán Tận", mucDo: "Đại hạn", chiTiet: "Tai nạn bất ngờ, hao tốn tiền bạc nặng n biệt kỵ tháng 1, 7." },
    6: { ten: "Thiên La", mucDo: "Tiểu hạn", chiTiet: "Tâm lý bất an, lo âu phiền muộn. Cần nghỉ ngơi." },
    7: { ten: "Địa Võng", mucDo: "Tiểu hạn", chiTiet: "Lời ăn tiếng nói, thị phi tai tiếng. Hạn chế đi đêm." },
    0: { ten: "Diêm Vương", mucDo: "Đại hạn", chiTiet: "Nữ giới cần kỵ sinh đẻ, nam giới tránh kiện tụng." }
  };
  han = hanList[hanIndex];

  return { tuoiMu, sao, han };
};