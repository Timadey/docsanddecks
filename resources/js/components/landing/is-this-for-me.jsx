import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react';

const IsThisTrainingForMe = () => {
    const forYou = [
        "You're a student or graduate looking to improve your digital skills",
        "You’ve never used Microsoft Word, Excel, or PowerPoint confidently",
        "You want to create professional documents, reports, and presentations",
        "You’re preparing for internships, scholarship, job applications",
        "You are preparing for seminar presentation or school projects",
        "You're eager to boost your productivity using digital tools",
    ];

    const notForYou = [
        "You *think* you're already highly proficient in Microsoft Office tools...maybe because you used Ctrl+B once 😎",
        "You’re looking for advanced Excel modeling, macros, or VBA programming (this is foundational, not wizardry)",
        "You’re expecting to learn programming, data science, or machine learning (check out our other trainings 😉)",
        "You’re looking for certifications in unrelated tools like Photoshop or SPSS",
        "You expect a completely self-paced course with zero interaction or accountability",
        "You’re not willing to commit to weekly sessions, practice tasks, or showing up consistently",
    ];


    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 sm:py-20 lg:py-28">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h2 className="text-3xl  text-center font-extrabold leading-tight text-blue-900 sm:text-4xl xl:text-5xl font-pj drop-shadow-md">
                    Is This Training for Me?
                </h2>
                <p className="max-w-xl mx-auto mt-4 mb-6 text-center text-base text-gray-600">
                    Before you proceed, here’s a quick check to help you know if this bootcamp is right for you.
                </p>


                <div className="grid md:grid-cols-2 gap-8">
                    {/* For You */}
                    <div className="bg-blue-100 p-6 rounded-xl border border-blue-200">
                        <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-blue-500" /> This Training <span className="font-extrabold text-blue-800 ml-1">Is For You</span>&nbsp; if:
                        </h3>
                        <ul className="space-y-3 text-blue-900">
                            {forYou.map((point, idx) => (
                                <li key={idx} className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Not For You */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                            <XCircle className="w-5 h-5 mr-2 text-blue-400" /> This Training <span className="font-extrabold text-blue-800 ml-1">Is Not For You</span>&nbsp; if:
                        </h3>
                        <ul className="space-y-3 text-blue-900">
                            {notForYou.map((point, idx) => (
                                <li key={idx} className="flex items-start">
                                    <XCircle className="w-4 h-4 text-blue-400 mt-1 mr-2 flex-shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>    );
};

export default IsThisTrainingForMe;
