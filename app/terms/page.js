import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Terms of Service - WheelStory | Vehicle History Reports",
  description: "Terms of Service for WheelStory vehicle history reports. Read our terms and conditions for using our VIN check services.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/car-logo.webp"
                  alt="WheelStory"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <div className="text-2xl font-bold text-orange-600">WheelStory</div>
              </Link>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">Back to Home</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> September 7, 2025<br/>
            <strong>Last Updated:</strong> September 7, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using WheelStory&apos;s website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                WheelStory provides vehicle history reports based on Vehicle Identification Numbers (VINs). Our service includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Vehicle history reports containing accident history, title information, and other vehicle data</li>
                <li>Market value analysis and depreciation information</li>
                <li>Mileage verification and odometer history</li>
                <li>Safety recall information</li>
                <li>Service and maintenance records (when available)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user of our service, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and complete information, including valid VIN numbers</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to circumvent, disable, or otherwise interfere with security features</li>
                <li>Not use automated systems to access our service without permission</li>
                <li>Respect intellectual property rights</li>
                <li>Provide a valid email address for report delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our payment terms are as follows:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Payment is required before report generation</li>
                <li>Current price: $1.99 USD per vehicle history report</li>
                <li>All payments are processed securely through Paddle</li>
                <li>Prices may change without notice</li>
                <li>All sales are final and non-refundable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. No Refund Policy</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Important Notice</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p><strong>ALL SALES ARE FINAL.</strong> WheelStory is a digital service providing vehicle history reports. Once a report is generated and delivered, no refunds will be issued under any circumstances.</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                This no-refund policy applies to all purchases because our service provides immediate digital delivery of vehicle history information. Please ensure you enter the correct VIN number before completing your purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Report Delivery</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Report delivery terms:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Reports are delivered via email to the address provided during purchase</li>
                <li>Standard delivery time: 6-12 hours (most reports delivered within 1-2 hours)</li>
                <li>Check your spam/junk folder if you don&apos;t receive the report</li>
                <li>Ensure your email can receive attachments up to 10MB</li>
                <li>Contact support if you don&apos;t receive your report within 24 hours</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Accuracy and Limitations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive for accuracy, please note:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Information is compiled from various sources and databases</li>
                <li>Not all incidents may be captured in our databases</li>
                <li>Some information may be delayed or incomplete</li>
                <li>Reports should be used as one factor in vehicle evaluation</li>
                <li>We recommend professional vehicle inspection before purchase</li>
                <li>Data availability varies by vehicle age, location, and record keeping</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, features, and functionality on our website and in our reports are owned by WheelStory and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the service will be uninterrupted or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall WheelStory be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our service, even if we have been advised of the possibility of such damages. Our total liability shall not exceed the amount paid for the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless WheelStory from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from your use of our service or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our service, to understand our practices regarding the collection and use of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction where WheelStory operates, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed">
                Any disputes arising from these terms or your use of our service shall be resolved through binding arbitration rather than in court, except that you may assert claims in small claims court if they qualify.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Modifications to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your access to our service immediately, without prior notice, for any reason, including but not limited to violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> support@WheelStory.store<br/>
                  <strong>Website:</strong> <Link href="https://WheelStory.store" className="text-orange-600 hover:text-orange-700">https://WheelStory.store</Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <Image
                src="/car-logo.webp"
                alt="WheelStory"
                width={32}
                height={32}
                className="mr-3"
              />
              <div className="text-xl font-bold text-orange-400">WheelStory</div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-orange-400 transition-colors font-semibold">Terms & Conditions</Link>
              <Link href="/refund" className="hover:text-orange-400 transition-colors">Refund Policy</Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400">
            © 2015 WheelStory. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
