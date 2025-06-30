import ServiceProviderLayout from "@/components/service-provider-layout"
import BookingContent from "@/components/service-provider-booking"

export default async function ServiceProviderBookingPage({ params }) {
    const param = await params;
  return (
    <ServiceProviderLayout activeTab="booking" providerId={param}>
      <BookingContent params={param}/>
    </ServiceProviderLayout>
  )
}
