import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import registerService from '../api/registerService';
import { selectRegisteredEvent } from "../app/selector/registerSelector";
import { setAllSubs } from '../app/features/authSlice';

const useRegister = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    registerService
      .registredEvents()
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.data);
          dispatch(setAllSubs(response.data.data));
        }
      })
      .catch((error) =>
        console.error("Error fetching registered events:", error)
      )
      .finally(() => {
        if(!loading) setLoading(false);
      });

  }, [dispatch]);

  return { loading };
};


export default useRegister