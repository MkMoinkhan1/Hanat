


"use client";

import { useState } from "react";
import { useParams } from "next/navigation"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {  Search, Filter, PenSquare, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";

import serviceManagementIcon from "@/public/images/Service-Management-Icon.png";
import editIcon from "@/public/images/Edit-icon.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

const services = [
  {
    id: "1",
    title: "Cleaning",
    description: "Concealed & Conduit Internal Wiring for a new connection",
    category: [
      {
        id: "as12sa21",
        categoryname: "Furniture",
        categoryDesc: "Lorem ipsum dolor sit",
        subcategories: [
          {
            id: 121332,
            subcategory: "Sofa",
            services: {
              type: "multiple-choice",
              options: ["2-Seater Sofa", "3-Seater Sofa"],
            },
          },
          {
            id: 121987,
            subcategory: "Dining Table",
            services: {
              type: "multiple-choice",
              options: ["4-Seater Dining Table", "6-Seater Dining Table"],
            },
          },
          {
            id: 121564,
            subcategory: "Mattress",
            services: {
              type: "multiple-choice",
              options: ["Single", "Double", "Queen", "King"],
            },
          },
        ],
      },
    ],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    title: "Wiring",
    description: "Concealed & Conduit Internal Wiring for a new connection",
    category: [
      {
        id: "elct98x",
        categoryname: "Electrician",
        categoryDesc: "Electrical fittings and installations",
        subcategories: [
          {
            id: 223344,
            subcategory: "Switch Board",
            services: {
              type: "multiple-choice",
              options: ["2 Switches", "4 Switches", "8 Switches"],
            },
          },
          {
            id: 223355,
            subcategory: "Ceiling Fan Installation",
            services: {
              type: "multiple-choice",
              options: ["Standard", "With Regulator", "With Rod"],
            },
          },
        ],
      },
    ],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    title: "Internet",
    description: "Concealed & Conduit Internal Wiring for a new connection",
    category: [
      {
        id: "netx88y",
        categoryname: "Internet",
        categoryDesc: "Wi-Fi & broadband installation services",
        subcategories: [
          {
            id: 334455,
            subcategory: "Wi-Fi Router Setup",
            services: {
              type: "multiple-choice",
              options: ["Single Band", "Dual Band", "Mesh Setup"],
            },
          },
          {
            id: 334466,
            subcategory: "Cable Management",
            services: {
              type: "multiple-choice",
              options: ["Basic Routing", "Concealed Wiring"],
            },
          },
        ],
      },
    ],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    title: "Home Cleaning",
    description: "Concealed & Conduit Internal Wiring for a new connection",
    category: [
      {
        id: "clean789z",
        categoryname: "Cleaning",
        categoryDesc: "Deep home and kitchen cleaning",
        subcategories: [
          {
            id: 445566,
            subcategory: "Kitchen Cleaning",
            services: {
              type: "multiple-choice",
              options: ["Basic", "Deep Clean", "Appliance Cleaning"],
            },
          },
          {
            id: 445577,
            subcategory: "Bathroom Cleaning",
            services: {
              type: "multiple-choice",
              options: ["Floor Only", "Complete Bathroom", "Tiles & Fittings"],
            },
          },
        ],
      },
    ],
    image: "/placeholder.svg?height=80&width=80",
  },
];

export default function ServiceManagementPage() {
  const {locale}= useParams()
  const t = useTranslations("ServiceManagement");
  const direction = locale === "ar" ? "rtl" : "ltr";
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter services based on search query and status
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || service.category === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <div className="flex flex-col h-full">
          <header className="border-b 2xl:p-6 p-4 space-y-6">
            <div className="flex gap-4 justify-between items-center">
             <div className="flex gap-4">
               <Image
                src={serviceManagementIcon}
                className="2xl:h-12 h-10 w-10 2xl:w-12 border border-r-2 rounded-full p-2"
                alt="Service Icon"
              />
              <div >
                <h1 className="2xl:text-lg text-sm font-semibold">
                  {t('title')}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {t('description')}
                </p>
              </div>
             </div>
                    <Link href={`/${locale}/admin/service-management/add-service`}>
                  <Button className="2xl:text-sm text-xs">
                    <Plus className="mr-2 2xl:h-4 2xl:w-4 w-2 h-2 " />
                    {t('addService')}
                  </Button>
                </Link>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  className="pl-10 w-[19rem] 2xl:text-sm text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="2xl:text-sm text-xs">
                      {t('allStatus')}
                    </SelectItem>
                    <SelectItem
                      value="Internet"
                      className="2xl:text-sm text-xs"
                    >
                      {t('internet')}
                    </SelectItem>
                    <SelectItem
                      value="Electrician"
                      className="2xl:text-sm text-xs"
                    >
                     {t('electrician')}
                    </SelectItem>
                    <SelectItem
                      value="Cleaning"
                      className="2xl:text-sm text-xs"
                    >
                      {t('cleaning')}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="2l:text-sm text-xs ">
                  <Filter className="2xl:h-4 2xl:w-4 w-2 h-2 " />
                  {t('filter')}
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      <div className="h-[100px] w-[100px] flex-shrink-0  rounded-lg">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover rounded-lg p-3"
                        />
                      </div>
                      <div className="flex-1 p-4 items-center">
                        <div className="flex items-center justify-between">
                          <h3 className="2xl:text-lg text-sm font-semibold">
                            {service.title}
                          </h3>
                        </div>
                        <p className="mt-1 2xl:text-sm text-xs text-muted-foreground">
                          {service.description}
                        </p>
                        {
                          service?.category.map((cat)=>(
                                 <Badge key={cat.id}
                          variant="outline"
                          className="mt-2 rounded-sm bg-[#F4F4F4] text-muted-foreground 2xl:text-sm text-xs"
                        >
                          {cat.categoryname}
                        </Badge> 
                          ))
                        }
                       
                      </div>
                      <Link
                        href={`/${locale}/admin/service-management/edit-service/${service.id}`}
                      >
                        <Button size="sm" className={`text-xs 2xl:text-sm ${direction==="rtl"?"ml-5":""} `}>
                          <Image
                            src={editIcon}
                            width={15}
                            height={15}
                            alt="edit icon"
                            className="2xl:w-4 2xl:h-4 h-3 w-3"
                          />
                          {t('edit')}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
          <footer className="border-t p-4 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {
                  direction === "rtl" ? (
                                  <ChevronRight className="w-4 h-4" />
                  ):(              <ChevronLeft className="w-4 h-4" />
)
                }
              </Button>
              <span className="text-sm">{t('page') + "  1"  }</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                       {
                         direction === "rtl" ? (
                           <ChevronLeft className="w-4 h-4" />
                          ):(              
                            <ChevronRight className="w-4 h-4" />
)
                }
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
