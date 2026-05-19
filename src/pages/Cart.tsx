import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingCartPlaceholder />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any fresh dairy yet.</p>
        <Link 
          to="/products"
          className="bg-farm-green hover:bg-meadow-green text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Review Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="hidden lg:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wide border-b border-gray-200 pb-4 mb-6">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-white p-4 lg:p-0 rounded-2xl lg:rounded-none border lg:border-none border-gray-100 lg:border-b-gray-100 pb-0 lg:pb-6">
                <div className="col-span-1 lg:col-span-6 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.unit}</p>
                    <p className="font-medium text-primary-green lg:hidden mt-1">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="col-span-1 lg:col-span-3 flex items-center justify-between lg:justify-center">
                  <span className="text-sm text-gray-500 lg:hidden">Quantity:</span>
                  <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-span-1 lg:col-span-3 flex items-center justify-between lg:justify-end">
                  <span className="text-sm text-gray-500 lg:hidden">Subtotal:</span>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-lg text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-green transition-colors font-medium">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-24">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹2.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="font-bold text-primary-green text-xl">₹{(total + 2).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex justify-center items-center gap-2 bg-farm-green hover:bg-meadow-green text-white py-4 rounded-xl font-medium transition-colors"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            {!user && (
              <p className="text-center text-sm text-gray-500 mt-4">
                You'll be asked to log in to complete your purchase.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartPlaceholder() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
}
