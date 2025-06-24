import React from "react";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="space-y-4 text-gray-300 text-sm leading-relaxed">
        <p>
          At ChainYield, your privacy is critically important to us. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you
          visit our application.
        </p>

        <h2 className="text-xl font-semibold mt-6">Information We Collect</h2>
        <p>
          We may collect personal information such as wallet addresses and transaction
          data to provide our services. We do not collect sensitive personal information
          like social security numbers or financial account credentials.
        </p>

        <h2 className="text-xl font-semibold mt-6">How We Use Your Information</h2>
        <p>
          Your information is used to operate and maintain the Vault services, process
          deposits and withdrawals, and improve user experience. We do not sell your
          information to third parties.
        </p>

        <h2 className="text-xl font-semibold mt-6">Data Security</h2>
        <p>
          We implement robust technical and organizational measures to protect your data
          against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="text-xl font-semibold mt-6">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information by
          contacting our support team.
        </p>

        <h2 className="text-xl font-semibold mt-6">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We encourage you to review
          this page periodically for any changes.
        </p>

        <h2 className="text-xl font-semibold mt-6">Contact Us</h2>
        <p>
          If you have questions or concerns regarding this policy, please contact us at
          support@chainyield.com.
        </p>
      </section>
    </main>
  );
}
