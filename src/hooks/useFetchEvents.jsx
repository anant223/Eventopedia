import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import  eventService  from "../api/eventService.js";
import { allVirtualEvents } from "../app/features/virtualEventsSlice.js";

const useFtechEvents = () =>{
    const dispatch = useDispatch()
    const [error, setError] = useState(null);

     useEffect(() => {
         const fetchEvents = async () => {
           try {
             const publicEvent = await eventService.getAllPublicEvents({
               page: 1,
               limit: 6,
             });
             if (publicEvent) {
               dispatch(allVirtualEvents(publicEvent));
             }
           } catch (err) {
             console.error("Error fetching public events:", err);
             setError("Failed to load events. Please try again later.");
           }
         };
     
         fetchEvents();
       }, [dispatch]);

}
export default useFtechEvents