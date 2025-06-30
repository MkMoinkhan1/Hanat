import BookingDetailsContent from "@/components/booking-details-content"

export default async function ServiceProviderBookingDetailsPage({
  params,
}) {
    const param = await params

  return (
    // <ServiceProviderLayout activeTab="booking" providerId={params.id}>
      <BookingDetailsContent bookingId={param} />
    // </ServiceProviderLayout>
  )
}
