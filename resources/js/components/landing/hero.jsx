import React, { useState } from 'react';
import pressingLaptop from "@/assets/images/attractive-woman-presssing-laptop.avif";
import dndCurved from "@/assets/images/dnd-curved.png";
import { router } from '@inertiajs/react';

const Hero = () => {
    return (
        <div className="relative bg-blue-50">
            <section className="bg-blue-50 overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
                    <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                        <div className="absolute bottom-0 right-0 hidden lg:block">
                            <img fetchPriority="high" className="object-contain w-auto h-48" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/curved-lines.png" alt="" />
                        </div>

                        <div className="relative z-20 px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                            {/*<h1 className="text-4xl font-bold text-blue-900 sm:text-6xl xl:text-4xl">*/}
                            {/*    Gain Practical Computer Skills for<br />*/}
                            {/*    School, Work & Life.*/}
                            {/*</h1>*/}
                            <h1
                                className="mb-6 text-4xl leading-tight font-bold text-gray-800 md:text-6xl"
                            >
                                Gain Practical Computer Skills for
                                <br />
                                <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
                                    School, Work & Life
                                </span>
                            </h1>
                            <p className="mt-8 text-xl text-blue-900">
                                Unlock your confidence with essential digital skills, master Microsoft Word, Excel, and PowerPoint to thrive in today&#39;s workplace or school all within 6 weeks!
                            </p>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    const email = e.target.email.value;
                                    router.get(route('register-dlb', {email: email}));
                                }}
                                className="max-w-xl mx-auto mt-8 bg-white lg:mx-0 sm:bg-transparent lg:mt-12 rounded-xl"
                            >
                                <div className="p-4 sm:p-2 sm:bg-white sm:border-2 sm:border-transparent sm:rounded-full sm:focus-within:border-blue-600 sm:focus-within:ring-1 sm:focus-within:ring-blue-600">
                                    <div className="flex flex-col items-start sm:flex-row">
                                        <div className="flex-1 w-full min-w-0">
                                            <div className="relative text-blue-400 focus-within:text-blue-600">
                                                <label htmlFor="email" className="sr-only"></label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Enter email to get started"
                                                    className="block w-full px-4 py-4 text-base text-center text-blue-900 placeholder-blue-400 transition-all duration-200 border-transparent rounded-full focus:border-transparent focus:outline-none sm:text-left"
                                                    required=""
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full sm:mt-0 sm:w-auto hover:bg-blue-700 focus:bg-blue-700">
                                            Join Next Cohort
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <p className="mt-5 text-base text-blue-900">It takes less than 2 minutes to register.
                                <span className="font-bold">
                                    {(() => {
                                        const deadline = new Date('2025-07-21T00:00:00');
                                        const now = new Date();
                                        const diff = deadline.getTime() - now.getTime();

                                        if (diff <= 0) {
                                            return ' Next Cohort starting soon';
                                        }

                                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                                        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                                        return ` Next Cohort starts in ${days} days and ${hours} hours`;
                                    })()}
                                </span>
                            </p>

                        </div>

                        <div className="absolute right-0 z-0 -bottom-16 lg:top-24 lg:-left-20">
                            {/*<img className="w-32 h-32 md:w-40 md:h-40" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/circular-text.png" alt="" />*/}
                            <img className="-ml-4 w-40 h-32 md:w-45 md:h-40" src={dndCurved} alt="" />
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
                        <div className="absolute inset-0">
                            <img className="object-cover w-full h-full scale-3d" src={pressingLaptop} alt="" />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>

                        <div className="absolute bottom-0 left-0">
                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="flex items-center">
                                    <svg className="w-10 h-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                    <h2 className="font-bold text-white text-7xl ml-2.5">583</h2>
                                </div>
                                <p className="max-w-xs mt-1.5 text-xl text-white">Bridgers have learnt how to write proper documents, analyse data and present them like a pro!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Hero;
