import React from 'react';

export default function Motivation({ formData, onChange, errors }) {
    return (
        <>
            <div className="mb-5">
                <label htmlFor="motivation" className="block text-blue-900 font-medium mb-2">
                    Why are you registering for this training?
                </label>
                <textarea
                    rows="4"
                    id="motivation"
                    name="motivation"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
                    Enter your referral code
                </label>
                <input
                    type="text"
                    id="referral"
                    name="referral"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Enter your referral code"
                    required
                    value={formData.referral || ''}
                    onChange={onChange}
                />
                {errors?.referral && <div className="text-red-500 text-xs mt-1">{errors.referral}</div>}
                <small className="text-sm font-bold text-blue-400"> Get extra 5% OFF all trainings when you register with a referral code </small>
            </div>
            <div className="mb-5">
                <label htmlFor="will-commit" className="block text-blue-900 font-medium mb-2">
                    Are you willing to commit to weekly session, engage by attending sessions and doing your practical assignments?
                </label>
                <select
                    id="will-commit"
                    name="will_commit"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
