import React from 'react';

const cards = [
    {
        img: 'https://img.freepik.com/premium-vector/collection-trading-market-isometric-icons_9206-18324.jpg',
        title: (
            <>
                With every friend you refer to Docs & Decks, you earn a sweet{' '}
                <span className="font-bold text-green-600">25% commission</span>, and they get{' '}
                <span className="font-bold text-green-600">5% off</span>{' '}
                the training.
            </>
        ),
        category: 'Earn Huge Commissions',
    },
    {
        img: 'https://img.freepik.com/premium-psd/fashion-product-retail-shopping-ecommerce-sale-3d_66255-2945.jpg',
        title: <>Get <span className="font-bold text-green-600">FREE</span> access to exclusive Docs and Decks merchandise including stickers, shirts, caps, etc</>,
        category: 'Exclusive Swag',
    },
    {
        img: 'https://img.freepik.com/premium-psd/tag-label-with-percentage-discount-coupon-online-shopping-icon-3d-illustration-background_56104-2667.jpg',
        title: (
            <>
                Access to huge discount up to{' '}
                <span className="font-bold text-green-600">50% OFF</span>{' '}
                trainings for top performing squad members
            </>
        ),
        category: 'Huge Discounts',
    },
    {
        img: 'https://img.freepik.com/premium-vector/blue-padlock-protecting-password-with-asterisks-illustrating-cybersecurity_98402-212644.jpg',
        title: 'Early access to new courses and features before public release',
        category: 'Early Access',
    },
    {
        img: 'https://img.freepik.com/free-vector/people-social-team-connection-circular-diagram-template-design_1017-53395.jpg',
        title: 'Invitation to exclusive Squad webinars and networking events',
        category: 'Events & Networking',
    },
    {
        img: 'https://img.freepik.com/free-psd/hand-holding-star-customer-review-feedback-rating-concept-3d-illustration_56104-2741.jpg',
        title: 'Personalized digital badge to showcase your Squad status and boost your social media presence',
        category: 'Recognition',
    },
];

const SquadPerksSection = () => (
    <div id="perks" className="bg-white w-full max-w-7xl mx-auto flex flex-col gap-10 pb-20 px-6 sm:px-8 lg:px-10 relative">
        <div className="flex flex-col w-full mt-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 text-center mb-5">
                Why Join the DnD Squad?
            </h2>
            <p className="text-lg text-blue-700 text-center mb-8 max-w-2xl mx-auto">
                Unlock exclusive rewards, earn commissions, and become part of a thriving community of learners and skill bridgers.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-8">
                {[
                    { text: "Earn commission" },
                    { text: "Easy Withdrawal" },
                    { text: "Cool Merchandise" },
                    { text: "Join 100+ Squad Members" }
                ].map((item, idx) => (
                    <li key={idx} className="flex items-center bg-blue-50 rounded-full px-4 py-2 shadow-sm">
                        <svg className="w-5 h-5 mr-2 text-blue-400" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium text-blue-900">{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="group bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center p-6"
                >
                    <div className="w-24 h-24 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 p-1">
                        <img
                            src={card.img}
                            alt={card.category}
                            className="rounded-lg w-full h-full object-cover border-4 border-white shadow-md"
                        />
                    </div>
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">
                        {card.category}
                    </p>
                    <p className="text-base font-semibold text-blue-900 group-hover:text-blue-700 transition-colors leading-relaxed">
                        {card.title}
                    </p>
                </div>
            ))}
        </div>

        <div className="w-full flex justify-center mt-14">
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
    </div>
);

export default SquadPerksSection;
