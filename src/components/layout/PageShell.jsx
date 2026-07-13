
import { cn } from "@/lib/utils";

const PageShell = ({ children, className }) => (
  <div
    className={cn(
      "relative h-full w-full",
      "bg-[#f0ede6] font-roboto",
      "overflow-y-auto overflow-x-hidden",
      "scroll-smooth overscroll-none",
      "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      className
    )}
    style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
  >
    {children}
  </div>
);

export {PageShell};
