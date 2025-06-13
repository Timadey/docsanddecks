import React from 'react';
import RegisterStepForm from './step-form.jsx';

const DLBRegisterForm = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-screen bg-white overflow-hidden">
            {/* Left: Image */}            {/* Left: Image */}
            <div className="relative w-full h-150 sm:h-96 lg:order-1 lg:h-auto lg:w-5/12 flex-shrink-0 overflow-hidden lg:sticky lg:top-0 pointer-events-none">
                <div className="absolute inset-0">
                    <img
                        className="object-cover w-full h-full scale-150 md:scale-125 lg:scale-100 transition-transform duration-500"
                        src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/man-working-on-laptop.jpg"
                        alt=""
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center">
                        <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h2 className="font-bold text-white text-4xl sm:text-6xl ml-2.5">583</h2>
                    </div>
                    <p className="max-w-xs mt-1.5 text-sm sm:text-lg text-white leading-relaxed">
                        Bridgers have learnt how to write proper documents, analyse data and present them like a pro!
                    </p>
                </div>
            </div>
            {/* Right: Step Form */}
            <div className="relative pointer-events-auto flex-1 flex items-center justify-center w-full lg:w-7/12 h-auto lg:h-screen overflow-y-auto py-10 px-6 sm:px-10 lg:py-24 md:mt-24">
            <RegisterStepForm />
            </div>
        </div>
    );
};

export default DLBRegisterForm;
