import { useCallback } from 'react';

/**
 * Custom hook to handle form submission with built-in loading state management
 * Eliminates the need for useState for loading state
 * 
 * @param {Function} onSubmit - The async form submission handler
 * @returns {Function} Wrapped submit handler that works with react-hook-form
 */
export const useFormHandling = (onSubmit) => {
  return useCallback(
    async (data, formState) => {
      try {
        // formState.isSubmitting will be true during async operation
        await onSubmit(data);
      } catch (error) {
        // Error handling is done in the form component
        throw error;
      }
    },
    [onSubmit]
  );
};

export default useFormHandling;
