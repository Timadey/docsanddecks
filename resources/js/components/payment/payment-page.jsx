import { Link, usePage } from '@inertiajs/react';
import PaystackButton from './paystack-button.jsx';
import FlutterwaveButton from './flutterwave-button.jsx';
import PaymentSuccessful from './payment-successful.jsx';
import useCurrencyConverter from './../../hooks/use-currency-converter.jsx';
import React, { useState, useEffect } from 'react';

const PaymentDetail = ({ userName, userPaying, referrer, paid }) => {
    const csrfToken = usePage().props.csrf_token;
    const [hasDiscount, setHasDiscount] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [referral, setReferral] = useState(referrer);
    const [paymentSuccess, setPaymentSuccess] = useState(paid);

    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [pendingHref, setPendingHref] = useState(null);

    const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/LMUwvp2pNMXHAOmwHXSDcn';

    const BASE_AMOUNT = 7000;
    const DISCOUNT_PERCENT = 20;
    const REFERRAL_DISCOUNT_PERCENT = 5;
    const SOCIAL_DISCOUNT = hasDiscount ? DISCOUNT_PERCENT : 0;
    const REFERRAL_DISCOUNT = referral.valid ? REFERRAL_DISCOUNT_PERCENT : 0;
    const TOTAL_DISCOUNT = SOCIAL_DISCOUNT + REFERRAL_DISCOUNT;
    const finalAmount = BASE_AMOUNT - (BASE_AMOUNT * TOTAL_DISCOUNT) / 100;

    //currency, rate, loading, formatter, converted };

    const { currency: userCurrency, rate, loading: currencyLoading, formatter } = useCurrencyConverter(BASE_AMOUNT);

    const convertedAmount = parseFloat((finalAmount * rate).toFixed(2));

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && !paymentSuccess && sessionStorage.getItem('dlbLeaveConfirmed') !== '1') {
                setShowLeaveModal(true);
            }
        };

        const handlePopState = (e) => {
            if (!paymentSuccess && sessionStorage.getItem('dlbLeaveConfirmed') !== '1') {
                setPendingHref(window.location.href);
                setShowLeaveModal(true);
                e.preventDefault();
                window.history.pushState(null, '', window.location.href);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [paymentSuccess]);

    const handleLeaveClick = (e, href) => {
        e.preventDefault();
        if (paymentSuccess || sessionStorage.getItem('dlbLeaveConfirmed') === '1') {
            window.location.href = href;
            return;
        }
        setPendingHref(href);
        setShowLeaveModal(true);
    };

    const confirmLeave = () => {
        setShowLeaveModal(false);
        if (pendingHref) {
            window.location.href = pendingHref;
        }
    };

    async function validateReferral(code) {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/payment/validate-referral", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrfToken },
                body: JSON.stringify({ code, email: userPaying.email }),
            });
            const data = await res.json();
            if (data.valid) {
                setReferral({ code: data.code, valid: true, referrer: data.referrer });
            } else {
                setError(data.message || "Invalid referral code");
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError("Something went wrong. Please try again.");
        }
    }

    function handleSuccessfulPayment(resp) {
        fetch("/api/payment/validate-payment?reference=" + resp.reference, {
            method: "GET",
            headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrfToken },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status && data.data.status === 'success') {
                    setPaymentSuccess(true);
                }
            })
            .catch(console.error);
    }

    return paymentSuccess ? (
        <PaymentSuccessful />
    ) : (
        <div className="flex w-full max-w-lg flex-col items-center rounded-3xl border border-blue-100 bg-white/90 p-10 shadow-2xl backdrop-blur-md">
            <Link
                href="/"
                onClick={(e) => handleLeaveClick(e, '/')}
                className="mb-6 self-start text-xs font-light text-blue-400 underline transition hover:text-blue-700"
            >
                &larr; Back to Home
            </Link>
            <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight text-blue-800 drop-shadow-sm">
                {`Hi${userName ? `, ${userName}` : ''}!`}
            </h1>
            <h2 className="mb-8 text-center text-2xl font-semibold text-blue-700">Ready to complete your payment?</h2>

            <div className="mb-10 w-full text-center">
                <span className="mb-2 block text-lg text-blue-700">Your payment amount:</span>
                <div>
                    <span className="text-5xl font-extrabold text-green-600 drop-shadow">
                        {currencyLoading ? (
                            <svg className="inline w-6 h-6 animate-spin text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        ) : formatter.format(convertedAmount)}
                    </span>
                    {referral.valid && (
                        <div className="mt-2 text-sm text-blue-600">
                            You got 5% discount from <span className="font-bold">{referral.referrer}</span>
                        </div>
                    )}
                    {hasDiscount && (
                        <div className="mt-2 text-sm font-semibold text-green-700">Additional 20% social discount applied!</div>
                    )}
                </div>
            </div>

            {!referral.valid && (
                <div className="mb-8 w-full">
                    <form
                        className="mb-4 flex flex-col items-center"
                        onSubmit={(e) => {
                            e.preventDefault();
                            validateReferral(referral.code);
                        }}
                    >
                        {/*The only thing they should be able to apply here is coupon code, referral code should be included in registration*/}
                        {/*<label className="mb-1 text-sm font-semibold text-blue-700" htmlFor="referral">*/}
                        {/*    Have a referral code?*/}
                        {/*</label>*/}
                        {/*<div className="flex w-full gap-2">*/}
                        {/*    <input*/}
                        {/*        id="referral"*/}
                        {/*        type="text"*/}
                        {/*        className="flex-1 rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"*/}
                        {/*        placeholder="Enter referral code"*/}
                        {/*        value={referral.code}*/}
                        {/*        onChange={(e) => setReferral({ ...referral, code: e.target.value })}*/}
                        {/*        disabled={referral.valid}*/}
                        {/*    />*/}
                        {/*    <button*/}
                        {/*        type="submit"*/}
                        {/*        className={`w-full cursor-pointer rounded-lg px-4 py-2 font-semibold shadow transition ${*/}
                        {/*            loading ? 'cursor-not-allowed bg-blue-300 text-white' : 'bg-blue-700 text-white hover:bg-blue-800'*/}
                        {/*        }`}*/}
                        {/*        disabled={loading || referral.valid}*/}
                        {/*    >*/}
                        {/*        {loading ? (*/}
                        {/*            <svg className="mr-2 inline h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">*/}
                        {/*                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>*/}
                        {/*                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>*/}
                        {/*            </svg>*/}
                        {/*        ) : (*/}
                        {/*            'Apply'*/}
                        {/*        )}*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        {error && referral.code && !referral.valid && <span className="mt-1 text-xs text-red-600">{error}</span>}
                    </form>
                </div>
            )}

            {/*<div className="mb-8 w-full">*/}
            {/*    <p className="mb-4 text-center text-sm text-blue-700">*/}
            {/*        <span className="font-semibold">Optional:</span> Get extra <span className="font-bold text-green-700">20% discount</span> if you follow us on social media:*/}
            {/*    </p>*/}
            {/*    <div className="mb-4 flex justify-center gap-2">*/}
            {/*        <a href="https://x.com/docsdecks" target="_blank" rel="noopener noreferrer">*/}
            {/*            <img className="size-6" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/X_icon.svg" alt="x icon" />*/}
            {/*        </a>*/}
            {/*        <a href="https://linkedin.com/company/docsdecks" target="_blank" rel="noopener noreferrer">*/}
            {/*            <img className="size-6" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="linkedin icon" />*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center justify-center gap-4">*/}
            {/*        <button*/}
            {/*            className={`cursor-pointer rounded-lg border-2 px-6 py-2 font-semibold shadow transition ${*/}
            {/*                hasDiscount ? 'border-green-700 bg-green-600 text-white' : 'border-blue-700 bg-white text-blue-700 hover:bg-blue-50'*/}
            {/*            }`}*/}
            {/*            onClick={() => setHasDiscount(true)}*/}
            {/*        >*/}
            {/*            Yes, I follow*/}
            {/*        </button>*/}
            {/*        {hasDiscount && (*/}
            {/*            <button*/}
            {/*                className="rounded-lg border-2 border-red-700 bg-white px-6 py-2 font-semibold text-red-700 shadow transition hover:bg-red-50"*/}
            {/*                onClick={() => setHasDiscount(false)}*/}
            {/*            >*/}
            {/*                No, I don't*/}
            {/*            </button>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*    <p className="mt-2 text-center text-xs text-blue-400">*/}
            {/*        We will verify your social media follow before confirming your discount 👀.*/}
            {/*    </p>*/}
            {/*</div>*/}

            {userCurrency !== 'NGN' ? (
                <FlutterwaveButton amount={convertedAmount} user={{ ...userPaying, currency: userCurrency }} />
            ) : (
                <PaystackButton amount={finalAmount} user={userPaying} onSuccess={handleSuccessfulPayment} />
            )}
        </div>
    );
};

export default PaymentDetail;
