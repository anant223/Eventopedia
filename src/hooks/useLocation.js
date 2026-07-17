import { useState, useEffect, useRef } from 'react';
import LocationService from '@/services/location.service';

const locationService = new LocationService();

const useLocationSearch = ({locationQuery}) => {
  const [recommendations,setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const lastQueryRef = useRef();


  
  useEffect(() => {
    if (!locationQuery || locationQuery.length < 2) {
      setRecommendations([]);
      setIsLoading(false);
      return;
    }

    if(lastQueryRef.current === locationQuery.trim()) return;
    
    lastQueryRef.current = locationQuery.trim();
    

    let isActive = true;
    const timer =  setTimeout(async () => {
      setIsLoading(true);
      setErr(null);
      try {
        const res = await locationService.fetchPlaces(locationQuery);
        if(!isActive) return;
        setRecommendations(res);
      } catch (error) {
        if(!isActive) return;
        console.log("location fetching err", error.message);
        setErr(error.message)
        setRecommendations([])
      } finally{
        if(isActive) setIsLoading(false)
      }
    }, 400)

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [locationQuery]);


  return {recommendations, isLoading, err, lastQueryRef}
};

export default useLocationSearch;