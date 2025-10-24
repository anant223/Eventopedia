import { X } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const Modal = ({ children, setClose}) => {
  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      onClick={setClose}
      className="fixed inset-0 flex items-center justify-center bg-[#00000099]/50 z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -30 }}
        transition={{ 
          duration: 0.25, 
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth spring-like feel
          layout: { duration: 0.2 }
        }}
        onClick={handlePropagation}
        className="relative w-full max-w-md mx-4 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div>{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
