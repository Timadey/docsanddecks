import dndCurved from "@/assets/images/dnd-curved.png";
import datadecodepng from "@/assets/images/datadecode-logo.png";
import dataDrivenInsights from "../../assets/images/data-driven-insights.avif";
import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

const DataDecodeRegisterForm = () => {
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const datadecode_group = usePage().props.datadecode_group;


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        middlename: '',
        gender: '',
        email: '',
        phone: '',
        department: '',
        institution: '',
        level: '',
        project_topic: '',
        motivation: '',
        hear_source: '',
        will_commit: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        post(route('data-decode.register'), {
            onFinish: () => setSubmitting(false),
            onSuccess: () => {
                reset();
                alert(
                    '🎉 Registration successful! Please check your email for further instructions. Click OK to proceed to participant\'s group.'
                );
                window.location.href = datadecode_group;
            },
            onError: (error) => {
                setErrorMessage('😞 There was an error with your submission. Please check the form and try again. If the problem persists, kindly contact support.');
            },
        });
    };
    return (
        <div className="flex flex-col overflow-hidden bg-gradient-to-b from-white via-white to-blue-50 lg:min-h-screen lg:flex-row lg:items-stretch">
            {/* Left: Image */} {/* Left: Image */}
            <div className="pointer-events-none relative h-150 w-full flex-shrink-0 overflow-hidden sm:h-96 lg:sticky lg:top-0 lg:order-1 lg:h-auto lg:w-5/12">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full scale-150 object-cover transition-transform duration-500 md:scale-125 lg:scale-100"
                        src={dataDrivenInsights}
                        alt="right-image"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 rounded-t-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:p-6 lg:p-8">
                    <div className="flex items-center">
                        <svg
                            className="h-8 w-8 text-yellow-400 sm:h-10 sm:w-10"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h2 className="ml-2.5 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-100 bg-clip-text text-4xl font-bold text-transparent drop-shadow-lg sm:text-6xl">
                            FREE
                        </h2>
                    </div>
                    <div className="absolute top-4 right-4 z-10 flex flex-col items-end">
                        <img src={datadecodepng} alt="Data Decode Logo" className="mb-2 h-16 w-auto object-contain" />
                        {/*<div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md max-w-xs">*/}
                        {/*    <p className="text-sm font-medium text-blue-900">*/}
                        {/*        Master data analysis skills for your final year project with our comprehensive 6-week training program.*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </div>
                    <p className="mt-1.5 rounded-sm p-2 text-sm leading-relaxed text-white sm:text-lg">
                        Join our 6-week comprehensive data analysis training designed specifically for final year students. Master essential skills
                        like research methodology, questionnaire design, data cleaning, and statistical analysis using Excel and SPSS.
                    </p>
                    <p className="mt-2 rounded-sm p-2 text-sm leading-relaxed text-white sm:text-lg">
                        Start with 2 weeks of FREE foundational training covering research basics and data analysis introduction. Continue with 4
                        weeks of in-depth practical training to become proficient in data analysis for your final year project and beyond.
                    </p>
                </div>
            </div>
            {/* Right: Step Form */}
            <div className="pointer-events-auto relative flex h-auto w-full flex-1 items-center justify-center px-6 py-10 sm:px-10 md:mt-24 lg:h-screen lg:w-7/12 lg:py-24">
                <>
                    <div className="relative mt-10 max-h-screen w-full max-w-xl overflow-auto px-2 text-center lg:text-left">
                        {/* Success Alert */}
                        {successMessage && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300">
                                <div className="animate-fade-in-up w-full max-w-md rounded-xl bg-white px-8 py-6 text-center shadow-2xl">
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="text-5xl text-green-500">🎉</div>
                                        <strong className="text-xl font-semibold text-green-700">Success!</strong>
                                        <p className="text-base leading-relaxed text-green-900">{successMessage}</p>
                                        <button
                                            className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700"
                                            onClick={() => setSuccessMessage('')}
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Alert */}
                        {errorMessage && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300">
                                <div className="animate-fade-in-up w-full max-w-md rounded-xl bg-white px-8 py-6 text-center shadow-2xl">
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="text-5xl text-red-500">😞</div>
                                        <strong className="text-xl font-semibold text-red-700">Something went wrong!</strong>
                                        <p className="text-base leading-relaxed text-red-900">{errorMessage}</p>
                                        <button
                                            className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700"
                                            onClick={() => setErrorMessage('')}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-4 overflow-hidden rounded shadow-lg">
                            <img
                                src={datadecodepng}
                                alt="DataDecode Logo"
                                className="h-48 w-full bg-gradient-to-r from-blue-50 to-white object-contain"
                            />
                        </div>
                        {/* Main Form */}
                        <div className="mt-10 rounded-xl border-t border-gray-200 bg-white p-6 shadow-md sm:p-8">
                            <h2 className="mb-6 text-2xl font-semibold text-blue-900">
                                Register for <span className="font-bold">Data Decode</span>
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <>
                                    <div className="mb-5">
                                        <label htmlFor="firstname" className="mb-2 block font-medium text-blue-900">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Enter your first name"
                                            required
                                            value={data.firstname || ''}
                                            onChange={handleChange}
                                        />
                                        {errors?.firstname && <div className="mt-1 text-xs text-red-500">{errors.firstname}</div>}
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="lastname" className="mb-2 block font-medium text-blue-900">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Enter your last name"
                                            required
                                            value={data.lastname || ''}
                                            onChange={handleChange}
                                        />
                                        {errors?.lastname && <div className="mt-1 text-xs text-red-500">{errors.lastname}</div>}
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="middlename" className="mb-2 block font-medium text-blue-900">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            id="middlename"
                                            name="middlename"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Enter your middle name"
                                            value={data.middlename || ''}
                                            onChange={handleChange}
                                        />
                                        {errors?.middlename && <div className="mt-1 text-xs text-red-500">{errors.middlename}</div>}
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="gender" className="mb-2 block font-medium text-blue-900">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            value={data.gender || ''}
                                            onChange={handleChange}
                                            required
                                        >
                                            {[
                                                { value: '', label: 'Select Gender' },
                                                { value: 'male', label: 'Male' },
                                                { value: 'female', label: 'Female' },
                                            ].map(({ value, label }, index) => (
                                                <option key={index} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="email" className="mb-2 block font-medium text-blue-900">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Enter your email"
                                            value={data.email || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors?.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="phone" className="mb-2 block font-medium text-blue-900">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Enter your phone number"
                                            value={data.phone || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                        <small className="text-sm text-blue-400">Whatsapp preferably</small>
                                        {errors?.phone && <div className="mt-1 text-xs text-red-500">{errors.phone}</div>}
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="phone" className="mb-2 block font-medium text-blue-900">
                                            Institution
                                        </label>
                                        <input
                                            type="text"
                                            id="institution"
                                            name="institution"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Where are you schooling?"
                                            value={data.institution || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                        <small className="text-sm text-blue-400">Where are you currently studying?</small>
                                        {errors?.institution && <div className="mt-1 text-xs text-red-500">{errors.institution}</div>}
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="phone" className="mb-2 block font-medium text-blue-900">
                                            Department
                                        </label>
                                        <input
                                            type="text"
                                            id="department"
                                            name="department"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Enter your department"
                                            value={data.department || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors?.department && <div className="mt-1 text-xs text-red-500">{errors.department}</div>}
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="project_topic" className="mb-2 block font-medium text-blue-900">
                                            Project Topic
                                        </label>
                                        <input
                                            type="text"
                                            id="project_topic"
                                            name="project_topic"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            placeholder="Enter your project topic"
                                            value={data.project_topic || ''}
                                            onChange={handleChange}
                                        />
                                        {errors?.project_topic && <div className="mt-1 text-xs text-red-500">{errors.project_topic}</div>}
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="phone" className="mb-2 block font-medium text-blue-900">
                                            Level
                                        </label>
                                        <select
                                            id="level"
                                            name="level"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            value={data.level || ''}
                                            onChange={handleChange}
                                            required
                                        >
                                            {[
                                                { value: '', label: 'Select Current Level' },
                                                { value: '100', label: '100 Level' },
                                                { value: '200', label: '200 Level' },
                                                { value: '300', label: '300 Level' },
                                                { value: '400', label: '400 Level' },
                                                { value: '500', label: '500 Level' },
                                                { value: '600', label: '600 Level' },
                                                { value: '700', label: '700 Level' },
                                                { value: 'post_graduate', label: 'Post Graduate' },
                                            ].map(({ value, label }, index) => (
                                                <option key={index} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors?.level && <div className="mt-1 text-xs text-red-500">{errors.level}</div>}
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="motivation" className="mb-2 block font-medium text-blue-900">
                                            Why are you registering for this training?
                                        </label>
                                        <textarea
                                            rows="4"
                                            id="motivation"
                                            name="motivation"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            required
                                            value={data.motivation || ''}
                                            onChange={handleChange}
                                        />
                                        {errors?.motivation && <div className="mt-1 text-xs text-red-500">{errors.motivation}</div>}
                                        <small className="text-sm text-blue-400">
                                            {' '}
                                            Briefly, we want to know what your motivation and drive is, regarding this training, why are you here and
                                            what do you hope to gain?
                                        </small>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="hear-source" className="mb-2 block font-medium text-blue-900">
                                            How did you hear about DataDecode?
                                        </label>
                                        <select
                                            id="hear-source"
                                            name="hear_source"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            required
                                            value={data.hear_source || ''}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Select source
                                            </option>
                                            {[
                                                { value: 'twitter', label: 'Twitter' },
                                                { value: 'linkedin', label: 'Linkedin' },
                                                { value: 'whatsapp', label: 'WhatsApp Group or Broadcast' },
                                                { value: 'referral', label: 'A Friend, Classmate, Referral' },
                                            ].map(({ value, label }, index) => (
                                                <option key={index} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors?.hear_source && <div className="mt-1 text-xs text-red-500">{errors.hear_source}</div>}
                                        <small className="text-sm text-blue-400">Where are you trooping from?</small>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="will-commit" className="mb-2 block font-medium text-blue-900">
                                            Are you willing to commit to weekly session, engage by attending sessions and doing your practical
                                            assignments?
                                        </label>
                                        <select
                                            id="will-commit"
                                            name="will_commit"
                                            className="w-full rounded-lg border-2 border-blue-200 bg-blue-50/50 px-3 py-2 font-medium text-blue-700 placeholder-blue-300 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            required
                                            value={data.will_commit || ''}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Select option
                                            </option>
                                            {[
                                                { value: 0, label: 'No' },
                                                { value: 1, label: 'Yes' },
                                            ].map(({ value, label }, index) => (
                                                <option key={index} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors?.will_commit && <div className="mt-1 text-xs text-red-500">{errors.will_commit}</div>}
                                        <small className="text-sm text-blue-400">
                                            For your success, we need you to be accountable in this training by attending sessions and submitting
                                            tasks on time. Are you willing to commit to your growth?
                                        </small>
                                    </div>
                                </>
                                {data.will_commit === '0' && (
                                    <small className="text-sm text-red-400">
                                        Unfortunately, this training is meant for those who are ready to commit to the training and their own growth.
                                    </small>
                                )}
                                <div className="mt-8 flex justify-between">
                                    <button
                                        type="submit"
                                        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 disabled:opacity-50"
                                        disabled={submitting || processing || data.will_commit === '0'}
                                    >
                                        {processing ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Footer Countdown */}
                        <p className="mx-auto mt-6 max-w-md text-base text-blue-900 lg:mx-0 lg:mb-6">
                            It takes less than 2 minutes to register.{' '}
                            <span className="font-bold">{/*Next Cohort starts in {days} days and {hours} hours*/}</span>
                        </p>
                    </div>

                    {/* Decorative Images */}
                    <div className="pointer-events-none absolute right-0 bottom-0 hidden lg:block">
                        <img
                            className="h-48 w-auto object-contain"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/curved-lines.png"
                            alt="A young man"
                        />
                    </div>
                    <div className="pointer-events-none absolute right-0 -bottom-16 z-10 hidden lg:top-24 lg:-left-20 lg:block">
                        <img className="ml-4 h-28 w-36 md:h-40 md:w-45" src={dndCurved} alt="" />
                    </div>
                </>
            </div>
        </div>
    );
};

export default DataDecodeRegisterForm;
