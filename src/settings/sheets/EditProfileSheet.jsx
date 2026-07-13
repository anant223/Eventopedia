import ResponsiveModal from "@/components/my-ui/Sheet";
import useAuth from "@/hooks/useAuth";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const EditProfileSheet = ({ open, onClose }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const imgRef = useRef(null);

  const { updateProfileError, updateUserProfile, user } = useAuth();

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
    },
  });
  const bioValue = watch("bio", user?.bio || "");

  const handleImgRef = () => imgRef.current.click();

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    const render = new FileReader();
    render.onload = () => {
      setAvatarPreview(render.result);
    };
    render.readAsDataURL(file);
  };

  const handleClose = () => {
    setLoading(false);
    setSaved(false);
    setError(null);
    setAvatarFile(null);
    setAvatarPreview(null);
    onClose();
  };

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("name", data.name.trim());
    fd.append("bio", data.bio.trim());
    if (avatarFile) fd.append("avatar", avatarFile);
    try {
      await updateUserProfile(fd);
      setSaved(true);
      setTimeout(() => handleClose(), 1200);
    } catch (error) {
      setError(updateProfileError);
      setLoading(false);
    }
  };

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
    <ResponsiveModal open={open} onOpenChange={handleClose}>
      <div className="px-5 pt-5 z-50">
        <form onSubmit={handleSubmit(handleProfileUpdate)}>
          <div
            className="flex items-center gap-4 mb-5 pb-5"
            style={{ borderBottom: "0.5px solid rgba(0,0,0,.07)" }}
          >
            <div
              onClick={handleImgRef}
              className="relative cursor-pointer flex-shrink-0"
            >
              {avatarPreview || user?.avatar ? (
                <img
                  src={avatarPreview || user?.avatar}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#f0ede6]"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#1a1814] text-[#f2eee7] text-[22px] font-medium flex items-center justify-center">
                  {user?.name?.[0]?.toUpperCase() ?? "G"}
                </div>
              )}

              {/* camera badge */}
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full  border-2 flex items-center justify-center bg-white shadow-sm">
                <Camera size={14} className="text-[#1a1814]" />
              </div>
            </div>

            <div>
              <p className="text-[13px] font-medium text-[#1a1814] m-0">
                Profile photo
              </p>
              <button
                type="button"
                onClick={handleImgRef}
                className="text-[12px] text-[#9b9890] bg-none border-none cursor-pointer p-0 mt-0.5"
              >
                Tap to change
              </button>
            </div>
            <input
              ref={imgRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatar}
            />
          </div>
          {/* name */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-[#9b9890] mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              defaultValue={user.name}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* bio */}
          <div className="mb-5">
            <label className=" block text-xs font-medium text-[#9b9890] mb-2">
              Bio
            </label>
            <textarea
              placeholder="Tell people a bit about yourself…"
              defaultValue={user.bio}
              {...register("bio")}
              maxLength={160}
              rows={3}
              className=" resize-none"
              style={{
                ...inputStyle,
                resize: "none",
              }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <p className="text-xs text-[#9b9890] text-right mt-1">
              {bioValue.length}/160
            </p>
          </div>
          {error && <p className="text-red text-xs mb-2">{error.message}</p>}
          <button
            type="submit"
            disabled={loading || saved}
            className={`w-full p-3.5 text-sm font-medium border-none rounded-[10px] text-white mb-2.5 transition-colors duration-300 ${
              saved
                ? "bg-[#1D9E75] cursor-default"
                : loading
                  ? "bg-[#1a1814]/70 cursor-not-allowed"
                  : "bg-[#1a1814] cursor-pointer"
            }`}
          >
            {saved ? "Saved!" : loading ? "Updating…" : "Update"}
          </button>
          <button
            onClick={handleClose}
            type="button"
            className="w-full p-3.5 font-medium text-sm bg-transparent rounded-[10px] cursor-pointer text-[#1a1814] mb-2"
            style={{ border: "0.5px solid rgba(0,0,0,.15)" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </ResponsiveModal>
  );
};

export default EditProfileSheet