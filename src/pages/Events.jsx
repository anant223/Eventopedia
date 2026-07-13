import useEvents from "@/hooks/useEvents.js";
import GeoMap from "@/components/eventMap/EventsMap";
import useAuth from "@/hooks/useAuth";
import useOther from "@/hooks/useOther";
import { useEffect } from "react";



const Events = () => {
  const { user } = useAuth();
  // const { events, loading } = useEvents();
  const {liveEvents, loading, eventPreview, error, pageInfo} = useOther()
  useEffect(() => {
    const coords = user?.location?.coordinates;
  
    const lat = coords?.[1];
    const lng = coords?.[0];

    if (lat && lng) {
      eventPreview({
        lat,
        lng,
        page: 0,
        size: 50,
        radius: 25,
      });
    }
  }, [user]);

  return (
    <div className="w-full">
      <GeoMap
        events={liveEvents}
        eventPreview={eventPreview}
        loading={loading}
        location={user?.location}
        user={user}
        pageInfo={pageInfo}
      />
    </div>
  );

};
export default Events
