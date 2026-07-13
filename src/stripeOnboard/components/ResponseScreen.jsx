import React from 'react'
import { Card } from '@/components/ui/card'

const ResponseScreen = ({iconBg, icon, title, description, children}) => {
  return (
    <Card>
      <IconRing bg={iconBg}>{icon}</IconRing>
      <p className="text-[18px] font-medium text-[#1a1814] mb-2">{title}</p>
      <p className="text-[13px] text-[#6b6966] leading-relaxed mb-6">
        {description}
      </p>
      {children}
    </Card>
  );
}

export default ResponseScreen
