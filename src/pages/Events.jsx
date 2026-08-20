import useEvents from "@/hooks/useEvents.js";
import GeoMap from "@/components/eventMap/EventsMap";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";



const Events = () => {
  const { user } = useAuth();
  const { liveEvents, loading, liveEventsPreview, pageInfo } = useEvents();
  
  useEffect(() => {
    const coords = user?.location?.coordinates;
  
    const lat = coords?.[1];
    const lng = coords?.[0];

    if (lat && lng) {
      liveEventsPreview({lat, lng});
    }
  }, [user]);

  return (
    <div className="w-full">
      <GeoMap
        events={liveEvents}
        eventPreview={liveEventsPreview}
        loading={loading}
        location={user?.location}
        user={user}
        pageInfo={pageInfo}
      />
    </div>
  );

};
export default Events
