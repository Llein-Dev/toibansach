// lib/stripe.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_api_key'); // Thay 'your_stripe_api_key' bằng API key của bạn

export default stripePromise;
