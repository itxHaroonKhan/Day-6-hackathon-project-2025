import Link from "next/link";

const shippingFAQs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping may take 7-14 business days depending on your location.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. You can see the exact cost at checkout.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive an email with a tracking number. You can use this number to track your package on our website or the carrier's website.",
  },
  {
    question: "What are the shipping costs?",
    answer:
      "Shipping is FREE on orders over $50. For orders under $50, standard shipping costs $5.99 and express shipping costs $12.99.",
  },
  {
    question: "Do you offer expedited shipping?",
    answer:
      "Yes, we offer express shipping for next-day or 2-day delivery. Select express shipping at checkout and place your order before 2 PM for same-day processing.",
  },
];

export default function ShippingFAQPage() {
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
          Shipping Information
        </h1>

        <div className="space-y-6">
          {shippingFAQs.map((faq, index) => (
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
