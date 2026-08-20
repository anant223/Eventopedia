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
  const dispatch = useDispatch();
  const paymentClientSecret = useSelector(selectPaymentClientSecret);
  const paymentError = useSelector(selectPaymentError);
  const paymentLoading = useSelector(selectPaymentLoading);
  const onboardingUrl = useSelector(selectOnboardingUrl);
  const accountStatus = useSelector(selectAccountStatus);

  useEffect(() => {
    dispatch(checkUserAccountStatus())
      .unwrap()
      .then((res) => console.log("accountStatus response:", res))
      .catch((err) => console.log("accountStatus error:", err));;
  }, [dispatch]);

  const createIntent = useCallback(
    ({ eventId, ticketQuantity }) => {
      dispatch(createPaymentIntent({ eventId, ticketQuantity }));
    },
    [dispatch]
  );

  const createAccount = useCallback(() => {
    return dispatch(createStripeAccount()).unwrap();
  }, [dispatch]);



  const handlePaymentVerify = useCallback(
    async (onCompleted) => {
      console.log(accountStatus)
      if (accountStatus?.chargesEnabled) {
        onCompleted?.();
        return;
      }
      try {
        
        const res = await createAccount();
        if (res?.onboardingUrl) {
          window.open(res.onboardingUrl, "_blank");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [createAccount, accountStatus]
  );

  return {
    paymentClientSecret,
    paymentError,
    paymentLoading,
    createIntent,
    createAccount,
    onboardingUrl,
    accountStatus,
    handlePaymentVerify
  };
};

export default usePayment;
