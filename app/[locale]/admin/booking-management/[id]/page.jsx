
import BookingDetailsContent from "@/components/booking-details-content";
export default async function BookingManagementDetailsPage({ params }) {
  const param = await params
  return (
      <BookingDetailsContent bookingId={param} />

  );
}
