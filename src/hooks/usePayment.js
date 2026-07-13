import React, { useCallback, useEffect } from "react";
import {
  selectPaymentClientSecret,
  selectPaymentError,
  selectPaymentLoading,
  selectAccountStatus, 
  selectOnboardingUrl 
} from "@/app/selector/paymentSelector";
import { useDispatch, useSelector} from "react-redux";
import {createPaymentIntent, createStripeAccount, checkUserAccountStatus} from "@/features/paymentAction"
const usePayment = () => {
  const dispatch = useDispatch()
  const paymentClientSecret = useSelector(selectPaymentClientSecret);
  const paymentError = useSelector(selectPaymentError);
  const paymentLoading = useSelector(selectPaymentLoading);
  const onboardingUrl = useSelector(selectOnboardingUrl);
  const accountStatus = useSelector(selectAccountStatus);
  

  const createIntent = useCallback(
    ({ eventId, ticketQuantity }) => {
      dispatch(createPaymentIntent({ eventId, ticketQuantity }));
    },
    [dispatch]
  );

  const createAccount = useCallback(
    () => {
      return dispatch(createStripeAccount()).unwrap();
    },
    [dispatch]
  );

  const checkStatus = useCallback(() => {
    dispatch(checkUserAccountStatus());
  }, [dispatch]);

  return {
    paymentClientSecret,
    paymentError,
    paymentLoading,
    createIntent,
    createAccount,
    checkStatus,
    onboardingUrl,
    accountStatus
  }

};

export default usePayment;
