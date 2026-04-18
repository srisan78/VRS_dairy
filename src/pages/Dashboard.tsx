import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Package, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-500 mt-2">Manage your subscriptions, orders, and account details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="col-span-1 border-r border-gray-100 pr-8 hidden md:block">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <nav className="space-y-2">
            {['Active Subscriptions', 'Order History', 'Delivery Address', 'Settings'].map((item, i) => (
              <button 
                key={item}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  i === 0 ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={logout}
              className="w-full text-left px-4 py-2 mt-8 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-3 space-y-8">
          {/* Active Subscription Box */}
          <div className="bg-white border text-left border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10" />
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-primary-green" size={24} />
              <h3 className="text-xl font-serif font-bold">Active Subscriptions</h3>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-2">
                  <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80" alt="Milk" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Farm Fresh A2 Milk</h4>
                  <p className="text-sm text-gray-500">1 Liter • Daily Delivery</p>
                  <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium bg-green-100 text-primary-green-dark">
                    Active
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500">Next delivery</p>
                <p className="font-semibold text-gray-900">Tomorrow, 7:00 AM</p>
                <button className="text-sm text-primary-green font-medium mt-1 hover:underline">Pause Subscription</button>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white border text-left border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Package className="text-gray-400" size={24} />
              <h3 className="text-xl font-serif font-bold">Recent Orders</h3>
            </div>

            <div className="space-y-4">
               {[1, 2].map((_, idx) => (
                 <div key={idx} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Order #ORD-7A9B{idx}</p>
                        <p className="text-sm text-gray-500">1x Pure Desi Cow Ghee</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹18.00</p>
                      <p className="text-xs text-gray-500">Delivered</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
