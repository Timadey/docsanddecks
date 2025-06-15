import React from 'react';

const cards = [
    {
        img: "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-1.png",
        title: "With every friend you refer to Docs & Decks, you earn a sweet 25% commission, and they get 5% off the training.",
        category: "Earn Huge Commissions",
        // date: "25% commission"
    },
    {
        img: "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-2.png",
        title: "Get FREE access to exclusive Docs and Decks merchandise including stickers, shirts, caps, etc",
        category: "Exclusive Swag",
        // date: "Free swags"
    },
    {
        img: "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-3.png",
        title: "Access to huge discount up to 50% OFF trainings for top performing squad members",
        category: "Huge Discounts",
        // date: "50% discounts"
    },
    {
        img: "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-4.png",
        title: "Early access to new courses and features before public release",
        category: "Early Access",
        // date: ""
    },
    {
        img: "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-5.png",
        title: "Invitation to exclusive Squad webinars and networking events",
        category: "Events & Networking",
        // date: "April 09, 2022"
    },
    {
        img: "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-1.png",
        title: "Personalized digital badge to showcase your Squad status",
        category: "Recognition",
        // date: "April 09, 2022"
    }
];

const SquadPerksSection = () => (
<div id="perks" className="bg-white items-center justify-center w-full max-w-7xl mx-auto flex flex-col gap-10 pb-16 overflow-x-hidden snap-x snap-mandatory relative px-4">
        <div className="flex flex-col w-full mt-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 text-center mb-4">
                Why Join the DnD Squad?
            </h2>
            <p className="text-lg text-blue-700 text-center mb-8 max-w-2xl mx-auto">
                Unlock exclusive rewards, earn commissions, and become part of a thriving community of learners and skill bridgers.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-6">
                {[
                    { text: "Earn commission" },
                    { text: "Easy Withdrawal" },
                    { text: "Cool Merchandise" },
                    { text: "Join 100+ Squad Members" }
                ].map((item, idx) => (
                    <li key={idx} className="flex items-center bg-blue-50 rounded-xl px-4 py-2 shadow-sm">
                        <svg className="w-6 h-6 mr-2 text-blue-400" xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium text-blue-900">{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="relative snap-center shrink-0 first:pl-0 last:pr-0"
                    style={{
                        paddingLeft: idx === 0 ? '0' : '0.75rem',
                        paddingRight: idx === cards.length - 1 ? '0' : '0.75rem',
                        minWidth: '300px',
                        maxWidth: '400px',
                    }}
                >
                    <div className="overflow-hidden w-[300px] sm:w-[340px] md:w-[360px] lg:w-[400px] transition-all duration-300 transform bg-white border border-blue-100 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2">
                        <div className="px-5 py-6 sm:p-7">
                            <div className="flex items-start lg:items-center">
                                <div className="shrink-0 bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 rounded-xl p-1">
                                    <img
                                        className="h-16 w-16 lg:h-24 lg:w-24 rounded-lg object-cover border-4 border-white shadow-md"
                                        src={card.img}
                                        alt=""
                                    />
                                </div>
                                <div className="flex-1 ml-4 lg:ml-6">
                                    <p className="text-[11px] sm:text-xs font-bold text-blue-700 uppercase tracking-wide">
                                        {card.category}
                                    </p>
                                    <p className="mt-1 text-sm sm:text-base font-semibold text-blue-900 hover:text-blue-700 transition-colors">
                                        {card.title}
                                    </p>
                                    <p className="mt-2 text-[11px] sm:text-sm text-blue-400 font-medium">
                                        {card.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 m-3">
                            <span className="inline-block w-3 h-3 bg-blue-400 rounded-full shadow"></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="w-full flex justify-center mt-8">
            <a
                href="https://chat.whatsapp.com/HNP0GmBZndf3gGLeP6mSfG"
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-lg font-bold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp logo"
                    className="w-7 h-7 mr-3"
                />
                Join the DnD Squad Now &rarr;
            </a>
        </div>
        <style>
            {`
            .scrollbar-hide::-webkit-scrollbar {
                display: none !important;
            }
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}
        </style>
    </div>
);
export default SquadPerksSection;
