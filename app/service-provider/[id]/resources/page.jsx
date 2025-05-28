import ServiceProviderLayout from "@/components/service-provider-layout"
import ResourcesContent from "@/components/resources-content"

export default function ResourcesPage({params}) {
  return (
    <ServiceProviderLayout activeTab="resources" providerId={params.id}>
      <ResourcesContent />
    </ServiceProviderLayout>
  )
}
