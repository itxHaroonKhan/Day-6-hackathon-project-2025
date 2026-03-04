import Link from "next/link";

const faqs = [
  {
    title: "Shipping Information",
    href: "/faq/shipping",
    questions: [
      "How long does shipping take?",
      "Do you ship internationally?",
      "How can I track my order?",
    ],
  },
  {
    title: "Returns and Refunds",
    href: "/faq/returns",
    questions: [
      "What is your return policy?",
      "How do I initiate a return?",
      "When will I receive my refund?",
    ],
  },
  {
    title: "Managing Your Orders",
    href: "/faq/orders",
    questions: [
      "How can I modify my order?",
      "Can I cancel my order?",
      "What if I received a damaged product?",
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Find answers to common questions about our products and services
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <Link
              key={index}
              href={faq.href}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {faq.title}
              </h2>
              <ul className="space-y-2">
                {faq.questions.map((question, qIndex) => (
                  <li key={qIndex} className="text-gray-600 flex items-start">
                    <span className="text-teal-500 mr-2">•</span>
                    {question}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
