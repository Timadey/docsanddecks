import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

const BASE_AMOUNT = 7000;
const DISCOUNT_PERCENT = 20;

const PaymentPage = () => {
    const [hasDiscount, setHasDiscount] = useState(false);

    const discountedAmount = BASE_AMOUNT - (BASE_AMOUNT * DISCOUNT_PERCENT) / 100;

    return (
        <>
            <Head title="Payment" />
            <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-12">
                    <Link
                        href="/"
                        className="mb-4 text-xs font-light text-gray-400 hover:text-blue-700 underline transition"
                        style={{ alignSelf: 'flex-start' }}
                    >
                        &larr; Back to Home
                    </Link>
                    <div className="max-w-lg w-full bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-blue-800 mb-6">Docs and Decks Payment</h1>
                        <div className="mb-8 w-full text-center">
                            <span className="block text-lg text-gray-700 mb-2">Your payment amount:</span>
                            <span className={`text-5xl font-extrabold ${hasDiscount ? 'text-green-600' : 'text-blue-700'}`}>
                        ₦{hasDiscount ? discountedAmount.toLocaleString() : BASE_AMOUNT.toLocaleString()}
                    </span>
                            {hasDiscount && (
                                <div className="mt-2 text-green-700 font-semibold text-lg">
                                    20% discount applied!
                                </div>
                            )}
                        </div>
                        <div className="mb-6 w-full">
                            <p className="text-gray-700 text-center mb-4">
                                <span className="font-semibold">Optional:</span> Get a <span className="text-green-700 font-bold">20% discount</span>
                                &nbsp; if you follow us on social media, click the button below to apply your discount:
                                <br />
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mx-1">Facebook</a>
                                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mx-1">X</a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mx-1">LinkedIn</a>
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    className={`px-6 py-2 rounded-lg font-semibold border transition ${
                                        hasDiscount
                                            ? 'bg-green-600 text-white border-green-700'
                                            : 'bg-white text-blue-700 border-blue-700 hover:bg-blue-50'
                                    }`}
                                    onClick={() => setHasDiscount(true)}
                                >
                                    Yes, I follow
                                </button>
                                {hasDiscount && (
                                    <button
                                        className="px-6 py-2 rounded-lg font-semibold border bg-white text-red-700 border-red-700 hover:bg-red-50 transition"
                                        onClick={() => setHasDiscount(false)}
                                    >
                                        No, I don&apos;t
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-red-600 mt-2 text-center">
                                We will verify your social media follow before confirming your discount 👀.
                            </p>
                        </div>
                        <button className="w-full mt-4 py-3 bg-blue-700 text-white font-bold rounded-lg text-lg hover:bg-blue-800 transition">
                            Proceed to Pay
                        </button>
                    </div>
                </div>
        </>
    );
};

export default PaymentPage;
