import Hero from '../components/landing/hero.jsx';
import WhatYouWillGain from '../components/landing/what-you-will-gain.jsx';
import TrainingOutline from '../components/landing/training-outline.jsx';
import OurNumbers from '../components/landing/our-numbers.jsx';
import IsThisForMe from '../components/landing/is-this-for-me.jsx';
import Testimonials from '../components/landing/testimonials.jsx';
import CallToAction from '../components/landing/call-to-action.jsx';
import Faq from '../components/landing/faq.jsx';
import Footer from '../components/landing/footer.jsx';
import WhyUs from '../components/landing/why-us.jsx';
import LandingLayout from '../layouts/landing-layout.jsx';

export default function Welcome() {

    return (
        <LandingLayout title={"DLB Bootcamp"} haveHeader={true}>
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
        </LandingLayout>
    );
}
