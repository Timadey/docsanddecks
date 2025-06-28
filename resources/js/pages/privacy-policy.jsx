import React from 'react';
import LandingLayout from '../layouts/landing-layout.jsx';

export default function PrivacyPolicy() {
    return (
        <LandingLayout title={'Privacy Policy'} haveHeader={true}>
            <div className="relative bg-gradient-to-br from-blue-50/50 to-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-blue-100 backdrop-blur-md">
                    <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center tracking-tight drop-shadow-sm animate-fade-in">
                        Privacy Policy
                    </h1>
                    <p className="mb-6 text-blue-900 text-lg leading-relaxed">
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
                    </p>

                    {/* Section 1 */}
                    <SectionTitle>1. Information We Collect</SectionTitle>
                    <ul className="list-disc pl-6 text-blue-900 mb-6 space-y-2">
                        <li>
                            <strong>Personal Information:</strong> When you register or interact with our site, we may collect your name, email address, and other details you provide.
                        </li>
                        <li>
                            <strong>Usage Data:</strong> We collect information about how you use our site, such as pages visited and actions taken, to improve your experience.
                        </li>
                        <li>
                            <strong>Location Data:</strong> We may collect your location to streamline your experience, such as customizing payment options and content based on your region.
                        </li>
                        <li>
                            <strong>Cookies:</strong> We use cookies to remember your preferences and enhance your visit. You can manage cookies in your browser settings.
                        </li>
                    </ul>

                    {/* Section 2 */}
                    <SectionTitle>2. How We Use Your Information</SectionTitle>
                    <ul className="list-disc pl-6 text-blue-900 mb-6 space-y-2">
                        <li>To provide and improve our services.</li>
                        <li>To communicate important updates, confirmations, and support.</li>
                        <li>To personalize your experience on our site.</li>
                        <li>To ensure the security and integrity of our platform.</li>
                    </ul>

                    {/* Section 3 */}
                    <SectionTitle>3. Sharing Your Information</SectionTitle>
                    <p className="mb-6 text-blue-900 leading-relaxed">
                        We do not sell or rent your personal information. We may share your data with trusted partners who help us operate our website and deliver our services, but only as necessary and with appropriate safeguards.
                    </p>

                    {/* Section 4 */}
                    <SectionTitle>4. Your Rights & Choices</SectionTitle>
                    <ul className="list-disc pl-6 text-blue-900 mb-6 space-y-2">
                        <li>You can access, update, or delete your personal information by contacting us.</li>
                        <li>You may opt out of marketing emails at any time using the unsubscribe link.</li>
                        <li>You can manage cookies through your browser settings.</li>
                    </ul>

                    {/* Section 5 */}
                    <SectionTitle>5. Data Security</SectionTitle>
                    <p className="mb-6 text-blue-900 leading-relaxed">
                        We use industry-standard measures to protect your data from unauthorized access, alteration, or disclosure.
                    </p>

                    {/* Section 6 */}
                    <SectionTitle>6. Changes to This Policy</SectionTitle>
                    <p className="mb-6 text-blue-900 leading-relaxed">
                        We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.
                    </p>

                    {/* Section 7 */}
                    <SectionTitle>7. Contact Us</SectionTitle>
                    <p className="mb-6 text-blue-900 leading-relaxed">
                        If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
                        <a href="mailto:info@docsanddecks.com" className="text-blue-700 underline hover:text-blue-900">
                            info@docsanddecks.com
                        </a>.
                    </p>

                    <p className="text-xs text-blue-400 mt-8 text-center">Last updated: June 2025</p>
                </div>
            </div>
        </LandingLayout>
    );
}

const SectionTitle = ({ children }) => (
    <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-3 border-b border-blue-100 pb-1">{children}</h2>
);
