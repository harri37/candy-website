import { loadStripe } from "@stripe/stripe-js";

const initializeStripe = async () => {
  console.log("STRIPE_PUBLISHABLE_KEY, ", process.env.STRIPE_PUBLISHABLE_KEY);
  const stripePromise = await loadStripe(
    "pk_test_51MbMB4IenjGja7arzRO7jqW9YCPFEhuU6YwwvnF5XNkb1UFRf9ePheUoewhteFLCS9O6A1F1XxNOId7fSPxFMdLm00mKvoQOI3"
  );
  return stripePromise;
};

export default initializeStripe;
