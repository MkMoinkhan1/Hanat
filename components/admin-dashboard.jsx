"use client";

import { useMemo, useState } from "react";
import HomeIcon from "@/public/images/Dashboard-Main-Icon.png";
import UserPieChart from "@/components/user-pie-chart";
import NewUserList from "@/components/new-user-list";
import UserLineChart from "@/components/line-chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardDetails from "@/components/dashboard-details";
import Image from "next/image";
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from "next/navigation";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const usersData = [
  {
    id: 1,
    name: "Abdul Khalid Bagdadee",
    email: "arlene.mccoy@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: "2024-01-20T14:22:00Z",
    role: "Customer",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Eleanor Pena",
    email: "eleanor.pena@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2024-01-14T09:15:00Z",
    lastLogin: "2024-01-20T11:45:00Z",
    role: "Customer",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    name: "Wade Warren",
    email: "wade.warren@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2023-12-10T16:20:00Z",
    lastLogin: "2024-01-19T13:30:00Z",
    role: "Customer",
    location: "Chicago, IL",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: false,
    createdAt: "2024-01-12T11:45:00Z",
    lastLogin: "2024-01-18T09:15:00Z",
    role: "Customer",
    location: "Houston, TX",
  },
  {
    id: 5,
    name: "Robert Fox",
    email: "robert.fox@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2023-11-15T14:30:00Z",
    lastLogin: "2024-01-20T16:20:00Z",
    role: "Customer",
    location: "Phoenix, AZ",
  },
  {
    id: 6,
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2024-01-10T08:45:00Z",
    lastLogin: "2024-01-19T12:10:00Z",
    role: "Customer",
    location: "Philadelphia, PA",
  },
  {
    id: 7,
    name: "Devon Lane",
    email: "devon.lane@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2023-10-20T12:00:00Z",
    lastLogin: "2024-01-19T15:30:00Z",
    role: "Customer",
    location: "San Antonio, TX",
  },
  {
    id: 8,
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2024-01-08T14:20:00Z",
    lastLogin: "2024-01-20T10:15:00Z",
    role: "Customer",
    location: "San Diego, CA",
  },
  {
    id: 9,
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2023-09-15T09:30:00Z",
    lastLogin: "2024-01-18T11:45:00Z",
    role: "Customer",
    location: "Dallas, TX",
  },
  {
    id: 10,
    name: "Floyd Miles",
    email: "floyd.miles@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: false,
    createdAt: "2024-01-05T16:45:00Z",
    lastLogin: "2024-01-17T14:20:00Z",
    role: "Customer",
    location: "San Jose, CA",
  },
  {
    id: 11,
    name: "Savannah Nguyen",
    email: "savannah.nguyen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2023-08-10T11:15:00Z",
    lastLogin: "2024-01-19T09:30:00Z",
    role: "Customer",
    location: "Austin, TX",
  },
  {
    id: 12,
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    createdAt: "2024-01-03T13:20:00Z",
    lastLogin: "2024-01-20T12:45:00Z",
    role: "Customer",
    location: "Jacksonville, FL",
  },
];

export default function AdminDashboard() {
  const t = useTranslations('HomePage')
  const td = useTranslations('DashboardDetails');
  const {locale} = useParams();
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("weekly");

  const categorizeUsers = (timeframe) => {
    const now = new Date("2024-01-20T18:00:00Z");
    let cutoffDate;

    switch (timeframe) {
      case "weekly":
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "monthly":
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "yearly":
        cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const newUsers = usersData.filter(
      (user) => new Date(user.createdAt) > cutoffDate
    );
    const oldUsers = usersData.filter(
      (user) => new Date(user.createdAt) <= cutoffDate
    );

    return { newUsers, oldUsers };
  };

  const analyticsData = useMemo(() => {
    const { newUsers, oldUsers } = categorizeUsers(timeframe);
    const totalUsers = newUsers.length + oldUsers.length;

    const getPreviousPeriodGrowth = () => {
      const now = new Date("2024-01-20T18:00:00Z");
      let previousCutoffStart;
      let previousCutoffEnd;

      switch (timeframe) {
        case "weekly":
          previousCutoffStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
          previousCutoffEnd = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "monthly":
          previousCutoffStart = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
          previousCutoffEnd = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "yearly":
          previousCutoffStart = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
          previousCutoffEnd = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          previousCutoffStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
          previousCutoffEnd = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      }

      const previousPeriodUsers = usersData.filter((user) => {
        const createdDate = new Date(user.createdAt);
        return (
          createdDate > previousCutoffStart && createdDate <= previousCutoffEnd
        );
      });

      return newUsers.length - previousPeriodUsers.length;
    };

    const change = getPreviousPeriodGrowth();

    return {
      totalUsers,
      change,
      newUsers,
      oldUsers,
      chartData: [
        {
          name: t("new_customers"),
          value: newUsers.length,
          color: "#6366f1",
          percentage: totalUsers > 0 ? (newUsers.length / totalUsers) * 100 : 0,
        },
        {
          name: t("old_customers"),
          value: oldUsers.length,
          color: "#f97316",
          percentage: totalUsers > 0 ? (oldUsers.length / totalUsers) * 100 : 0,
        },
      ],
    };
  }, [timeframe]);

  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [20, 35, 45, 40, 35, 40, 50, 45, 35, 40, 45, 60],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.05)",
        tension: 0.4,
        pointBackgroundColor: "#4F46E5",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        fill: false,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1E293B",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: false,
        padding: 10,
        cornerRadius: 4,
        callbacks: {
          title: () => "8:08 PM, 2022",
          label: (context) => `$${context.raw}`,
          afterLabel: () => "$88k",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 10,
          },
          stepSize: 20,
          max: 80,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  const serviceProviders = [
    { name: "Acme Co.", color: "#1E40AF" },
    { name: "Barone LLC.", color: "#EF4444" },
    { name: "Alstergo Ltd", color: "#10B981" },
    { name: "Biffco Enterprises Ltd", color: "#06B6D4" },
    { name: "Binford Ltd", color: "#000000" },
    { name: "Lama Ltd", color: "#000000" },
  ];

  const stats = [
  {
    label: td("totalBookings.label"),
    value: "1200",
    change: "+12",
    note: td("totalBookings.note"),
    changeType: "positive",
  },
  {
    label: td("totalRevenue.label"),
    value: "$45,094",
    change: "-8%",
    note: td("totalRevenue.note"),
    changeType: "negative",
  },
  {
    label: td("commissionHanat.label"),
    value: "$1200",
    change: "+12%",
    note: td("commissionHanat.note"),
    changeType: "positive",
  },
  {
    label: td("mostSelectedSubCategory.label"),
    value: "120",
    change: "+12",
    note: td("mostSelectedSubCategory.note"),
    changeType: "positive",
  },
  {
    label: td("mostSelectedOptionalExtras.label"),
    value: "28",
    note: td("mostSelectedOptionalExtras.note"),
    changeType: "neutral",
  },
]

  const getTimeframeLabel = (timeframe) => {
    switch (timeframe) {
      case "weekly":
        return "week";
      case "monthly":
        return "month";
      case "yearly":
        return "year";
      default:
        return "week";
    }
  };

  const newUsersValue = categorizeUsers(timeframe).newUsers.map((user) => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    status: user.isActive ? "Active" : "Inactive",
  }));
  
  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        <div className="flex gap-4">
          <Image
            src={HomeIcon}
            className="h-8 w-8 sm:h-10 sm:w-10"
            alt="Home Icon"
          />
          <div>
            <h1 className="2xl:text-lg text-sm font-semibold">{t("title")}</h1>
            <p className="text-xs text-muted-foreground">
             {t("about")}
            </p>
          </div>
        </div>

        <DashboardDetails stats={stats} value={"dashboard"} />

        {/* Top Charts Section */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Line Chart */}
        <UserLineChart data={lineChartData} option={lineChartOptions}/>

          {/* Service Providers */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-xs sm:text-sm font-medium">
                {t('service_provider')}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-blue-600 h-7 px-2"
                onClick={() => router.push(`/${locale}/admin/service-provider`)}
              >
                {t('view_all')}
              </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-4">
                {serviceProviders.map((provider, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="h-6 w-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: provider.color }}
                    >
                      {index < 2 && (
                        <span className="text-white text-xs font-bold">
                          {provider.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <span className="2xl:text-sm text-xs">
                      {provider.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Pie Chart and New Users */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Pie Chart - Full width below lg, 30% above */}
          <div className="w-full xl:w-[30%] ">
            <Card className="overflow-hidden h-full ">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <div>
                  <CardTitle className="2xl:text-sm text-xs text-muted-foreground mb-1">
                    {t('new_user')}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">
                      {analyticsData.totalUsers}
                    </span>
                    <span
                      className={`2xl:text-sm text-xs font-medium ${
                        analyticsData.change >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {analyticsData.change >= 0 ? "+" : ""}
                      {analyticsData.change} vs last{" "}
                      {getTimeframeLabel(timeframe)}
                    </span>
                  </div>
                </div>
                <Select
                  value={timeframe}
                  onValueChange={(value) => setTimeframe(value)}
                >
                  <SelectTrigger className="w-[100px] sm:w-[120px] border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">{t('weekly')}</SelectItem>
                    <SelectItem value="monthly">{t('monthly')}</SelectItem>
                    <SelectItem value="yearly">{t('yearly')}</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex flex-col items-center">
                  <div className="h-[200px] w-full flex justify-center">
                    <UserPieChart
                      data={analyticsData.chartData}
                      centerValue={analyticsData.totalUsers}
                      key={timeframe}
                    />
                  </div>
                  <div className="flex items-center gap-6 mt-4">
                    {analyticsData.chartData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="2xl:text-sm text-xs text-gray-600">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Users List - Full width below lg, 70% above */}
          <div className="w-full xl:w-[70%] ">
            <NewUserList newUserData={newUsersValue} />
          </div>
        </div>
      </div>
    </div>
  );
}