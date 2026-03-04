import Link from "next/link";

const ordersFAQs = [
  {
    question: "How can I modify my order?",
    answer:
      "You can modify your order within 1 hour of placing it by contacting our support team. After that, the order enters processing and cannot be changed.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled within 1 hour of placement. Contact our support team immediately with your order number. Once an order ships, it cannot be cancelled.",
  },
  {
    question: "What if I received a damaged product?",
    answer:
      "We're sorry if your item arrived damaged! Contact us within 48 hours with photos of the damage. We'll send a replacement or issue a full refund immediately.",
  },
  {
    question: "What if my order is lost?",
    answer:
      "If your tracking shows delivered but you haven't received it, wait 48 hours. If still missing, contact us and we'll investigate with the carrier and send a replacement or refund.",
  },
  {
    question: "Can I change my shipping address?",
    answer:
      "Contact us immediately if you need to change your address. We can update it if the order hasn't shipped yet. Once shipped, we cannot change the address.",
  },
];

export default function OrdersFAQPage() {
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
          Managing Your Orders
        </h1>

        <div className="space-y-6">
          {ordersFAQs.map((faq, index) => (
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
