
import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

const Faq = () => {
    const [faq, setFaq] = useState([
        {
            question: 'When does the training start?',
            answer: 'Kicking off with an introductory session on the 21st of July.',
            open: false
        },
        {
            question: 'What is the mode of training?',
            answer: 'The training is fully virtual, conducted in a closed Telegram group with assignments to solidify your learning.',
            open: false
        },
        {
            question: 'What if I miss a session?',
            answer: 'If you miss a session, you can catch up using shared session materials and assignments in the Telegram group. Classes will also be recorded, but you may lose marks for attendance, which is a major requirement in this training. You are expected to show up for what you have committed to. Support is available if you need further clarification.',
            open: false
        },
        {
            question: 'Is the training self-paced? Are deadline extensions possible?',
            answer: 'The training is not self-paced, as accountability helps participants stay consistent. However, tasks and assignments usually have a one-week submission window, with the possibility of an extension if needed.',
            open: false
        },
        {
            question: 'How long is the training and how often are the sessions?',
            answer: 'The training lasts for 6 weeks, with sessions held two times a week.',
            open: false
        },
        {
            question: 'What is the cost of the training?',
            answer: 'The training costs NGN 7,000, but we are running a campaign that gives a 20% discount if you follow our social media.',
            open: false
        },
        {
            question: 'What payment options are available?',
            answer: 'We offer a variety of payment options depending on your location. Everyone can pay with card. Nigerians can pay with Opay and bank transfer. Ghana, Zambia, Kenya and other African countries can pay with card and mobile money. You can also pay with ApplePay and Google Pay. Go to the payment page and make your payment. The available payment options will be shown to you',
            open: false
        },
        {
            question: 'Do you offer other trainings?',
            answer: 'Yes, we do. We also offer trainings in data analysis and web development. For more details, please contact support',
            open: false
        }
    ]);

    const toggleFaq = (index) => {
        setFaq(faq.map((item, i) => {
            if (i === index) {
                item.open = !item.open;
            } else {
                item.open = false;
            }

            return item;
        }));
    }

    return (
        <section className="py-10 bg-gradient-to-b from-blue-50 via-blue-100 to-white sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-blue-900 sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Find answers to common questions about our training program below.</p>
                </div>

                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                    {faq.map((item, index) => (
                        <div key={index} className="transition-all duration-200 bg-white border border-blue-200 cursor-pointer hover:bg-blue-100 shadow-sm rounded-xl">
                            <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6" onClick={() => toggleFaq(index)}>
                                <span className="flex text-lg font-semibold text-blue-900"> {item.question} </span>
                                <svg className={`w-6 h-6 text-blue-400 ${item.open ? 'rotate-180' : ''} transition-transform duration-200`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`${item.open ? 'block' : 'hidden'} px-4 pb-5 sm:px-6 sm:pb-6`}>
                                <p className="text-blue-800" dangerouslySetInnerHTML={{ __html: item.answer.replace(/class="/g, 'className="').replace(/text-blue-600/g, 'text-blue-600 hover:text-blue-800') }}></p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-blue-700 text-base mt-9">
                    Didn’t find the answer you are looking for?{' '}
                    <a href={`https://api.whatsapp.com/send/?phone=${usePage().props.support_number}&text=Hello%2C+I+have+a+few+questions...&type=phone_number&app_absent=0`} title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-800 focus:text-blue-800 hover:underline">
                        Contact our support
                    </a>
                </p>
            </div>
        </section>
    );
}

export default Faq;
