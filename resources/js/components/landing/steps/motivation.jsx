import React, { useEffect, useRef } from 'react';

export default function Motivation({ formData, onChange, errors, referral }) {
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
                    Enter your referral code
                </label>
                {referral && referral.is_valid && referral.referrer_name && (
                    <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center text-green-700">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">
                                Referred by: <strong>{referral.referrer_name}</strong>
                            </span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                            Your referral code has been automatically applied!
                        </p>
                    </div>
                )}
                <input
                    type="text"
                    id="referral"
                    name="referral"
                    className={`border-2 rounded-lg px-3 py-2 w-full font-medium focus:outline-none transition ${
                        referral && referral.is_valid
                            ? 'border-green-300 bg-green-50 text-green-700 cursor-not-allowed'
                            : 'border-blue-200 bg-blue-50/50 text-blue-700 focus:ring-2 focus:ring-blue-400 placeholder-blue-300'
                    }`}
                    placeholder={referral && referral.is_valid ? 'Referral code applied' : 'Enter your referral code (optional)'}
                    value={formData.referral || ''}
                    onChange={onChange}
                    disabled={referral && referral.is_valid}
                    readOnly={referral && referral.is_valid}
                />
                {errors?.referral && <div className="text-red-500 text-xs mt-1">{errors.referral}</div>}
                <small className="text-sm font-bold text-blue-400">
                    {referral && referral.is_valid
                        ? '✅ Referral code applied - You\'ll get extra 5% OFF!'
                        : 'Get extra 5% OFF all trainings when you register with a referral code'
                    }
                </small>
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

            <div className="mb-5">
                <label htmlFor="followed-socials" className="block text-blue-900 font-medium mb-2">
                    The 20% discount is for people who have followed us on our social media platforms, follow us now if you have not:
                    <ul className="list-disc list-inside mt-2 text-blue-700 font-normal">
                        <li>
                            <a
                                href="https://x.com/docsdecks"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                X (Twitter) @docsdecks
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com/company/docsdecks"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                LinkedIn /docsdecks
                            </a>
                        </li>
                    </ul>
                    <div className="mt-3">Have you followed us?</div>
                </label>
                <select
                    id="followed-socials"
                    name="followed_socials"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    value={formData.followed_socials || ''}
                    onChange={onChange}
                >
                    <option value="">Select option</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
                {errors?.followed_socials && (
                    <div className="text-red-500 text-xs mt-1">{errors.followed_socials}</div>
                )}
                <small className="text-sm text-blue-400">
                    Following us helps you stay updated and unlocks your 20% discount.
                </small>
            </div>
        </>
    );
}
