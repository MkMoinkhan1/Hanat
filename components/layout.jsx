"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import homeLogo from "@/public/images/mainlogo.png";
import hamburgerIcon from "@/public/images/Compact-button.png";
import dashboardIcon from "@/public/images/Dashboard-Icon.png";
import usersIcon from "@/public/images/Users-Icon.png";
import serviceProviderIcon from "@/public/images/Service-Provider-Icon.png";
import serviceManagementIcon from "@/public/images/Service-Management-Icon.png";
import bookingManagementIcon from "@/public/images/Booking_management-Icon.png";
import feedbackIcon from "@/public/images/Feedback-Icon.png";
import ticketIcon from "@/public/images/Ticket-Icon.png";
import settingIcon from "@/public/images/Setting-Icon.png";
import logoutIcon from "@/public/images/logout.png";
import { ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Layout = ({ children, token }) => {
  const t = useTranslations("SideBar");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [direction, setDirection] = useState("rtl");
  const pathname = usePathname();
  const params = useParams()
  
  const { locale } = params
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDirection(document?.documentElement?.dir || "ltr");
    }
  }, []);


const mainNavItems = [
  { title: t('dashboard'), href: `/${locale}/admin/dashboard`, icon: dashboardIcon },
  { title: t('users'), href: `/${locale}/admin/users`, icon: usersIcon },
  { title: t('serviceProvider'), href: `/${locale}/admin/service-provider`, icon: serviceProviderIcon },
  { title: t('serviceManagement'), href: `/${locale}/admin/service-management`, icon: serviceManagementIcon },
  { title: t('bookingManagement'), href: `/${locale}/admin/booking-management`, icon: bookingManagementIcon },
  { title: t('feedbackForms'), href: `/${locale}/admin/feedback-forms`, icon: feedbackIcon },
];

const otherNavItems = [
  { title: t('tickets'), href: `/${locale}/admin/tickets`, icon: ticketIcon },
  { title: t('settings'), href: `/${locale}/admin/settings`, icon: settingIcon },
];
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const isActiveLink = (href) => {
    if (href === `/${locale}/admin/dashboard` && pathname === "/") return true;
    return pathname === href || pathname.startsWith(`/${locale}${href}/`);
  };

  const removeCookies = () => {
    document.cookie = 'auth-token=; Max-Age=0; path=/;';
    window.location.href = `/${locale}/auth/login`;
  };

  return (
    <div className="flex h-screen">
      <div className={cn("relative flex flex-col border-r bg-background transition-all duration-300", isCollapsed ? "w-[80px]" : "w-[250px]")}> 
        <div className="flex h-16 items-center border-b px-4">
          <Link href={`/${locale}/admin/dashboard`} className={cn("flex items-center gap-2 font-semibold", isCollapsed && "justify-center")}> 
            {!isCollapsed && (
              <span className="text-lg">
                <Image src={homeLogo} alt="Home Logo" className="2xl:h-10 h-8 w-full" />
              </span>
            )}
          </Link>
          <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "ml-auto")}> 
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-9 w-9">
              <Image src={hamburgerIcon} alt="Hamburger icon" className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto py-2 flex flex-col justify-between">
          <div className="px-3 py-2">
            <h2 className={cn("mb-2 text-xs font-semibold text-muted-foreground", isCollapsed && "text-center")}>{!isCollapsed && t('main')}</h2>
            <nav className="space-y-1">
              {mainNavItems.map((item, index) => {
                const isActive = isActiveLink(item.href);
                return (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <Link key={item.href} href={item.href} className={cn(
                            "relative flex items-center gap-3 rounded-md px-3 py-2.5 2xl:text-sm text-xs font-medium hover:bg-accent hover:text-accent-foreground",
                            isActive ? "bg-accent text-accent-foreground" : "transparent",
                            isCollapsed ? "justify-center px-2" : "px-3"
                          )}>
                            <div className={cn("h-5 w-5")}> <Image src={item.icon} alt={`${item.title} icon`} className="h-full w-full" /> </div>
                            {!isCollapsed && <span>{item.title}</span>}
                            {isActive && !isCollapsed && (
                              <ChevronRight className={cn("h-4 w-4", direction === "rtl" ? "mr-auto rotate-180" : "ml-auto")} />
                            )}
                            {isActive && (
                              <span className={cn("absolute h-6 w-1 bg-black", direction === "rtl" ? "right-0 rounded-l" : "left-0 rounded-r")} />
                            )}
                          </Link>
                        </span>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </nav>
          </div>

          <div className="px-3 py-2">
            <h2 className={cn("mb-2 text-xs font-semibold text-muted-foreground", isCollapsed && "text-center")}>{!isCollapsed && t('other')}</h2>
            <nav className="space-y-1">
              {otherNavItems.map((item, index) => {
                const isActive = isActiveLink(item.href);
                return (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link key={item.href} href={item.href} className={cn(
                          "relative flex items-center gap-3 rounded-md px-3 py-2.5 2xl:text-sm text-xs font-medium hover:bg-accent hover:text-accent-foreground",
                          isActive ? "bg-accent text-accent-foreground" : "transparent",
                          isCollapsed ? "justify-center px-2" : "px-3"
                        )}>
                          <div className={cn("h-5 w-5")}> <Image src={item.icon} alt={`${item.title} icon`} className="h-full w-full" /> </div>
                          {!isCollapsed && <span>{item.title}</span>}
                          {isActive && !isCollapsed && (
                            <ChevronRight className={cn("h-4 w-4", direction === "rtl" ? "mr-auto rotate-180" : "ml-auto")} />
                          )}
                          {isActive && (
                            <span className={cn("absolute h-6 w-1 bg-black", direction === "rtl" ? "right-0 rounded-l" : "left-0 rounded-r")} />
                          )}
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="border-t p-4">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  <span className="text-xs font-medium">SS</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <span className="text-xs font-medium">SS</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="2xl:text-sm text-xs font-medium">Slim Shady</span>
                    <span className="text-xs text-muted-foreground">shady@handit.com</span>
                  </div>
                </div>
                <Image src={logoutIcon} alt="Logout Icon" className="h-5 w-5 ml-auto cursor-pointer" onClick={removeCookies} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
