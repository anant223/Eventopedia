import { Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const InterestsStep = () => {
  const { setValue, watch, setError, clearErrors } = useFormContext();

  const interests = watch("interests") || [];
  const [newInterest, setNewInterest] = useState("");

  const addInterest = () => {
    const trimmed = newInterest.trim().toLowerCase();

    if (!trimmed) {
      setError("interests", {
        type: "manual",
        message: "Interest cannot be empty",
      });
      return;
    }

    if (interests.includes(trimmed)) {
      setError("interests", {
        type: "manual",
        message: "Interest already added",
      });
      return;
    }

    clearErrors("interests");
    setValue("interests", [...interests, trimmed]);
    setNewInterest("");
  };

  const removeInterest = (interestToRemove) => {
    setValue(
      "interests",
      interests.filter((i) => i !== interestToRemove)
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Sparkles className="text-purple-600" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          What interests you?
        </h2>
        <p className="text-gray-600">Add topics you're passionate about</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addInterest()}
          placeholder="Type an interest (e.g., photography, hiking)"
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
        />

        <button
          type="button"
          onClick={addInterest}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </button>
      </div>

      {interests.length > 0 ? (
        <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-gray-50 rounded-lg">
          {interests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
            >
              {interest}
              <button
                type="button"
                onClick={() => removeInterest(interest)}
                className="hover:bg-purple-200 rounded-full p-1 transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          Add at least one interest to continue
        </div>
      )}
    </div>
  );
};
export default InterestsStep