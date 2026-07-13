import { useState, useEffect } from 'react';
import LocationService from '@/services/location.service';

const locationService = new LocationService();

const useLocationSearch = ({location}) => {
  const [recommendations,setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  
  useEffect(() => {
    if (!location || location.length < 2) {
      setRecommendations([]);
      return;
    }
    let isActive = true;
    const timer =  setTimeout(async () => {
      setIsLoading(true);
      setErr(null);
      try {
        const res = await locationService.fetchPlaces(location);
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
  }, [location]);


  return {recommendations, isLoading, err}
};

export default useLocationSearch;