import React from 'react'
import EventReadPage from "@/event-detail/eventPage"
import { PageShell } from '@/components/layout/PageShell';
const Event = () => {

  return (
    <PageShell>
      <EventReadPage/>
    </PageShell>
  );
}

export default Event