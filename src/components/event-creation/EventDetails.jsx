import {MapPin, NotepadText } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { DateNTime } from '../common';
import useLocationSearch from '@/hooks/useLocation';

const EventDetails = ({setOpen}) => {  
  const {register, watch, formState: {errors}, setValue} = useFormContext()  
  const inputLocation = watch("location")
  const { suggestions, showSuggestion, loading, error, handleSelect } = useLocationSearch(inputLocation);

  const handleLocation = () => {
    const res = handleSelect()
    if(!res) return;
    
    setValue("location", result.location, { shouldValidate: true });
    setValue("locationId", result.locationId);
  }

 
  
  return (
    <div className="space-y-2 relative font-roboto"> 
      <div className="p-3">
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
          {...register("title", {
            required: "Event name is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Title must not exceed 100 characters",
            },
          })}
        />
      </div>
      <div className="bg-muted p-3 rounded-lg space-y-3">
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
      <div className="relative">
        <div className="flex items-center gap-2 sm:gap-4 p-3 bg-muted rounded-lg">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <input
              placeholder="Add Event Location"
              className="w-full bg-transparent border-none text-text placeholder:text-text focus:outline-none focus:ring-0 text-sm sm:text-base transition-colors duration-200 placeholder:text-sm"
              {...register("location", { required: false })}
            />
            <p className="text-gray-500 text-xs mt-1">
              Offline location or default online
            </p>
          </div>
        </div>
        {showSuggestion && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-muted rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-400">Searching...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => {
                return (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-700 cursor-pointer text-xs transition-colors"
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
      </div>
      <div
        id="desc"
        className="bg-muted rounded-lg p-3 relative cursor-pointer flex items-center text-text gap-2 sm:gap-4"
        onClick={setOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpen();
          }
        }}
      >
        <div className=" flex gap-5">
          <NotepadText className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm">Add Description</span>
        </div>
        {errors?.desc && (
          <p className="mb-4 text-xs text-destructive">{errors.desc.message}</p>
        )}
      </div>
      <div
        id="category"
        className="bg-muted rounded-lg p-3 relative cursor-pointer flex items-center text-text gap-2 sm:gap-4"
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
        <span className="text-sm">Add Category & Tags</span>
        {errors?.category && (
          <p className="mb-4 text-xs text-destructive">{errors.category.message}</p>
        )}
      </div>
    </div>
  );
}

export default EventDetails
