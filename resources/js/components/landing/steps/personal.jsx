import React from 'react';

export default function PersonalForm({ formData, onChange, errors }) {
    return (
        <>
            <div className="mb-5">
                <label htmlFor="firstname" className="block text-blue-900 font-medium mb-2">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Enter your first name"
                    required
                    value={formData.firstname || ''}
                    onChange={onChange}
                />
                {errors?.firstname && <div className="text-red-500 text-xs mt-1">{errors.firstname}</div>}
            </div>
            <div className="mb-5">
                <label htmlFor="lastname" className="block text-blue-900 font-medium mb-2">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Enter your last name"
                    required
                    value={formData.lastname || ''}
                    onChange={onChange}
                />
                {errors?.lastname && <div className="text-red-500 text-xs mt-1">{errors.lastname}</div>}
            </div>
            <div className="mb-5">
                <label htmlFor="middlename" className="block text-blue-900 font-medium mb-2">
                    Middle Name
                </label>
                <input
                    type="text"
                    id="middlename"
                    name="middlename"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Enter your middle name"
                    value={formData.middlename || ''}
                    onChange={onChange}
                />
                {errors?.middlename && <div className="text-red-500 text-xs mt-1">{errors.middlename}</div>}
            </div>
            <div className="mb-5">
                <label htmlFor="gender" className="block text-blue-900 font-medium mb-2">
                    Gender
                </label>
                <select
                    id="gender"
                    name="gender"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    value={formData.gender || ''}
                    onChange={onChange}
                    required
                >
                    {[
                        { value: '', label: 'Select Gender' },
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        // { value: 'other', label: 'Other…' },
                    ].map(({ value, label }, index) => (
                        (<option key={index} value={value}>{label}</option>)
                    ))}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block text-blue-900 font-medium mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Enter your email"
                    value={formData.email || ''}
                    onChange={onChange}
                    required
                />
                {errors?.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
            </div>
            <div className="mb-6">
                <label htmlFor="phone" className="block text-blue-900 font-medium mb-2">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="block w-full px-4 py-3 text-base text-blue-900 placeholder-blue-400 border border-blue-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Enter your phone number"
                    value={formData.phone || ''}
                    onChange={onChange}
                    required
                />
                <small className="text-sm text-blue-400"> Whatsapp preferably </small>
                {errors?.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
            </div>
        </>
    );
}


