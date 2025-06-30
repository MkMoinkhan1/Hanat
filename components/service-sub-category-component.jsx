"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddVariantDialog } from "@/components/add-verient-dialog";
import DashboardDetails from "@/components/dashboard-details";
import { useTranslations } from "next-intl";

const SubCategoryComponent = ({ params, activePage }) => {
  const router = useRouter();
  const { locale, categoryid, id } = useParams();
  const t = useTranslations("ServiceManagement.SubCategoriesPage");
  const stats = [
    {
      label: t("totalRevenue"),
      value: "$ 45,904",
      change: "-8%",
      note: t("vsLastWeek"),
      changeType: "negative",
    },
    {
      label: t("overallRating"),
      value: "4.3",
      change: `(45 ${t("reviews")})`,
      changeType: "neutral",
    },
    {
      label: t("providerEarnings"),
      value: "$ 145,674",
      change: "+12%",
      note: t("vsLastWeek"),
      changeType: "positive",
    },
    {
      label: t("platformCommission"),
      value: "$ 1200",
      change: "+12%",
      note: t("vsLastWeek"),
      changeType: "positive",
    },
  ];
  const direction = locale === "ar" ? "rtl" : "ltr";
  const categoryId = id;
  const isNewCategory = categoryId === "new";
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "edit-category";

  const [isAddVariantOpen, setIsAddVariantOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);

  const [subcategoryForm, setSubcategoryForm] = useState({
    name: "",
    description: "",
  });
  const [variants, setVariants] = useState([
    { type: "multiple-choice", options: ["2-Seater Sofa", "3-Seater Sofa"] },
  ]);

  const handleAddVariant = (newVariant) => {
    setVariants([newVariant]);
    setIsAddVariantOpen(false);
  };
  useEffect(() => {}, [variants]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubcategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (value) => {
    if (value === activeTab) return;

    setLoading(true);
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set("tab", value);
    router.push(
      `/${locale}/admin/service-management/edit-service/${id}/category/${categoryid}?${newParams.toString()}`
    );

    setTimeout(() => {
      setActiveTab(value);
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    if (defaultTab === "edit-category") {
      const categoryUrl = `/admin/service-management/edit-service/${id}/category/${categoryid}`;
      router.replace(categoryUrl);
    } else {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);
  return (
    <div>
      {/* Header */}

      {activePage === "service-provider" ? (
        ""
      ) : (
        <div className="flex items-center gap-4 bg-white px-6 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.back()}
          >
            {direction === "rtl" ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
          <div>
            <h1 className="2xl:text-lg text-sm font-semibold">
              {t("serviceManagement")}
            </h1>
            <p className="2xl:text-sm text-xs text-muted-foreground">
              {t("managementNote")}
            </p>
          </div>
        </div>
      )}
      {/* Tabs */}
      <div className="border-b bg-white">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className={`w-full ${
            direction === "rtl" ? "flex justify-end items-center" : "text-left"
          }`}
        >
          <TabsList className="h-auto bg-transparent p-0">
            <TabsTrigger
              value="edit-category"
              className="!rounded-none border-b-2 border-transparent px-8 py-3 2xl:text-sm text-xs font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:bg-gray-100"
            >
              {isNewCategory ? t("addCategory") : t("editCategory")}
            </TabsTrigger>
            <TabsTrigger
              value="sub-category"
              className="!rounded-none border-b-2 border-transparent px-8 py-3 2xl:text-sm text-xs font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:bg-gray-100"
            >
              {t("subCategory")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="p-6 flex items-center justify-center h-40">
            <span className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-gray-900"></span>
          </div>
        ) : activeTab !== "edit-category" ? (
          <div className="p-6">
            <DashboardDetails stats={stats} />
            <h2 className="text-base font-medium mb-4">
              {t("subCategoryList")}
            </h2>
            <div className="space-y-4 p-4">
              <div>
                <label
                  htmlFor="subcategoryName"
                  className="block  2xl:text-sm text-xs  font-medium mb-1"
                >
                  {t("subCategoryName")}
                </label>
                <Input
                  id="subcategoryName"
                  name="name"
                  value={subcategoryForm.name}
                  onChange={handleInputChange}
                  placeholder={t("subcategoryPlaceholder")}
                  className="h-10 max-w-md"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block  2xl:text-sm text-xs  font-medium mb-1"
                >
                  {t("description")}
                </label>
                <Input
                  id="description"
                  name="description"
                  value={subcategoryForm.description}
                  onChange={handleInputChange}
                  placeholder={t("descriptionPlaceholder")}
                  className="h-10 w-full"
                />
              </div>

              <div className="mt-8">
                <h3 className=" 2xl:text-sm text-xs  font-medium mb-2">
                  {t("addVariant")}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {variants.map((variant, index) => (
                    <div key={index} className="flex gap-1">
                      {variant.options.map((option, i) => (
                        <div
                          key={i}
                          className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 h-8 text-xs"
                  onClick={() => setIsAddVariantOpen(true)}
                >
                  <Plus className="h-3 w-3" />
                  {t("editCustomField")}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6"></div>
        )}
      </div>

      <AddVariantDialog
        open={isAddVariantOpen}
        onOpenChange={setIsAddVariantOpen}
        initialVariants={variants}
        onSave={handleAddVariant}
      />
    </div>
  );
};

export default SubCategoryComponent;
