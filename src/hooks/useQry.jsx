import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


const useQry = ({queryKey, apiFn, reduxAction, options = {}}) => {
    const dispatch = useDispatch();

    const query = useQuery({
      queryKey,
      queryFn: apiFn,
      ...options,
    });

    useEffect(() => {
      if (query.data) {
        let events = query?.data?.data?.data;
        // console.log(events);
        dispatch(reduxAction(events));
      }
    }, [query.data, dispatch, reduxAction]);

    return {
      loading: query.isPending,
      error: query.error,
      refetch: query.refetch,
    };
};

export {useQry};
