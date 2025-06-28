import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Paystack from '@paystack/inline-js';
import PaymentSuccessful from './payment-successful.jsx';

const FlutterwaveButton = ({ amount, user }) => {
    const [loading, setLoading] = useState(false);
    const csrfToken = usePage().props.csrf_token;

    console.log(user);
    async function handleInitializePayment() {
        setLoading(true);
        try {
            const response = await fetch(route('payment.rave'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({
                    email: user.email,
                    amount: amount,
                    currency: user.currency || 'NGN',
                }),
            });
            const data = await response.json();
            console.log(data);
            if (data.success && data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                setLoading(false);
                alert('Failed to initialize payment.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            alert('An error occurred while initializing payment, please try again. Contact support if this issue persists.');
        }
    }
    return (
        <button
            className={`cursor-pointer w-full mt-4 py-3 text-white font-bold rounded-xl text-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                loading ? 'cursor-not-allowed bg-blue-300' : 'bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600'
            }`}
            disabled={loading}
            onClick={handleInitializePayment}
        >
            {loading ? (
                <span>
                    <svg className="mr-2 inline h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Initiating Payment ...
                </span>
            ) : (
                'Proceed to Pay'
            )}
        </button>
    );
};

export default FlutterwaveButton;
