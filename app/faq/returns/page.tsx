import Link from "next/link";

const returnsFAQs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Items must be in original condition with tags attached. Custom or personalized items cannot be returned.",
  },
  {
    question: "How do I initiate a return?",
    answer:
      "To initiate a return, go to your order history and click 'Return Item'. You'll receive a prepaid return shipping label via email. Pack the item securely and drop it off at any authorized shipping location.",
  },
  {
    question: "When will I receive my refund?",
    answer:
      "Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method.",
  },
  {
    question: "Are there any return fees?",
    answer:
      "Returns are free for defective or damaged items. For other returns, a $5.99 return shipping fee will be deducted from your refund.",
  },
  {
    question: "Can I exchange an item instead of returning it?",
    answer:
      "Yes! Select 'Exchange' during the return process and choose your replacement item. We'll ship the replacement as soon as we receive your original item.",
  },
];

export default function ReturnsFAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <Link
          href="/faq"
          className="text-teal-600 hover:text-teal-800 mb-6 inline-block"
        >
          ← Back to FAQ
        </Link>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Returns and Refunds
        </h1>

        <div className="space-y-6">
          {returnsFAQs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {faq.question}
              </h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
