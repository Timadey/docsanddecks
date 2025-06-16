import { Link, usePage } from '@inertiajs/react';
import PaystackButton from './paystack-button.jsx';
import React, { useState } from 'react';
import PaymentSuccessful from './payment-successful.jsx';

const PaymentDetail = ({userName, userPaying, referrer, paid}) => {
    const csrfToken = usePage().props.csrf_token;
    const [hasDiscount, setHasDiscount] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [referral, setReferral] = useState(referrer);
    const [paymentSuccess, setPaymentSuccess] = useState(paid);

    const BASE_AMOUNT = 7000;
    const DISCOUNT_PERCENT = 20;
    const discountedAmount = BASE_AMOUNT - (BASE_AMOUNT * DISCOUNT_PERCENT) / 100;
    const REFERRAL_DISCOUNT_PERCENT = 5;
    const referralDiscountedAmount = BASE_AMOUNT - (BASE_AMOUNT * REFERRAL_DISCOUNT_PERCENT) / 100;
    const combinedDiscountedAmount = BASE_AMOUNT - (BASE_AMOUNT * (DISCOUNT_PERCENT + REFERRAL_DISCOUNT_PERCENT)) / 100;

    let totalAmount;
    if (referral.valid && hasDiscount) {
        totalAmount = combinedDiscountedAmount;
    } else if (referral.valid) {
        totalAmount = referralDiscountedAmount;
    } else if (hasDiscount) {
        totalAmount = discountedAmount;
    } else {
        totalAmount = BASE_AMOUNT;
    }

    // Simulate referral code validation (replace with real API call in production)
    // Validate referral code using backend API
    async function validateReferral(code) {
        setLoading(true);
        setError("");
        try {
            await new Promise((resolve) => setTimeout(resolve, 600));
            const res = await fetch("/api/payment/validate-referral", {
                method: "POST",
                headers: { "Content-Type": "application/json" , "X-CSRF-TOKEN": csrfToken,},
                body: JSON.stringify({ code }),
            });
            const data = await res.json();
            if(data.valid){
                setReferral({ code: data.code, valid: true, referrer: data.referrer });
            }
            setLoading(false);
            return data;
        } catch (err) {
            setLoading(false);
            return { valid: false, referrer: "" };
        }
    }

    function handleSuccessfulPayment(resp) {
        fetch("/api/payment/validate-payment?reference=" + resp.reference, {
            method: "GET",
            headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrfToken },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status && data.data.status === 'success')
                    setPaymentSuccess(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            {paymentSuccess
                ? <PaymentSuccessful />
                : <div className="w-full max-w-lg bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-100 backdrop-blur-md">
                    <Link
                        href="/"
                        className="mb-6 text-xs font-light text-blue-400 hover:text-blue-700 underline transition self-start"
                    >
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-4xl font-extrabold text-blue-800 mb-2 tracking-tight text-center drop-shadow-sm">
                        {`Hi${userName ? `, ${userName}` : ''}!`}
                    </h1>
                    <h2 className="text-2xl font-semibold text-blue-700 mb-8 text-center">
                        Ready to complete your payment?
                    </h2>
                    <div className="mb-10 w-full text-center">
                        <span className="block text-lg text-blue-700 mb-2">Your payment amount:</span>
                        {referral.valid ? (
                            <div>
                                            <span className="text-2xl text-blue-300 line-through mr-2">
                                                ₦{BASE_AMOUNT.toLocaleString()}
                                            </span>
                                <span className="text-5xl font-extrabold text-green-600 drop-shadow">
                                                ₦{hasDiscount ? combinedDiscountedAmount.toLocaleString() : referralDiscountedAmount.toLocaleString()}
                                            </span>
                                <div className="mt-2 text-blue-600  text-sm">
                                    You got 5% discount from <span className="font-bold">{referral.referrer}</span> because you used their referral code
                                </div>
                                {hasDiscount && (
                                    <div className="mt-2 text-green-700 font-semibold text-sm">
                                        Additional 20% social discount applied!
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <span className={`text-5xl font-extrabold ${hasDiscount ? 'text-green-600' : 'text-blue-700'} drop-shadow`}>
                                    ₦{hasDiscount ? discountedAmount.toLocaleString() : BASE_AMOUNT.toLocaleString()}
                                </span>
                                {hasDiscount && (
                                    <div className="mt-2 text-green-700 font-semibold text-lg">
                                        20% discount applied!
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {!referral.valid && (
                        <div className="mb-8 w-full">
                            <form
                                className="flex flex-col items-center mb-4"
                                onSubmit={e => {
                                    e.preventDefault();
                                    validateReferral(referral.code);
                                }}
                            >
                                <label className="mb-1 text-sm font-semibold text-blue-700" htmlFor="referral">
                                    Have a referral code?
                                </label>
                                <div className="flex gap-2 w-full">
                                    <input
                                        id="referral"
                                        type="text"
                                        className="border-2 border-blue-200 rounded-lg px-3 py-2 flex-1 text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                                        placeholder="Enter referral code"
                                        value={referral.code}
                                        onChange={e => setReferral({ ...referral, code: e.target.value })}
                                        disabled={referral.valid}
                                    />
                                    <button
                                        type="submit"
                                        className={`w-full rounded-lg px-4 py-2 font-semibold shadow transition ${
                                            loading ? 'cursor-not-allowed bg-blue-300 text-white' : 'bg-blue-700 text-white hover:bg-blue-800'
                                        }`}
                                        disabled={loading||referral.valid}
                                    >
                                        {loading ? (
                                            <span>
                                                <svg className="mr-2 inline h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                </svg>
                                                👀
                                            </span>
                                        ) : (
                                            'Apply'
                                        )}
                                    </button>
                                </div>
                                {error && referral.code && !referral.valid && (
                                    <span className="text-xs text-red-600 mt-1">{error}</span>
                                )}
                            </form>
                        </div>
                    )}
                    <div className="mb-8 w-full">
                        <p className="text-blue-700 text-sm text-center mb-4 flex flex-col items-center">
                            <span>
                                <span className="font-semibold">Optional:</span> Get extra <span className="text-green-700 font-bold">20% discount</span>
                                &nbsp; if you follow us on social media now and click the button below:
                            </span>
                            <br />
                            <span>Follow us now on:</span>
                            <div className="flex flex-row items-center justify-center gap-2 ">
                                <a href="https://x.com/docsdecks" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mx-1 hover:text-blue-800 inline-flex items-center">
                                    <img className="size-6" src={'https://upload.wikimedia.org/wikipedia/commons/c/cc/X_icon.svg'} alt={'x icon'} />
                                </a>
                                <a href="https://linkedin.com/company/docsdecks" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mx-1 hover:text-blue-800 inline-flex items-center">
                                    <img className="size-6" src={'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'} alt={'x icon'} />
                                </a>
                            </div>
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                className={`px-6 py-2 rounded-lg font-semibold border-2 transition shadow ${
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
                                    className="px-6 py-2 rounded-lg font-semibold border-2 bg-white text-red-700 border-red-700 hover:bg-red-50 transition shadow"
                                    onClick={() => setHasDiscount(false)}
                                >
                                    No, I don&apos;t
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-blue-400 mt-2 text-center">
                            We will verify your social media follow before confirming your discount <span role="img" aria-label="eyes">👀</span>.
                        </p>
                    </div>

                    <PaystackButton amount={totalAmount} user={userPaying} onSuccess={handleSuccessfulPayment} />
                </div>
            }
        </>
    );
}

export default PaymentDetail;
