import { Package, Users, ShoppingCart, TrendingUp } from 'lucide-react';

export default function Admin() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage products, orders, and view analytics.</p>
        </div>
        <button className="bg-farm-green hover:bg-meadow-green text-white px-6 py-2 rounded-lg font-medium">
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Sales', value: '₹12,450', icon: TrendingUp },
          { title: 'Active Orders', value: '45', icon: ShoppingCart },
          { title: 'Products', value: '24', icon: Package },
          { title: 'Users', value: '1,240', icon: Users },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary-green">
                <stat.icon size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
               <tr className="border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wide">
                 <th className="pb-4 font-medium">Order ID</th>
                 <th className="pb-4 font-medium">Customer</th>
                 <th className="pb-4 font-medium">Amount</th>
                 <th className="pb-4 font-medium">Status</th>
               </tr>
            </thead>
            <tbody>
               {[1, 2, 3, 4, 5].map((idx) => (
                 <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                    <td className="py-4 font-medium text-gray-900">#ORD-9X8{idx}</td>
                    <td className="py-4 text-gray-600">john.doe{idx}@example.com</td>
                    <td className="py-4 font-medium text-gray-900">₹{(Math.random() * 50 + 10).toFixed(2)}</td>
                    <td className="py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        Processing
                      </span>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
