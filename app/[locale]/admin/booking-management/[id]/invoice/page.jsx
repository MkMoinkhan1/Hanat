import InvoiceContent from "@/components/invoice-content"

const page = () => {
  return (
      <div className="flex h-screen bg-white">
          <div className="flex-1 flex flex-col">
            <InvoiceContent />
          </div>
        </div>
  )
}

export default page