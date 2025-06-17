import InvoiceContent from "@/components/invoice-content"

export default async function InvoicePage({ params }) {
    const {invoiceId} = await params
  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <InvoiceContent invoiceId={invoiceId} />
      </div>
    </div>
  )
}
