
import Hero from '../components/landing/hero.jsx';
import WhatYouWillGain from '../components/landing/what-you-will-gain.jsx';
import TrainingOutline from '../components/landing/training-outline.jsx';
import OurNumbers from '../components/landing/our-numbers.jsx';
import IsThisForMe from '../components/landing/is-this-for-me.jsx';
import Testimonials from '../components/landing/testimonials.jsx';
import CallToAction from '../components/landing/call-to-action.jsx';
// import Faq from '../components/landing/faq.jsx';
import Footer from '../components/landing/footer.jsx';
import WhyUs from '../components/landing/why-us.jsx';
import LandingLayout from '../layouts/landing-layout.jsx';
import React from 'react';
import { Cookie } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Faq from '../components/landing/faq.jsx';

export default function Welcome() {
    const [showCookieConsent, setShowCookieConsent] = React.useState(
        () => !localStorage.getItem('cookieConsentAccepted')
    );

    const acceptCookies = () => {
        localStorage.setItem('cookieConsentAccepted', '1');
        setShowCookieConsent(false);
    };

    return (
        <LandingLayout title={'DLB Bootcamp'} haveHeader={true}>
            <Hero />
            <IsThisForMe />
            <WhatYouWillGain />
            <TrainingOutline />
            <WhyUs />
            <Testimonials />
            <OurNumbers />
            <Faq />
            <CallToAction />
            <Footer />

            {!showCookieConsent && (
                <div className="animate-fade-in fixed bottom-2 left-1 z-50 flex w-[98vw] max-w-sm flex-col items-center gap-3 rounded-xl border border-blue-200 bg-white/60 backdrop-blur-sm p-4 shadow-2xl md:bottom-4 md:left-4 md:max-w-md md:flex-row md:gap-4 md:rounded-2xl md:p-6">
                    <div className="flex-1 text-center md:text-left">
                        <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                            <Cookie size={20} className="fill-yellow-200 text-yellow-400" />
                            <span className="text-base font-bold text-blue-800 md:text-lg">We use cookies!</span>
                        </div>
                        <span className="text-xs text-blue-700 md:text-sm">
                            This website uses cookies to ensure you get the best experience. By continuing, you agree to our{' '}
                                            <Link
                                                href={route('privacy-policy')}
                                                className="text-blue-600 underline hover:text-blue-800"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                Privacy Policy
                            </Link>
                            .
                        </span>
                    </div>
                    <button
                        className="mt-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-800 md:mt-0 md:px-6 md:py-2 md:text-base"
                        onClick={acceptCookies}
                    >
                        Accept
                    </button>
                </div>
            )}
        </LandingLayout>
    );
}
