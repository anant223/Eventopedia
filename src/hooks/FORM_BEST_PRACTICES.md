/**
 * FORM LOADING STATE BEST PRACTICES
 * 
 * Using react-hook-form's built-in formState.isSubmitting
 * eliminates the need for useState for loading state
 */

// ❌ BEFORE - Using useState for loading
function OldForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await submitForm(data);
      toast.success("Success");
    } catch (error) {
      toast.error("Error");
    } finally {
      setIsLoading(false); // Manual cleanup needed
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} disabled={isLoading} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}


// ✅ AFTER - Using formState.isSubmitting
function ImprovedForm() {
  const { 
    handleSubmit, 
    register, 
    formState: { errors, isSubmitting } // ← Automatic state management
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await submitForm(data);
      toast.success("Success");
      // isSubmitting automatically becomes false when async handler completes
    } catch (error) {
      toast.error("Error");
      // Error doesn't break automatic state management
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register("name")} 
        disabled={isSubmitting} // ← Uses automatic state
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}


/**
 * KEY BENEFITS:
 * 
 * 1. NO MANUAL STATE MANAGEMENT
 *    - react-hook-form automatically manages isSubmitting
 *    - No useState needed, less code to maintain
 * 
 * 2. AUTOMATIC CLEANUP
 *    - isSubmitting is automatically set to false when async handler completes
 *    - Works even if an error is thrown
 * 
 * 3. LESS BUGS
 *    - No risk of forgetting setIsLoading(false)
 *    - State stays in sync with actual form submission status
 * 
 * 4. BETTER PERFORMANCE
 *    - One less state variable
 *    - Less re-renders
 * 
 * 5. TYPE-SAFE
 *    - isSubmitting is properly typed in TypeScript
 *    - Clear semantics: isSubmitting = form is currently submitting
 */


/**
 * ADVANCED PATTERNS
 */

// Pattern 1: With loading spinner
function FormWithSpinner() {
  const { handleSubmit, formState: { isSubmitting } } = useForm();
  
  return (
    <>
      {isSubmitting && <LoadingSpinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* form fields */}
      </form>
    </>
  );
}


// Pattern 2: With visual feedback
function FormWithFeedback() {
  const { handleSubmit, formState: { isSubmitting } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? (
          <>
            <Spinner className="mr-2" />
            Saving...
          </>
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
}


// Pattern 3: Multiple field states
function AdvancedForm() {
  const { 
    handleSubmit, 
    register, 
    formState: { isSubmitting, isDirty, isValid }
  } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} />
      <button 
        type="submit" 
        disabled={isSubmitting || !isDirty || !isValid}
      >
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}


/**
 * FORM STATE PROPERTIES AVAILABLE:
 * 
 * - isDirty: Form has been modified
 * - isDirtyFields: Which specific fields have been modified
 * - dirtyFields: Dirty field names
 * - isSubmitting: Form is currently being submitted ← USE THIS FOR LOADING
 * - isSubmitted: Form has been submitted at least once
 * - isSubmitSuccessful: Last submission was successful
 * - isValid: Form passes all validations
 * - isValidating: Form is currently validating
 * - touchedFields: Which fields have been touched
 * - errors: Validation errors
 * - disabled: Form is disabled
 */
