import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LoadingSpinner } from "../common";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/main/payment-success`,
      },
      redirect: "if_required"
    });

    if (error) {
      setIsLoading(false);
      setError(error);
    }

    if(paymentIntent.status === "succeeded"){
      window.location.href = "/payment-success";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <PaymentElement />

      <Button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Your payment is secure and encrypted.
      </p>
    </form>
  );
};

export default CheckoutForm;
