import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// This is basically going to mostly seamlessly pass children
// through if it has children, and if it doesn't even have any
// children then it's not going to render itself
const Modal = ({ children }) => {
  // A ref is basically I have this piece of something and I need
  // that the same thing back every single time
  const elRef = useRef(null);
  // A ref is a container to give youself back the same thing every single time
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal')
    modalRoot.appendChild(elRef.current)

    // componentWillUnmount with a Functional Component
    return () => modalRoot.removeChild(elRef.current)
  }, [])

  return createPortal(<div>{children}</div>, elRef.current)
  // return createPortal(children);
};

export default Modal
