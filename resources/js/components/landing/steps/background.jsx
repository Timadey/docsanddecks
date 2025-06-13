import React from 'react';

const options = [
    { value: 'under 18', label: 'Teenager (under 18)' },
    { value: '18-22', label: 'Young Adult (18–22)' },
    { value: '23-27', label: 'Adulting (23–27)' },
    { value: '28-35', label: 'Seasoned Pro (28–35)' },
    { value: '36 and above', label: 'Sage (36 and above)' },
];

const skillLevels = [1, 2, 3, 4];
const educationOptions = [
    { value: 'undergraduate_early', label: 'Undergraduate (100 - 300 Level)' },
    { value: 'undergraduate_final', label: 'Undergraduate (400–600 Level)' },
    { value: 'postgraduate', label: 'Postgraduate Student' },
    { value: 'graduate', label: 'Graduate (Not in School)' },
    { value: 'undisclosed', label: 'Prefer not to say' },
];

const occupationOptions = [
    { value: 'student', label: "I'm a student looking to improve my digital skills" },
    { value: 'working', label: "I'm working and want to upskill for better productivity" },
    { value: 'freelancer', label: "I'm a freelancer who wants to create better documents and presentations" },
    { value: 'job_hunting', label: "I'm job-hunting and want to stand out with better tech skills" },
    { value: 'business_owner', label: "I'm running a business and need to manage data and reports more efficiently" },
    { value: 'undisclosed', label: 'Prefer not to say' },
];

export default function BackgroundForm({ formData, onChange, errors }) {
    return (
        <>
            <div className="mb-5">
                <label htmlFor="age-group" className="block text-blue-900 font-medium mb-2">
                    Age Group
                </label>
                <select
                    id="age-group"
                    name="age_group"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border
                                border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                    value={formData.age_group || ''}
                    onChange={onChange}
                >
                    <option value="" disabled>Select age group</option>
                    {options.map(({ value, label }, index) => (
                        <option key={index} value={value}>{label}</option>
                    ))}
                </select>
                {errors?.age_group && <div className="text-red-500 text-xs mt-1">{errors.age_group}</div>}
                <small className="text-sm text-blue-400"> We love to know who we are dealing with!</small>
            </div>
            <div className="mb-5">
                <label htmlFor="msword-level" className="block text-blue-900 font-medium mb-2">
                    Rate your skill level in Microsoft Word
                </label>
                <select
                    id="msword-level"
                    name="msword_level"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border
                                border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                    value={formData.msword_level || ''}
                    onChange={onChange}
                >
                    <option value="" disabled>Select skill level</option>
                    {skillLevels.map((value, index) => (
                        <option key={index} value={value}>
                            {value === 1 ? 'Zero Knowledge' : value === 2 ? 'Beginner' : value === 3 ? 'Intermediate'
                                : 'Expert'}
                        </option>
                    ))}
                </select>
                {errors?.msword_level && <div className="text-red-500 text-xs mt-1">{errors.msword_level}</div>}
            </div>
            <div className="mb-5">
                <label htmlFor="msword-level" className="block text-blue-900 font-medium mb-2">
                    Rate your skill level in Microsoft Word
                </label>
                <select
                    id="msexcel-level"
                    name="msexcel_level"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border
                                border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                    value={formData.msexcel_level || ''}
                    onChange={onChange}
                >
                    <option value="" disabled>Select skill level</option>
                    {skillLevels.map((value, index) => (
                        <option key={index} value={value}>
                            {value === 1 ? 'Zero Knowledge' : value === 2 ? 'Beginner' : value === 3 ? 'Intermediate'
                                : 'Expert'}
                        </option>
                    ))}
                </select>
                {errors?.msexcel_level && <div className="text-red-500 text-xs mt-1">{errors.msexcel_level}</div>}
            </div>
            <div className="mb-5">
                <label htmlFor="mspptx-level" className="block text-blue-900 font-medium mb-2">
                    Rate your skill level in Microsoft Word
                </label>
                <select
                    id="mspptx-level"
                    name="mspptx_level"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border
                                border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                    value={formData.mspptx_level || ''}
                    onChange={onChange}
                >
                    <option value="" disabled>Select skill level</option>
                    {skillLevels.map((value, index) => (
                        <option key={index} value={value}>
                            {value === 1 ? 'Zero Knowledge' : value === 2 ? 'Beginner' : value === 3 ? 'Intermediate'
                                : 'Expert'}
                        </option>
                    ))}
                </select>
                {errors?.mspptx_level && <div className="text-red-500 text-xs mt-1">{errors.mspptx_level}</div>}
            </div>
            <div className="mb-5">
                <label htmlFor="education" className="block text-blue-900 font-medium mb-2">
                    Education Status
                </label>
                <select
                    id="education"
                    name="education"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border
                                border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                    value={formData.education || ''}
                    onChange={onChange}
                >
                    <option value="" disabled>Select education status</option>
                    {educationOptions.map(({ value, label }, index) => (
                        <option key={index} value={value}>{label}</option>
                    ))}
                </select>
                {errors?.education && <div className="text-red-500 text-xs mt-1">{errors.education}</div>}
                <small className="text-sm text-blue-400"> We would love to know where you are coming from so we can
                    meet you there!</small>
            </div>
            <div className="mb-5">
                <label htmlFor="occupation" className="block text-blue-900 font-medium mb-2">
                    What best describes your right now
                </label>
                <select
                    id="occupation"
                    name="occupation"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border
                                border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                    value={formData.occupation || ''}
                    onChange={onChange}
                >
                    <option value="" disabled>Select occupation</option>
                    {occupationOptions.map(({ value, label }, index) => (
                        <option key={index} value={value}>{label}</option>
                    ))}
                </select>
                {errors?.occupation && <div className="text-red-500 text-xs mt-1">{errors.occupation}</div>}
            </div>
        </>
    );
}
