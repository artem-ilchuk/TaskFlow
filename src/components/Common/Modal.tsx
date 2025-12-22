import React, { useEffect, memo, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 20 },
};

export const Modal: React.FC<IModalProps> = memo(
  ({ isOpen, onClose, title, children }) => {
    const handleEsc = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (isOpen) {
        window.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
      }

      return () => {
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, handleEsc]);

    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onClose}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="modal-box relative z-10 border border-base-300 shadow-2xl bg-base-100"
            >
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-base-200 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <h3 className="font-bold text-xl mb-6 text-primary tracking-tight">
                {title}
              </h3>

              <div className="py-2 overflow-y-auto max-h-[70vh]">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );
  }
);

Modal.displayName = "Modal";
