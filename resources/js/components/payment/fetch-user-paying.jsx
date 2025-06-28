import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const FetchUserPaying = ({ setUserName, setEmailSubmitted, setReferral, setUserPaying, setPaid }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const csrfToken = usePage().props.csrf_token;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const initialEmail = urlParams.get('email') || '';
    const [userEmail, setUserEmail] = useState(initialEmail);

    React.useEffect(() => {
        // If redirected from register, auto-fetch user and referral
        async function autoLoad() {
            if (initialEmail) {
                setLoading(true);
                await fetchUserByEmail(initialEmail);
                setLoading(false);
            }
        }
        autoLoad();
        // eslint-disable-next-line
    }, []);
    // Fetch user details by email from backend API
    async function fetchUserByEmail(email) {
        setLoading(true);
        setError('');
        try {
            // Small delay to show loading animation
            const res = await fetch('/api/payment/user-by-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                setLoading(false);
                return null;
            }
            const data = await res.json();
            setLoading(false);
            if (data && data.success) {
                setUserName(data.name);
                setUserPaying(data.user);
                setPaid(data.user.payment_success);
                setEmailSubmitted(true);
                const referral = data.referral;
                setReferral({code: referral.code, valid: !!referral.code, referrer: referral.name});
            } else {
                setError('No participant found with that email. Please check and try again.');
            }
            return data;
        } catch (err) {
            setLoading(false);
            return null;
        }
    }

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const user = await fetchUserByEmail(userEmail);
        setLoading(false);
        if (user && user.success) {
            setUserName(user.name);
            setEmailSubmitted(true);
        } else {
            setError('No participant found with that email. Please check and try again.');
        }
    };
    return (
        <>
            {/*<Head title="Payment" />*/}
            {/*<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 py-12">*/}
            <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-blue-100 bg-white/90 p-10 shadow-2xl backdrop-blur-md">
                <h1 className="mb-2 text-center text-3xl font-extrabold text-blue-800">Welcome! 👋</h1>
                <p className="mb-6 text-center text-base text-blue-700">
                    To continue with your payment, please enter your registered email address below.
                    <br />
                    <span className="text-xs text-blue-400">
                        Not registered yet?{' '}
                        <Link href={route('register-dlb')} className="text-blue-500 underline transition hover:text-blue-700">
                            Register here
                        </Link>
                        .
                    </span>
                </p>
                <form className="flex w-full flex-col items-center" onSubmit={handleEmailSubmit}>
                    <input
                        type="email"
                        className="mb-4 w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="e.g. you@email.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        disabled={loading}
                        autoFocus
                    />
                    <button
                        type="submit"
                        className={`w-full rounded-lg px-6 py-2 font-semibold shadow transition ${
                            loading ? 'cursor-not-allowed bg-blue-300 text-white' : 'bg-blue-700 text-white hover:bg-blue-800'
                        }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span>
                                <svg className="mr-2 inline h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Checking...
                            </span>
                        ) : (
                            'Continue'
                        )}
                    </button>
                </form>
                {error && <span className="mt-3 text-center text-xs text-red-600">{error}</span>}
            </div>
            {/*</div>*/}
        </>
    );
};

export default FetchUserPaying;
