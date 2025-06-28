import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import ipadeola from '../../assets/images/ipadeola-cropped.webp';

const CallToAction = () => {
    return (
        <section className="py-16 bg-blue-50 sm:py-24 lg:py-32">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16 lg:gap-x-24 items-center">

                    {/* Spotlight Testimonial */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <img
                            className="object-cover w-20 h-20 rounded-full border-4 border-blue-400 shadow-lg"
                            src={ipadeola}
                            alt="Jenny Wilson"
                        />
                        <blockquote>
                            <p className="mt-8 text-2xl font-bold leading-relaxed text-blue-900 italic">
                                “I thought I knew Microsoft word but I never knew what I know is just typing not even the main work!”
                            </p>
                        </blockquote>
                        <p className="mt-8 text-lg font-semibold text-blue-800">Abigeal Ipadeola </p>
                        <p className="mt-1 text-base text-blue-500">Final Year Student, University of Ibadan</p>
                    </div>

                    {/* Enrollment Panel */}
                    <div className="overflow-hidden bg-white rounded-2xl shadow-xl border border-blue-200">
                        <div className="p-10 lg:px-14 lg:py-12 flex flex-col items-center">

                            <h3 className="text-3xl font-extrabold text-blue-900 text-center">
                                Enrollment Open: Join Cohort 2 Today
                            </h3>

                            <p className="mt-4 text-md text-blue-700 text-center">
                                In 6 weeks you’ll master Word, Excel & PowerPoint through live, hands-on sessions, plus get a certificate to showcase your new skills.
                            </p>

                            {/* Urgency + Bonus */}
                            <div className="mt-6 text-sm text-blue-700 bg-blue-100 px-4 py-2 rounded-md flex items-center">
                                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>
                                   Limited-time offer: Follow us online and get up to 20% off your Docs and Decks Bootcamp fee. Offer closes {
                                     (() => {
                                       const now = new Date();
                                       const closeDate = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
                                       return closeDate.toLocaleString('en-US', { month: 'long', day: 'numeric' });
                                     })()
                                   }!
                                  </span>
                            </div>


                            <Link
                                href={route('register-dlb')}
                                className="flex items-center justify-center w-full px-6 py-4 mt-8 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition duration-200"
                            >
                                Secure Your Spot <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>

                            <a
                                href={`https://api.whatsapp.com/send/?phone=${usePage().props.support_number}&text=Hello%2C+I+have+a+few+questions...&type=phone_number&app_absent=0`}
                                className="flex items-center justify-center w-full px-6 py-4 mt-4 text-lg font-bold text-blue-700 bg-white border-2 border-blue-500 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition duration-200"
                            >
                                💬 Talk to us
                            </a>

                            <p className="mt-6 text-sm text-blue-400">
                                Registration closes July 20
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CallToAction;
