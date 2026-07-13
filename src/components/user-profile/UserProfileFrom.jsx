import React, { useEffect } from "react"
import { Linkedin, Twitter, Instagram, Youtube, Globe, X, Upload, Trash2Icon } from "lucide-react"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { AppButton } from "../common"
import useAuth from "@/hooks/useAuth"
import { toast } from "sonner"

const platformIcons = {
  twitter: <Twitter size={18} />,
  linkedin: <Linkedin size={18} />,
  instagram: <Instagram size={18} />,
  youtube: <Youtube size={18} />,
  other: <Globe size={18} />,
}

const platforms = ["twitter", "linkedin", "instagram", "youtube", "other"]

const ProfileEditModal = ({ isOpen, onClose, initialData}) => {
  const {updateUserProfile} = useAuth()
  const { handleSubmit, register, reset, formState:{errors, isSubmitting}, control, setValue, getValues } = useForm({
    defaultValues: {
      name: initialData.name || "",
      bio: initialData.bio || "",
      avatar: null,
      socialLinks: initialData.socialLinks || [],
      platformName: "Twitter" || "",
      url: ""
    }
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: "socialLinks"
  })

  // console.log(getValues("avatar"))
  const bioValue = useWatch({
    control,
    name: "bio",
    defaultValue: ""
  })

  const handleSocialLinks = () => {
    const platform = getValues("platform")
    const url =  getValues("url")

    if(!platform || !url){
      return ""
    }
    append( 
      {
        platform,
        url
      }
    )
    setValue("url", "")
  }

  const onSubmit = async (data) => {

    try {
      console.log("just data",data)
      const formData = new FormData();
      console.log("formdata", formData);
      formData.append("name", data.name);
      formData.append("bio", data.bio);
  
      if (data.avatar?.[0]) {
        formData.append("avatar", data.avatar[0]);
      }
  
      formData.append("socialLinks", JSON.stringify(data.socialLinks));
  
      await updateUserProfile(formData);
      toast.success("Your profile updated successfully")
    } catch (error) {
      toast.error("Went wrong with updation try again")
      console.log("updation error", error.message)
    }
  };

  useEffect(()=> {
    if(isOpen && initialData){
      reset(initialData)
    }
  },[isOpen, initialData, reset])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background border border-gray-700 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sticky top-0 bg-background border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 space-y-6">
            {/* Avatar Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                {initialData && (
                  <img
                    src={initialData?.avatar || "/placeholder.svg"}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                  />
                )}
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors text-sm">
                  <Upload size={16} />
                  Upload
                  <input
                    type="file"
                    accept="image/png, image/jpg"
                    className="hidden"
                    disabled={isSubmitting}
                    {...register("avatar")}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-text placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your name"
                {...register("name", {required: "Name is required"})}
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Bio</label>
              <textarea
                name="bio"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-text placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors resize-none h-24 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell us about yourself"
                {...register("bio", {
                  maxLength: {
                    value: 300,
                    message: "Bio must be 300 characters or less",
                  },
                  placeholder: "Bio",
                })}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {bioValue.length} / 300
                </span>
                {errors && (
                  <span className="error">{errors.bio}</span>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Social Links
              </label>

              <div className="space-y-2">
                {fields?.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between px-3 py-2 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">
                        {platformIcons[field?.platform]}
                      </span>
                      <span className="text-sm text-gray-400 truncate max-w-xs">
                        {field?.url}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <select
                  {...register("platform")}
                  disabled={isSubmitting}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {platforms?.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </option>
                  ))}
                </select>
                <input
                  {...register("url")}
                  type="url"
                  disabled={isSubmitting}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-text text-sm placeholder-gray-600 focus:outline-none focus:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={handleSocialLinks}
                  disabled={isSubmitting}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 bg-background border-t border-gray-700 p-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-text rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
export default ProfileEditModal