import React from 'react';
import {
    FileText,
    Zap,
    BarChart2,
    Cpu,
    Mic,
    ClipboardCheck,
    Users,
    Award, Presentation
} from 'lucide-react';

const gains = [
    {
        icon: <FileText className="w-12 h-12 text-blue-600 mx-auto" />,
        title: 'Professional Documents',
        desc: 'Craft polished resumes, reports, and proposals in Word—stand out with clean layouts, consistent styles, and real-world templates.',
    },
    {
        icon: <Zap className="w-12 h-12 text-blue-600 mx-auto" />,
        title: 'Boosted Productivity',
        desc: 'Automate repetitive tasks, use keyboard shortcuts, and apply styles & themes so you finish work in half the time.',
    },
    {
        icon: <BarChart2 className="w-12 h-12 text-blue-600 mx-auto" />,
        title: 'Data-Driven Insights',
        desc: 'Analyze, filter, and visualize data in Excel—spot trends, build charts, and make data-backed decisions with confidence.',
    },
    {
        icon: <Cpu className="w-12 h-12 text-blue-600 mx-auto" />,
        title: 'Basic Automation',
        desc: 'Set up macros, templates, and conditional formatting to handle routine tasks automatically and avoid errors.',
    },
    {
        icon: <Presentation className="w-12 h-12 text-blue-600 mx-auto" />,
        title: 'Engaging Presentations',
        desc: 'Design persuasive slides in PowerPoint—use masters, transitions, and multimedia to keep audiences hooked.',
    },
    {
        icon: <Mic className="w-12 h-12 text-blue-600 mx-auto" />,
        title: 'Public Speaking Tips',
        desc: 'Master your delivery with speaker notes, rehearsal tools, and audience engagement techniques for any setting.',
    },
    {
        icon: <ClipboardCheck className="w-12 h-12 text-blue-600 mx-auto" />,
        title: 'Hands-On Assignments',
        desc: 'Apply new skills immediately with real-world exercises after each session—reinforcement that sticks.',
    },
    {
        icon: <Users className="w-12 h-12 text-blue-600 mx-auto" />,
        title: 'Expert Support',
        desc: 'Get 1-on-1 help during office hours and collaborate with peers in our dedicated community channel.',
    },
    {
        icon: <Award className="w-12 h-12 text-blue-600 mx-auto" />,
        title: 'Completion Certificate',
        desc: 'Showcase your new competencies with a recognized certificate—perfect for CVs, LinkedIn, or scholarship applications.',
    },
];

const WhatYouWillGain = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 via-blue-100 to-white sm:py-20 lg:py-28">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold leading-tight text-blue-900 sm:text-4xl xl:text-5xl font-pj drop-shadow-md">
                        What You Will Gain
                    </h2>
                    <p className="max-w-xl mx-auto mt-4 text-base text-gray-600 font-pj">
                        From polished documents to data insights and confident presentations—gain the skills that power your success in school, work, and beyond.
                    </p>
                </div>

                <div className="grid grid-cols-1 mt-12 text-center sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gains.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-8 bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition"
                        >
                            {item.icon}
                            <h3 className="mt-6 text-xl font-bold text-blue-900 font-pj">
                                {item.title}
                            </h3>
                            <p className="mt-4 text-base text-blue-700 font-pj">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatYouWillGain;
