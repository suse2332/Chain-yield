import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl shadow-lg w-full max-w-md p-6 relative border border-teal-500 animate-fadeIn">
        {title && <h2 className="text-xl font-bold text-white mb-4">{title}</h2>}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <div className="text-white space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
