import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import IconButton from "@mui/material/IconButton";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  showClose: boolean;
  children?: React.ReactNode;
};

const Modal = ({ isOpen, onClose, showClose, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const ModalCloseButton = () => (
    <div className="modal-close">
      <IconButton aria-label="cancel" color="warning" onClick={onClose}>
        <CancelOutlinedIcon />
      </IconButton>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {showClose && <ModalCloseButton />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
