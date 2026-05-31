"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { usePersonalYearCycle } from "@/features/thansohoc/utils/bieudo";
import {
  REPORT_DATA,
  ReportSectionData,
} from "@/features/thansohoc/luan-giai/report/data";
import ReportItem from "@/features/thansohoc/luan-giai/container/ReportItem";
import { fetchPersonalYearContent } from "@/features/thansohoc/luan-giai/services/api";
import PersonalityGroup from "./container/PersonalityGroup2";
import CareerGroup from "./container/CareerGroup3";
import LifeCycleChart from "./container/LifeCycleChart";
import PyramidChart from "./container/PyramidChart";
import ForecastTable from "./container/ForecastTable";
import GridChart from "./container/GridChart";

export default function ReportList() {
  const searchParams = useSearchParams();
  const dob = searchParams.get("dob");
  const fullName = searchParams.get("fullName") || searchParams.get("name");
  const formattedDob = dob ? dob.split("-").reverse().join("/") : "";

  const cycleChartData = usePersonalYearCycle(dob);
  const [displayData, setDisplayData] =
    useState<ReportSectionData[]>(REPORT_DATA);

  useEffect(() => {
    async function fetchAndMergeData() {
      if (!cycleChartData || cycleChartData.length === 0) return;

      const currentYear = new Date().getFullYear();
      const currentYearItem = cycleChartData.find(
        (d) => d.year === currentYear.toString()
      );
      const personalNumber = currentYearItem?.value;
      const yearContent = await fetchPersonalYearContent(personalNumber);

      // GIẢ SỬ: Số Đường đời và Sứ mệnh (Nên tính toán thực tế hoặc lấy từ API)
      const lifePathNumber = "22/4";
      const missionNumber = "6";

      const mergedData = REPORT_DATA.map((section) => ({
        ...section,
        items: section.items.map((item) => {
          let newItem = { ...item };

          // 1. Trộn Năm cá nhân (Mục 1.1)
          if (newItem.subItems) {
            newItem.subItems = newItem.subItems.map((sub) => {
              if (sub.dynamicKey === "personal_year") {
                return { ...sub, content: yearContent };
              }
              return sub;
            });
          }

          // 2. Trộn Chỉ số Đường đời (Mục 4)
          if (newItem.dynamicKey === "life_path") {
            return {
              ...newItem,
              title: newItem.title.replace("{number}", lifePathNumber),
            };
          }

          // 3. Trộn Chỉ số Sứ mệnh (Mục 9)
          if (newItem.index === "9") {
            return {
              ...newItem,
              title:
                newItem.title.replace("{number}", missionNumber) ||
                newItem.title,
            };
          }

          return newItem;
        }),
      }));
      setDisplayData(mergedData);
    }
    fetchAndMergeData();
  }, [cycleChartData]);

  return (
  <div className="max-w-4xl mx-auto pb-24 pt-6 px-4 md:px-0 space-y-20">
    {displayData.map((section) => (
      /* --- THÊM ID CHO SECTION --- */
      <section
        key={section.section_id}
        id={`section-${section.section_id}`} // Khớp với id trong ReportSidebar
        className="animate-in fade-in duration-1000 scroll-mt-24" // scroll-mt để không bị đè bởi header
      >
        <div className="mb-12 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] papyrus drop-shadow-md">
            {section.section_title}
          </h2>
          <div className="h-1 w-20 bg-[#ffd700] mx-auto mt-4 opacity-40 rounded-full"></div>
        </div>

        <div className="space-y-10">
          {section.items.map((item) => (
            <div
              key={item.index}
              /* --- THÊM ID CHO TỪNG ITEM --- */
              id={`item-${item.index}`} // Khớp với id trong ReportSidebar
              className="bg-white shadow-xl rounded-2xl p-6 md:p-10 border border-gray-100 scroll-mt-24"
            >
              {/* Tiêu đề từng Mục */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center gap-3">
                <span className="flex items-center justify-center bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded min-w-[32px]">
                  {item.index}
                </span>
                {item.title}
              </h3>
                {/* --- LOGIC RENDER NỘI DUNG --- */}

                {/* 1. Mục Biểu đồ Chu kỳ 9 năm */}
                {item.index === "1" && (
                  <ReportItem data={item} externalData={cycleChartData} />
                )}

                {/* 2. Mục Nhóm tính cách (Progress bars) */}
                {item.index === "2" && (
                  <PersonalityGroup items={item.subItems || []} />
                )}

                {/* 3. Mục Nhóm ngành nghề */}
                {item.index === "3" && (
                  <CareerGroup items={item.subItems || []} />
                )}

                {/* 4. Mục 4, 9, 10, 11 và các mục văn bản luận giải thuần túy */}
                {(parseInt(item.index) === 4 || parseInt(item.index) >= 9) && (
                  <div
                    className="prose prose-slate max-w-none text-gray-700 leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )}

                {/* 5. Mục Chu kỳ Đường đời (Vòng tròn) */}
                {item.type === "life_cycle_chart" && (
                  <div className="space-y-6">
                    <p className="text-blue-500 text-sm italic mb-4 cursor-pointer underline">
                      Ý nghĩa của biểu đồ này là ... (Xem thêm)
                    </p>
                    <LifeCycleChart
                      cycles={
                        Array.isArray(item.externalData)
                          ? item.externalData
                          : []
                      }
                    />
                    <div className="text-center font-bold uppercase mb-6 tracking-widest text-gray-900">
                      Chu kỳ đường đời
                    </div>
                    <div
                      className="prose prose-slate max-w-none text-gray-700 leading-relaxed text-justify"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                )}

                {/* 6. Mục Kim Tự Tháp */}
                {item.type === "pyramid_chart" && (
                  <div className="space-y-6">
                    <div
                      className="prose prose-slate max-w-none mb-8 text-gray-700"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                    <div className="border border-gray-100 rounded-2xl p-4 shadow-inner bg-slate-50/30">
                      <PyramidChart data={item.externalData} />
                    </div>
                  </div>
                )}

                {/* 7. Mục Dự báo Năm/Tháng (Bảng) */}
                {item.type === "forecast_table" && (
                  <div className="space-y-6">
                    <p className="text-sm text-gray-700 leading-relaxed italic">
                      {item.content}
                    </p>
                    <ForecastTable
                      data={
                        Array.isArray(item.externalData)
                          ? item.externalData
                          : []
                      }
                    />
                    <p className="text-red-500 text-sm text-center font-medium px-4 pt-4 border-t border-dashed">
                      Mục này cho biết bạn nên{" "}
                      {item.index === "7"
                        ? "đi theo hướng nào trong những năm sắp tới"
                        : "làm gì trong những tháng sắp tới"}{" "}
                      để đạt thành công. Bạn cần nâng cấp Vip để xem được luận
                      giải chi tiết của mục này.
                    </p>
                  </div>
                )}
                {/* --- BIỂU ĐỒ SỨC MẠNH (MỤC 21) --- */}
                {item.type === "birth_chart" && (
                  <div className="flex flex-col items-center space-y-6">
                    <div
                      className="prose prose-slate max-w-none text-sm text-gray-700 italic"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                    <GridChart
                      data={
                        Array.isArray(item.externalData)
                          ? item.externalData
                          : []
                      }
                      title="Biểu đồ sức mạnh (Biểu đồ ngày sinh) của bạn"
                    />
                    <p className="text-red-500 text-xs italic text-center">
                      Mục này giải thích chi tiết về biểu đồ sức mạnh và giải
                      pháp của chúng tôi cho bạn. Bạn cần nâng cấp Vip để xem
                      được luận giải của mục này.
                    </p>
                  </div>
                )}

                {/* --- BIỂU ĐỒ TỔNG HỢP (MỤC 22) --- */}
                {item.type === "composite_chart" && (
                  <div className="flex flex-col items-center space-y-8">
                    <div className="flex flex-col lg:flex-row justify-around w-full gap-8">
                      <GridChart
                        data={
                          typeof item.externalData === "object" &&
                          item.externalData !== null &&
                          "nameChart" in item.externalData
                            ? item.externalData.nameChart
                            : []
                        }
                        title={fullName || "Võ Thế Công"}
                        subTitle="Biểu đồ này cho biết những sức mạnh do tên của bạn mang lại. Chủ yếu dùng tên đó để gộp với ngày sinh tạo ra biểu đồ tổng hợp bên cạnh."
                      />
                      <GridChart
                        data={
                          typeof item.externalData === "object" &&
                          item.externalData !== null &&
                          "totalChart" in item.externalData
                            ? item.externalData.totalChart
                            : []
                        }
                        title="Biểu đồ tổng hợp"
                        subTitle="Biểu đồ này thể hiện bù trừ của tên vào ngày sinh của bạn. Các con số của tên (màu đỏ) lấp đầy các khoảng trống trong biểu đồ ngày sinh là đẹp nhất."
                      />
                    </div>
                    <p className="text-red-500 text-xs italic text-center">
                      Mục này giải thích chi tiết về sự bù trừ của tên vào ngày
                      sinh của bạn. Bạn cần nâng cấp Vip để xem được luận giải
                      của mục này.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
