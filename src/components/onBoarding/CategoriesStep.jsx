import { Check } from 'lucide-react';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { categories } from '@/utils/constant';


const CategoriesStep = () => {
  const { setValue, watch } = useFormContext();
  const preferredCategories = watch('preferredCategories') || [];

  const toggleCategory = (value) => {
    const isExist = preferredCategories.includes(value);
    if (isExist) {
      setValue(
        'preferredCategories',
        preferredCategories.filter((category) => category !== value)
      );
    } else {
      setValue('preferredCategories', [...preferredCategories, value]);
    }
  };

  const progressPercentage = Math.round((preferredCategories.length / categories.length) * 100);

  return (
    <div className="min-h-screen w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black sm:h-14 sm:w-14">
              <span className="text-xl sm:text-2xl">✓</span>
            </div>
          </div>
          <h2 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
            Choose your categories
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Select the categories you'd like to explore
          </p>
        </div>
        {/* Categories Grid */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {categories.map((category) => {
              const isSelected = preferredCategories.includes(category.value);
              return (
                <button
                  type="button"
                  key={category.value}
                  onClick={() => toggleCategory(category.value)}
                  className={`group relative overflow-hidden rounded-lg border-2 p-4 sm:p-5 transition-all duration-200 ${
                    isSelected
                      ? 'border-black bg-black text-white shadow-lg'
                      : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {/* Background animation on hover */}
                  <div
                    className={`absolute inset-0 transition-all duration-200 ${
                      isSelected ? 'bg-black' : 'bg-gray-50 opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="mb-2 text-3xl sm:text-4xl">{category.icon}</div>
                    <div className="text-sm sm:text-base font-semibold tracking-tight">
                      {category.label}
                    </div>

                    {/* Checkmark */}
                    {isSelected && (
                      <div className="mt-3 flex justify-center">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                          <Check className="h-3 w-3 text-black" strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="space-y-2 text-center">
          {preferredCategories.length === 0 ? (
            <p className="text-sm text-gray-500">
              Select at least one category to continue
            </p>
          ) : (
            <p className="text-sm font-medium text-gray-700">
              {preferredCategories.length} {preferredCategories.length === 1 ? 'category' : 'categories'} selected
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesStep