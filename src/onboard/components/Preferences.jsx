import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { color, motion } from "framer-motion";
import { Field } from "@/auth/components/Components";
import useCategory from "@/hooks/useCategory";
import { clearRegisteredEvents } from "@/app/slices/registerSlice";

const CountPill = ({ count }) => {
  const isValid = count >= 2 && count <= 5;
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11.5px] font-bold ${
        isValid
          ? "bg-[#3B6D11]/10 text-[#3B6D11]"
          : "bg-[#D85A30]/10 text-[#D85A30]"
      }`}
    >
      {count}/5
    </span>
  );
}

// ─── Interest tag input ────────────────────────────────────────────────────────
const InterestInput = ({ interests, onChange, remaining }) => {
  const [input, setInput] = useState("");

  const add = (val) => {
    const cleaned = val
      .trim()
      .toLowerCase()
      .replace(/<[^>]*>/g, "");
    if (!cleaned || cleaned.length > 50) return;
    if (interests.includes(cleaned)) {
      setInput("");
      return;
    }
    if (remaining <= 0) return;
    onChange([...interests, cleaned]);
    setInput("");
  };

  const remove = (tag) => onChange(interests.filter((t) => t !== tag));

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(input);
    }
    if (e.key === "Backspace" && !input && interests.length)
      remove(interests[interests.length - 1]);
  };

  return (
    <div>
      {interests.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {interests.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2.5 py-0.5 bg-[#D85A30] text-white text-[12px] font-semibold rounded-full"
            >
              #{tag}
              <button
                type="button"
                onClick={() => remove(tag)}
                aria-label={`Remove ${tag}`}
                className="text-white/70 hover:text-white ml-0.5"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => input && add(input)}
          placeholder={
            remaining > 0 ? "e.g. hiking, vinyl, startups…" : "Max reached"
          }
          disabled={remaining <= 0}
          className="flex-1 h-9 bg-[#faf9f7] border border-black/[0.1] rounded-[10px] px-3 text-[13px] text-[#1a1814] placeholder:text-[#9a9590] outline-none transition-all focus:border-[#D85A30] focus:shadow-[0_0_0_3px_rgba(216,90,48,0.1)] disabled:opacity-50"
        />
        <button
          type="button"
          onClick={() => add(input)}
          disabled={!input.trim() || remaining <= 0}
          className="px-4 h-9 bg-[#D85A30] text-white text-[12.5px] font-bold rounded-[10px] hover:bg-[#c04e28] disabled:opacity-40 transition-all"
        >
          Add
        </button>
      </div>
      <p className="text-[11px] text-[#9a9590] mt-1.5">
        Press{" "}
        <kbd className="px-1 bg-[#f0ede6] rounded text-[10px] font-medium">
          Enter
        </kbd>{" "}
        or{" "}
        <kbd className="px-1 bg-[#f0ede6] rounded text-[10px] font-medium">
          ,
        </kbd>{" "}
        to add
      </p>
    </div>
  );
}

const Preferences = ({ totalCount }) => {
  const { watch, setValue } = useFormContext();
  const selectedSlugs = watch("categories") || [];
  const selectedIds = watch("preferredCategories") || [];
  const interests = watch("interests") || [];
  const remaining = 5 - totalCount;
  const {categories, error, reFetchCategory, isCategoryLoading } = useCategory()


  const toggleCategory = ({ slug, id }) => {
    if (selectedSlugs.includes(slug)) {
      setValue(
        "categories",
        selectedSlugs.filter((s) => s !== slug),
        { shouldValidate: true }
      );
      setValue(
        "preferredCategories",
        selectedIds.filter((i) => i !== id),
        { shouldValidate: true }
      );
    } else {
      if (remaining <= 0) return;
      setValue("categories", [...selectedSlugs, slug], {
        shouldValidate: true,
      });
      setValue("preferredCategories", [...selectedIds, id], {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className=" relative">
      <div className="flex items-start justify-between mb-1.5">
        <h2 className="text-[22px] font-extrabold text-[#1a1814] tracking-[-0.04em] leading-tight">
          What are you into?
        </h2>
        <CountPill count={totalCount} />
      </div>
      <p className="text-[13.5px] text-[#6b6966] mb-5 leading-relaxed">
        Pick 2–5 things to personalise your discovery feed.
      </p>

      {/* Categories */}
      <div className="mb-1.5">
        <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#9a9590] mb-2.5">
          Categories
        </p>
        {isCategoryLoading ? (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 bg-[#f0ede6] rounded-full animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
            {categories?.map((category) => {
              const {slug, _id: id, color, name, emoji} = category
              console.log(id)
              const isSelected = selectedIds.includes(id);
              const disabled = !isSelected && remaining <= 0;
              return (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => toggleCategory({slug, id})}
                  disabled={disabled}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all ${
                    isSelected
                      ? "text-white border-transparent"
                      : "bg-white text-[#1a1814] border-black/[0.09] hover:border-black/20"
                  } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                  style={
                    isSelected
                      ? {
                          background: color,
                          borderColor: color,
                        }
                      : {}
                  }
                >
                  <span>{emoji}</span>
                  <span>{name}</span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Interests */}
      <div>
        <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#9a9590] mb-2.5">
          Interests
        </p>
        <InterestInput
          interests={interests}
          onChange={(val) => setValue("interests", val)}
          remaining={remaining}
        />
      </div>
    </div>
  );
}
export default Preferences;