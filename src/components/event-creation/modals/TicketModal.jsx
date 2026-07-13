import React, { useRef } from "react";
import { AppInput, Modal } from "../../common/index";
import { useFormContext } from "react-hook-form";
import { IndianRupee } from "lucide-react";


const TicketModal = ({ closeModal }) => {
  const {
    register,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const originalValue = useRef(watch("ticket"));

  const handleSave = async () => {
    const isValid = await trigger("ticket");
    if (isValid) {
      closeModal();
    }
  };

  const handleCancel = () => {
    setValue("ticket", originalValue.current);
    closeModal();
  };

  return (
    <Modal setClose={closeModal}>
      <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-muted rounded-2xl shadow-2xl font-roboto">
        <div className="space-y-4 sm:space-y-5">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-semibold text-text">
              Ticket Pricing
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Choose whether your event is free or set a ticket price.
            </p>
          </div>

          <div>
            <label
              htmlFor="ticketPrice"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Ticket Price
            </label>

            <div className="flex items-stretch rounded-xl overflow-hidden border border-border bg-background focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <div className="flex items-center gap-2 px-3 bg-muted border-r border-border">
                <IndianRupee className="w-4 h-4 text-gray-400" />
                <select
                  className="bg-transparent text-sm text-text focus:outline-none cursor-pointer"
                  {...register("currency")}
                  defaultValue="INR"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <AppInput
                id="ticketPrice"
                type="number"
                placeholder="0 for free"
                {...register("ticket", {
                  min: { value: 0, message: "Price cannot be negative" },
                  max: {
                    value: 1000000,
                    message: "Price cannot exceed ₹1,00,0000",
                  },
                })}
              />
            </div>

            {errors.ticket && (
              <p className="text-red-500 text-xs mt-1">
                {errors.ticket.message}
              </p>
            )}

            <p className="text-xs text-gray-500 mt-1">
              Leave empty or enter 0 for free events
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 transition order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 transition order-1 sm:order-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TicketModal;
