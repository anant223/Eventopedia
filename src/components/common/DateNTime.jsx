import React from "react";
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


export default function DateNTime({ fieldName }) {
  const [open, setOpen] = React.useState(false);
  const {
    control,
    formState: { errors },
    register,
    watch,
    setValue,
    trigger
  } = useFormContext();

  const dateFieldName = `${fieldName}.date`;
  const timeFieldName = `${fieldName}.time`;
  
  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toTimeString().slice(0, 5);

  const startDate = watch("start.date");
  const startTime = watch("start.time");
  const currentDate = watch(dateFieldName);



  return (
    <div className=" space-y-2">
    <div className="flex gap-2">
      <div className="flex gap-3 flex-col">
        <Controller
          control={control}
          name={dateFieldName}
          rules={{
            required: `${fieldName} date is required`,
            validate: (value) => {
              if (!value) return true;
              if (value < today) {
                return "Cannot select past date";
              }
              if (fieldName === "end" && startDate && value < startDate) {
                return "End date must be after start date";
              }
              return true;
            },
          }}
          render={({ field }) => {
            return (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal"
                  >
                    {field.value ? field.value : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      if (!date) return;
                      field.onChange(date.toISOString().split("T")[0]);
                      trigger([
                        "start.date",
                        "end.date",
                        "start.time",
                        "end.time",
                      ]);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            );
          }}
        />
      </div>
      <div className="flex gap-3 flex-col">
          <Input
            type="time"
            id="time-picker"
            step="1"
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            {...register(timeFieldName, {
              required: `${fieldName} event time is required`,
              validate: (value) => {
                if (!value) return true;
                if (
                  fieldName === "start" &&
                  currentDate === today &&
                  value <= now
                ) {
                  return "Time must be in the future";
                }
                if (
                  fieldName === "end" &&
                  currentDate === startDate &&
                  startTime &&
                  value <= startTime
                ) {
                  return "End time must be greater than start";
                }
                return true;
              },
            })}
            onChange={(e) => {
              register(timeFieldName).onChange(e);
              trigger(["start.time", "end.time"]);
            }}
          />
      </div>
        {errors[fieldName]?.date && (
          <p className="text-red-500 text-xs capitalize">
            {errors[fieldName].date.message}
          </p>
        )}
        {errors[fieldName]?.time && (
          <p className="text-red-500 text-xs capitalize">
            {errors[fieldName].time.message}
          </p>
        )}
      </div>
    </div>
  );
}



{/* export default function DateNTime({fieldName}) {
//   const [open, setOpen] = React.useState(false);
//   const {
//     control,
//     formState: { errors },
//     register,
//     watch,
//   } = useFormContext();

//   const timeFieldName = `${fieldName}-time`;
//   const timeValue = watch(timeFieldName);


//   return (
//     <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//       <Controller
//         control={control}
//         name={fieldName}
//         rules={{ required: "Event date is required" }}
//         render={({ field }) => (
//           <div className="flex flex-col gap-3">
//             <Popover open={open} onOpenChange={setOpen}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   id="date-picker"
//                   className="w-32 justify-between font-normal"
//                 >
//                   {field.value
//                     ? new Date(field.value).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })
//                     : "Select date"}
//                   <ChevronDownIcon />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent
//                 className="w-auto overflow-hidden p-0"
//                 align="start"
//               >
//                 <DayPicker
//                   animate
//                   mode="single"
//                   selected={field.value}
//                   captionLayout="dropdown"
//                   fromYear={2025}
//                   toYear={2030}
//                   onSelect={(date) => {
//                     field.onChange(date);
//                     setOpen(false);
//                   }}
//                   className="px-3 py-2 overflow-y-auto"
//                   classNames={{
//                     months_dropdown: `bg-gray-900 text-white h-8 px-2 py-1 rounded-md max-w-[120px] sm:max-w-[140px] text-sm shadow-sm`,
//                     years_dropdown: `bg-gray-900 text-white h-8 px-2 py-1 rounded-md max-w-[80px] sm:max-w-[100px] text-sm shadow-sm`,
//                   }}
//                 />
//               </PopoverContent>
//             </Popover>
//             {errors?.[fieldName] && (
//               <p className="text-red-500 text-sm">
//                 {errors?.[fieldName]?.message}
//               </p>
//             )}
//           </div>
//         )}
//       />
//       <div className="flex flex-col gap-3">
//         <Input
//           type="time"
//           id="time-picker"
//           step="1"
//           value={timeValue || ""}
//           className="focus-visible:ring-muted
//             w-fit
//             bg-background 
//             appearance-none 
//             tracking-normal 
//             [&::-webkit-calendar-picker-indicator]:hidden
//             [&::-webkit-calendar-picker-indicator]:appearance-none
//           "
//           {...register(timeFieldName, { required: "Event time is required" })}
//         />
//         {errors?.[timeFieldName] && (
//           <p className="text-red-500 text-sm">
//             {errors?.[timeFieldName]?.message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
*/}