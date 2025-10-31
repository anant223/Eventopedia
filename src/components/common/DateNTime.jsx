"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, useFormContext } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import  "react-day-picker/style.css";


export default function DateNTime({fieldName}) {
  const [open, setOpen] = React.useState(false);
  const {
    control,
    formState: { errors },
    register,
    watch,
  } = useFormContext();

  const timeFieldName = `${fieldName}-time`;
  const timeValue = watch(timeFieldName);


  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <Controller
        control={control}
        name={fieldName}
        rules={{ required: "Event date is required" }}
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className="w-32 justify-between font-normal"
                >
                  {field.value
                    ? new Date(field.value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <DayPicker
                  animate
                  mode="single"
                  selected={field.value}
                  captionLayout="dropdown"
                  fromYear={2025}
                  toYear={2030}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  className="px-3 py-2 overflow-y-auto"
                  classNames={{
                    months_dropdown: `bg-gray-900 text-white h-8 px-2 py-1 rounded-md max-w-[120px] sm:max-w-[140px] text-sm shadow-sm`,
                    years_dropdown: `bg-gray-900 text-white h-8 px-2 py-1 rounded-md max-w-[80px] sm:max-w-[100px] text-sm shadow-sm`,
                  }}
                />
              </PopoverContent>
            </Popover>
            {errors?.[fieldName] && (
              <p className="text-red-500 text-sm">
                {errors?.[fieldName]?.message}
              </p>
            )}
          </div>
        )}
      />
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={timeValue || ""}
          className="focus-visible:ring-muted
            w-fit
            bg-background 
            appearance-none 
            tracking-normal 
            [&::-webkit-calendar-picker-indicator]:hidden
            [&::-webkit-calendar-picker-indicator]:appearance-none
          "
          {...register(timeFieldName, { required: "Event time is required" })}
        />
        {errors?.[timeFieldName] && (
          <p className="text-red-500 text-sm">
            {errors?.[timeFieldName]?.message}
          </p>
        )}
      </div>
    </div>
  );
}
