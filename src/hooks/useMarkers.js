import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { DEFAULT_ZOOM, MAX_BOUNDS_ZOOM } from "@/utils/map";
import EventMapCard from "@/components/eventMap/MarkerCard";
import { groupEventsByLocation } from "@/utils/groupEventsByLocation";
import { fitMapBounds } from "@/utils/fitMapBounds";

export const useEventsMarkers = ({ mapRef, events, isMapReady, onMarkerClick }) => {
    const markerRef = useRef(new Map());
    const hasFitBoundRef = useRef(false);    
   
    useEffect(() => {

      if(!mapRef.current || !isMapReady) return;

      const locationGroups = groupEventsByLocation(events)
      const incomingIds = new Set();

      locationGroups?.forEach((group, key) => {
        incomingIds.add(key);

        const existing = markerRef.current.get(key);

        if (existing) {
          existing.setLngLat([group.lng, group.lat]);
          return;
        }

        const el = document.createElement("div");
        el.className = "event-marker";

        const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([group.lng, group.lat])
          .addTo(mapRef.current);

        if (group.count === 1) {
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 4px;">
          <p style="font-weight:600; font-size:13px; margin:0 0 4px;">${group.events[0].title}</p>
          <p style="font-size:11px; color:#888; margin:0 0 8px;">${new Date(
            group.events[0].startDateTime
          ).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}</p>
          <p style="font-size:11px; color:#666; margin:0;">${group.venueName}</p>
        </div>
      `);

          marker.setPopup(popup);
          el.addEventListener("click", () => marker.togglePopup());
          
        }else{
          el.innerHTML = `<span class="marker-count">${group.count > 9 ? "9+" : group.count}</span>`;
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            onMarkerClick?.({
              events: group.events,
              coordinates: [group.lng, group.lat],
            });
          });
        }

        markerRef.current.set(key, marker);
      });

      for(const [key, marker] of markerRef.current.entries()){

          if(!incomingIds.has(key)){
            marker.remove();
            markerRef.current.delete(key)
          }
      }
       
    },[events, mapRef, isMapReady])

    useEffect(() => {
      if(!mapRef.current || !isMapReady || events.length === 0) return;
      
      if (hasFitBoundRef.current) return;

      fitMapBounds({map: mapRef.current, events})
      hasFitBoundRef.current = true
      
    },[events, isMapReady])

    useEffect(() => {
        return () => {
            markerRef.current.forEach((marker) => marker.remove());
            markerRef.current.clear();
        }
    },[])
    return markerRef
};

// const popupRef = useRef(null);
// const [selectedEvent, setSelectedEvent] = useState(null);
// const selectedEventRef = useRef(null);

// const handleMarkerClick = useCallback(
//   (event) => {
//     if (!mapRef.current) return;

//     if (popupRef.current && selectedEventRef.current?._id === event._id) {
//       popupRef.
// 
// 
// 
// 
// current.remove();
//       popupRef.current = null;
//       setSelectedEvent(null);
//       return;
//     }

//     if (popupRef.current) return popupRef.current.remove();

//     setSelectedEvent(event);

//     const popupNode = document.createElement("div");
//     const root = createRoot(popupNode);
//     root.render(<EventMapCard event={event} />);

//     popupRef.current = new mapboxgl.Popup({
//       offset: 25,
//       closeButton: true,
//     })
//       .setLngLat(event.location.coordinates)
//       .setDOMContent(popupNode)
//       .addTo(mapRef.current);

//     popupRef.current.on("close", () => {
//       root.unmount();
//       popupRef.current = null;
//       selectedEventRef.current = null;
//       setSelectedEvent(null);
//     });

//     mapRef.current.flyTo({
//       center: event.location.coordinates,
//       zoom: DEFAULT_ZOOM,
//     });
//   },
//   [mapRef, popupRef, selectedEventRef, setSelectedEvent]
// );

// useEffect(() => {
//   if (!mapRef.current) return;

//   const map = mapRef.current;

//   const geoJsonData = {
//     type: "FeatureCollection",
//     features: events
//       .filter((event) => event.location !== "online")
//       .map((event) => {
//         return {
//           type: "Feature",
//           properties: {
//             id: event._id,
//             category: event.category,
//             title: event.title,
//           },
//           geometry: {
//             type: "Point",
//             coordinates: event.location.coordinates,
//           },
//         };
//       }),
//   };

//   if (map.getSource("events")) {
//     map.getSource("events").setData(geoJsonData);
//     return;
//   }

//   map.addSource("events", {
//     type: "geojson",
//     data: geoJsonData,
//     cluster: true,
//     clusterMaxZoom: MAX_BOUNDS_ZOOM,
//     clusterRadius: 50,
//   });

//   map.addLayer({
//     id: "event-pill-bg",
//     type: "circle",
//     source: "events",
//     filter: ["!", ["has", "point_count"]],
//     paint: {
//       "circle-color": "#ffffff",
//       "circle-radius": 28,
//       "circle-stroke-width": 1,
//       "circle-stroke-color": "#e5e7eb",
//     },
//   });

//   map.addLayer({
//     id: "event-pill-text",
//     type: "symbol",
//     source: "events",
//     filter: ["!", ["has", "point_count"]],
//     layout: {
//       "text-field": ["get", "title"],
//       "text-size": 12,
//     },
//     paint: {
//       "text-color": "#111827",
//     },
//   });
// }, [events, mapRef]);

// useEffect(() => {
//   if (!mapRef.current) return;
//   if (!selectedEvent?._id) return;

//   const map = mapRef.current;

//   map.setPaintProperty("event-pill-bg", "circle-color", [
//     "case",
//     ["==", ["get", "id"], selectedEvent._id],
//     "#111827",
//     "#ffffff",
//   ]);

//   map.setPaintProperty("event-pill-text", "text-color", [
//     "case",
//     ["==", ["get", "id"], selectedEvent._id],
//     "#ffffff",
//     "#111827",
//   ]);
// }, [selectedEvent, mapRef]);

// useEffect(() => {
//   if (!mapRef.current) return;

//   const map = mapRef.current;

//   const handleClick = (e) => {
//     const id = e.features[0].properties.id;
//     const event = events.find((ev) => ev._id === id);
//     if (event) handleMarkerClick(event);
//   };

//   map.on("click", "event-pill-bg", handleClick);

//   const onEnter = () => (map.getCanvas().style.cursor = "pointer");
//   const onLeave = () => (map.getCanvas().style.cursor = "");

//   map.on("mouseenter", "event-pill-bg", onEnter);
//   map.on("mouseleave", "event-pill-bg", onLeave);

//   return () => {
//     map.off("click", "event-pill-bg", handleClick);
//     map.off("mouseenter", "event-pill-bg", onEnter);
//     map.off("mouseleave", "event-pill-bg", onLeave);
//   };
// }, [mapRef, events, handleMarkerClick]);

// useEffect(() => {
//   selectedEventRef.current = selectedEvent;
// }, [selectedEvent]);
// useEffect(() => {
//   if (!mapRef.current) return;
//   const map = mapRef.current;
//   return () => {
//     ["event-pill-text", "event-pill-bg"].forEach((id) => {
//       if (map.getLayer(id)) map.removeLayer(id);
//     });
//     if (map.getSource("events")) map.removeSource("events");
//   };
// }, []);

// return { selectedEvent };