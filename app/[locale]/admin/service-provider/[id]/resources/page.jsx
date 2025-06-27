import ServiceProviderLayout from "@/components/service-provider-layout"
import ResourcesContent from "@/components/resources-content"

export default async function ResourcesPage({params}) {
  const param = await params
  return (
    <ServiceProviderLayout activeTab="resources" providerId={param}>
      <ResourcesContent />
    </ServiceProviderLayout>
  )
}
