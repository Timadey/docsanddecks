import React from 'react';
import LandingLayout from '../layouts/landing-layout.jsx';

export default function DataDecodeSuccess() {
    return (
        <LandingLayout title={"Registration Successful"} haveHeader={true}>
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 mt-10 text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-700">Thank you for registering!</h2>
                <p className="mb-4">You have successfully registered for the <b>Data Decode</b> program. We will contact you soon with more details.</p>
                <p className="mb-4">Please check your email for updates. If you have any questions, feel free to contact us.</p>
                <a href="/" className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back to Home</a>
            </div>
        </LandingLayout>
    );
} 