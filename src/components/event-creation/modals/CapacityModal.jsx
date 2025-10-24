import React from 'react'
import {Modal, AppInput} from "../../common/index"
import { useFormContext } from 'react-hook-form';

const CapacityModal = ({closeModal}) => {
  const {register, trigger} = useFormContext()

  const handleSave = async() => {
    const isValid =  await trigger("capacity")
    if(isValid){
      closeModal();
    }
  }
  
  return (
    <Modal setClose={closeModal}>
      <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-muted rounded-2xl shadow-2xl font-roboto">
        <div className="space-y-4 sm:space-y-5">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-semibold text-text">
              Capacity
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Set the maximum capacity. Registration will auto-close once the
              limit is reached.
            </p>
          </div>

          {/* Input Field */}
          <div>
            <label
              htmlFor="capacity"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Maximum Capacity
            </label>
            <AppInput
              id="capacity"
              type="number"
              placeholder="Enter a number"
              className="w-full"
              {...register("capacity", { required: false })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 transition order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 transition order-1 sm:order-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CapacityModal