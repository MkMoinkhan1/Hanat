import ServiceProviderLayout from "@/components/service-provider-layout"
import CategoriesContent from "@/components/categories-content"

export default function ServiceProviderCategoriesPage({ params }) {
  return (
    <ServiceProviderLayout activeTab="categories" providerId={params.id}>
      <CategoriesContent />
    </ServiceProviderLayout>
  )
}
