import { Plus, Check } from 'lucide-react';
import { useCart, Product } from '../context/CartContext';
import { useState } from 'react';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Farm Fresh A2 Milk',
    description: '100% pure, unadulterated A2 milk from free-roaming Desi cows. Delivered fresh within hours of milking.',
    price: 4.5,
    unit: '1 Liter',
    category: 'Milk',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    name: 'Organic Set Curd',
    description: 'Traditional earthen pot set curd using natural cultures with no added preservatives or thickeners.',
    price: 3.2,
    unit: '500g',
    category: 'Curd',
    image: 'https://images.unsplash.com/photo-1628169137517-90fb3313460e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name: 'Pure Desi Cow Ghee',
    description: 'Bilona method ghee prepared from A2 milk curd. Rich in aroma, color, and Ayurvedic properties.',
    price: 18.0,
    unit: '500ml',
    category: 'Ghee',
    image: 'https://images.unsplash.com/photo-1589308118228-2fbf0ae9e3ce?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    name: 'Fresh Malai Paneer',
    description: 'Soft, melt-in-the-mouth paneer made from pure whole milk. Perfect for curries and snacks.',
    price: 5.5,
    unit: '250g',
    category: 'Paneer',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    name: 'Cultured Buttermilk',
    description: 'Refreshing spiced buttermilk with roasted cumin and fresh coriander.',
    price: 2.0,
    unit: '1 Liter',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    name: 'Unsalted White Butter',
    description: 'Freshly churned white butter, perfect for parathas and traditional cooking.',
    price: 6.0,
    unit: '250g',
    category: 'Butter',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Products() {
  const { addToCart, items } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Farm Products</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">100% pure, natural dairy items delivered fresh to your home. No preservatives, no compromises.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PRODUCTS.map((product) => {
          const isAdded = addedId === product.id;
          
          return (
            <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-gray-900">{product.name}</h3>
                  <span className="font-semibold text-lg text-farm-green">₹{product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm font-medium text-gray-500 mb-4 bg-gray-50 inline-block px-2 py-1 rounded w-max">{product.unit}</p>
                <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">{product.description}</p>
                
                <button
                  onClick={() => handleAdd(product)}
                  className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    isAdded 
                      ? 'bg-green-50 text-farm-green border border-green-200' 
                      : 'bg-farm-green hover:bg-meadow-green text-white shadow-md hover:shadow-xl shadow-gray-200'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} /> Added to Cart
                    </>
                  ) : (
                    <>
                      <Plus size={18} /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
