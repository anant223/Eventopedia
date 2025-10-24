import React, { useEffect, useState } from 'react'
import {
  CapacityModal,
  CategoryModal,
  DescriptionModal,
  TicketModal,
} from "./modals/index";
import EventDetails from "./EventDetails";
import EventOptions from './EventOptions';
import ImageUpload from './ImageUpload';
import { ChevronDown, Globe } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import { AppButton } from '../common';
import {createNewEvent} from "../../features/eventActions"


const EventCreationForm = () => {
    const [state, setState] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const methods = useForm();
    const {handleSubmit, register, watch, setValue, formState: {errors}} = methods;

    const handleState = (e) => {
        setState(e.currentTarget.id);
    }

    const closeModal = () => {
      setState(null);
    };
    
    useEffect(() => {
        if (state) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [state]);


    const handleImgValidation = (fileList) => {
      if(!fileList  || fileList.length === 0 ) return true;

      const file = fileList[0];

      if(file.size > 5 * 1024 * 1024){
        return "File size must be less than 5mb"
      }
      return  true;
    }

    
  return (
    <div className="min-h-screen bg-background pt-16 pb-8 font-roboto text-text">
      <FormProvider {...methods}>
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit(createNewEvent)}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center p-4 sm:p-6"
          >
            <ImageUpload
              value={watch("img")}
              onChange={(files) => setValue("img", files)}
              error={errors?.img?.message}
              register={register("img", { required: "Please upload an image", validate: handleImgValidation})}
            />

            <div className="flex-1 w-full space-y-4 sm:space-y-6">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 shadow-2xl bg-muted backdrop-blur-sm px-4 py-3 rounded-xl border border-accent hover:bg-accent transition-all duration-200 cursor-pointer group"
              >
                <Globe className="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-white transition-colors" />
                <span className="text-white text-sm font-medium">Public</span>
                <ChevronDown className="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-white transition-colors ml-auto" />
              </div>
              <EventDetails setOpen={handleState}/>
              <EventOptions setOpen={handleState}/>
              <AppButton type="submit" className="w-full bg-blue-800/20">
                Create Event
              </AppButton>
            </div>
          </form>
        </div>
        <div>
          {state === "capacity" && <CapacityModal closeModal={closeModal} />}
          {state === "category" && <CategoryModal closeModal={closeModal} />}
          {state === "desc" && <DescriptionModal closeModal={closeModal} />}
          {state === "ticket" && <TicketModal closeModal={closeModal} />}
        </div>
      </FormProvider>
    </div>
  );
}

export default EventCreationForm
