import React, { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Line } from "react-chartjs-2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const UserLineChart = ({data,option}) => {
      const [direction, setDirection] = useState("ltr");
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        setDirection(document?.documentElement?.dir || "ltr");
      }
    }, []);
  return (
      <Card className="xl:col-span-2 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <div>
                <CardTitle className="2xl:text-sm text-xs font-medium text-muted-foreground">
                  Total Bookings
                </CardTitle>
                <div className="flex items-baseline">
                  <span className="text-xl sm:text-2xl font-bold">1200</span>
                  <span className={cn(" text-xs font-medium text-green-500",direction === "rtl"?"mr-2":"ml-2")}>
                    +12 <span>vs last Month</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                    >
                      Monthly <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Daily</DropdownMenuItem>
                    <DropdownMenuItem>Weekly</DropdownMenuItem>
                    <DropdownMenuItem>Monthly</DropdownMenuItem>
                    <DropdownMenuItem>Yearly</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                    >
                      All Bookings <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Bookings</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="h-[250px] sm:h-[300px]">
                <Line data={data} options={option} />
              </div>
            </CardContent>
          </Card>
  )
}

export default UserLineChart