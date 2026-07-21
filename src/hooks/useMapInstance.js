import React, { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from "mapbox-gl";
import { DEFAULT_ZOOM } from '@/utils/map';
import "mapbox-gl/dist/mapbox-gl.css";


export const useMapInstance = ({ coordinates, onBoundsChange }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const isFirstMoveRef = useRef(true);

  const [loadError, setLoadError] = useState();
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const token = import.meta.env.VITE_MAPBOX_TOKEN;

    if (!token) {
      setLoadError("Missing map box token");
      return;
    }

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    mapboxgl.accessToken = token;

    try {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: coordinates || [72.8777, 19.076],
        zoom: DEFAULT_ZOOM,
        trackResize: true
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      
      mapRef.current.on("load", () => {
        setIsMapReady(true);
        mapRef.current.on("moveend", () => {
           if (isFirstMoveRef.current) {
             isFirstMoveRef.current = false;
             return;
           } 
          const center = mapRef.current.getCenter();

           onBoundsChange?.({
            lat: center.lat,
            lng: center.lng
           });
         });
      })

      mapRef.current.on("error", (e) => {
        console.error("Mapbox runtime error:", e?.error);
        setLoadError(e?.error?.message || "Map failed to load");
      });
    } catch (error) {
      console.error("Mapbox init failed:", error);
      setLoadError(error?.message || "Map failed to initialize");
      return;
    }

    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (error) {
          console.error("Mapbox cleanup error:", error.message);
        }
        mapRef.current = null;
      }
      setIsMapReady(false);
    };
  }, []);

  useEffect(() => {
    if(!isMapReady || !mapRef.current || !coordinates) return;

    mapRef.current.flyTo({
      center: coordinates,
      zoom: DEFAULT_ZOOM,
      essential: true
    })

  },[coordinates, isMapReady])

  const flyTo = useCallback((center, options = {}) => {
    if(!mapRef.current || !center) return;
    

    mapRef.current.flyTo({
      center,
      zoom: DEFAULT_ZOOM,
      essential: true,
      ...options
    })
  }, [])

  return { mapRef, mapContainerRef, loadError, flyTo, isMapReady};
};
