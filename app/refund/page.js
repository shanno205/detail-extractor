import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Refund Policy - WheelStory | Vehicle History Reports",
  description: "Refund Policy for WheelStory vehicle history reports. Learn about our no-refund policy for digital vehicle history services.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundPolicy() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> September 7, 2025<br/>
            <strong>Last Updated:</strong> September 7, 2025
          </p>

          {/* Important Notice Banner */}
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-medium text-red-800">IMPORTANT: NO REFUNDS POLICY</h2>
                <div className="mt-2 text-sm text-red-700">
                  <p><strong>ALL SALES ARE FINAL AND NON-REFUNDABLE.</strong> WheelStory is a digital service that provides immediate delivery of vehicle history reports. Please read this policy carefully before making a purchase.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. No Refund Policy Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                WheelStory operates a strict no-refund policy for all purchases. Once payment is processed and a vehicle history report is generated, <strong>no refunds will be issued under any circumstances</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This policy exists because our service provides immediate digital delivery of comprehensive vehicle history information that cannot be &ldquo;returned&rdquo; once delivered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Reasons for No-Refund Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our no-refund policy is in place for the following reasons:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Digital Service:</strong> Vehicle history reports are digital products delivered immediately</li>
                <li><strong>Information Value:</strong> Once you receive the vehicle history information, it cannot be &ldquo;un-delivered&rdquo;</li>
                <li><strong>Database Costs:</strong> We incur costs accessing premium automotive databases for each report</li>
                <li><strong>Instant Delivery:</strong> Reports are typically delivered within 12 hours</li>
                <li><strong>Industry Standard:</strong> No-refund policies are standard practice in the vehicle history report industry</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. What Our Service Includes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you purchase a WheelStory report for $1.99, you receive:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Comprehensive vehicle history report based on the VIN provided</li>
                <li>Accident and damage history (when available)</li>
                <li>Title information and ownership history</li>
                <li>Mileage verification and odometer readings</li>
                <li>Safety recall information</li>
                <li>Market value analysis</li>
                <li>Service and maintenance records (when available)</li>
                <li>Email delivery within 6-12 hours (usually 1-2 hours)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Common Scenarios (No Refunds Apply)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following scenarios do <strong>NOT</strong> qualify for refunds:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Incorrect VIN Entry</h4>
                  <p className="text-gray-700 text-sm">If you enter the wrong VIN number, we will still generate a report for the VIN provided. No refund will be issued.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Limited Data Available</h4>
                  <p className="text-gray-700 text-sm">Some vehicles may have limited historical data. We deliver all available information, but cannot refund if the report contains less data than expected.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Clean History Reports</h4>
                  <p className="text-gray-700 text-sm">A &ldquo;clean&rdquo; report showing no accidents or issues is still a valuable report. No refunds for vehicles with clean histories.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Changed Mind</h4>
                  <p className="text-gray-700 text-sm">If you change your mind about purchasing the vehicle after receiving the report, no refund will be issued.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Duplicate Purchases</h4>
                  <p className="text-gray-700 text-sm">Accidentally purchasing multiple reports for the same VIN does not qualify for a refund.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Dissatisfaction with Content</h4>
                  <p className="text-gray-700 text-sm">If you&apos;re unsatisfied with the information in the report, no refund will be provided as the report contains all available data from our sources.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Before You Purchase</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To avoid disappointment, please ensure you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Double-check the VIN:</strong> Ensure the 17-character VIN is entered correctly</li>
                <li><strong>Verify your email:</strong> Make sure your email address is correct for report delivery</li>
                <li><strong>Understand the service:</strong> We provide historical data available in our databases</li>
                <li><strong>Check your needs:</strong> Consider if you really need the vehicle history report</li>
                <li><strong>Read our Terms:</strong> Review our Terms of Service before purchasing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Customer Support</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we cannot offer refunds, our customer support team is available to help with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Technical issues with report delivery</li>
                <li>Questions about report content and interpretation</li>
                <li>Assistance with VIN lookup (if you&apos;re having trouble finding it)</li>
                <li>Guidance on understanding your vehicle history report</li>
                <li>General questions about our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Report Delivery Issues</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you experience delivery issues:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Check your spam/junk email folder</li>
                <li>Ensure your email can receive attachments up to 10MB</li>
                <li>Wait up to 12 hours for delivery (most reports arrive within 1-2 hours)</li>
                <li>Contact our support team if you haven&apos;t received your report within 24 hours</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We will work to resolve delivery issues, but this does not constitute grounds for a refund if the report is successfully generated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Legal and Regulatory Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                Our no-refund policy complies with applicable laws and regulations governing digital services. By using our service, you acknowledge and agree to this policy. This policy is part of our Terms of Service and is legally binding.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Chargeback and Dispute Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Initiating a chargeback or payment dispute after receiving a vehicle history report constitutes fraud. We will contest all illegitimate chargebacks and may pursue legal action for fraudulent disputes. The report delivery serves as proof of service completion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Policy Updates</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update this refund policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of our service after policy changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Alternative Services</h2>
              <p className="text-gray-700 leading-relaxed">
                If you&apos;re unsure about purchasing a vehicle history report, consider these alternatives:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>Research the vehicle&apos;s history through public records</li>
                <li>Have the vehicle inspected by a qualified mechanic</li>
                <li>Ask the seller for maintenance records and documentation</li>
                <li>Consider the vehicle&apos;s age, mileage, and condition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this refund policy or need customer support:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> support@WheelStory.store<br/>
                  <strong>Website:</strong> <Link href="https://WheelStory.store" className="text-orange-600 hover:text-orange-700">https://WheelStory.store</Link><br/>
                  <strong>Response Time:</strong> 24-48 hours
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Acknowledgment</h2>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-6">
                <p className="text-orange-800 font-medium">
                  By purchasing a WheelStory vehicle history report, you acknowledge that you have read, understood, and agree to this no-refund policy. You understand that all sales are final and that no refunds will be issued under any circumstances.
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
              <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms & Conditions</Link>
              <Link href="/refund" className="hover:text-orange-400 transition-colors font-semibold">Refund Policy</Link>
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
