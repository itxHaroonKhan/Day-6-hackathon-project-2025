import Link from "next/link";

const supportFAQs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click on 'Sign In' in the header and select 'Create Account'. Enter your email and password to get started.",
      },
      {
        q: "How do I place my first order?",
        a: "Browse our products, click 'Add to Cart', then go to your cart and click 'Checkout'. Follow the prompts to complete your order.",
      },
    ],
  },
  {
    category: "Account & Profile",
    questions: [
      {
        q: "How do I update my profile information?",
        a: "Go to your account settings and click 'Edit Profile'. Update your information and save changes.",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Sign In', then 'Forgot Password'. Enter your email and we'll send you a reset link.",
      },
    ],
  },
  {
    category: "Products & Orders",
    questions: [
      {
        q: "Are your products eco-friendly?",
        a: "Yes! We use sustainable materials and recycled packaging for all our products.",
      },
      {
        q: "Do you offer bulk discounts?",
        a: "Yes, we offer special pricing for bulk orders. Contact our sales team for a custom quote.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        q: "The website isn't loading properly",
        a: "Try clearing your browser cache and cookies. If the issue persists, contact our technical support team.",
      },
      {
        q: "I can't complete checkout",
        a: "Ensure your browser is up to date and JavaScript is enabled. Try a different browser or contact support.",
      },
    ],
  },
];

export default function SupportFAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Support FAQ
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Find answers to common support questions
        </p>

        <div className="max-w-4xl mx-auto">
          {supportFAQs.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, qIndex) => (
                  <div
                    key={qIndex}
                    className="bg-white p-6 rounded-lg shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still need help?</p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/support/chat"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
            >
              Start Live Chat
            </Link>
            <Link
              href="/support/contact"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
