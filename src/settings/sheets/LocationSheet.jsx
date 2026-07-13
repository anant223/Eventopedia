import ResponsiveModal from "@/components/my-ui/Sheet";
import useAuth from "@/hooks/useAuth";
import useLocationSearch from "@/hooks/useLocation";
import { MapPin, Search, X } from "lucide-react";
import { useState } from "react";

const LocationSheet = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const { user, changeLocation, updateLocationError } = useAuth();


  
  const {
    recommendations,
    isLoading: searchLoading,
    err: searchErr,
  } = useLocationSearch({ location: query });



  
  const handleClose = () => {
    setQuery("");
    setSelected(null);
    setLoading(false);
    setSaved(false);
    setError(null);
    onClose();
  };

  const handleSelect = (place) => {
    setSelected(place);
    setQuery(place.formattedAddress);
    setError(null);
  };

  // submit selected location to backend
  const handleSave = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);
    try {
      await changeLocation({location: {
        city: selected.city,
        country: selected.country,
        formattedAddress: selected.formattedAddress,
        placeId: selected.placeId,
        coordinates: selected.coordinates,
        type: "Point",
    }});
      setSaved(true);
      setTimeout(() => handleClose(), 1200);
    } catch (err){
      console.log(err.response.data)
      setError(
        updateLocationError || "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  // ── Input style ───────────────────────────────────────────────────
  const inputStyle = {
    width: "100%",
    background: "#f8f7f5",
    border: "0.5px solid rgba(0,0,0,.12)",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 13,
    color: "#1a1814",
    fontFamily: "inherit",
    outline: "none",
    lineHeight: 1.55,
  };

  const onFocus = (e) => {
    e.target.style.borderColor = "rgba(26,24,20,.4)";
    e.target.style.background = "#fff";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "rgba(0,0,0,.12)";
    e.target.style.background = "#f8f7f5";
  };

  return (
    <ResponsiveModal open={open} onClose={handleClose}>
      <div className="px-5 pt-5 pb-2">
        {/* ── Icon ───────────────────────────────────────────────── */}
        <div className="w-[52px] h-[52px] rounded-full bg-[#FAECE7] flex items-center justify-center mx-auto mt-2 mb-3.5">
          <MapPin className="w-6 h-6 text-[#993C1D]" />
        </div>

        <p className="text-[17px] font-medium text-[#1a1814] text-center mb-1">
          Update location
        </p>

        {/* current location shown as subtitle */}
        {user?.location?.formattedAddress && (
          <p className="text-xs text-[#9b9890] text-center mb-5">
            Current: {user.location.formattedAddress}
          </p>
        )}

        {/* ── Search input ───────────────────────────────────────── */}
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Search city or address…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            style={{ ...inputStyle, paddingLeft: 36 }}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {/* search icon inside input */}
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b9890]"
          />
          {/* clear button — shows when user has typed something */}
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelected(null);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9890]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {searchLoading && (
          <p className="text-xs text-[#9b9890] text-center py-3">Searching…</p>
        )}

        {/* search error */}
        {searchErr && !searchLoading && (
          <p className="text-xs text-[#D85A30] text-center py-3">{searchErr}</p>
        )}

        {/* results */}
        {recommendations.length > 0 && !searchLoading && (
          <div
            className="rounded-[10px] overflow-hidden mb-4"
            style={{ border: "0.5px solid rgba(0,0,0,.08)" }}
          >
            {recommendations.map((place, i) => (
              <div key={place.placeId}>
                <button
                  type="button"
                  onClick={() => handleSelect(place)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left bg-transparent border-none cursor-pointer transition-colors duration-150 ${
                    selected?.placeId === place.placeId
                      ? "bg-[#f0ede6]"
                      : "hover:bg-[#f8f7f5]"
                  }`}
                >
                  <MapPin size={13} className="text-[#9b9890] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-medium text-[#1a1814] m-0">
                      {place.city}, {place.region}
                    </p>
                    <p className="text-[11px] text-[#9b9890] m-0 mt-0.5">
                      {place.formattedAddress}
                    </p>
                  </div>
                  {selected?.placeId === place.placeId && (
                    <svg
                      className="ml-auto flex-shrink-0"
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="#1a1814"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8l3.5 3.5L13 4" />
                    </svg>
                  )}
                </button>
                {i < recommendations.length - 1 && (
                  <div style={{ borderTop: "0.5px solid rgba(0,0,0,.06)" }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* no results */}
        {query.length >= 2 &&
          !searchLoading &&
          !searchErr &&
          recommendations.length === 0 &&
          !selected && (
            <p className="text-xs text-[#9b9890] text-center py-3">
              No results found for "{query}"
            </p>
          )}

        {error && (
          <p className="text-xs text-[#D85A30] mb-3 text-center">{error}</p>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={!selected || loading || saved}
          className={`w-full p-3.5 rounded-[10px] text-[13px] font-medium text-white border-none mt-3 mb-2.5 transition-colors duration-300 ${
            saved
              ? "bg-[#1D9E75] cursor-default"
              : !selected || loading
                ? "bg-[#1a1814]/40 cursor-not-allowed"
                : "bg-[#1a1814] cursor-pointer"
          }`}
        >
          {saved ? "Saved!" : loading ? "Saving…" : "Save location"}
        </button>

        <button
          type="button"
          onClick={handleClose}
          className="w-full p-3.5 rounded-[10px] text-[13px] font-medium text-[#1a1814] cursor-pointer mb-2 bg-transparent"
          style={{ border: "0.5px solid rgba(0,0,0,.15)" }}
        >
          Cancel
        </button>
      </div>
    </ResponsiveModal>
  );
};

export default LocationSheet;
