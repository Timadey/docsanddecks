import React, { useState } from 'react';
import FetchUserPaying from '../components/payment/fetch-user-paying.jsx';
import PaymentDetail from '../components/payment/payment-page.jsx';
import LandingLayout from '../layouts/landing-layout.jsx';

const PaymentPage = () => {
    const [userName, setUserName] = useState("");
    const [userPaying, setUserPaying] = useState("");
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [referral, setReferral] = useState({ code: '', valid: false, referrer: "" });
    const [paid, setPaid] = useState(false);

    return (
        <LandingLayout title={"Payment"} haveHeader={false}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 py-12">
                {!emailSubmitted
                    ? (<FetchUserPaying
                            setUserName={setUserName}
                            setEmailSubmitted={setEmailSubmitted}
                            setReferral={setReferral}
                            setUserPaying={setUserPaying}
                            setPaid={setPaid}
                        />)
                    :(
                        <PaymentDetail userName={userName} userPaying={userPaying} referrer={referral} paid={paid}/>
                    )
               }
            </div>
        </LandingLayout>
    );
};

export default PaymentPage;
