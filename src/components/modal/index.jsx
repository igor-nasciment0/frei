import { useEffect, useRef, useState } from 'react';
import ModalContext from './context';
import './index.scss';
import { sleep } from '../../util/general';
import useClickOutside from '../../util/useClickOutside';

export default function ModalProvider({ children }) {

    const [modalContent, setModalContent] = useState(null);
    const [isOpen, setIsOpen] = useState(modalContent !== null);
    const [closeCallback, setCloseCallback] = useState();

    useEffect(() => {
        if (modalContent) {
            setIsOpen(true);
            document.body.classList.add("Overflow__Hidden");
        }
        else {
            document.body.classList.remove("Overflow__Hidden");
        }

        return () => document.body.classList.remove("Overflow__Hidden");
    }, [modalContent])

    async function closeModal() {
        document.getElementById("Modal__Overlay").classList.add("Modal___Closing");
        await sleep(200);

        setIsOpen(false);
        setModalContent(null);

        if (closeCallback)
            closeCallback();

        setCloseCallback(null);
    }

    async function openModal({ customUI, onCloseCallback }) {
        setModalContent(customUI(() => { closeModal(); if (onCloseCallback) onCloseCallback() }));
        setCloseCallback(() => onCloseCallback)
    }

    const modalRef = useRef();
    useClickOutside(modalRef, closeModal);

    return (
        <ModalContext.Provider value={{ openModal, isOpen }}>
            {isOpen &&
                <div id='Modal__Overlay' >
                    <div ref={modalRef}>
                        {modalContent}
                    </div>
                </div>
            }

            {children}
        </ModalContext.Provider>
    )
}