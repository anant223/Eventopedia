import {MapPin, NotepadText } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import {DateNTime} from "../common/index";
import eventService from "../../api/eventService";
import { tr } from 'date-fns/locale';

const EventDetails = ({setOpen}) => {  
  const {register, watch, formState: {errors}, setValue} = useFormContext()  
  const {createLocation} = eventService
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const isSelectingRef = useRef(false)

  const locationInput = watch("location")


  useEffect(() => {
    if (isSelectingRef.current) {
      return;
    }

    if (!locationInput || locationInput.trim().length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const findLocation = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await createLocation(locationInput.trim());
        setSuggestions(res.data?.data);
        setShowSuggestions(res.data?.data?.length > 0);
      } catch (error) {
        console.log(error.message);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(findLocation);
  }, [locationInput]);


  const handleLocation = useCallback((suggestion) => {
    isSelectingRef.current = true;
    const selectedLocation = suggestion?.placePrediction?.text?.text;
    console.log(selectedLocation);
    const placeId = suggestion.placePrediction?.placeId;

    setValue("location", selectedLocation , {shouldValidate: true})
    setValue("locationId", placeId);
    setSuggestions([]);
    setShowSuggestions(false);
    setTimeout(() => isSelectingRef.current = false, 100)

  }, [setValue])
  return (
    <div className="space-y-3 relative ring-offset-background">
      <div className="p-4">
        <textarea
          placeholder="Event Name"
          className="w-full font-bold bg-transparent border-none text-white placeholder-gray-500 text-xl sm:text-2xl lg:text-3xl leading-tight resize-none focus:outline-none focus:ring-0 transition-colors duration-200"
          rows={1}
          onInput={(e) => {
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          {...register("title", { required: "Event name is required" })}
        />

        {showSuggestions && (
          <div className="absolute z-10 w-full -mt-1 bottom-0 mx-auto bg-muted rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-400">Searching...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-700 cursor-pointer text-xs"
                    onClick={() => handleLocation(suggestion)}
                  >
                    {suggestion.placePrediction?.text?.text ||
                      "Unknown location"}
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-gray-400">
                No results found
              </div>
            )}
          </div>
        )}
        {}
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div className="bg-muted p-4 rounded-lg space-y-3">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-green-500 w-4 h-4 rounded-full flex-shrink-0"></div>
          <div className="w-14 sm:w-16">Start:</div>
          <div className="flex-1">
            <DateNTime fieldName="start" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-gray-500 w-4 h-4 rounded-full flex-shrink-0"></div>
          <div className="w-14 sm:w-16">End:</div>
          <div className="flex-1">
            <DateNTime fieldName="end" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 p-4 bg-muted rounded-lg">
        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <input
            placeholder="Add Event Location"
            className="w-full bg-transparent border-none text-text placeholder:text-text focus:outline-none focus:ring-0 text-sm sm:text-base transition-colors duration-200"
            {...register("location", { required: false })}
          />
          <p className="text-gray-500 text-xs mt-1">
            Offline location or virtual link
          </p>
        </div>
      </div>
      <div
        id="desc"
        className="bg-muted rounded-lg p-4 relative cursor-pointer flex items-center text-text gap-2 sm:gap-4"
        onClick={setOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpen();
          }
        }}
      >
        <NotepadText className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <span className="text-sm sm:text-base">Add Description</span>
      </div>
      <div
        id="category"
        className="bg-muted rounded-lg p-4 relative cursor-pointer flex items-center text-text gap-2 sm:gap-4"
        onClick={setOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpen();
          }
        }}
      >
        <NotepadText className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <span className="text-sm sm:text-base">Add Category & Tags</span>
      </div>
    </div>
  );
}

export default EventDetails
