import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Paystack from '@paystack/inline-js';
import PaymentSuccessful from './payment-successful.jsx';

const PaystackButton = ({ amount, user, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const pk = usePage().props.p_key;
    function handlePayment() {
        setLoading(true);
        const popup = new Paystack();
        popup.checkout({
            key: pk,
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname,
            phone: user.phone,
            amount: amount * 100,
            onSuccess: (transaction) => {
                console.log(transaction);
                if (onSuccess) onSuccess(transaction);
            },
            onLoad: (response) => {
                console.log("onLoad: ", response);
            },
            onCancel: () => {
                console.log("onCancel");
            },
            onError: (error) => {
                console.log("Error: ", error.message);
            }
        })
    }
    return (
        <button
            className={`w-full mt-4 py-3 text-white font-bold rounded-xl text-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                loading ? 'cursor-not-allowed bg-blue-300' : 'bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600'
            }`}
            disabled={loading}
            onClick={handlePayment}
        >
            {loading ? (
                <span>
                    <svg className="mr-2 inline h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Processing Payment ...
                </span>
            ) : (
                'Proceed to Pay'
            )}
        </button>
    );
};

export default PaystackButton;
