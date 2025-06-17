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
import proDoc from "../../assets/images/professional-document.avif";
import boostedProd from "../../assets/images/boosted-productivity.jpg";
import dataDriven from "../../assets/images/data-driven-insights.avif";
import automation from "../../assets/images/basic-automation.avif";
import engagingPresent from "../../assets/images/powerpoint-slide.avif";
import publicSpeaking from "../../assets/images/public-speaking-tips2.avif";
import handsOnAss from "../../assets/images/hands-on-assignment.avif";
import expertSupport from "../../assets/images/expert-support.avif";
import completionCert from "../../assets/images/certificate-of-completion.avif";
import bgWomanLaptop from '../../assets/images/attractive-woman-presssing-laptop.avif';

const gains = [
    {
        img: proDoc,
        icon: <FileText className="w-12 h-12 text-blue-100 mx-auto" />,
        title: 'Craft Professional Documents',
        desc: 'You will write polished resumes, reports, and proposals in Word and stand out with clean layouts, consistent styles, and real-world templates.',
    },
    {
        img: boostedProd,
        icon: <Zap className="w-12 h-12 text-blue-100 mx-auto" />,
        title: 'Boost your Productivity',
        desc: 'Achieve more faster by automating repetitive tasks, use keyboard shortcuts, and apply styles & themes so you finish work in half the time.',
    },
    {
        img: dataDriven,
        icon: <BarChart2 className="w-12 h-12 text-blue-100 mx-auto" />,
        title: 'Data-Driven Insights',
        desc: 'You will analyze, filter, and visualize data in Excel, spot trends, build charts, and make data-backed decisions for your work or school project with confidence.',
    },
    {
        img: automation,
        icon: <Cpu className="w-12 h-12 text-blue-100 mx-auto" />,
        title: 'Basic Automation',
        desc: 'Set up templates, and conditional formatting to handle routine tasks automatically and avoid errors.',
    },
    {
        img: engagingPresent,
        icon: <Presentation className="w-12 h-12 text-blue-100 mx-auto" />,
        title: 'Engaging Presentations',
        desc: 'You will design persuasive and eye appealing slides in PowerPoint using masters, transitions, and multimedia to keep audiences hooked.',
    },
    {
        img: publicSpeaking,
        icon: <Mic className="w-12 h-12 text-blue-100 mx-auto" />,
        title: 'Public Speaking Tips',
        desc: 'You will master your presentation delivery with speaker notes, rehearsal tools, and audience engagement techniques for any setting.',
    },
    {
        img: handsOnAss,
        icon: <ClipboardCheck className="w-12 h-12 text-blue-100 mx-auto" />,
        title: 'Hands-On Assignments',
        desc: 'Here, we apply new skills immediately with real-world exercises after each session, reinforcing everything you have learnt.',
    },
    {
        img: expertSupport,
        icon: <Users className="w-12 h-12 text-blue-100 mx-auto" />,
        title: 'Expert Support',
        desc: 'Get 1-on-1 help during office hours and collaborate with peers in our dedicated community channel.',
    },
    {
        img: completionCert,
        icon: <Award className="w-12 h-12 text-blue-100 mx-auto" />,
        title: 'Completion Certificate',
        desc: 'You get to showcase your new competencies with a recognized certificate—perfect for CVs, LinkedIn, or scholarship applications.',
    },
];

const WhatYouWillGain = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-6 tracking-tight drop-shadow">
                    What You Will Gain
                </h2>
                <p className="max-w-xl mx-auto mb-14 mt-4 text-base text-gray-600">
                    From polished documents to data insights and confident presentations—gain the skills that power your success in school, work, and beyond.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {gains.map((item, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-2xl shadow-xl p-0 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-2xl border border-blue-100 overflow-hidden min-h-[340px] bg-blue-900"
                            style={{
                                backgroundImage: `url(${item.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 bg-blue-950/60"></div>
                            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-8">
                                {item.icon}
                                <h3 className="text-2xl font-semibold text-blue-100 mb-3 drop-shadow">{item.title}</h3>
                                <p className="text-blue-100 text-base drop-shadow">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatYouWillGain;
