import React, { useEffect, useRef } from 'react';

export default function Motivation({ formData, onChange, errors }) {
    const firstFieldRef = useRef(null);
    useEffect(() => {
        firstFieldRef.current?.focus(); // Auto-focus on the first field

        // Check for email param in URL and set it if present
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        if (emailParam && !formData.email) {
            onChange({ target: { name: 'email', value: emailParam } });
        }
    }, []);
    return (
        <>
            <div className="mb-5">
                <label htmlFor="motivation" className="block text-blue-900 font-medium mb-2">
                    Why are you registering for this training?
                </label>
                <textarea
                    ref={firstFieldRef}
                    rows="4"
                    id="motivation"
                    name="motivation"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    required
                    value={formData.motivation || ''}
                    onChange={onChange}
                />
                {errors?.motivation && <div className="text-red-500 text-xs mt-1">{errors.motivation}</div>}
                <small className="text-sm text-blue-400"> Briefly, we want to know what your motivation and drive is, regarding this training, why are you here and what do you hope to gain?</small>
            </div>
            <div className="mb-5">
                <label htmlFor="hear-source" className="block text-blue-900 font-medium mb-2">
                    How did you hear about us?
                </label>
                <select
                    id="hear-source"
                    name="hear_source"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    required
                    value={formData.hear_source || ''}
                    onChange={onChange}
                >
                    <option value="" disabled>Select source</option>
                    {[
                        { value: 'twitter', label: 'Twitter' },
                        { value: 'linkedin', label: 'Linkedin' },
                        { value: 'whatsapp', label: 'WhatsApp Group or Broadcast' },
                        { value: 'referral', label: 'A Friend, Classmate, Referral' },
                    ].map(({ value, label }, index) => (
                        (<option key={index} value={value}>{label}</option>)
                    ))}
                </select>
                {errors?.hear_source && <div className="text-red-500 text-xs mt-1">{errors.hear_source}</div>}
                <small className="text-sm text-blue-400">Where are you trooping from?</small>
            </div>
            <div className="mb-6">
                <label htmlFor="referral" className="block text-blue-900 font-medium mb-2">
                    Enter your referral code (case-sensitive)
                </label>
                <input
                    type="text"
                    id="referral"
                    name="referral"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    placeholder="Enter your referral code (optional)"
                    value={formData.referral || ''}
                    onChange={onChange}
                />
                {errors?.referral && <div className="text-red-500 text-xs mt-1">{errors.referral}</div>}
                <small className="text-sm font-bold text-blue-400">Get extra 5% OFF all trainings when you register with a referral code </small>
            </div>
            <div className="mb-5">
                <label htmlFor="will-commit" className="block text-blue-900 font-medium mb-2">
                    Are you willing to commit to weekly session, engage by attending sessions and doing your practical assignments?
                </label>
                <select
                    id="will-commit"
                    name="will_commit"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    required
                    value={formData.will_commit || ''}
                    onChange={onChange}
                >
                    <option value="" disabled>Select option</option>
                    {[
                        { value: 0, label: 'No' },
                        { value: 1, label: 'Yes' },
                    ].map(({ value, label }, index) => (
                        (<option key={index} value={value}>{label}</option>)
                    ))}
                </select>
                {errors?.will_commit && <div className="text-red-500 text-xs mt-1">{errors.will_commit}</div>}
                <small className="text-sm text-blue-400">For your success, we need you to be accountable in this training by attending sessions and submitting tasks on time. Are you willing to commit to your growth?</small>
            </div>
        </>
    );
}
