import ServiceProviderLayout from "@/components/service-provider-layout"
import ServiceListContent from "@/components/service-list-content"

export default async function ServiceProviderServiceListPage({ params }) {
  const param = await params
  return (
    <ServiceProviderLayout activeTab="service-list" providerId={param}>
      <ServiceListContent />
    </ServiceProviderLayout>
  )
}
