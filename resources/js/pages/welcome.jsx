import { Head, Link, usePage } from '@inertiajs/react';
import Hero from '../components/landing/hero.jsx';
import WhatYouWillGain from '../components/landing/what-you-will-gain.jsx';
import TrainingOutline from '../components/landing/training-outline.jsx';
import OurNumbers from '../components/landing/our-numbers.jsx';
import IsThisForMe from '../components/landing/is-this-for-me.jsx';
import Testimonials from '../components/landing/testimonials.jsx';
import CallToAction from '../components/landing/call-to-action.jsx';
import Faq from '../components/landing/faq.jsx';
import Footer from '../components/landing/footer.jsx';
import Header from '../components/landing/header.jsx';
import WhyUs from '../components/landing/why-us.jsx';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="DLB Bootcamp">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Header />
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
        </>
    );
}
