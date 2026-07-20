
const SocialBtn = ({ icon, label, isDisable, onClick, className = "" }) => {
  return (
    <button
      disabled={isDisable}
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2.5 w-full h-11 bg-white border border-black/10 rounded-xl text-[13.5px] font-semibold text-[#1a1814] transition-colors hover:bg-[#f9f7f4] hover:border-black/20 active:scale-[0.99] ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}



// ─── Form Field ────────────────────────────────────────────────────────────────
import { forwardRef } from "react";

const Field = forwardRef(
  ({ label, type = "text", icon: Icon, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[11.5px] font-semibold text-[#1a1814] tracking-[0.1px]">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 pointer-events-none" />
          )}
          <input
            ref={ref}
            type={type}
            className={`h-11 w-full bg-[#faf9f7] border border-black/[0.13] rounded-[11px] px-3.5 text-[14px] text-[#1a1814] placeholder:text-[#8a8480]/60 outline-none transition-all focus:border-[#D85A30] focus:bg-white focus:shadow-[0_0_0_3px_rgba(216,90,48,0.12)] ${Icon ? "pl-9" : ""}`}
            {...rest}
          />
        </div>
      </div>
    );
  }
);

Field.displayName = "Field"; // good practice with forwardRef, helps DevTools/debugging



const  OrDivider = () => {
  return (
    <div className="flex items-center gap-2.5 my-3.5">
      <div className="flex-1 h-px bg-black/[0.08]" />
      <span className="text-[11.5px] font-medium text-[#8a8480]">or</span>
      <div className="flex-1 h-px bg-black/[0.08]" />
    </div>
 

);
}

export {
    SocialBtn,
    OrDivider,
    Field,
}