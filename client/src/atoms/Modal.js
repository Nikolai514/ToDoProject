import React from 'react';
import { Modal as ModalB } from 'react-bootstrap';
import './Modal.css'

const Modal = ({ children, isOpen, modalClose, dialogClassName, centered }) => {
  return (
    <>
      <ModalB dialogClassName={dialogClassName} centered={centered} show={isOpen} onHide={modalClose}  size="lg">
        {children}
      </ModalB>
    </>
  );
};

export default Modal;
