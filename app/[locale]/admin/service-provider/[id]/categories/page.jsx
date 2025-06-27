import ServiceProviderLayout from "@/components/service-provider-layout"
import CategoriesContent from "@/components/categories-content"

export default async function ServiceProviderCategoriesPage({ params }) {
  const param = await params
  return (
    <ServiceProviderLayout activeTab="categories" providerId={param}>
      <CategoriesContent />
    </ServiceProviderLayout>
  )
}
