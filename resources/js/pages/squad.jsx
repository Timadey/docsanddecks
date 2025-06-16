import SquadHeroSection from '../components/squad/squad-hero.jsx';
import SquadCardsSection from '../components/squad/squad-perks.jsx';
import LandingLayout from '../layouts/landing-layout.jsx';

const Squad = () => {
    return (
        <LandingLayout title={"About Squad"} haveHeader={true}>
            <section className="min-h-screen flex flex-col justify-center items-center py-16 bg-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <img
                        className="object-cover w-full h-full opacity-60"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/grid-pattern.png"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-100/60 via-white/80 to-white/100"></div>
                </div>
                <div className="relative w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="w-screen">
                        <SquadHeroSection />
                    </div>
                    <div className="w-full">
                        <SquadCardsSection />
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}

export default Squad;
