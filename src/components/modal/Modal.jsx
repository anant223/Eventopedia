import React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({children}) => {
  React.useEffect((()=>{
    document.body.style.overscrollBehaviorY = "hidden";
    document.body.style.overflowY = "hidden";

    return () =>{
      document.body.style.overscrollBehaviorY = "auto";
      document.body.style.overflowY = "auto";
    }

  }),[])
  return createPortal(
     <div className=" absolute bg-black sm:bg-opacity-50 sm:flex sm:justify-center items-center z-50 inset-0 top-16">
        {children}
    </div>, document.body
  )
}

export default Modal