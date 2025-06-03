"use client";

import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import HomeIcon from "@/public/images/Dashboard-Main-Icon.png";
import UserPieChart from "@/components/user-pie-chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { ChevronDown, CircleCheck, Edit2, MoreVertical, Trash2 } from "lucide-react";

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
import { useRouter } from "next/navigation";

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
    createdAt: "2024-01-15T10:30:00Z", // 5 days ago (New)
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
    createdAt: "2024-01-14T09:15:00Z", // 6 days ago (New)
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
    createdAt: "2023-12-10T16:20:00Z", // 41 days ago (Old)
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
    createdAt: "2024-01-12T11:45:00Z", // 8 days ago (New)
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
    createdAt: "2023-11-15T14:30:00Z", // 66 days ago (Old)
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
    createdAt: "2024-01-10T08:45:00Z", // 10 days ago (New)
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
    createdAt: "2023-10-20T12:00:00Z", // 92 days ago (Old)
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
    createdAt: "2024-01-08T14:20:00Z", // 12 days ago (New)
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
    createdAt: "2023-09-15T09:30:00Z", // 127 days ago (Old)
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
    createdAt: "2024-01-05T16:45:00Z", // 15 days ago (New)
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
    createdAt: "2023-08-10T11:15:00Z", // 163 days ago (Old)
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
    createdAt: "2024-01-03T13:20:00Z", // 17 days ago (New)
    lastLogin: "2024-01-20T12:45:00Z",
    role: "Customer",
    location: "Jacksonville, FL",
  },
]
export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("weekly")

  // Function to determine if user is new or old based on creation date and timeframe
  const categorizeUsers = (timeframe) => {
    const now = new Date("2024-01-20T18:00:00Z") // Current date for calculation
    let cutoffDate

    // Define cutoff dates for each timeframe
    switch (timeframe) {
      case "weekly":
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
        break
      case "monthly":
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
        break
      case "yearly":
        cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000) // 365 days ago
        break
      default:
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    const newUsers = usersData.filter((user) => new Date(user.createdAt) > cutoffDate)
    const oldUsers = usersData.filter((user) => new Date(user.createdAt) <= cutoffDate)

    return { newUsers, oldUsers }
  }

  // Calculate analytics data based on actual user data
  const analyticsData = useMemo(() => {
    const { newUsers, oldUsers } = categorizeUsers(timeframe)
    const totalUsers = newUsers.length + oldUsers.length

    // Calculate previous period for growth comparison
    const getPreviousPeriodGrowth = () => {
      const now = new Date("2024-01-20T18:00:00Z")
      let previousCutoffStart
      let previousCutoffEnd

      switch (timeframe) {
        case "weekly":
          previousCutoffStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
          previousCutoffEnd = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
          break
        case "monthly":
          previousCutoffStart = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
          previousCutoffEnd = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
          break
        case "yearly":
          previousCutoffStart = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000) // 730 days ago
          previousCutoffEnd = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000) // 365 days ago
          break
        default:
          previousCutoffStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
          previousCutoffEnd = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      }

      const previousPeriodUsers = usersData.filter((user) => {
        const createdDate = new Date(user.createdAt)
        return createdDate > previousCutoffStart && createdDate <= previousCutoffEnd
      })

      return newUsers.length - previousPeriodUsers.length
    }

    const change = getPreviousPeriodGrowth()

    return {
      totalUsers,
      change,
      newUsers,
      oldUsers,
      chartData: [
        {
          name: "New customer",
          value: newUsers.length,
          color: "#6366f1",
          percentage: totalUsers > 0 ? (newUsers.length / totalUsers) * 100 : 0,
        },
        {
          name: "Old Customers",
          value: oldUsers.length,
          color: "#f97316",
          percentage: totalUsers > 0 ? (oldUsers.length / totalUsers) * 100 : 0,
        },
      ],
    }
  }, [timeframe])
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
  // const newUsers = [
  //   {
  //     id: 1,
  //     name: "Arlene McCoy",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "Eleanor Pena",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     status: "Active",
  //   },
  // ];
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
  // Get timeframe label for display
  const getTimeframeLabel = (timeframe) => {
    switch (timeframe) {
      case "weekly":
        return "week"
      case "monthly":
        return "month"
      case "yearly":
        return "year"
      default:
        return "week"
    }
  }
const newUsersValue = categorizeUsers(timeframe).newUsers.map((user) => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    status: user.isActive ? "Active" : "Inactive",
  }));

  return (
    <div className="2xl:p-6 p-4">
      {activeSection === "dashboard" && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <Image src={HomeIcon} className="2xl:h-12 h-8 w-8 2xl:w-12" alt="Home Icon" />
            <div>
              <h1 className="2xl:text-lg text-sm font-semibold">Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                Lorem ipsum management
              </p>
            </div>
          </div>
          <DashboardDetails stats={stats} value={"dashboard"}/>
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
                <CardTitle className="2xl:text-sm text-xs font-medium">
                  Service Provider
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-600 h-7 px-2"
                  onClick={() => router.push("/service-provider")}
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
                      <span className="2xl:text-sm text-xs">{provider.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Doughnut Chart */}
             <div className="bg-white rounded-lg border h-[400px] border-gray-200 p-6 2xl:w-[400px] w-[300px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="2xl:text-sm text-xs text-gray-500 mb-1">New Users</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold">{analyticsData.totalUsers}</span>
              <span className={`2xl:text-sm text-xs font-medium ${analyticsData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {analyticsData.change >= 0 ? "+" : ""}
                {analyticsData.change} vs last {getTimeframeLabel(timeframe)}
              </span>
            </div>
          </div>
          <Select value={timeframe} onValueChange={(value) => setTimeframe(value)}>
            <SelectTrigger className="2xl:!w-[30%] !w-[40%] border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <UserPieChart data={analyticsData.chartData} centerValue={analyticsData.totalUsers} key={timeframe} />

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4">
            {analyticsData.chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="2xl:text-sm text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

            {/* New Users List */}
            <Card className="lg:col-span-2 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <CardTitle className="2xl:text-sm text-xs font-medium">New Users</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-600 h-7 px-2"
                  onClick={() => router.push("/users")}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-4">
                  {newUsersValue.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 w-[45%]">
                        <Avatar>
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                          />
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium 2xl:text-sm text-xs">
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
                        <Badge
                          variant="outline"
                          className="rounded-lg text-xs font-normal"
                        >
                              <CircleCheck color="white" className="fill-[#1FC16B] mr-1"/>
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
            <p className="2xl:text-sm text-xs text-muted-foreground">
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
    </div>
  );
}
