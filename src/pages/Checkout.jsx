import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";
// import CheckoutForm from "@/components/payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { state } = useLocation();
  const clientSecret = state?.clientSecret;

  if (!clientSecret) {
    return <Navigate to="/main/all-events" replace />;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {/* <CheckoutForm /> */}
    </Elements>
  );
};

export default CheckoutPage;
