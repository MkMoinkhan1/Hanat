import dynamic from "next/dynamic"
import { Suspense } from "react"

const AddSubCategoryClient = dynamic(
  () => import("@/components/add-sub-categories-client"),

)

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddSubCategoryClient />
    </Suspense>
  )
}