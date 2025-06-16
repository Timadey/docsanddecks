import React from 'react';
import bgWomanLaptop from "../../assets/images/attractive-woman-presssing-laptop.avif"
import expertMentors from "../../assets/images/expert-mentors.avif"
import affordableSuya from "../../assets/images/suya.avif"
import supportiveCommunity from "../../assets/images/supportive-community.avif"
import practicalExperience from "../../assets/images/practical-experience.avif"
import certificationThatMatter from "../../assets/images/certification-that-matters.avif"


export default function WhyUs() {
    const whyUs = [
        {
            title: "Beginner Friendly",
            img: bgWomanLaptop,
            alt: "Beginner Friendly",
            desc: "We start from ground zero, no shame, no stress, just simple, clear, and fun learning."
        },
        {
            title: "Expert Mentors",
            img: expertMentors,
            alt: "Expert Mentors",
            desc: "Our trainers will patiently guide you through clicks, shortcuts, and pro-level moves without making you feel lost."
        },
        {
            title: "Affordable + Accessible",
            img: affordableSuya,
            alt: "Affordable + Accessible",
            desc: <>Our pricing is student-budget friendly — <span className="italic">chicken change (like for real)</span>. Like “I-can-still-buy-suya-after-class” kind of friendly.</>
        },
        {
            title: "Supportive Community",
            img: supportiveCommunity,
            alt: "Supportive Community",
            desc: "You’re not in this alone. From group chats to group wins, you’ll be learning alongside a crew of fellow dreamers, builders, and banter-lovers."
        },
        {
            title: "Practical Experience",
            img: practicalExperience,
            alt: "Practical Experience",
            desc: "We don’t just teach, we do. Real projects, real-world scenarios, and real bragging rights for your portfolio."
        },
        {
            title: "Certification that matters",
            img: certificationThatMatter,
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
                            className="relative rounded-2xl shadow-xl p-0 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl border border-blue-100 overflow-hidden min-h-[340px] bg-blue-900"
                            style={{
                                backgroundImage: `url(${item.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 bg-blue-900/60"></div>
                            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-8">
                                {/*<div className="bg-blue-100 rounded-full p-4 mb-5 shadow-inner">*/}
                                {/*    <img*/}
                                {/*        src={item.img}*/}
                                {/*        alt={item.alt}*/}
                                {/*        className="w-16 h-16"*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow">{item.title}</h3>
                                <p className="text-blue-100 text-base drop-shadow">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
