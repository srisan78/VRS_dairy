import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Leaf, Star } from 'lucide-react';

export default function Landing() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-hero-pattern">
          <img
            src="https://images.unsplash.com/photo-1570823330366-0eb0328242fd?auto=format&fit=crop&w=1920&q=80"
            alt="Dairy Cows in Pasture"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
            style={{ objectPosition: 'center 60%' }}
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium tracking-wide mb-6">
              100% Organic & Farm Fresh
            </span>
            <h1 className="text-5xl md:text-[64px] font-bold leading-[1.1] mb-6">
              Fresh Milk Delivered to Your Doorstep
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl font-light">
              Experience the true taste of nature with our farm-fresh milk, organic curd, and traditionally churned ghee. Pure goodness, zero preservatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex justify-center items-center gap-2 bg-farm-green hover:bg-meadow-green text-white px-8 py-4 rounded-lg font-bold text-[16px] transition-colors"
              >
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link
                to="/products"
                className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold text-[16px] transition-colors"
              >
                Subscribe Daily
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Why Choose VRS Dairy Farm?</h2>
            <div className="w-24 h-1 bg-primary-green mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-light-blue rounded-full flex items-center justify-center text-blue-600 mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Pure & Untouched</h3>
              <p className="text-gray-600 leading-relaxed">
                Our milk is pasteurized and chilled instantly, never touched by human hands. We promise absolute purity in every drop.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-primary-green mb-6">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Organic Farming</h3>
              <p className="text-gray-600 leading-relaxed">
                Our cows free-roam in lush, pesticide-free pastures and are fed a natural diet to ensure complete organic nutrition.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-6">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Morning Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Subscribe and wake up to fresh milk at your doorstep by 7:00 AM every day. Reliable, seamless, and perfectly chilled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Mini (Static) */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Farm Fresh Categories</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Explore our range of premium dairy products crafted with traditional methods.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Fresh Milk', 'Organic Curd', 'Pure Ghee', 'Fresh Paneer'].map((cat, i) => (
              <Link to="/products" key={cat} className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all aspect-square border border-gray-100 flex items-center justify-center flex-col p-6">
                <div className="absolute inset-0 bg-primary-green/0 group-hover:bg-primary-green/5 transition-colors z-0" />
                <div className="relative z-10 w-20 h-20 bg-gray-50 rounded-full mb-4 flex items-center justify-center text-3xl shadow-inner font-serif italic text-gray-400 group-hover:text-primary-green group-hover:bg-white transition-all transform group-hover:scale-110">
                   0{i+1}
                </div>
                <h3 className="relative z-10 font-semibold text-lg text-gray-800">{cat}</h3>
              </Link>
            ))}
          </div>
          
          <div className="mt-12">
            <Link to="/products" className="inline-block bg-white text-gray-900 border border-gray-200 hover:border-primary-green hover:text-primary-green px-8 py-3 rounded-full font-medium transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Loved by Families</h2>
            <div className="w-24 h-1 bg-primary-green mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The quality of the A2 milk is unmatched. My kids love the taste, and the morning delivery is incredibly reliable. I've switched completely to VRS Dairy Farm."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">Sarah Jenkins</h4>
                    <p className="text-xs text-gray-500">Subscribed for 6 months</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-hero-pattern text-white py-16 border-t-[8px] border-meadow-green relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-0" />
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready for better mornings?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join thousands of families enjoying pure, farm-fresh milk every day. Start your subscription now.</p>
          <Link to="/products" className="inline-flex justify-center items-center gap-2 bg-farm-green hover:bg-meadow-green text-white px-8 py-4 rounded-lg font-bold text-[16px] transition-colors">
            Subscribe Now
          </Link>
        </div>
      </footer>
    </div>
  );
}
