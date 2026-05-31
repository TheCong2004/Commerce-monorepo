import BoiTinhYeuCard from "@/features/tu-vi/components/boi-tinh-yeu/boi-tinh-yeu-card";
import TuVisticStars from "@/features/tu-vi/components/MysticStars";
export default function LovePage() {
  return (
    <main className="min-h-screen bg-[#fff0f3] flex items-center justify-center pt-15">
      <TuVisticStars/>
      {/* Bạn có thể bọc thêm Navbar hoặc Footer ở đây */}
      <BoiTinhYeuCard />
    </main>
  );
}