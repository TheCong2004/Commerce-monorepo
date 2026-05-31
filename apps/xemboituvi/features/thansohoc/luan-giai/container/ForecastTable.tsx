"use client";

import React from 'react';

export default function ForecastTable({ data }: { data: any[] }) {
  return (
    <div className="w-full max-w-md mx-auto my-6 overflow-hidden border border-emerald-600 rounded-sm">
      <table className="w-full text-sm border-collapse">
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-b border-emerald-600 last:border-0">
              <td className="py-3 px-6 font-bold text-gray-800 text-center border-r border-emerald-600 w-2/3">
                {item.label}
              </td>
              <td className="py-3 px-6 font-bold text-emerald-600 text-center text-lg">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}