"use client"
import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const DashboardDetails = ({ stats,value }) => {
  const valid = ["Overall Rating","التقييم العام"]
    const [direction, setDirection] = useState("ltr");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDirection(document?.documentElement?.dir || "ltr");
    }
  }, []);
  const isTrue = stats[1].value.length>7;
  return (
    <div
      className={`grid grid-cols-4 gap-2 ${value==="dashboard"?"lg:grid-cols-5":`lg:grid-cols-${stats.length}`} py-4 border-y-2 border-dashed border-spacing-14 mb-6`}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
           className={`flex flex-col justify-center h-full ${
            index !== 0
              ? direction === "rtl"
                ? "border-r-2 2xl:pr-6 pr-3 items-end"
                : "border-l-2 2xl:pl-6 pl-3 items-start"
              : direction === "rtl"
              ? "items-end"
              : "items-start"
          }`}
        >
          <CardContent className="p-0 w-full !pr-0">
            <p className="2xl:text-xs text-[0.65rem] text-muted-foreground">{stat.label}</p>
            <div className={`text-[21px] font-[600] flex flex-col items-start gap-0 `}
            
            >
              {stat.value}
              <div className={`text-xs mt-1 flex relative top-[-8px] `}>
                {stat.change && (
                  <span
                    className={`${direction==="rtl"?"ml-1":"mr-1"} 2xl:text-xs text-[0.65rem] font-medium ${
                      stat.changeType === "positive"
                        ? "text-[#1FC16B]"
                        : stat.changeType === "negative"
                        ? "text-red-500"
                        : "text-[#9CA3AF]"
                    }`}
                  >
                    {valid.includes(stat.label) ? (
                      <div className="flex gap-1 item-center">
                        <Star className="h-4 w-4 text-[#F6B51E] fill-[#F6B51E]" />
                        {stat.change}
                      </div>
                    ) : (
                      stat.change
                    )}
                  </span>
                )}
                <span className="text-muted-foreground 2xl:text-xs text-[0.65rem]">{stat.note}</span>
              </div>
            </div>
          </CardContent>
        </div>
      ))}
    </div>
  );
};

export default DashboardDetails;
