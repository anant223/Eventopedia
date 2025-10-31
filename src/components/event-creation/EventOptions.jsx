import { Edit, Ticket, Users } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { useFormContext } from 'react-hook-form';

const EventOptions = ({setOpen}) => {
    const {setValue, watch, register} = useFormContext()
    const requireApproval = watch("approval") || false;


    const handleApprovalChange = (checked) => {
      setRequireApproval(checked);
      setValue("approval", checked, { shouldValidate: true });
    };
    
  return (
    <div className="bg-muted rounded-lg p-3 space-y-1 transition-colors duration-200">
      <h3 className="text-white font-semibold text-sm sm:text-base">
        Event Options
      </h3>

      {/* Tickets */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <Ticket className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-200 text-sm">Tickets</span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-text text-sm">Free</span>
          <Button
            id="ticket"
            variant="ghost"
            size="sm"
            className="text-text hover:text-white/15 hover:bg-transparent p-1 transition-colors"
            onClick={setOpen}
          >
            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>

      {/* Require Approval */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <Users className="w-4 h-4 text-text flex-shrink-0" />
          <span className="text-gray-200 text-sm">Require Approval</span>
        </div>
        <div className="flex-shrink-0">
          <Switch
            checked={requireApproval}
            onCheckedChange={handleApprovalChange}
            className="data-[state=checked]:bg-gray-800 transition-colors duration-200"
          />
        </div>
      </div>
      {/* Capacity */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          <span className="text-gray-200 text-sm">Capacity</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-text text-sm">Unlimited</span>
          <Button
            id="capacity"
            variant="ghost"
            size="sm"
            className="text-text hover:text-white/15 hover:bg-transparent p-1 transition-colors duration-200"
            onClick={setOpen}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventOptions
