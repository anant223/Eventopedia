import * as React from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all capitalize",
  {
    variants: {
      variant: {
        default: "bg-primary text-white border-transparent hover:opacity-90",
        active: "bg-green-100 text-green-700 border-green-200",
        cancelled: "bg-red-100 text-red-600 border-red-200",
        draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
        outline:"bg-white text-[#1a1814] border-black/[0.09] hover:border-black/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Badge = ({ className, variant, children, ...props }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Badge;
