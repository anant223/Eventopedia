import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PageShell } from "@/components/layout/PageShell";
import {BodyContainer} from "@/components/containers/Container";
import TipTapEditor from "@/components/common/Tiptap";
import { Eye, ImagePlus, Lock, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResponsiveModal from "@/components/my-ui/Sheet";
import Tiptap from "@/components/common/Tiptap";
import { Card } from "@/components/ui/card";

const CATEGORIES = [
  "tech",
  "business",
  "health",
  "education",
  "entertainment",
  "sports",
  "other",
];
const CURRENCIES = ["INR", "USD"];

// ─── primitives ───────────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.07)", marginLeft: 52 }} />
);

const SectionLabel = ({ children }) => (
  <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#9b9890] mb-2">
    {children}
  </p>
);

const FieldLabel = ({ children, required }) => (
  <label className="block text-[12px] font-medium text-[#9b9890] mb-1.5">
    {children}
    {required && <span className="text-[#D85A30] ml-0.5">*</span>}
  </label>
);

const FieldError = ({ message }) =>
  message ? <p className="text-[11px] text-[#D85A30] mt-1">{message}</p> : null;

const TextInput = ({ className, ...props }) => (
  <input
    {...props}
    className={cn(
      "w-full bg-[#f8f7f5] border border-black/[0.12] rounded-xl px-3 py-2.5",
      "text-[13px] text-[#1a1814] placeholder:text-[#9b9890]",
      "outline-none focus:border-black/40 focus:bg-white transition-colors font-[inherit]",
      className
    )}
  />
);

const ToggleChip = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex-1 py-2.5 rounded-xl text-[13px] font-medium border transition-all cursor-pointer",
      active
        ? "bg-[#1a1814] text-[#f2eee7] border-[#1a1814]"
        : "bg-transparent text-[#9b9890] border-black/12 hover:border-black/25"
    )}
  >
    {label}
  </button>
);

const OptionRow = ({ icon, title, sub, children }) => (
  <div className="flex items-center justify-between gap-3 py-3.5">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#f0ede6] flex items-center justify-center shrink-0 text-[#9b9890]">
        {icon}
      </div>
      <div>
        <p className="text-[13px] font-medium text-[#1a1814]">{title}</p>
        {sub && <p className="text-[11px] text-[#9b9890] mt-0.5">{sub}</p>}
      </div>
    </div>
    {children}
  </div>
);

// ─── image upload ─────────────────────────────────────────────────────────────

const ImageUpload = ({ value, onChange }) => {
  let inputRef = null;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange({ file, preview: ev.target.result });
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => inputRef?.click()}
      className={cn(
        "relative w-full rounded-2xl overflow-hidden cursor-pointer transition-colors",
        "border border-dashed border-black/20 hover:border-black/40",
        value
          ? "h-52"
          : "h-44 bg-[#f8f7f5] flex flex-col items-center justify-center gap-2"
      )}
    >
      {value ? (
        <>
          <img
            src={value.preview}
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center border-none cursor-pointer text-white text-base leading-none"
          >
            ×
          </button>
          <span className="absolute bottom-2.5 right-2.5 bg-black/50 text-white text-[11px] font-medium px-2.5 py-1 rounded-full pointer-events-none">
            Change photo
          </span>
        </>
      ) : (
        <>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9b9890"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <p className="text-[13px] text-[#9b9890]">
            <span className="text-[#1a1814] font-medium">
              Tap to add cover photo
            </span>
          </p>
          <p className="text-[11px] text-[#9b9890]">PNG, JPG up to 5MB</p>
        </>
      )}
      <input
        ref={(el) => {
          inputRef = el;
        }}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};

// ─── location input ───────────────────────────────────────────────────────────

const LocationInput = ({ value, onChange }) => {
  const [query, setQuery] = useState(value?.address ?? "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  let debounceTimer = null;

  const search = async (q) => {
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const token = import.meta.env.VITE_MAPBOX_TOKEN;
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q.trim())}.json?access_token=${token}&limit=5`
      );
      const data = await res.json();
      setResults(data.features ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setOpen(true);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => search(e.target.value), 350);
  };

  const select = (f) => {
    const [lng, lat] = f.geometry.coordinates;
    onChange({ address: f.place_name, lat, lng, locationId: f.id });
    setQuery(f.place_name);
    setResults([]);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b9890] pointer-events-none"
          width="13"
          height="13"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 2C5.2 2 3 4.2 3 7c0 3.5 5 8 5 8s5-4.5 5-8c0-2.8-2.2-5-5-5z" />
          <circle cx="8" cy="7" r="1.5" />
        </svg>
        <TextInput
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search address or 'Online'"
          className="pl-9"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border border-[#9b9890] border-t-transparent rounded-full animate-spin" />
        )}
      </div>
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-black/[0.09] rounded-xl overflow-hidden z-30 shadow-sm"
          >
            {results.map((f) => (
              <button
                key={f.id}
                type="button"
                onMouseDown={() => select(f)}
                className="w-full text-left px-4 py-2.5 hover:bg-[#f8f7f5] transition-colors border-none bg-transparent cursor-pointer"
              >
                <p className="text-[13px] font-medium text-[#1a1814] truncate">
                  {f.text}
                </p>
                <p className="text-[11px] text-[#9b9890] truncate">
                  {f.place_name}
                </p>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── tag input ────────────────────────────────────────────────────────────────

const TagInput = ({ value = [], onChange }) => {
  const [input, setInput] = useState("");
  const add = () => {
    const tag = input.trim().toLowerCase();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  };
  return (
    <div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {value.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f0ede6] rounded-full text-[12px] text-[#1a1814] border border-black/10"
            >
              {t}
              <button
                type="button"
                onClick={() => onChange(value.filter((x) => x !== t))}
                className="text-[#9b9890] hover:text-[#1a1814] bg-transparent border-none cursor-pointer p-0 leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <TextInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Add a tag and press Enter…"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={add}
          className="rounded-xl border-black/15 text-[#1a1814] shrink-0"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

// ─── user search ──────────────────────────────────────────────────────────────

const UserSearch = ({ value = [], onChange, placeholder }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let debounceTimer = null;

  const search = async (q) => {
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data?.data ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => search(e.target.value), 350);
  };

  const add = (u) => {
    if (value.find((x) => x._id === u._id)) return;
    onChange([...value, u]);
    setQuery("");
    setResults([]);
  };

  return (
    <div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((u) => (
            <div
              key={u._id}
              className="flex items-center gap-1.5 bg-white border border-black/[0.09] rounded-full pl-1 pr-2.5 py-1"
            >
              <div className="w-5 h-5 rounded-full bg-[#1a1814] text-[#f2eee7] flex items-center justify-center text-[9px] font-medium shrink-0">
                {u.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-[12px] text-[#1a1814]">
                {u.name ?? u.username}
              </span>
              <button
                type="button"
                onClick={() => onChange(value.filter((x) => x._id !== u._id))}
                className="text-[#9b9890] hover:text-[#1a1814] bg-transparent border-none cursor-pointer p-0 ml-0.5"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="relative">
        <TextInput
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 border border-[#9b9890] border-t-transparent rounded-full animate-spin" />
        )}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-black/[0.09] rounded-xl overflow-hidden z-30 shadow-sm"
            >
              {results.map((u) => (
                <button
                  key={u._id}
                  type="button"
                  onClick={() => add(u)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#f8f7f5] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1a1814] text-[#f2eee7] flex items-center justify-center text-[11px] font-medium shrink-0">
                    {u.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-medium text-[#1a1814]">
                      {u.name}
                    </p>
                    <p className="text-[11px] text-[#9b9890]">@{u.username}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── description button (shows filled preview or placeholder) ─────────────────

const DescriptionBtn = ({ value, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full text-left py-2 border-none bg-transparent cursor-pointer group"
  >
    {value ? (
      // show stripped text preview when description is filled
      <p
        className="text-[14px] text-[#6b6966] leading-relaxed line-clamp-3"
        dangerouslySetInnerHTML={{
          __html:
            value.replace(/<[^>]*>/g, " ").trim() ||
            "Tell people what to expect…",
        }}
      />
    ) : (
      <p className="text-[14px] text-[#c0bdb8] group-hover:text-[#9b9890] transition-colors">
        Tell people what to expect…
      </p>
    )}
  </button>
);

// ─── main page ────────────────────────────────────────────────────────────────


const EventFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMore, setShowMore] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [showDescModal, setShowDescModal] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: null,
      title: "",
      desc: "",
      category: "other",
      startDateTime: "",
      endDateTime: "",
      location: null,
      eventType: "public",
      ticketType: "free",
      price: "",
      currency: "INR",
      totalTickets: "",
      requireApproval: false,
      tags: [],
      hosts: [],
      invitedUsers: [],
    },
  });

  const eventType = watch("eventType");
  const ticketType = watch("ticketType");
  const desc = watch("desc");

  const onSubmit = async (data, status = "active") => {
    status === "draft" ? setSavingDraft(true) : setSubmitting(true);
    const fd = new FormData();
    fd.append("title", data.title);
    fd.append("desc", data.desc || " ");
    fd.append("category", data.category);
    fd.append("startDateTime", data.startDateTime);
    fd.append("endDateTime", data.endDateTime);
    fd.append("eventType", data.eventType);
    fd.append("ticketType", data.ticketType);
    fd.append("price", data.price || 0);
    fd.append("currency", data.currency);
    fd.append("requireApproval", data.requireApproval);
    fd.append("status", status);
    if (data.image?.file) fd.append("image", data.image.file);
    if (data.location) {
      fd.append("location[address]", data.location.address);
      if (data.location.lat) fd.append("location[lat]", data.location.lat);
      if (data.location.lng) fd.append("location[lng]", data.location.lng);
      if (data.location.locationId)
        fd.append("locationId", data.location.locationId);
    }
    if (data.totalTickets) fd.append("totalTickets", data.totalTickets);
    data.tags.forEach((t) => fd.append("tags[]", t));
    data.hosts.forEach((h) => fd.append("hosts[]", h._id));
    data.invitedUsers.forEach((u) => fd.append("invitedUsers[]", u._id));

    try {
      // await dispatch(createEvent(fd)).unwrap();
      navigate("/");
    } finally {
      setSubmitting(false);
      setSavingDraft(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onSubmit(data, "active"))}>
        {/* ── sticky header ── */}
        <div className="sticky top-0 z-20 bg-[#f0ede6]/90 backdrop-blur-sm border-b border-black/[0.06]">
          <BodyContainer>
            <div className="flex items-center justify-between py-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-[13px] text-[#9b9890] bg-transparent border-none cursor-pointer p-0"
              >
                Cancel
              </button>
              <p className="text-[15px] font-medium text-[#1a1814]">
                New event
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="text-[13px] font-semibold text-[#1a1814] bg-transparent border-none cursor-pointer p-0 disabled:opacity-50"
              >
                {submitting ? "Posting…" : "Post"}
              </button>
            </div>
          </BodyContainer>
        </div>

        <BodyContainer className="pt-2 py-10 flex flex-col gap-5">
          {/* ── visibility + category ── */}
          <div className="flex items-center gap-2.5">
            <Controller
              name="eventType"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-fit gap-2 bg-white border border-white rounded-full px-3.5 h-9 text-[13px] font-medium text-[#1a1814] shadow-none focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-black/20 shadow-sm bg-white">
                    <SelectItem value="public">
                      <span className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5" />
                        Public
                      </span>
                    </SelectItem>
                    <SelectItem value="private">
                      <span className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5" />
                        Private
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-fit gap-2 bg-white border border-black/[0.09] rounded-full px-3.5 h-9 text-[13px] font-medium text-[#1a1814] shadow-none capitalize focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat} >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* ── image ── */}
          <Controller
            name="image"
            control={control}
            rules={{ required: "Cover photo is required" }}
            render={({ field }) => (
              <div>
                <ImageUpload value={field.value} onChange={field.onChange} />
                <FieldError message={errors.image?.message} />
              </div>
            )}
          />

          {/* ── title ── */}
          <div>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="What's your event called?"
                  className="w-full border-none outline-none text-[18px] font-medium text-[#1a1814] bg-transparent placeholder:text-[#c0bdb8] font-[inherit]"
                />
              )}
            />
            <FieldError message={errors.title?.message} />
            <Separator className="mt-3 bg-black/20" />
          </div>

          {/* ── description — taps to open TipTap modal ── */}
          <div>
            <DescriptionBtn
              value={desc}
              onClick={() => setShowDescModal(true)}
            />
            {/* show edit hint when description is filled */}
            {desc && (
              <button
                type="button"
                onClick={() => setShowDescModal(true)}
                className="text-[11px] text-[#9b9890] hover:text-[#1a1814] bg-transparent border-none cursor-pointer p-0 mt-1 transition-colors"
              >
                Edit description →
              </button>
            )}
            <Separator className="mt-3 bg-black/20 h-[0.5px]" />
          </div>

          {/* ── location ── */}
          <div>
            <SectionLabel>Location</SectionLabel>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <LocationInput value={field.value} onChange={field.onChange} />
              )}
            />
            <FieldError message={errors.location?.message} />
          </div>

          {/* ── date & time ── */}
          <div>
            <SectionLabel>Date & time</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel required>Start</FieldLabel>
                <Controller
                  name="startDateTime"
                  control={control}
                  rules={{ required: "Start date required" }}
                  render={({ field }) => (
                    <TextInput type="datetime-local" {...field} />
                  )}
                />
                <FieldError message={errors.startDateTime?.message} />
              </div>
              <div>
                <FieldLabel required>End</FieldLabel>
                <Controller
                  name="endDateTime"
                  control={control}
                  rules={{ required: "End date required" }}
                  render={({ field }) => (
                    <TextInput type="datetime-local" {...field} />
                  )}
                />
                <FieldError message={errors.endDateTime?.message} />
              </div>
            </div>
          </div>

          {/* ── more options toggle ── */}
          <button
            type="button"
            onClick={() => setShowMore((p) => !p)}
            className="flex items-center justify-between w-full py-3.5 bg-white border border-black/[0.08] rounded-2xl px-4 cursor-pointer"
          >
            <span className="text-[13px] font-medium text-[#1a1814]">
              {showMore ? "Hide options" : "More options"}
            </span>
            <motion.svg
              animate={{ rotate: showMore ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#9b9890"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6l5 5 5-5" />
            </motion.svg>
          </button>

          {/* ── more options ── */}
          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden flex flex-col gap-4"
              >
                {/* tickets */}
                <div className="bg-white border border-black/[0.08] rounded-2xl p-4">
                  <SectionLabel>Tickets</SectionLabel>
                  <Controller
                    name="ticketType"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-2 mb-3">
                        <ToggleChip
                          label="Free"
                          active={field.value === "free"}
                          onClick={() => field.onChange("free")}
                        />
                        <ToggleChip
                          label="Paid"
                          active={field.value === "paid"}
                          onClick={() => field.onChange("paid")}
                        />
                      </div>
                    )}
                  />
                  <AnimatePresence>
                    {ticketType === "paid" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden flex flex-col gap-3"
                      >
                        <div>
                          <FieldLabel required>Price</FieldLabel>
                          <div className="flex gap-2">
                            <Controller
                              name="currency"
                              control={control}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  className="bg-[#f8f7f5] border border-black/12 rounded-xl px-3 py-2.5 text-[13px] text-[#1a1814] outline-none w-24 shrink-0 font-[inherit]"
                                >
                                  {CURRENCIES.map((c) => (
                                    <option key={c} value={c}>
                                      {c}
                                    </option>
                                  ))}
                                </select>
                              )}
                            />
                            <Controller
                              name="price"
                              control={control}
                              rules={{ required: ticketType === "paid" }}
                              render={({ field }) => (
                                <TextInput
                                  type="number"
                                  placeholder="0"
                                  min="0"
                                  {...field}
                                  className="flex-1"
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div>
                          <FieldLabel required>Total tickets</FieldLabel>
                          <Controller
                            name="totalTickets"
                            control={control}
                            rules={{ required: ticketType === "paid" }}
                            render={({ field }) => (
                              <TextInput
                                type="number"
                                placeholder="e.g. 100"
                                min="1"
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* require approval */}
                <div className="bg-white border border-black/[0.08] rounded-2xl px-4">
                  <Controller
                    name="requireApproval"
                    control={control}
                    render={({ field }) => (
                      <OptionRow
                        icon={
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 8l3.5 3.5L13 4" />
                          </svg>
                        }
                        title="Require approval"
                        sub="Manually approve each attendee"
                      >
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </OptionRow>
                    )}
                  />
                </div>

                {/* tags */}
                <div className="bg-white border border-black/[0.08] rounded-2xl p-4">
                  <SectionLabel>Tags</SectionLabel>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <TagInput value={field.value} onChange={field.onChange} />
                    )}
                  />
                </div>

                {/* co-hosts */}
                <div className="bg-white border border-black/[0.08] rounded-2xl p-4">
                  <SectionLabel>Co-hosts</SectionLabel>
                  <Controller
                    name="hosts"
                    control={control}
                    render={({ field }) => (
                      <UserSearch
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Search by name or username…"
                      />
                    )}
                  />
                </div>

                {/* invite users — private only */}
                <AnimatePresence>
                  {eventType === "private" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white border border-black/[0.08] rounded-2xl p-4 overflow-hidden"
                    >
                      <SectionLabel>Invite people</SectionLabel>
                      <p className="text-[12px] text-[#9b9890] mb-3">
                        Only invited users can see this event
                      </p>
                      <Controller
                        name="invitedUsers"
                        control={control}
                        render={({ field }) => (
                          <UserSearch
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Search people to invite…"
                          />
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── bottom actions ── */}
          <div className="flex gap-3 pt-2 pb-8">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl border-black/15 text-[#1a1814] h-12"
              disabled={savingDraft}
              onClick={handleSubmit((data) => onSubmit(data, "draft"))}
            >
              {savingDraft ? "Saving…" : "Save draft"}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="flex-[2] rounded-xl bg-[#1a1814] text-[#f2eee7] h-12 hover:bg-[#1a1814]/90"
            >
              {submitting ? "Publishing…" : "Publish event"}
            </Button>
          </div>
        </BodyContainer>
      </form>

      {/* ── TipTap description modal ── */}
      <ResponsiveModal open={showDescModal} onOpenChange={setShowDescModal}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[15px] font-medium text-[#1a1814]">
              Description
            </p>
            <button
              type="button"
              onClick={() => setShowDescModal(false)}
              className="text-[13px] font-semibold text-[#1a1814] bg-transparent border-none cursor-pointer p-0"
            >
              Done
            </button>
          </div>
          <Tiptap
            content={desc}
            onChange={(html) =>
              setValue("desc", html, { shouldValidate: true })
            }
          />
        </Card>
      </ResponsiveModal>
    </div>
  );
};

export default EventFormPage;