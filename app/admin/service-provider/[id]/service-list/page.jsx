import ServiceProviderLayout from "@/components/service-provider-layout"
import ServiceListContent from "@/components/service-list-content"

export default function ServiceProviderServiceListPage({ params }) {
  return (
    <ServiceProviderLayout activeTab="service-list" providerId={params.id}>
      <ServiceListContent />
    </ServiceProviderLayout>
  )
}
