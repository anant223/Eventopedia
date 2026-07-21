import useLocationSearch from '@/hooks/useLocation';
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const LocationStep = () => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)
  const {handleSubmit, register, watch, formState:{errors}} = useFormContext()
  const city = watch("city");
  

  const { err, recommendations, isLoading } = useLocationSearch({
    location: isOpen ? city : "",
  });

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if(wrapperRef && wrapperRef.current.contains(e.target)){
        setIsOpen(true)
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide)
  }, [])

  const handleSelect = (item) => {
    setValue("city", item.city);
    setValue("location", item);
    setIsOpen(false)
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
          <MapPin className="text-pink-600" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Where are you located?
        </h2>
        <p className="text-gray-600">Help us personalize your experience</p>
      </div>
      <div className="relative" ref={wrapperRef}>
        
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City
        </label>
        <input
          type="text"
          {...register("city", { required: "City is required" })}
          placeholder="Enter your city"
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
        />
        {isOpen && isLoading && (
          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg p-3 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="h-3 w-1/3 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        )}
        {isOpen && recommendations.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
            {recommendations.map((recommend) => (
              <li
                key={recommend.placeId}
                onClick={() => handleSelect(recommend)}
                className="px-4 py-2 hover:bg-pink-50 cursor-pointer"
              >
                {recommend.city}, {recommend.region}, {recommend.country}
              </li>
            ))}
          </ul>
        )}
        {err && <p className="text-sm text-red-500 mt-2">{err}</p>}
      </div>
    </div>
  );
};

export default LocationStep