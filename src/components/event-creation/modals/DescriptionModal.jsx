import React from 'react'
import {Modal, Tiptap} from "../../common/index"


  const DescriptionModal = ({closeModal}) => {
    return (
      <Modal setClose={closeModal} title="Description">
        <div className="p-4 sm:p-6">
          <Tiptap 
            setClose={closeModal} 
            className="w-full min-h-[280px] sm:min-h-[320px] bg-[#0f1010] p-4 shadow-inner rounded-xl border border-gray-700" 
          />
        </div>
      </Modal>
    );
  }


export default DescriptionModal