"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function InvoiceContent({ invoiceId }) {
  const router = useRouter();
  const { locale } = useParams();
  const t = useTranslations("ServiceProvider.Invoice");
  const direction = locale === "ar" ? "rtl" : "ltr";
  const invoice = {
    invoiceId: "INV-00123",
    companyName: "Acme Corp",
    companyEmail: "info@acme.com",
    companyPhone: "+1 987 987 8376",
    taxId: "84738294854",
    gstin: "768HAUY3456NSHJS",
    nric: "A2369756",
    client: "John Doe",
    date: "19-Feb-2025",
    services: [
      { description: "Cleaning", amount: 0 },
      { description: "Sofa Cleaning", amount: 0 },
      { description: "Car Cleaning", amount: 0 },
    ],
    discount: 0,
    tax: 0,
    totalAmount: 0,
    paymentDetails: {
      line1: t("paymentNote1"),
      line2: t("paymentNote2"),
    },
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="py-6 px-7 border-b border-gray-200">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 h-8 w-8 p-0"
            onClick={() => router.back()}
          >
            {direction === "rtl" ? (
              <ArrowRight className="h-4 w-4" />
            ) : (
              <ArrowLeft className="h-4 w-4" />
            )}
          </Button>
          <div>
            <p className="text-sm text-gray-500">{t("invoiceId")}</p>
            <h1 className="text-lg font-medium">{invoice.invoiceId}</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {invoice.companyName}
              </h1>
              <p className="text-gray-600">{t("subHeading")}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {invoice.companyPhone}
              </p>
              <p className="text-gray-600">{invoice.companyEmail}</p>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  {t("taxId")} : {invoice.taxId}
                </p>
                <p>
                  {t("gstin")} : {invoice.gstin}
                </p>
                <p>
                  {t("nric")} : {invoice.nric}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">{t("invoice")} : </span>
                <span className="font-medium">{invoice.invoiceId}</span>
              </div>
              <div>
                <span className="text-gray-600">{t("client")} : </span>
                <span className="font-medium">{invoice.client}</span>
              </div>
              <div>
                <span className="text-gray-600">{t("date")} : </span>
                <span className="font-medium">{invoice.date}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">
                  {t("description")} :
                </span>
                <span className="font-medium text-gray-900">
                  {t("subtotal")}:
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {invoice.services.map((service, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-gray-700">{service.description}</span>
                  <span className="text-gray-700">
                    $ {service.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">{t("discount")}</span>
                <span className="text-gray-700">{invoice.discount}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">{t("tax")}</span>
                <span className="text-gray-700">
                  $ {invoice.tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="font-semibold text-gray-900">
                  {t("totalAmount")}:
                </span>
                <span className="font-semibold text-gray-900">
                  {t("currency")} {invoice.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              {invoice.paymentDetails.line1}
            </p>
            <p className="text-sm text-gray-600 text-center mt-1">
              {invoice.paymentDetails.line2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
