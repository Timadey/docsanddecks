import React, { useEffect, useRef } from 'react';

export default function PersonalForm({ formData, onChange, errors }) {
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const middlenameRef = useRef(null);
    const genderRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);

    useEffect(() => {
        firstnameRef.current?.focus(); // Auto-focus on the first field
    }, []);

    // Handle Enter key to go to the next field
    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            nextRef.current?.focus();
        }
    };

    return (
        <>
            <div className="mb-5">
                <label htmlFor="firstname" className="block text-blue-900 font-medium mb-2">
                    First Name
                </label>
                <input
                    ref={firstnameRef}
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    placeholder="Enter your first name"
                    required
                    value={formData.firstname || ''}
                    onChange={onChange}
                    onKeyDown={(e) => handleKeyDown(e, lastnameRef)}
                />
                {errors?.firstname && <div className="text-red-500 text-xs mt-1">{errors.firstname}</div>}
            </div>
            <div className="mb-5">
                <label htmlFor="lastname" className="block text-blue-900 font-medium mb-2">
                    Last Name
                </label>
                <input
                    ref={lastnameRef}
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    placeholder="Enter your last name"
                    required
                    value={formData.lastname || ''}
                    onChange={onChange}
                    onKeyDown={(e) => handleKeyDown(e, middlenameRef)}
                />
                {errors?.lastname && <div className="text-red-500 text-xs mt-1">{errors.lastname}</div>}
            </div>

            <div className="mb-5">
                <label htmlFor="middlename" className="block text-blue-900 font-medium mb-2">
                    Middle Name
                </label>
                <input
                    ref={middlenameRef}
                    type="text"
                    id="middlename"
                    name="middlename"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    placeholder="Enter your middle name"
                    value={formData.middlename || ''}
                    onChange={onChange}
                    onKeyDown={(e) => handleKeyDown(e, genderRef)}
                />
                {errors?.middlename && <div className="text-red-500 text-xs mt-1">{errors.middlename}</div>}
            </div>

            <div className="mb-5">
                <label htmlFor="gender" className="block text-blue-900 font-medium mb-2">
                    Gender
                </label>
                <select
                    ref={genderRef}
                    id="gender"
                    name="gender"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    value={formData.gender || ''}
                    onChange={onChange}
                    onKeyDown={(e) => handleKeyDown(e, emailRef)}
                    required
                >
                    {[{ value: '', label: 'Select Gender' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }].map(
                        ({ value, label }, index) => (
                            <option key={index} value={value}>
                                {label}
                            </option>
                        )
                    )}
                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block text-blue-900 font-medium mb-2">
                    Email Address
                </label>
                <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    placeholder="Enter your email"
                    value={formData.email || ''}
                    onChange={onChange}
                    onKeyDown={(e) => handleKeyDown(e, phoneRef)}
                    required
                />
                {errors?.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
            </div>

            <div className="mb-6">
                <label htmlFor="phone" className="block text-blue-900 font-medium mb-2">
                    Phone Number
                </label>
                <input
                    ref={phoneRef}
                    type="tel"
                    id="phone"
                    name="phone"
                    className="border-2 border-blue-200 rounded-lg px-3 py-2 w-full text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50/50 placeholder-blue-300"
                    placeholder="Enter your phone number"
                    value={formData.phone || ''}
                    onChange={onChange}
                    required
                />
                <small className="text-sm text-blue-400">Whatsapp preferably</small>
                {errors?.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
            </div>


        </>
    );
}
