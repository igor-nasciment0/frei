import { useContext } from "react";
import ModalContext from "../components/modal/context";

/**
 * Retorna a função `openModal` e o estado `isOpen`.
 *
 * @returns {{
 *   openModal: (options: {
 *     customUI: (onClose: () => void) => JSX.Element,
 *     onCloseCallback: () => void
 *   }) => void,
 *   isOpen: boolean
 * }}
 */


export default function useModal() {
    return useContext(ModalContext);
}