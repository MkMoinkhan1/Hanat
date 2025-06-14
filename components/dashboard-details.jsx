import React from "react";
import { CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const DashboardDetails = ({ stats,value }) => {
  const isTrue = stats[1].value.length>7;
  return (
    <div
      className={`grid grid-cols-4 gap-2 ${value==="dashboard"?"lg:grid-cols-5":`lg:grid-cols-${stats.length}`} py-4 border-y-2 border-dashed border-spacing-14 mb-6`}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col justify-center items-start h-full ${
            index !== 0 ? "border-l-2  2xl:pl-6 pl-3" : ""
          }`}
        >
          <CardContent className="p-0 w-full !pr-0">
            <p className="2xl:text-xs text-[0.65rem] text-muted-foreground">{stat.label}</p>
            <div className={`text-[21px] font-[600] 2xl:!items-center items-center text-primary flex 2xl:flex-row 2xl:gap-2 gap-2 ${isTrue && "xl:flex-col xl:!items-start xl:gap-0"} `}>
              {stat.value}
              <div className={`text-xs mt-1 flex ${isTrue && "xl:relative xl:top-[-8px]"} `}>
                {stat.change && (
                  <span
                    className={`mr-1 2xl:text-xs text-[0.65rem] font-medium ${
                      stat.changeType === "positive"
                        ? "text-[#1FC16B]"
                        : stat.changeType === "negative"
                        ? "text-red-500"
                        : "text-[#9CA3AF]"
                    }`}
                  >
                    {stat.label === "Overall Rating" ? (
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
