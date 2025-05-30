import React from "react";
import { CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const DashboardDetails = ({ stats,value }) => {
  return (
    <div
      className={`grid grid-cols-1 gap-2 md:grid-cols-2 ${value==="dashboard"?"lg:grid-cols-5":`lg:grid-cols-${stats.length}`} py-6 border-y-2 border-dashed border-spacing-14 mb-6`}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col justify-center items-start h-full ${
            index !== 0 ? "border-l-2  xl:pl-6" : ""
          }`}
        >
          <CardContent className="p-0 w-full pr-0">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <div className="text-[24px] font-[600] items-center text-primary flex flex-row gap-2">
              {stat.value}
              <div className="text-xs mt-1 flex">
                {stat.change && (
                  <span
                    className={`mr-2 text-xs font-medium ${
                      stat.changeType === "positive"
                        ? "text-[#1FC16B]"
                        : stat.changeType === "negative"
                        ? "text-red-500"
                        : "text-[#9CA3AF]"
                    }`}
                  >
                    {stat.label === "Overall Rating" ? (
                      <div className="flex gap-2 item-center">
                        <Star className="h-4 w-4 text-[#F6B51E] fill-[#F6B51E]" />
                        {stat.change}
                      </div>
                    ) : (
                      stat.change
                    )}
                  </span>
                )}
                <span className="text-muted-foreground">{stat.note}</span>
              </div>
            </div>
          </CardContent>
        </div>
      ))}
    </div>
  );
};

export default DashboardDetails;
