import React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white overflow-hidden shadow-sm mb-6 rounded-lg border",
      className
    )}
  >
    {children}
  </div>
));
Card.displayName = "Card";

export { Card };
