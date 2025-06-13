import React from 'react';

export default function WhyUs() {
    const whyUs = [
        {
            title: "Beginner Friendly",
            img: "https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/rocket.png",
            alt: "Beginner Friendly",
            desc: "We start from ground zero, no shame, no stress, just simple, clear, and fun learning."
        },
        {
            title: "Expert Mentors",
            img: "https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/rocket.png",
            alt: "Expert Mentors",
            desc: "Our trainers will patiently guide you through clicks, shortcuts, and pro-level moves without making you feel lost."
        },
        {
            title: "Affordable + Accessible",
            img: "https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/community.png",
            alt: "Affordable + Accessible",
            desc: <>Our pricing is student-budget friendly — <span className="italic">chicken change (like for real)</span>. Like “I-can-still-buy-suya-after-class” kind of friendly.</>
        },
        {
            title: "Supportive Community",
            img: "https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/community.png",
            alt: "Supportive Community",
            desc: "You’re not in this alone. From group chats to group wins, you’ll be learning alongside a crew of fellow dreamers, builders, and banter-lovers."
        },
        {
            title: "Practical Experience",
            img: "https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/certificate.png",
            alt: "Practical Experience",
            desc: "We don’t just teach, we do. Real projects, real-world scenarios, and real bragging rights for your portfolio."
        },
        {
            title: "Certification that matters",
            img: "https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/certificate.png",
            alt: "Certification that matters",
            desc: "You’ll walk away with a certificate that actually means something, one that proves you’ve got skills and aren’t just collecting vibes."
        }
    ];

    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight drop-shadow">
                    Why Choose Us?
                </h2>
                <p className="max-w-xl mx-auto mb-14 mt-4 text-base text-gray-600">
                    We are committed to your growth. Our bootcamp is designed to help you gain real world skills, connect with industry experts, and join a thriving community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {whyUs.map((item, idx) => (
                        <div
                            key={item.title}
                            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl border border-blue-100"
                        >
                            <div className="bg-blue-100 rounded-full p-4 mb-5 shadow-inner">
                                <img
                                    src={item.img}
                                    alt={item.alt}
                                    className="w-16 h-16"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-blue-800 mb-3">{item.title}</h3>
                            <p className="text-blue-600 text-base">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
