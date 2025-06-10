import React from 'react';

const steps = [
    {
        title: '1. Getting Started with Microsoft Word',
        description: 'Get familiar with the Word interface, open and save documents, and use basic formatting like bold, italics, bullets, and alignment. Create your first bio document.',
    },
    {
        title: '2. Page Layouts & Styles',
        description: 'Master margins, columns, section breaks, headers/footers, and learn the difference between manual formatting and reusable styles. Explore templates and consistency techniques.',
    },
    {
        title: '3. Automatic Numbering & References',
        description: 'Learn how to insert automatic numbering, create tables of contents, figures, and references. Use cross-referencing to keep your documents dynamic and professional.',
    },
    {
        title: '4. Cover Pages & Document Finalization',
        description: 'Design and insert custom cover pages. Explore print settings, page size customization, and learn how to convert your document to PDF for sharing and printing.',
    },
    {
        title: '5. Mail Merge & Bulk Document Management',
        description: 'Discover mail merge to personalize letters, labels, and emails using Excel data. Automate bulk document creation efficiently.',
    },
    {
        title: '6. Introduction to Excel & Spreadsheets',
        description: 'Learn Excel’s interface, use cells, rows, columns, and enter basic formulas like SUM, AVERAGE, and COUNT. Build a weekly budget tracker.',
    },
    {
        title: '7. Working with Functions & Data',
        description: 'Understand logical functions like IF, AND, OR, use absolute vs relative references, sort and filter data, and work across multiple sheets.',
    },
    {
        title: '8. Charts, PivotTables & Data Visualization',
        description: 'Create and customize bar, pie, and line charts. Explore PivotTables for summarizing data and visualizing insights clearly.',
    },
    {
        title: '9. Automating Tasks with Excel',
        description: 'Use conditional formatting, templates, and basic macros to automate repetitive tasks like attendance, GPA calculation, and personal finance tracking.',
    },
    {
        title: '10. PowerPoint Basics & Layouts',
        description: 'Design clean slides using layouts, themes, and slide masters. Structure your content effectively and start creating your first intro presentation.',
    },
    {
        title: '11. Visuals, Transitions & Animations',
        description: 'Enhance your slides with icons, images, SmartArt, transitions, and animations. Learn how to embed videos or GIFs without overdoing it.',
    },
    {
        title: '12. Present Like a Pro',
        description: 'Master Presenter View, slide timing, and voice notes. Get tips for public speaking and handling live or asynchronous presentations.',
    },
    {
        title: '13. Capstone Project & Certification',
        description: 'Put your skills to the test by completing a real-world project using Word, Excel, and PowerPoint. Receive feedback and earn your certificate of completion.',
    },
];


const TrainingOutline = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-white via-blue-100 to-blue-50 sm:py-20 lg:py-28">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold leading-tight text-blue-900 sm:text-4xl xl:text-5xl font-pj drop-shadow-md">
                        What You Will Learn
                    </h2>
                    {/*<h2 className="text-4xl font-bold text-blue-700 sm:text-5xl lg:text-5xl">What You’ll Learn</h2>*/}
                    <p className="max-w-xl mx-auto mt-4 text-base text-gray-600">
                        A 8-week hands-on training covering Microsoft Word, Excel, and PowerPoint in <strong>13 core steps</strong> designed to make you digitally fluent.
                    </p>
                </div>

                <div className="mt-20 flex flex-col gap-10 relative items-center">
                    {/* Vertical timeline line */}
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex items-start sm:pl-0 group transition-transform duration-200 hover:scale-[1.02] w-full sm:w-2/3"
                        >
                            {/* Connector line for each step (except the last) */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-7 top-14 h-full w-1 bg-blue-200 z-0 hidden sm:block" />
                            )}
                            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg z-10 border-4 border-white group-hover:bg-blue-700 transition">
                                <span className="text-xl font-bold">{index + 1}</span>
                            </div>
                            <div className="ml-6">
                                <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition">{step.title}</h3>
                                <p className="mt-2 text-base text-blue-700">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrainingOutline;
