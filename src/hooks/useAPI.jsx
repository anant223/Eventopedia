import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const useAPI = (
  apiFn,
  onSuccess,
  dependencies = [],
  transformFn = (data) => data,
  immediate = true
) => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const abortControllerRef = useRef(null);
 
  // Memoize external functions
  const apiFnMemoized = useCallback(apiFn, dependencies);
  const onSuccessMemoized = useCallback(onSuccess, dependencies);
  const transformFnMemoized = useCallback(transformFn, dependencies);

  const execute = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setLoading(true);
    setErr(null);

    try {
      const res = await apiFnMemoized({ signal });
      console.log(res)
      if (!signal.aborted && res?.data?.data){
        console.log(res?.data.data)
        const transformed = transformFnMemoized(res.data.data);
        dispatch(onSuccessMemoized(transformed));
      }
    } catch (error) {
      if (!signal.aborted) {
        setErr(error);
      }
    } finally {
      setLoading(false);
    }
  }, [apiFnMemoized, onSuccessMemoized, transformFnMemoized, dispatch]);

  useEffect(() => {
    if (immediate) {
      execute();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [execute, immediate]);

  const refetch = () => {
    execute();
  };

  return { loading, err, refetch };
};

export default useAPI;
