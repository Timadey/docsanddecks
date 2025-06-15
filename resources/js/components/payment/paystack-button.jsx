import React from 'react';
import { usePage } from '@inertiajs/react';
import Paystack from '@paystack/inline-js';
import PaymentSuccessful from './payment-successful.jsx';

const PaystackButton = ({ amount, user, onSuccess }) => {
    const pk = usePage().props.p_key;
    function handlePayment() {
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
            className="w-full mt-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold rounded-xl text-lg hover:from-blue-800 hover:to-blue-600 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={handlePayment}
        >
            Proceed to Pay
        </button>
    );
};

export default PaystackButton;
