
import React, { useState } from 'react';

const Faq = () => {
    const [faq, setFaq] = useState([
        {
            question: 'How to create an account?',
            answer: 'Amet minim mollit non deserunt ullamco est sit <a href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.',
            open: false
        },
        {
            question: 'How can I make payment using Paypal?',
            answer: 'Amet minim mollit non deserunt ullamco est sit <a href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.',
            open: false
        },
        {
            question: 'Can I cancel my plan?',
            answer: 'Amet minim mollit non deserunt ullamco est sit <a href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.',
            open: false
        },
        {
            question: 'How can I reach to support?',
            answer: 'Amet minim mollit non deserunt ullamco est sit <a href="#" title="" class="text-blue-600 transition-all duration-200 hover:underline">aliqua dolor</a> do amet sint. Velit officia consequat duis enim velit mollit.',
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
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do</p>
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
                    <a href="#" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-800 focus:text-blue-800 hover:underline">
                        Contact our support
                    </a>
                </p>
            </div>
        </section>
    );
}

export default Faq;
