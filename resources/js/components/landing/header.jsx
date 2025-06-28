import dndlogo from "@/assets/images/dnd-logo-no-bg.avif";
import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Header () {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className=" inset-x-0 top-0 z-9999 w-full fixed  backdrop-blur-sm">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">
                        <Link href={route('home')} title="" className="flex items-center">
                            <img src={dndlogo} className="w-auto h-24 mt-8"  alt="dnd-logo"/>
                            <span className="mt-8 text-md font-bold leading-4 text-blue-900">
                                Docs and Decks
                            </span>
                        </Link>
                    </div>

                    <button
                        type="button"
                        className="inline-flex p-2 text-blue-900 transition-all duration-200 rounded-md lg:hidden focus:bg-blue-100 hover:bg-blue-100"
                        aria-label="Toggle menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {/* Menu open: "hidden", Menu closed: "block" */}
                        <svg className={`${menuOpen ? 'hidden' : 'block'} w-6 h-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                        {/* Menu open: "block", Menu closed: "hidden" */}
                        <svg className={`${menuOpen ? 'block' : 'hidden'} w-6 h-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
                        <Link href={route('home')} title="" className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"> Home </Link>
                        <Link href={route('register-dlb')} title="" className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"> Register </Link>
                        <Link href={route('payment')} title="" className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"> Payment </Link>
                        <Link href={route('squad')} title="" className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"> DnD Squad </Link>
<a
                            href={`https://api.whatsapp.com/send/?phone=${usePage().props.support_number}&text=Hello%2C+I+have+a+few+questions...&type=phone_number&app_absent=0`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Contact us on WhatsApp"
                            className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"
                        >
                            Contact us
                        </a>
                        <Link href={route('register-dlb')} title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold transition-all duration-200 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700" role="button">
                            Secure Your Spot
                        </Link>
                    </div>
                </div>
                {/* Mobile menu */}
                <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden mt-2`}>
                    <div className="flex flex-col space-y-2 shadow-md p-4">
                        <Link href={route('home')} title="" className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"> Home </Link>
                        <Link href={route('register-dlb')} title="" className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"> Register </Link>
                        <Link href={route('payment')} title="" className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"> Payment </Link>
                        <Link href={route('squad')} title="" className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"> DnD Squad </Link>
                        <a href="#" title="" className="text-base font-semibold text-blue-900 transition-all duration-200 hover:text-opacity-80"> Contact us </a>
                        <Link href={route('register-dlb')} title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold transition-all duration-200 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700" role="button">
                            Secure Your Spot
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
