import React, { useState } from 'react';
import PersonalForm from './steps/personal.jsx';
import BackgroundForm from './steps/background.jsx';
import Motivation from './steps/motivation.jsx';
import { useForm } from '@inertiajs/react';

export default function RegisterStepForm () {
    const deadline = new Date('2025-07-21T00:00:00');
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const steps = ['personal', 'background', 'motivation'];

    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        middlename: '',
        gender: '',
        email: '',
        phone: '',
        age_group: '',
        msword_level: '',
        msexcel_level: '',
        mspptx_level: '',
        education: '',
        occupation: '',
        motivation: '',
        hear_source: '',
        referral: '',
        will_commit: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            handleSubmit(e);
        }
    };

    const handleBack = (e) => {
        e.preventDefault();
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        post(route('submit-register-dlb'), {
            onFinish: () => setSubmitting(false),
            onSuccess: () => {
                reset();
                alert('Registration submitted! Proceed to payment');
            },
        });
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (<PersonalForm formData={data} onChange={handleChange} errors={errors} />);
            case 1:
                return <BackgroundForm formData={data} onChange={handleChange} errors={errors} />;
            case 2:
                return <Motivation formData={data} onChange={handleChange} errors={errors} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="relative max-w-xl w-full mt-10 text-center lg:text-left overflow-auto max-h-screen px-2">
                {/* Step Form */}
                <div className="border-b p-6 border-blue-300">
                    <div className="relative mb-2">
                        <div className="absolute  top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-gray-200"></div>
                        <div
                            className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-blue-600 transition-all duration-500"
                            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                        ></div>
                        <div className="relative z-10 flex justify-between">
                            {steps.map((stepName, index) => (
                                <div
                                    key={stepName}
                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                                        index <= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                    }`}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        {steps.map((stepName) => (
                            <span key={stepName} className="capitalize">
                                {stepName}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Quote from a past student */}
                <div className="mb-4 px-4 py-3 bg-blue-50 text-sm border-l-4 border-blue-400 text-blue-900 italic rounded">
                    “I remember when I filled the form to apply, we were asked to pick our proficiency in each of the digital skills. I picked intermediate in MS word because I thought I knew all there is to it. Looking back now, I should have picked basic!.”<br />
                    <span className="block mt-2 font-semibold text-blue-700">— Oluwatayo Tomilayo, Alumni</span>
                </div>

                <div className="bg-white rounded-xl mt-10 p-6 border-t border-gray-200  shadow-md sm:p-8">
                    <h2 className="text-2xl font-semibold text-blue-900 mb-6">Register for the Next Cohort</h2>
                    <form onSubmit={handleNext}>
                        {renderStep()}
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                className="px-6 py-3 font-semibold rounded-full border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 disabled:opacity-50"
                                onClick={handleBack}
                                disabled={step === 0}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:bg-blue-700 disabled:opacity-50"
                                disabled={submitting}
                            >
                                {step === steps.length - 1 ? (submitting ? 'Submitting...' : 'Submit') : 'Next'}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-6 text-base text-blue-900 max-w-md mx-auto lg:mx-0">
                    It takes less than 2 minutes to register.{' '}
                    <span className="font-bold">
              Next Cohort starts in {days} days and {hours} hours
            </span>
                </p>
            </div>

            {/* Decorative Images */}
            <div className="hidden lg:block absolute bottom-0 right-0 pointer-events-none">
                <img
                    className="object-contain w-auto h-48"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/curved-lines.png"
                    alt="A young man"
                />
            </div>
            <div className="hidden lg:block absolute right-0 z-10 -bottom-16 lg:top-24 lg:-left-20 pointer-events-none">
                <img
                    className="w-32 h-32 md:w-40 md:h-40"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/circular-text.png"
                    alt=""
                />
            </div>
        </>

    );
}

