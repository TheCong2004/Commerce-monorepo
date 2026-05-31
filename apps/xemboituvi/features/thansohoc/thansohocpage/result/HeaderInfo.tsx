import React from "react";

interface HeaderInfoProps {
  fullName: string;
  nickname?: string | null;
  dob: string;
  gender?: string | null;
}

const formatDate = (d: string) => {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
};

export default function HeaderInfo({ fullName, nickname, dob, gender }: HeaderInfoProps) {
  return (
    <div className="text-center mt-10 z-10 relative">
      <h1 className="text-[#e8cd79] papyrus font-semibold text-xl md:text-3xl tracking-tight leading-tight">
        {" "}
        Họ và tên{" "}
        <span className="block text-[#ffd700] text-3xl md:text-3xl font-bold">
          {" "}
          {fullName}{" "}
        </span>{" "}
      </h1>{" "}
      <div className="mt-3 text-[#e8cd79] papyrus font-medium text-lg md:text-xl tracking-tight">
        {" "}
        Ngày sinh{" "}
        <span className="text-[#ffd700] font-semibold">
          {" "}
          {formatDate(dob)} •{" "}
          {gender === "nam" ? "Nam" : gender === "nu" ? "Nữ" : "Khác"}{" "}
        </span>{" "}
      </div>{" "}
      {nickname && (
        <p className="text-gray-400 text-1xl italic">
          {" "}
          (Tên thường gọi: {nickname}){" "}
        </p>
      )}{" "}
    </div>
  );
}