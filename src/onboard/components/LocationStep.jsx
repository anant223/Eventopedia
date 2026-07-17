import { Field } from "@/auth/components/Components";
import useLocationSearch from "@/hooks/useLocation";
import { AnimatePresence,motion } from "framer-motion";
import { AlertCircle, MapPin } from "lucide-react";
import {useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

const LocationStep = () => {
  const [open, setOpen] = useState(false);
  const [isSelcted, setIsSelected] = useState(false);
  const {register, watch, formState:{errors}, setValue} = useFormContext()
  const locationQuery = watch("locationQuery");
  const { recommendations, isLoading, err, lastQueryRef } = useLocationSearch({
    locationQuery: isSelcted ? null : locationQuery,
  });
 
  
  const pick = (recommend) => {
    lastQueryRef.current = ""
    setIsSelected(true)
    setValue("locationQuery", `${recommend?.city}, ${recommend?.country}`);;
    setValue(
      "location",
      {
        city: recommend?.city,
        country: recommend?.country,
        coordinates: recommend?.coordinates,
        formattedAddress: recommend?.formattedAddress,
        placeId: recommend?.placeId, 
        type: "Point",
      },
      { shouldValidate: true }
    );
    setOpen(false)
  };

  const handleKeyDown= (e) => {
    if (e.key === 'Escape') setOpen(false);
  }
 
  return (
    <div className="relative">
      <div>
        <h2 className="text-2xl font-bold text-[#121212] tracking-tight mb-2">
          Where do you want to explore?
        </h2>
        <p className="text-stone-500 text-sm mb-6">
          Grupio is local. Tell us your city or area to anchor your home map
          screen.
        </p>
      </div>
      <div>
        <form className="relative">
          <Field
            type="text"
            label="Location"
            placeholder="Location"
            icon={MapPin}
            {...register("locationQuery", {
              required: "Location is required",
              onChange: () => setOpen(true),
            })}
          />
        </form>

        {(errors.location || err) && (
          <div
            role="alert"
            className="text-[12px] text-red-500 mt-1.5 flex items-center gap-1 font-medium"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              {errors.location?.message || err || "Something went wrong"}
            </span>
          </div>
        )}
      </div>

      {isLoading && !open && (
        <p className="text-xs text-[#9b9890] text-center py-3">Searching…</p>
      )}
      <AnimatePresence>
        {open && recommendations && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 w-full mt-1 bg-white border border-stone-200/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] max-h-60 overflow-y-auto p-2 space-y-0.5"
            style={{ top: "100%" }}
          >
            {recommendations.map((recommend, index) => (
              <button
                key={`${recommend.city}-${recommend.country}`}
                type="button"
                onClick={() => pick(recommend)}
                onKeyDown={handleKeyDown}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-[#F9F8F6] hover:text-[#121212] rounded-xl transition-colors flex items-center gap-3 group"
              >
                <MapPin className="w-4 h-4 text-stone-400 group-hover:text-[#DE5239] transition-colors flex-shrink-0" />
                <span className="truncate">
                  {recommend.city}, {recommend.region}, {recommend.country}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 export default LocationStep;