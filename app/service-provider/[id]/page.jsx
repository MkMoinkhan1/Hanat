import ServiceProviderLayout from "@/components/service-provider-layout"
import PersonalDetailsContent from "@/components/personal-details-content"

export default async function ServiceProviderDetailsPage({ params }) {
      const {id} = await params;
  return (
    <ServiceProviderLayout activeTab="personal-details" providerId={id}>
      <PersonalDetailsContent />
    </ServiceProviderLayout>
  )
}
