import React, { useState } from 'react';

interface OrderItem {
  _id: string;
  title: string;
  price: number | string;
  imageUrl: string;
  quantity?: number;
}

interface OrderData {
  name: string;
  email: string;
  address: string;
  phone: string;
  zipCode: string;
  country: string;
  orderItems: OrderItem[];
  totalPrice: number;
}

interface CheckoutFormProps {
  onSubmit: (orderData: OrderData) => void;
  onCancel: () => void;
  details?: { name: string; email: string; address: string; phone: string; zipCode: string; country: string };
  cart: Array<OrderItem>;
  totalPrice: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onCancel, details, cart, totalPrice }) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: details?.name || '',
    email: details?.email || '',
    address: details?.address || '',
    phone: details?.phone || '',
    zipCode: details?.zipCode || '',
    country: details?.country || ''
  });

  const orderData: OrderData = {
    name: formData.name,
    email: formData.email,
    address: formData.address,
    phone: formData.phone,
    zipCode: formData.zipCode,
    country: formData.country,
    orderItems: cart.map(item => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity || 1,
    })),
    totalPrice: typeof totalPrice === 'number' ? totalPrice : parseFloat(totalPrice),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(orderData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-semibold text-center mb-6">Checkout</h2>
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'address', 'phone', 'zipCode', 'country'].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block mb-1 text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                type={field === 'email' ? 'email' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
          <div className="flex justify-between gap-4">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Submit
            </button>
            <button type="button" className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
