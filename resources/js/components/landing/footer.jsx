'use client';
import { BookOpen, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 px-4 py-12 md:px-6">
            <div className="container mx-auto">
                <div className="flex flex-col justify-between md:flex-row">
                    <div className="mb-8 md:mb-0">
                        <a href="/" className="flex items-center gap-2">
                            {/*<Icons.logo className="w-6" />*/}
                            <h2 className="text-lg font-bold text-blue-700">Docs and Decks</h2>{' '}
                        </a>

                        <div className="mt-2">
                            <a href="https://x.com/docsdecks">
                                <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
                                    Follow us On
                                    <Twitter className="ml-1 h-4 w-4 text-blue-300" />
                                </Button>
                            </a>
                        </div>
                        <p className="mt-5 text-sm text-blue-700">
                            Join DnD Squad and start earning rewards on every participant you bring to Docs and Decks.
                            <br />© {new Date().getFullYear()} Docs and Decks. All rights reserved.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                        <div>
                            <h3 className="mb-4 font-semibold text-blue-800">Socials</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="https://www.linkedin.com/company/docsdecks"
                                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                                    >
                                        <Linkedin className="h-4 w-4 text-blue-600" />
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="https://x.com/docsdecks" className="flex items-center gap-2 text-blue-700 hover:text-blue-900">
                                        <Twitter className="h-4 w-4 text-blue-600" />X
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/docsndecks" className="flex items-center gap-2 text-blue-700 hover:text-blue-900">
                                        <Facebook className="h-4 w-4 text-blue-600" />Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 font-semibold text-blue-800">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href={route('privacy-policy')} className="flex items-center gap-2 text-blue-700 hover:text-blue-900">
                                        <BookOpen className="h-4 w-4 text-blue-600" />
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex w-full items-center justify-center">
                    <h1 className="bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-center text-3xl font-bold text-transparent select-none md:text-5xl lg:text-[10rem]">
                        Docs and Decks
                    </h1>
                </div>
            </div>
        </footer>
    );
}
