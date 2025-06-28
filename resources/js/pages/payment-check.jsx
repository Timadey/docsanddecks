import PaymentSuccessful from '../components/payment/payment-successful';
import LandingLayout from '../layouts/landing-layout.jsx';
import { Link, usePage } from '@inertiajs/react';

const PaymentCheck = ({ payment_success }) => {
    return (
        <LandingLayout title={"Verify Payment"} haveHeader={true}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 py-12">
                {
                    payment_success
                ?   (<PaymentSuccessful />)
                :
                    (
                        <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-red-100 bg-white/90 p-10 shadow-2xl backdrop-blur-md">
                            <svg className="mb-4 h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#fee2e2" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9l6 6m0-6l-6 6" stroke="#ef4444" />
                            </svg>
                            <h1 className="mb-2 text-center text-3xl font-extrabold text-blue-800">Payment Could Not Be Completed</h1>
                            <p className="mb-6 text-center text-base text-blue-700">
                                Unfortunately, we could not process your payment.<br />
                                If you think this is an error, please contact support using the floating button at the bottom corner.
                            </p>
                            <Link href={route('payment')}
                               className="w-full rounded-lg px-6 py-3 font-semibold shadow transition bg-blue-700 text-white hover:bg-blue-800 text-center"
                            >
                                Back to Payment
                            </Link>
                            <span className="mt-4 text-xs text-red-500">
                                 <a href={`https://api.whatsapp.com/send/?phone=${usePage().props.support_number}&text=Hello%2C+please+help%2C+I+am+having+problem+with+payment%2C+my+email+is&type=phone_number&app_absent=0`}
                                    className="underline"
                                 >
                                    Need help? Our support team is here for you.
                                 </a>
                            </span>
                        </div>

                    )
                }
            </div>
        </LandingLayout>
    );
};

export default PaymentCheck;
