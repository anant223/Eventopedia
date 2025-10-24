import React, { useRef } from 'react'
import {Modal} from "../../common/index"
import { useFormContext } from 'react-hook-form';

const CategoryModal = ({closeModal}) => {
  const {register, trigger, setValue, watch, formState: {errors}} = useFormContext()
  const originalValues = useRef({
    category: watch("category"),
    tags: watch("tags"),
  });

  const handleSave = async () => {
    const isValid = await trigger(["category", "tags"]);
    if (isValid) {
      closeModal();
    }
  };
  const handleCancel = () => {
    setValue("category", originalValues.current.category);
    setValue("tags", originalValues.current.tags);
    closeModal();
  };
  return (
    <Modal setClose={closeModal}>
      <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-muted rounded-2xl shadow-2xl font-roboto">
        <div className="space-y-4 sm:space-y-5">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-semibold text-text">
              Category & Tags
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Categorize your event and add relevant tags
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Category
              </label>
              <select
                {...register("category", {
                  required: "Please select a category",
                })}
                id="category"
                className="w-full p-3 bg-background border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
              >
                <option value="">Select category</option>
                <option value="tech">Technology</option>
                <option value="business">Business</option>
                <option value="health">Health & Wellness</option>
                <option value="education">Education</option>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Tags
              </label>
              <input
                id="tags"
                className="w-full p-3 bg-background border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-white placeholder-gray-400"
                placeholder="Add tags separated by commas"
                {...register("tags", {
                  required: "Please add at least one tag",
                })}
              />
              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tags.message}
                </p>
              )}
            </div>
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

export default CategoryModal