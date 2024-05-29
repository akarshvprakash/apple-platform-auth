// components/Modal.tsx
'use client';
import { useEffect, ReactNode } from 'react';

interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, children }) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 relative">
        <button
          className="absolute top-2 right-2"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
