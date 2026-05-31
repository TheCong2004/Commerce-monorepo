
import { Navbar } from '@/components/ui/client';
import XemNgayMasterLayout from '@/features/xem-ngay/templates/XemNgayMasterLayout';

export default function XemNgayMuaNhaPage() {
  return (
    <>
      <div className="min-h-screen w-full bg-[#fdfbf7] border-t-4 border-[#8b4513]">
        {/* Chỉ cần đổi type thành "mua-nha" */}
        <XemNgayMasterLayout type="mua-nha" />
      </div>
    </>
  );
}