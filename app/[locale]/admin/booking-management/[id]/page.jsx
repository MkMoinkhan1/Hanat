

import BookingManagementDetailsComponent from "@/components/booking-management-details-component"
export default async function BookingManagementDetailsPage({ params }) {
  const param = await params
  return (
   <BookingManagementDetailsComponent bookingId={param.id}/>
  );
}
