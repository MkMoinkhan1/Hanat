"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Truck, Settings, FileText, Calendar, Ticket, ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHoverOpen, setIsHoverOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  // Set mounted state to handle client-side only features
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Service Provider",
      href: "/service-provider",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "Service Management",
      href: "/service-management",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Booking Management",
      href: "/booking-management",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Feedback Forms",
      href: "/feedback-forms",
      icon: <FileText className="h-5 w-5" />,
    },
  ]

  const otherNavItems = [
    {
      title: "Tickets",
      href: "/tickets",
      icon: <Ticket className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "relative flex flex-col border-r bg-background transition-all duration-300",
          isCollapsed ? "w-[60px]" : "w-[220px]",
          isHoverOpen && isCollapsed ? "group-hover:w-[220px]" : "",
        )}
        onMouseEnter={() => isHoverOpen && setIsCollapsed(false)}
        onMouseLeave={() => isHoverOpen && setIsCollapsed(true)}
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center border-b px-3">
          <Link href="/" className={cn("flex items-center gap-2 font-semibold", isCollapsed && "justify-center")}>
            {isCollapsed ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                H
              </div>
            ) : (
              <>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  H
                </div>
                <span>Handit</span>
              </>
            )}
          </Link>
          <div className={cn("ml-auto", isCollapsed && "hidden")}>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-auto py-2">
          {/* Main Navigation */}
          <div className="px-3 py-2">
            <h2 className={cn("mb-2 text-xs font-semibold text-muted-foreground", isCollapsed && "text-center")}>
              {!isCollapsed && "MAIN"}
            </h2>
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                    isCollapsed && "justify-center px-0",
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Other Navigation */}
          <div className="px-3 py-2">
            <h2 className={cn("mb-2 text-xs font-semibold text-muted-foreground", isCollapsed && "text-center")}>
              {!isCollapsed && "OTHER"}
            </h2>
            <nav className="space-y-1">
              {otherNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                    isCollapsed && "justify-center px-0",
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t p-3">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <span className="text-xs font-medium">SS</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">Slim Shady</span>
                <span className="text-xs text-muted-foreground">shady@handit.com</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-3 top-3 hidden md:flex"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Button variant="outline" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-4 w-4" />
            
          </Button>
          <div className="w-full flex-1">
            <nav className="flex items-center space-x-2">
              <Link href="/" className="text-sm font-medium">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Dashboard</span>
            </nav>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          {isMounted && (
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <Switch id="hover-open" checked={isHoverOpen} onCheckedChange={setIsHoverOpen} />
                <label htmlFor="hover-open" className="text-sm font-medium">
                  Hover Open
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="disable-sidebar" checked={isCollapsed} onCheckedChange={setIsCollapsed} />
                <label htmlFor="disable-sidebar" className="text-sm font-medium">
                  Disable Sidebar
                </label>
              </div>
            </div>
          )}
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your dashboard.</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Sidebar
