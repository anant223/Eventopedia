import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const useAPI = (apiFn, onSuccess, dependencies = []) => {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const dispatch = useDispatch();

    const fetchData = useCallback(() => {

        let isMounted = true

        setLoading(true)
        setErr(null)

        apiFn()
        .then(res => {if(res && res.data) dispatch(onSuccess(res.data.data))})
        .catch(err => setErr(err))
        .finally(() => {if(isMounted) setLoading(false)})

        return () => {
            isMounted = false;
        }

    }, [dispatch, ...dependencies])

    useEffect(( () => {
        fetchData()
    }),[fetchData])

    return {loading, err}
}

export default useAPI;