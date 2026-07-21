import React, { useState } from "react";
import { Check, Plus, X, MapPin, Sparkles } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import {CategoriesStep, InterestsStep, LocationStep} from "./index.js";
import { toast } from "sonner";

const Onboarding = ({createOnboarding}) => {
  const [step, setStep] = useState(1);
  const  methods = useForm({
    defaultValues: {
      interests: [],
      preferredCategories: [],
      location: null,
    },
    mode: "onChange",
  })
  const { handleSubmit, watch} = methods
  

  const interests = watch("interests");
  const categories = watch("preferredCategories");
  const location = watch("location");

  
  const handleOnboarding = async (data) => {
    try {
      await createOnboarding(data);
      toast.success("Onboarding completed successfully.")
    } catch (error) {
      console.error("Onboarding error:", error); 
      toast.error("Something went wrong with Onboarding error. Please try again");
    }    
  };

  const canProceed = () => {
    if (step === 1) return categories.length > 0;
    if (step === 2) return !!location;
    if (step === 3) return interests.length > 0;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                  s === step
                    ? "bg-purple-600 text-white scale-110"
                    : s < step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {s < step ? <Check size={20} /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          
        </div>
        {/* Card */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleOnboarding)}>
            <div className="">
              {step === 1 && <CategoriesStep />}
              {step === 2 && <LocationStep />}
              {step === 3 && <InterestsStep />}
              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                      canProceed()
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg transform hover:scale-105"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                      canProceed()
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transform hover:scale-105"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Onboarding;
