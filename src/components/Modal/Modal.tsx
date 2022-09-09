import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import bemCssModules from 'bem-css-modules';
import { default as ModalStyles } from './Modal.module.scss';

const style = bemCssModules(ModalStyles);

interface ModalInterface {
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
  handleOnClose: () => void;
  isOpen: boolean;
  sholudBeCloseOnOutsideClick: boolean;
}

const Modal = ({ children, handleOnClose, isOpen, sholudBeCloseOnOutsideClick }:ModalInterface) => {
  const modalRef = useRef<any>(null);
  let previousActiveElement = useRef<any>(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    };

    const { current: modal } = modalRef;

    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      modal.showModal();
    }
    else if (previousActiveElement.current) {
      modal.close();
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const { current: modal } = modalRef;

    const handleCancel = (e:React.MouseEvent) => {
      e.preventDefault();
      handleOnClose();
    };

    //dodawanie akcji wyjścia za pomocą klawiatury
    modal?.addEventListener('cancel', handleCancel);

    //odmontowanie akcji wujścia z klawitury
    return () => {
      modal?.removeEventListener('cancel', handleCancel);
    };
  })

  const handleOutsideClick = ({ target }: React.MouseEvent ) => {
    const { current } = modalRef;

    if (sholudBeCloseOnOutsideClick && target === current) {
      handleOnClose();
    }
  };

  return ReactDOM.createPortal((
    <dialog className={style()} ref={modalRef} onClick={handleOutsideClick}>
      {children}
    </dialog>
  ), document.body)
};

export default Modal