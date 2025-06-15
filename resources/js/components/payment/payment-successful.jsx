import React from 'react';

const PaymentSuccessful = () => {
    const groupLink = 'https://chat.whatsapp.com/LMUwvp2pNMXHAOmwHXSDcn';
    const [secondsLeft, setSecondsLeft] = React.useState(10);
    React.useEffect(() => {
        const start = Date.now();
        const timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - start) / 1000);
            setSecondsLeft(Math.max(10 - elapsed, 0));
        }, 250);
        const redirectTimer = setTimeout(() => {
            window.location.href = groupLink;
        }, 10000);
        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, []);

    return (
        <>
            <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-green-100 bg-white/90 p-10 shadow-2xl backdrop-blur-md">
                <svg className="mb-4 h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#d1fae5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" stroke="#10b981" />
                </svg>
                <h1 className="mb-2 text-center text-3xl font-extrabold text-green-800">Payment Received! 🎉</h1>
                <p className="mb-6 text-center text-base text-green-700">
                    Congratulations! We have received your payment and you have secured your spot successfully!<br />
                    You will be redirected to our WhatsApp group in a few seconds.
                </p>
                <a
                    href={groupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-lg px-6 py-3 font-semibold shadow transition bg-green-700 text-white hover:bg-green-800 text-center"
                >
                    Join WhatsApp Group Now
                </a>
                <span className="mt-4 text-xs text-green-500">
                    Redirecting in {secondsLeft} seconds...
                </span>
                <p className="mt-2 text-xs text-blue-500 text-center">
                    P.S. Want to earn a 25% commission? Invite others to join and get rewarded when they complete their payment. Join the WhatsApp group to learn more!
                </p>
            </div>
        </>
    );
};
export default PaymentSuccessful;
