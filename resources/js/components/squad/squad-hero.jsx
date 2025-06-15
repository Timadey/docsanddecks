import React from 'react';
import bridgethegap from "../../assets/images/bridge-the-gap-squad.jpeg"

const SquadHeroSection = () => (
    <div
        className="relative flex items-center justify-center min-h-screen w-full overflow-hidden"
        style={{
            backgroundImage: `url(${bridgethegap})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
    >
        <div className="absolute inset-0 bg-blue-900/50"></div>
        <div className="relative z-10 max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
                Spread the word, Earn rewards
            </h1>
            <p className="max-w-lg mx-auto mt-4 text-lg sm:text-xl font-medium leading-8 text-blue-100 drop-shadow">
                Help others bridge their skill gaps and get paid!<br />
                Join the Squad. Get paid. Change lives.<br />
                <span className="font-semibold text-blue-200">View squad perks below.</span>
            </p>
            <a
                href="#perks"
                className="inline-block mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-lg font-bold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
                Discover Squad Perks &darr;
            </a>
        </div>
    </div>
);
export default SquadHeroSection;
