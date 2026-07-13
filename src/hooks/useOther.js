import { otherLiveEventsPreview } from '@/features/otherActions'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useOther = () => {
  const dispatch =  useDispatch()
  const liveEvents = useSelector((state) => state.others.events)
  const loading = useSelector((state) => state.others.loading);
  const error = useSelector((state) => state.others.error);
  const pageInfo = useSelector((state) => state.others.pageInfo);



  const eventPreview = useCallback(
    ({ lat, lng, page, size, radius }) => {
      dispatch(otherLiveEventsPreview({ lat, lng, page, size, radius }));
    },
    [dispatch]
  );

  return {liveEvents, loading, eventPreview, error, pageInfo};
}

export default useOther