// import CustomLayout from "@/event-layouts/CustomLayout";
import { PastEventCard } from "./index";

const PastEventsSection = ({ pastEvents }) => {
  if (!pastEvents.length) return null;

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <h3 className="text-gray-500 font-semibold tracking-wider uppercase text-xs sm:text-sm">
          Past Events ({pastEvents.length})
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-gray-700 via-transparent to-transparent"></div>
      </div>

      {/* <CustomLayout>
        {pastEvents.map((event) => (
          <PastEventCard key={event.id} event={event} />
        ))}
      </CustomLayout> */}
    </>
  );
};

export default PastEventsSection;
