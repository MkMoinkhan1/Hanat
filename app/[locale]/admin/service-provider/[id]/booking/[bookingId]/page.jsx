import ServiceProviderLayout from "@/components/service-provider-layout"
import BookingDetailsContent from "@/components/booking-details-content"

export default function ServiceProviderBookingDetailsPage({
  params,
}) {
  return (
    // <ServiceProviderLayout activeTab="booking" providerId={params.id}>
      <BookingDetailsContent bookingId={params} />
    // </ServiceProviderLayout>
  )
}
