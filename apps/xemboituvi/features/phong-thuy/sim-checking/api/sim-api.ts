export const fetchSimLuatGiai = async (formData: any) => {
  // Thực tế bạn sẽ dùng axios hoặc fetch ở đây
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        message: "Luận giải thành công"
      });
    }, 1000);
  });
};