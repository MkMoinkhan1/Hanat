"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import HomeIcon from "@/public/icon.png";
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
import { Doughnut } from "react-chartjs-2";
import { ChevronDown, Edit2, MoreVertical, Trash2 } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import DashboardDetails from "@/components/dashboard-details";
import Image from "next/image";

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

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Line chart data
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

  // Doughnut chart data
  const doughnutData = {
    labels: ["New customer", "Old Customers"],
    datasets: [
      {
        data: [48, 52],
        backgroundColor: ["#4F46E5", "#F97316"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
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
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  // Service providers data
  const serviceProviders = [
    { name: "Acme Co.", color: "#1E40AF" },
    { name: "Barone LLC.", color: "#EF4444" },
    { name: "Alstergo Ltd", color: "#10B981" },
    { name: "Biffco Enterprises Ltd", color: "#06B6D4" },
    { name: "Binford Ltd", color: "#000000" },
    { name: "Lama Ltd", color: "#000000" },
  ];

  // New users data
  const newUsers = [
    {
      id: 1,
      name: "Arlene McCoy",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 2,
      name: "Eleanor Pena",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
  ];
  const stats = [
    {
      label: "Total Bookings",
      value: "1200",
      change: "+12",
      note: "vs last week",
      changeType: "positive",
    },
    {
      label: "Total Revenue",
      value: "$45,904",
      change: "-8%",
      note: "vs last week",
      changeType: "negative",
    },
    {
      label: "Commission earned by Hanat",
      value: "$1200",
      change: "+12%",
      note: "vs last week",
      changeType: "positive",
    },
    {
      label: "Most selected sub category",
      value: "120",
      change: "+12",
      note: "vs last week",
      changeType: "positive",
    },
    {
      label: "Most selected optional extras",
      value: "28",
      note: "Requires attention",
      changeType: "neutral",
    },
  ];

  return (
    <div className="p-6">
      {activeSection === "dashboard" && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <Image src={HomeIcon} width={48} height={48} alt="Home Icon" />
            <div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                Lorem ipsum management
              </p>
            </div>
          </div>
          <DashboardDetails stats={stats} />
          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Line Chart */}
            <Card className="lg:col-span-2 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <div>
                  <CardTitle className="text-xs font-medium text-muted-foreground">
                    Total Bookings
                  </CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">1200</span>
                    <span className="ml-2 text-xs font-medium text-green-500">
                      +12 vs last Month
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
                <div className="h-[300px]">
                  <Line data={lineChartData} options={lineChartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Service Providers */}
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-medium">
                  Service Provider
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-600 h-7 px-2"
                >
                  View All
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
                      <span className="text-sm">{provider.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Doughnut Chart */}
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <div>
                  <CardTitle className="text-xs font-medium text-muted-foreground">
                    New Users
                  </CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">48</span>
                    <span className="ml-2 text-xs font-medium text-green-500">
                      +12 vs last week
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Weekly <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Daily</DropdownMenuItem>
                    <DropdownMenuItem>Weekly</DropdownMenuItem>
                    <DropdownMenuItem>Monthly</DropdownMenuItem>
                    <DropdownMenuItem>Yearly</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="h-[200px] relative">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold">48</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                    <span className="text-xs">New customer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    <span className="text-xs">Old Customers</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New Users List */}
            <Card className="lg:col-span-2 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-600 h-7 px-2"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-4">
                  {newUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                          />
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {user.name}
                            </span>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600 hover:bg-blue-50 text-xs font-normal"
                            >
                              New
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-600 hover:bg-green-50 rounded-full px-3 text-xs font-normal"
                        >
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-600 inline-block"></span>
                          Active
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeSection === "users" && (
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">User</h1>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum management
            </p>
          </div>
          <UsersTable />
        </div>
      )}

      {activeSection === "service-provider" && (
        <div>
          <h1 className="text-2xl font-semibold">Service Provider</h1>
          <p className="text-muted-foreground">Manage your service providers</p>

          {/* Service Provider content would go here */}
          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-4">
                  Service Provider Management
                </h2>
                <p>
                  This is the service provider section content. You can manage
                  all your service providers from here.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Add other sections as needed */}
    </div>
  );
}
