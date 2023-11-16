const staticUrl = 'http://127.0.0.1:8000';
export const url = import.meta.env.VITE_URL ?? staticUrl;
export const paypal_api = import.meta.env.VITE_PAYPAL_CREDENTIAL;
