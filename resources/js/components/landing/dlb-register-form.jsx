import React, { useEffect, useState } from 'react';
import RegisterStepForm from './step-form.jsx';
import { usePage } from '@inertiajs/react';
import useCurrencyConverter from '../../hooks/use-currency-converter.jsx';

const DLBRegisterForm = () => {
    const { pricing, referral } = usePage().props;

    const {
        currency: userCurrency,
        rate,
        loading,
        formatter: formatterFromHook,
        converted,
    } = useCurrencyConverter(
        pricing.base_original,
        { discounted: pricing.base_discounted }
    );

    console.log(converted);

    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: userCurrency,
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    });

    return (
        <div className="flex flex-col overflow-hidden bg-gradient-to-b from-white via-white to-blue-50 lg:min-h-screen lg:flex-row lg:items-stretch">
            {/* Left: Image */} {/* Left: Image */}
            <div className="pointer-events-none relative h-150 w-full flex-shrink-0 overflow-hidden sm:h-96 lg:sticky lg:top-0 lg:order-1 lg:h-auto lg:w-5/12">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full scale-150 object-cover transition-transform duration-500 md:scale-125 lg:scale-100"
                        src="https://img.freepik.com/free-photo/medium-shot-man-working-with-laptop_23-2149161007.jpg?uid=R114449743&ga=GA1.1.20347306.1743427258&w=740"
                        alt=""
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center">
                        <svg
                            className="h-8 w-8 text-blue-600 sm:h-10 sm:w-10"
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
                        <h2 className="font-bold text-4xl sm:text-6xl ml-2.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
                            {loading ? (
                                <span className="flex items-center text-blue-100 mr-2 text-2xl sm:text-4xl">
                                    <svg className="animate-spin h-6 w-6 mr-2 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                    </svg>
                                    0.00
                                </span>
                            ) : (
                                <>
                                    <span className="line-through text-blue-100 mr-2 text-2xl sm:text-4xl">
                                        {formatter.format(converted.base)}
                                    </span>
                                    {formatter.format(converted.discounted.discounted)}
                                </>
                            )}
                        </h2>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white sm:text-lg">
                        This discount is available to people who follow us on our socials! Like we said our pricing is chicken feed, we are here to
                        help you learn and grow.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white sm:text-lg">
                        An email will be sent to you after registration and payment for confirmation. Don&#39;t forget to join the participant&#39;s
                        group and also follow us on our social media platforms.
                    </p>
                </div>
            </div>
            {/* Right: Step Form */}
            <div className="pointer-events-auto relative flex h-auto w-full flex-1 items-center justify-center px-6 py-10 sm:px-10 md:mt-24 lg:h-screen lg:w-7/12 lg:py-24">
                <RegisterStepForm referral={referral} />
            </div>
        </div>
    );
};

export default DLBRegisterForm;
