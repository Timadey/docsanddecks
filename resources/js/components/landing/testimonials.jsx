import React from 'react';
import ipadeola from '../../assets/images/ipadeola-cropped.png';
import hannah from '../../assets/images/hannah-cropped.webp';
import covenant from '../../assets/images/covenant-cropped.webp';
import tomilayo from '../../assets/images/tomilayo-cropped.webp';

const Testimonials = () => {
    const demoTestimonials = [
        {
            name: 'Abigeal Ipadeola ',
            role: 'Student, University of Ibadan',
            message: "I can say the most valuable of it all is learning Microsoft word because it came at the moment...I was writing my final year project. It helped me with the editing, numbering of pages and so much more. ",
            avatar: ipadeola,
        },
        {
            name: 'Hannah Ogungbemi',
            role: '400 level, University of Ibadan',
            message: "I learnt new things that I'll be forever grateful for. My eyes were opened up to new tools, shortcuts in Microsoft Word and oh, the guidance from the facilitator was the major highlight for me.",
            avatar: hannah,
        },
        {
            name: 'Covenant Olawale',
            role: 'Graduate, FUNAAB',
            message: "I used to feel kind of lost when it came to making document or presentations, but now I feel way more confident. When it comes to excel, I used to feel I know a lot due to the fact that I'm aspiring to be a Data analyst but I've gotten to know different things here that I have not seen before. ",
            avatar: covenant,
        },
        {
            name: 'Tomilayo Oluwatayo',
            role: 'Pharmacy, University of Ibadan',
            message: "Docs and Decks has really expanded my knowledge on Ms word, excel and PowerPoint. If there's something I really loved, it's how the facilitators were very patient and took their time explaining each concept. I really look forward to putting into practice all I've learnt...",
            avatar: tomilayo,
        },
        {
            name: 'Tijani Ridwanlahi',
            role: 'Technology Student, University of Ibadan',
            message: "Docs and Decks helped me while I was trying to write a technical paper for the SPE NAICE conference. The knowledge I gained from the program made the process much smoother and more impactful.",
            avatar: "", // Placeholder for an image
        },
    ];

    return (
        <section className="py-12 bg-gradient-to-b from-white via-blue-100 to-white sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <p className="text-lg font-medium text-blue-600 font-pj">
                            Real feedback from our learners
                        </p>
                        <h2 className="mt-4 text-3xl font-bold text-blue-900 sm:text-4xl xl:text-5xl font-pj">
                            What our students are saying
                        </h2>
                    </div>

                    <div className="mt-8 text-center md:mt-16 md:order-3">
                        <a
                            href="#"
                            className="pb-2 text-base font-bold leading-7 text-blue-900 transition-all duration-200 border-b-2 border-blue-900 hover:border-blue-600 hover:text-blue-600 font-pj focus:outline-none focus:ring-1 focus:ring-blue-900 focus:ring-offset-2"
                        >
                            Join the next cohort
                        </a>
                    </div>

                    <div className="relative mt-10 md:mt-24 md:order-2">
                        <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                            <div
                                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                                style={{
                                    background:
                                        'linear-gradient(90deg, #3B82F6 0%, #2563EB 50%, #1E3A8A 100%)',
                                }}
                            ></div>
                        </div>
                        <div className="relative w-full overflow-hidden">
                            <div
                                className="flex gap-6 animate-testimonial-scroll hover:[animation-play-state:paused]"
                                style={{
                                    width: 'max-content',
                                    animation: 'testimonial-scroll 30s linear infinite',
                                }}
                            >
                                {demoTestimonials.concat(demoTestimonials).map((testimonial, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col overflow-hidden shadow-xl rounded-2xl min-w-[350px] lg:min-w-[400px] max-w-xs"
                                    >
                                        <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-5 h-5 text-yellow-400"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <blockquote className="flex-1 mt-8">
                                                    <p className="text-lg leading-relaxed text-blue-900 font-pj">
                                                        “{testimonial.message}”
                                                    </p>
                                                </blockquote>
                                            </div>
                                            <div className="flex items-center mt-8">
                                                <img
                                                    className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                />
                                                <div className="ml-4">
                                                    <p className="text-base font-bold text-blue-900 font-pj">
                                                        {testimonial.name}
                                                    </p>
                                                    <p className="mt-0.5 text-sm font-pj text-blue-600">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <style>
                                {`
                                    @keyframes testimonial-scroll {
                                        0% { transform: translateX(0); }
                                        100% { transform: translateX(-50%); }
                                    }
                                    .relative.w-full.overflow-hidden {
                                        max-width: 100vw;
                                    }
                                `}
                            </style>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
