import React, { useEffect, useRef, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {selectEvents,selectEventLoading} from "../app/selector/virtualEventsSelector.js";
import eventService from "../api/eventService.js";
import { allVirtualEvents } from "../app/features/virtualEventsSlice.js";
import { useQry } from "../hooks/useQry.jsx";
import {EventPortal} from "../components/all-events/index.js"
import EventCard from "../components/all-events/EventCard.jsx";
import { SpatialGrid } from "../utils/spatialGrid.js";
import * as d3 from "d3-force";
import { useWindowSize } from "@/hooks/use-window-size.js";
import { LoadingSpinner } from "@/components/common/index.js";


const Events = () => {
  const allPublicEvents = useSelector(selectEvents);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const isLoading = useSelector(selectEventLoading);
  const [eventData, setEventData] = useState();
  const [state, setState] = useState(false);
  const {getAllPublicEvents} = eventService
  const { loading, error, refetch } = useQry({
    queryKey: ["Events"],
    apiFn: () => getAllPublicEvents({ page: 1, limit: 6 }),
    reduxAction: allVirtualEvents,
    options: {},
  });
  const containerRef = useRef();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const {width, height} = useWindowSize();
  const [nodes, setNodes] = useState([]);
  const handleEventEnter = (event) => {setSelectedEvent(event)};

  const handelEventModel = (status, eventID) => {
    const chosenPublicEvent = allPublicEvents?.events.find(
      (event) => event._id === eventID
    );
    setEventData(chosenPublicEvent);
    setState(status);
  };


  useEffect(() => {
    if (!containerRef.current || !allPublicEvents?.events) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();

    if (width === 0 || height === 0) return;

    const simulationNodes = allPublicEvents?.events.map(
      (event, index) => ({
        ...event,
        id: event._id || index,
        x: Math.random() * (width * 0.6) + width * 0.2,
        y: Math.random() * (height * 0.6) + height * 0.2,
        vx: 0,
        vy: 0,radius: 30,
      })
    );

    const simulation = d3
         .forceSimulation(simulationNodes)
         .force("collision", d3.forceCollide().radius(35).strength(0.7))
         .force("charge", d3.forceManyBody().strength(-150))
         .force("center", d3.forceCenter(width / 2, height / 2).strength(0.1))
         .force("x", d3.forceX(width / 2).strength(0.05))
         .force("y", d3.forceY(height / 2).strength(0.05))
         .velocityDecay(0.4)
         .alphaDecay(0.02)
         .on("tick", () => {
           simulationNodes.forEach((d) => {
             const nodeRadius = d.radius || 30;
             const padding = 20;
             d.x = Math.max(
               nodeRadius + padding,
               Math.min(width - nodeRadius - padding, d.x)
             );
             d.y = Math.max(
               nodeRadius + padding + 60,
               Math.min(height - nodeRadius - padding, d.y)
             );
           });
           const updatedEvents = simulationNodes.map((d) => ({
             ...d,
             position: {
               x: (d.x / width) * 100,
               y: (d.y / height) * 100,
             },
           }));
           setNodes(updatedEvents);
         });
      return () => simulation.stop();
  }, [allPublicEvents?.events, width, height]);


  const calculateCardPosition = (event, mouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const container = containerRef.current.getBoundingClientRect();
    const cardWidth = 320;
    const cardHeight = 220;

    const eventX = (event.position.x / 100) * container.width;
    const eventY = (event.position.y / 100) * container.height;

    let x = eventX - cardWidth / 2;
    let y = eventY - cardHeight - 20;
    let transform = "translate(0, 0)";

    const padding = 16;

    if (x + cardWidth > container.width - padding) {
      x = container.width - cardWidth - padding;
    }

    if (x < padding) {
      x = padding;
    }

    if (y < padding) {
      y = eventY + 40;
      if (y + cardHeight > container.height - padding) {
        y = eventY - cardHeight / 2;
        x = eventX + 60;
        if (x + cardWidth > container.width - padding) {
          x = eventX - cardWidth - 60;
        }
      }
    }

    return { x, y, transform };
  };

  const handleEventHover = (event, mouseEvent) => {
    setHoveredEvent(event);

    if (event && mouseEvent) {
      const position = calculateCardPosition(event, mouseEvent);
      setCardPosition(position);
    }
  };


  return (
    <div className="min-h-screen relative text-text bg-background overflow-hidden pt-[4.5rem] pb-8 flex">
      <div className="container mx-auto px-4 sm:px-6 relative">
        {
          loading ? <LoadingSpinner /> :
          <div
            ref={containerRef}
            className="relative rounded-md w-full min-h-[85vh] bg-gray-900"
          >
            {nodes.map((node, index) => (
              <EventPortal
                key={index}
                event={node}
                onEnter={() => handleEventEnter(node)}
                isHighlighted={true}
                connectedIntrests={true}
                onHover={handleEventHover}
                isHovered={hoveredEvent?.id === node?.id}
              />
            ))}
            {/* Floating Card */}
            {hoveredEvent && (
              <div className="absolute">
                <div className="animate-in fade-in-0 zoom-in-95 duration-200">
                  <EventCard
                    event={hoveredEvent}
                    position={cardPosition}
                    className="pointer-events-auto"
                    onHover={handleEventHover}
                  />
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};
export default Events;
