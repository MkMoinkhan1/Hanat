import ServiceProviderLayout from "@/components/service-provider-layout"
import BookingContent from "@/components/booking-content"

export default async function ServiceProviderBookingPage({ params }) {
    const {id} = await params;
  return (
    <ServiceProviderLayout activeTab="booking" providerId={id}>
      <BookingContent />
    </ServiceProviderLayout>
  )
}
