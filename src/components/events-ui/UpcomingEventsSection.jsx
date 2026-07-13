import { Calendar } from "lucide-react";
// import CustomLayout from "@/event-layouts/CustomLayout";
import {UpcomingEventCard} from "./index";

const UpcomingEventsSection = ({upcomingEvents }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary-foreground to-transparent"></div>

        <h3 className="text-secondary-foreground font-semibold tracking-wider uppercase text-xs sm:text-sm flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-foreground"></span>
          </span>
          Upcoming Timeline ({upcomingEvents.length})
        </h3>

        <div className="h-px flex-1 bg-gradient-to-r from-secondary-foreground via-transparent to-transparent"></div>
      </div>

      {/* Empty State */}
      {upcomingEvents.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No events found matching your filters</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-border via-border/50 to-transparent transform -translate-x-1/2"></div>

          {/* Timeline events */}
          {/* <CustomLayout layout="timeline">
            {upcomingEvents.map((event, index) => (
              <UpcomingEventCard
                key={event.id}
                event={event}
                isLeft={index % 2 === 0}
              />
            ))}
          </CustomLayout> */}
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsSection;
