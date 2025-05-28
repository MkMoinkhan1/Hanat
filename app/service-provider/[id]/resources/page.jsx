import ServiceProviderLayout from "@/components/service-provider-layout"
import ResourcesContent from "@/components/resources-content"

export default function ResourcesPage() {
  return (
    <ServiceProviderLayout activeTab="resources">
      <ResourcesContent />
    </ServiceProviderLayout>
  )
}
