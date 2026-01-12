'use client'

import SparklesBackground from '@/components/SparklesBackground'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 relative">
      <SparklesBackground />
      <div className="max-w-4xl mx-auto relative z-10 py-8">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200/50 dark:border-gray-800/50">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                This Privacy Policy describes how we collect, use, share, and protect your personal information when you use our service. By using our service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We collect information that you provide directly to us and information that is automatically collected when you use our service:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Personal Information:</strong> Your Telegram user ID, username, first name, last name, and language preferences</li>
                <li><strong>Usage Data:</strong> Information about how you access and use our service, including your access period, timezone, and country</li>
                <li><strong>Device Information:</strong> Information about your device, including IP address, browser type, and operating system</li>
                <li><strong>Location Data:</strong> Your timezone and country information, which may be derived from your IP address</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <li>To provide, maintain, and improve our service</li>
                <li>To manage your access period and subscription status</li>
                <li>To personalize your experience and deliver content relevant to you</li>
                <li>To communicate with you about your account and our services</li>
                <li>To analyze usage patterns and trends to improve our service</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
                <li>To comply with legal obligations and enforce our terms of service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We may share your personal information with third parties in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">4.1 Service Providers</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We may share your information with third-party service providers who perform services on our behalf, such as:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Cloud hosting and data storage providers</li>
                <li>Analytics and data processing services</li>
                <li>Payment processors and billing services</li>
                <li>Customer support and communication platforms</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">4.2 Business Partners and Data Sales</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We may share, sell, or license your personal information to third-party business partners, advertisers, and data brokers for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Marketing and advertising purposes</li>
                <li>Market research and analytics</li>
                <li>Product development and improvement</li>
                <li>Commercial data licensing arrangements</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                This may include aggregated or de-identified data, as well as personally identifiable information, depending on the nature of the arrangement.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">4.3 Legal Requirements</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">4.4 Business Transfers</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                In the event of a merger, acquisition, reorganization, or sale of assets, your personal information may be transferred as part of that transaction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Depending on your jurisdiction, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Access:</strong> The right to request access to your personal information</li>
                <li><strong>Correction:</strong> The right to request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> The right to request deletion of your personal information</li>
                <li><strong>Opt-Out:</strong> The right to opt-out of certain data sharing and sales (where applicable)</li>
                <li><strong>Portability:</strong> The right to receive your data in a portable format</li>
                <li><strong>Objection:</strong> The right to object to processing of your personal information</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Data Retention</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. We may retain certain information even after you cease using our service for legal, regulatory, or business purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our service, you consent to the transfer of your information to these countries.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Our service is not intended for children under the age of 13 (or the applicable age of consent in your jurisdiction). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy or wish to exercise your rights regarding your personal information, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mt-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> support@hentaixperience.com<br />
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Consent</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                By using our service, you consent to our Privacy Policy and agree to its terms. If you do not agree with this policy, please do not use our service.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

