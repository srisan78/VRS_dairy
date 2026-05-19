import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, CreditCard, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else if (items.length === 0 && !success) {
      navigate('/cart');
    }
  }, [user, items, navigate, success]);

  if (!user || (items.length === 0 && !success)) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate real payment delay
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 text-primary-green">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          Thank you for choosing VRS Dairy Farm. Your order #ORD-{Math.random().toString(36).substr(2, 6).toUpperCase()} has been placed successfully.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-farm-green hover:bg-meadow-green text-white px-8 py-3 rounded-full font-medium"
        >
          View Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Secure Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          
          {/* Address Section */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="text-primary-green" size={24} />
              <h2 className="text-xl font-semibold">Delivery Address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="p-3 bg-gray-50 rounded-xl border border-gray-200" required defaultValue={user.name.split(' ')[0]} />
              <input type="text" placeholder="Last Name" className="p-3 bg-gray-50 rounded-xl border border-gray-200" required defaultValue={user.name.split(' ')[1] || ''} />
              <input type="text" placeholder="Street Address" className="p-3 bg-gray-50 rounded-xl border border-gray-200 md:col-span-2" required />
              <input type="text" placeholder="City" className="p-3 bg-gray-50 rounded-xl border border-gray-200" required />
              <input type="text" placeholder="ZIP Code" className="p-3 bg-gray-50 rounded-xl border border-gray-200" required />
            </div>
          </section>

          {/* Payment Section */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-primary-green" size={24} />
              <h2 className="text-xl font-semibold">Payment Details</h2>
            </div>
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
              <div className="relative">
                <input type="text" placeholder="Card Number" className="w-full pl-10 pr-3 py-3 bg-gray-50 rounded-xl border border-gray-200" required />
                <CreditCard className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="p-3 bg-gray-50 rounded-xl border border-gray-200" required />
                <input type="text" placeholder="CVC" className="p-3 bg-gray-50 rounded-xl border border-gray-200" required />
              </div>
            </form>
          </section>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-24">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 pt-4 border-t border-gray-200">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹2.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="font-bold text-primary-green text-2xl">₹{(total + 2).toFixed(2)}</span>
              </div>
            </div>

             <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                <ShieldCheck size={16} className="text-green-500" />
                <span>Secure 256-bit SSL encrypted payment</span>
             </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isProcessing}
              className="w-full flex justify-center items-center gap-2 bg-farm-green hover:bg-meadow-green text-white py-4 rounded-xl font-medium transition-colors disabled:opacity-70"
            >
              {isProcessing ? 'Processing...' : `Pay ₹${(total + 2).toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
