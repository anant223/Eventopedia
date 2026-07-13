import { cn } from "@/lib/utils";

const Row = ({
  icon ,
  iconBg = "bg-muted",
  iconColor = "text-muted-foreground",
  title,
  subtitle,
  right,
  danger = false,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-[13px] transition-colors",
        onClick && "cursor-pointer hover:bg-muted/50",
        className
      )}
    >
      <div
        className={cn(
          "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px]",
          danger ? "bg-[#FAECE7] text-[#D85A30]" : `${iconBg} ${iconColor}`
        )}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-medium",
            danger ? "text-[#D85A30]" : "text-[#1a1814]"
          )}
        >
          {title}
        </p>

        {subtitle && (
          <p className="mt-[2px] text-xs text-[#9b9890]">{subtitle}</p>
        )}
      </div>

      {/* Right Side */}
      {right}
    </div>
  );
};

export default Row;
