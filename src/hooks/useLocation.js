import { useState, useEffect, useRef } from 'react';
import LocationService from '@/services/location.service';

const locationService = new LocationService();

const useLocationSearch = ({locationQuery}) => {
  const [recommendations,setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const lastQueryRef = useRef();


  
  useEffect(() => {
    const query = locationQuery?.trim() ?? "";

    if (query.length < 2) {
      setRecommendations([]);
      setIsLoading(false);
      lastQueryRef.current = undefined;
      return;
    }

    if(lastQueryRef.current === query) return;
    
    lastQueryRef.current = query;
    
    setIsLoading(true);

    let isActive = true;
    const timer =  setTimeout(async () => {
      setErr(null);
      try {
        const res = await locationService.fetchPlaces(query);
        if(!isActive) return;
        setRecommendations(res);
      } catch (error) {
        if(!isActive) return;
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