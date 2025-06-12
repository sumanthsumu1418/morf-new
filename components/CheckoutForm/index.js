import client from "@/components/shared/client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { ADD_PAYMENT_TO_STRIPE } from "graphql/productsqueries";

const CheckoutForm = ({ orderCode, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const addStripe = async (response) => {
    // add payment to order paymentinput -> method -> code
    const addPaymentToStripe = await client.mutate({
      mutation: ADD_PAYMENT_TO_STRIPE,
      variables: {
        metadata: {},
      },
    });
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,

      confirmParams: {
        return_url: location.origin + `/checkout/confirmation/${orderCode}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
    } else {
      stripe.confirmCardPayment(clientSecret).then(function (response) {
        if (response.error) {
          // Handle error here
          console.log("error ");
        } else if (
          response.paymentIntent &&
          response.paymentIntent.status === "succeeded"
        ) {
          // Handle successful payment here

          addStripe(response);
        }
      });
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
};

export default CheckoutForm;
