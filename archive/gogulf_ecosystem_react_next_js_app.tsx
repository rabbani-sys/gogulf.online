import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Home, Compass, Plus, MessageCircle, User, Search, ShoppingCart, Bell, 
  Briefcase, Plane, Moon, ShoppingBag, GraduationCap, ChevronDown, Bot, 
  ArrowRight, CheckCircle2, MapPin, Star, Heart, FileText, X, Lock, 
  ShieldCheck, Menu, Building2, LayoutDashboard
} from 'lucide-react';

/* 
 * ============================================================================
 * NEXT.JS & SUPABASE ARCHITECTURE (Simulated for Single-File Environment)
 * ============================================================================
 * In a real Next.js project, you would initialize Supabase like this:
 * 
 * import { createClient } from '@supabase/supabase-js';
 * const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
 * const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 * export const supabase = createClient(supabaseUrl, supabaseKey);
 * 
 * Below is a realistic mock of the Supabase Client that allows this prototype 
 * to function exactly like the real backend, returning promises and standard 
 * Supabase data structures.
 */

const MOCK_DB = {
  umrah_packages: [
    { id: 1, title: 'Premium Umrah Package - VIP Transport', provider: 'Al Rajhi Travels', price: 4500, verified: true, duration: '10 Nights', distance: '150m from Haram', image: 'https://placehold.co/600x400/e2e8f0/006C35?text=Makkah+Hotel' },
    { id: 2, title: 'Economy Hajj & Umrah Duo', provider: 'Saudia Holidays', price: 3200, verified: true, duration: '7 Nights', distance: '800m from Haram', image: 'https://placehold.co/600x400/e2e8f0/006C35?text=Madinah+Stay' }
  ],
  marketplace: [
    { id: 101, title: 'Gulf Pro CV Template (ATS Ready)', category: 'Digital Download', price: 15, rating: 4.9, reviews: 120, verified: true },
    { id: 102, title: 'Saudi Business Etiquette Course', category: 'Online Course', price: 49, rating: 5.0, reviews: 85, verified: true }
  ]
};

const supabase = {
  auth: {
    signUp: async ({ email, password, options }) => {
      console.log("Supabase Auth: Auto-creating user ->", email);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { 
        data: { user: { id: `usr_${Math.random().toString(36).substr(2, 9)}`, email, user_metadata: options?.data || {} } }, 
        error: null 
      };
    },
    signInWithPassword: async ({ email, password }) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { data: { user: { id: 'usr_existing123', email, user_metadata: { name: 'Returning User' } } }, error: null };
    }
  },
  from: (table) => ({
    select: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { data: MOCK_DB[table] || [], error: null };
    },
    insert: async (payload) => {
      console.log(`Supabase DB: Inserting into ${table}`, payload);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { data: payload, error: null };
    }
  })
};

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    :root {
      --saudi-green: #006C35;
      --saudi-green-dark: #005430;
      --saudi-green-light: #e6f0eb;
      --gold: #d4af37;
    }
    
    body {
      background-color: #f0fdf4; /* Light green tint */
      color: #064e3b;
      font-family: 'Inter', sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    /* Fast Microinteractions */
    .hover-lift {
      transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .hover-lift:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px -5px rgba(0, 108, 53, 0.15), 0 8px 10px -6px rgba(0, 108, 53, 0.05);
    }
    .active-scale {
      transition: transform 0.1s ease-in-out;
    }
    .active-scale:active {
      transform: scale(0.95);
    }

    /* Hide scrollbar */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #bbf7d0; border-radius: 20px; }

    /* Animations */
    @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-slide-up { animation: slideUp 0.2s ease-out forwards; }
    .animate-fade-in { animation: fadeIn 0.15s ease-out forwards; }
  `}} />
);

const GCCLogo = ({ className = "w-10 h-10" }) => (
  <div className={`${className} bg-[#006C35] rounded-xl flex items-center justify-center shadow-lg border border-[#005430] relative overflow-hidden group-hover:scale-105 transition-transform duration-150 shrink-0`}>
    <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] fill-current text-white absolute bottom-0">
      {/* Sun / Moon backdrop */}
      <circle cx="50" cy="40" r="25" fill="#d4af37" opacity="0.8"/>
      {/* Burj Khalifa / Tower element */}
      <polygon points="45,80 55,80 52,20 48,20" fill="#ffffff" opacity="0.9"/>
      {/* Palm Tree leaves */}
      <path d="M50,40 Q30,20 10,35 Q30,40 50,45" stroke="#ffffff" strokeWidth="3" fill="none"/>
      <path d="M50,40 Q70,20 90,35 Q70,40 50,45" stroke="#ffffff" strokeWidth="3" fill="none"/>
      <path d="M50,45 Q25,35 5,55 Q30,55 50,55" stroke="#ffffff" strokeWidth="3" fill="none"/>
      <path d="M50,45 Q75,35 95,55 Q70,55 50,55" stroke="#ffffff" strokeWidth="3" fill="none"/>
      {/* Dates cluster */}
      <circle cx="45" cy="50" r="3" fill="#d4af37"/>
      <circle cx="55" cy="50" r="3" fill="#d4af37"/>
      <circle cx="50" cy="53" r="3" fill="#d4af37"/>
      {/* Falcon Wing abstraction */}
      <path d="M20,80 Q40,60 50,70 Q20,70 20,80" fill="#ffffff" opacity="0.7"/>
      <path d="M80,80 Q60,60 50,70 Q80,70 80,80" fill="#ffffff" opacity="0.7"/>
    </svg>
  </div>
);

// Contexts for State Management
const AuthContext = createContext();
const CartContext = createContext();

const HomeView = ({ setView }) => (
  <div className="space-y-4 md:space-y-6 animate-fade-in pb-20 md:pb-0">
    {/* Premium Saudi Aesthetic Hero */}
    <div className="mx-0 bg-[#005430] text-white md:rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-lg border-b md:border-none border-[#004526]">
      <div className="absolute inset-0 opacity-20 bg-[url('https://placehold.co/1200x400/005430/006C35?text=Riyadh+Skyline')] bg-cover bg-center mix-blend-screen"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#005430] via-[#005430]/90 to-transparent"></div>
      
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] sm:text-xs font-bold mb-4 backdrop-blur-sm uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Ecosystem Active
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-white tracking-tight">Your Gulf Journey<br/><span className="text-[#d4af37]">Starts Here</span></h1>
        <p className="text-sm md:text-base text-green-100 mb-8 font-medium tracking-wide flex flex-wrap gap-x-2 gap-y-2 items-center opacity-90">
          <span>Work</span> &bull; <span>Study</span> &bull; <span>Travel</span> &bull; <span>Umrah</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => setView('explore')} className="bg-[#d4af37] text-[#005430] px-6 py-3.5 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 hover-lift active-scale">
            Start Your Journey <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Categories */}
    <div className="md:hidden flex overflow-x-auto no-scrollbar gap-4 px-4 py-3 bg-white border-b border-green-100">
      {[
        { icon: Briefcase, label: 'Jobs', color: 'text-[#006C35]', bg: 'bg-green-50', view: 'explore' },
        { icon: Moon, label: 'Umrah', color: 'text-[#d4af37]', bg: 'bg-amber-50', view: 'umrah' },
        { icon: ShoppingBag, label: 'Shop', color: 'text-[#006C35]', bg: 'bg-green-50', view: 'marketplace' },
        { icon: Plane, label: 'Travel', color: 'text-[#006C35]', bg: 'bg-green-50', view: 'explore' }
      ].map((cat, i) => (
        <button key={i} onClick={() => setView(cat.view)} className="flex flex-col items-center gap-1.5 min-w-[70px] rounded-lg group outline-none active-scale">
          <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.color} border border-black/5 shadow-sm transition-transform duration-150`}>
            <cat.icon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-semibold text-green-900">{cat.label}</span>
        </button>
      ))}
    </div>

    {/* Feed Post */}
    <div className="bg-white md:rounded-3xl shadow-sm border-b md:border border-green-100 overflow-hidden">
      <div className="p-4 flex justify-between items-start">
        <div className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-green-100 shadow-sm text-2xl">🏢</div>
          <div>
            <h3 className="font-bold text-green-900 text-sm md:text-base flex items-center gap-1">NEOM <CheckCircle2 className="w-4 h-4 text-[#006C35] fill-current text-white" /></h3>
            <p className="text-xs text-green-700/60">2 hours ago • Sponsored</p>
          </div>
        </div>
      </div>
      <div className="px-4 pb-3">
        <p className="text-sm md:text-base text-green-900 leading-relaxed">
          We are expanding our sustainable infrastructure team! Join us to build the future. 🌍🚀
        </p>
      </div>
      <div className="mx-4 mb-4 rounded-2xl border border-green-100 bg-[#f0fdf4] overflow-hidden hover-lift group cursor-pointer">
        <div className="h-40 bg-slate-200 relative overflow-hidden">
          <img src="https://placehold.co/600x300/006C35/ffffff?text=NEOM+Careers" alt="Job Promo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-4 bg-white flex justify-between items-center">
          <div>
            <h4 className="font-bold text-green-900 text-sm">Senior Project Manager</h4>
            <p className="text-xs text-green-700/70 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> Tabuk, KSA • On-site</p>
          </div>
          <button className="bg-[#006C35] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#005430] transition-colors shadow-sm active-scale">Apply</button>
        </div>
      </div>
    </div>
  </div>
);

const UmrahView = ({ addToCart }) => {
  const [packages, setPackages] = useState([]);
  
  useEffect(() => {
    // Fetch data using Supabase mock
    supabase.from('umrah_packages').select().then(({ data }) => setPackages(data));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0 px-4 md:px-0">
      <div className="bg-gradient-to-b from-amber-50 to-white md:rounded-3xl p-6 md:p-10 border border-green-100 shadow-sm text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[#d4af37] mb-4 border border-amber-100 shadow-sm">
            <Moon className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#005430] mb-3">Your Spiritual Journey</h2>
          <p className="text-green-800/70 text-sm leading-relaxed mb-6">Discover verified packages, plan your accommodation near the Haram, and prepare for your pilgrimage.</p>
          <div className="inline-flex items-start text-left bg-green-50 border border-green-200 rounded-xl p-3 max-w-lg">
            <ShieldCheck className="w-5 h-5 text-[#006C35] shrink-0 mt-0.5 mr-2" />
            <p className="text-[11px] text-green-900 leading-tight">
              <strong>Verified Platform:</strong> Packages provided by licensed operators. Verify official visa requirements via the Ministry of Hajj & Umrah.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm hover-lift group flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-[#005430] shadow-sm">{pkg.duration}</div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium text-white flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> {pkg.distance}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h4 className="font-bold text-green-900 text-base leading-tight mb-2">{pkg.title}</h4>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-green-700/60">Provider:</span>
                <span className="text-xs font-bold text-green-900 flex items-center gap-1">{pkg.provider} {pkg.verified && <CheckCircle2 className="w-3 h-3 text-[#006C35] fill-current text-white" />}</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-green-50 mt-auto">
                <div>
                  <p className="text-[10px] text-green-700/60 mb-0.5">Starting from</p>
                  <p className="font-extrabold text-lg text-[#005430]">SAR {pkg.price} <span className="text-xs font-normal text-green-700/60">/person</span></p>
                </div>
                <button onClick={() => addToCart(pkg)} className="bg-[#005430] text-[#d4af37] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#004020] transition-colors shadow-sm active-scale">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MarketplaceView = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    supabase.from('marketplace').select().then(({ data }) => setProducts(data));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0 px-4 md:px-0">
      <div>
        <h2 className="text-2xl font-extrabold text-[#005430]">Marketplace</h2>
        <p className="text-sm text-green-800/70 mt-1">Discover resources and services for the Gulf.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm hover-lift flex flex-col group relative">
            <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-green-700/50 hover:text-red-500 transition-colors z-10 active-scale"><Heart className="w-4 h-4" /></button>
            <div className="h-32 bg-green-50 p-4 flex items-center justify-center relative">
              <FileText className="w-12 h-12 text-[#006C35]/40 group-hover:scale-110 transition-transform duration-150" />
            </div>
            <div className="p-3 sm:p-4 flex-1 flex flex-col">
              <div className="text-[10px] font-bold text-[#006C35] uppercase tracking-wider mb-1">{item.category}</div>
              <h4 className="font-bold text-sm text-green-900 leading-tight mb-1">{item.title}</h4>
              <div className="flex items-center gap-1 text-xs text-green-700/60 mb-3">
                <Star className="w-3 h-3 text-[#d4af37] fill-current" /> {item.rating} ({item.reviews})
              </div>
              <div className="mt-auto flex justify-between items-center pt-3 border-t border-green-50">
                <span className="font-bold text-[#005430]">${item.price}</span>
                <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[#006C35] hover:bg-[#006C35] hover:text-white transition-colors active-scale"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardView = () => {
  const { user } = useContext(AuthContext);
  
  if (!user) return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 animate-fade-in">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-[#006C35] mb-4 border border-green-100"><User className="w-8 h-8"/></div>
      <h2 className="text-2xl font-extrabold text-[#005430] mb-2">Welcome to GoGulf</h2>
      <p className="text-green-800/70 text-sm max-w-sm mb-6">Explore the ecosystem freely. Checking out a package or service will automatically create your dashboard.</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-20 md:pb-0 px-4 md:px-0">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#005430]">Good morning, {user.user_metadata?.name || user.email?.split('@')[0] || 'Explorer'}</h2>
        <p className="text-sm text-green-800/70 mt-1">Here is the status of your journey to the Gulf.</p>
      </div>
      <div className="bg-white rounded-3xl border border-green-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-green-900 flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-[#006C35]" /> Overall Progress</h3>
          <span className="text-[#006C35] font-bold text-sm bg-green-50 px-3 py-1 rounded-full">45% Complete</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl bg-[#f0fdf4] border border-green-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-green-900">Profile</span>
              <CheckCircle2 className="w-4 h-4 text-[#006C35]" />
            </div>
            <div className="w-full bg-green-100 rounded-full h-1.5"><div className="bg-[#006C35] h-1.5 rounded-full w-full"></div></div>
          </div>
          <div className="p-3 rounded-xl bg-[#f0fdf4] border border-green-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-green-900">Purchases</span>
              <span className="text-xs font-bold text-[#006C35]">Active</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-1.5"><div className="bg-[#006C35] h-1.5 rounded-full w-3/4"></div></div>
          </div>
        </div>
      </div>
      {/* Recent Orders (Mocked as success) */}
      <div className="bg-white rounded-3xl border border-green-100 p-5 shadow-sm">
         <h3 className="font-bold text-green-900 mb-4">Recent Bookings & Orders</h3>
         <div className="p-4 rounded-xl border border-green-50 bg-[#f0fdf4] flex items-center justify-between">
           <div>
             <p className="text-xs font-bold text-[#006C35] mb-1">Confirmed</p>
             <p className="text-sm font-bold text-green-900">Ecosystem Order #GGLF-8832</p>
           </div>
           <button className="text-xs font-bold text-[#005430] bg-white px-3 py-1.5 rounded-lg border border-green-100 hover:bg-green-50 transition-colors">View Ticket</button>
         </div>
      </div>
    </div>
  );
};

const CheckoutModal = ({ isOpen, onClose, cart, clearCart, setView }) => {
  const { user, handleAutoSignup } = useContext(AuthContext);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Processing
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const processPayment = async () => {
    setStep(3); // Loading state
    try {
      // If guest, auto create account in Supabase
      if (!user) {
        await handleAutoSignup(email, name);
      } else {
        // Simulate payment delay
        await new Promise(res => setTimeout(res, 1200)); 
      }
      
      // Clear Cart & Redirect to Dashboard
      clearCart();
      onClose();
      setStep(1);
      setView('dashboard');
    } catch (e) {
      console.error(e);
      setStep(2); // Revert on error
    }
  };

  return (
    <div className="fixed inset-0 bg-[#005430]/60 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center animate-fade-in p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
        <div className="p-5 border-b border-green-100 flex justify-between items-center bg-[#f0fdf4]">
          <h2 className="font-extrabold text-[#005430] text-lg">Secure Checkout</h2>
          <button onClick={onClose} className="p-2 hover:bg-green-100 rounded-full text-green-800 active-scale"><X className="w-5 h-5"/></button>
        </div>
        
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-green-900 font-medium">Guest Checkout (Account Auto-Created)</p>
              <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-green-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006C35] outline-none" />
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white border border-green-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#006C35] outline-none" />
              <button onClick={() => setStep(2)} disabled={!name || !email} className="w-full bg-[#006C35] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#005430] transition-colors disabled:opacity-50 active-scale">Continue to Payment</button>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="flex justify-between text-sm mb-1"><span className="text-green-700/80">Total to pay</span><span className="font-bold text-[#005430]">${total}</span></div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-green-900 uppercase tracking-wider">Payment Method (Tokenized Demo)</p>
                <div className="h-12 border border-green-200 rounded-xl flex items-center px-4 bg-white opacity-70 cursor-not-allowed">
                   <span className="text-sm font-medium text-green-900">•••• •••• •••• 4242</span>
                </div>
              </div>
              <button onClick={processPayment} className="w-full bg-[#005430] text-[#d4af37] py-3.5 rounded-xl font-bold text-sm hover:bg-[#004020] transition-colors shadow-lg active-scale flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Pay & Confirm
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border-4 border-green-100 border-t-[#006C35] rounded-full animate-spin mb-4"></div>
              <h3 className="font-bold text-[#005430]">Processing Secure Payment...</h3>
              <p className="text-xs text-green-700/70 mt-2">Provisioning your GoGulf Dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CartDrawer = () => {
  const { cart, removeFromCart, isCartOpen, toggleCart } = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-[#005430]/40 backdrop-blur-sm z-50 animate-fade-in flex justify-end">
        <div className="w-full md:w-[400px] bg-white shadow-2xl flex flex-col h-full animate-slide-up md:animate-none">
          <div className="md:hidden w-full flex justify-center pt-3 pb-1"><div className="w-12 h-1.5 bg-green-100 rounded-full"></div></div>
          <div className="p-4 md:p-6 border-b border-green-100 flex justify-between items-center bg-white shrink-0">
            <h2 className="text-xl font-extrabold text-[#005430]">Your Cart</h2>
            <button onClick={toggleCart} className="p-2 text-green-700/60 hover:bg-green-50 rounded-full active-scale outline-none"><X className="w-5 h-5"/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f0fdf4] space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <p className="text-center text-green-700/60 text-sm mt-10">Your cart is empty.</p>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-green-100 flex gap-4 shadow-sm relative">
                  <button onClick={() => removeFromCart(idx)} className="absolute top-2 right-2 p-1 text-green-400 hover:text-red-500 transition-colors"><X className="w-4 h-4"/></button>
                  <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center text-[#006C35] shrink-0 overflow-hidden">
                    {item.image ? <img src={item.image} className="w-full h-full object-cover"/> : <ShoppingBag className="w-6 h-6"/>}
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-bold text-sm text-green-900 truncate">{item.title}</h4>
                    <p className="text-xs text-green-700/60 mb-2">{item.provider || item.category}</p>
                    <span className="font-bold text-[#005430]">${item.price}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 md:p-6 bg-white border-t border-green-100 shrink-0 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="flex justify-between font-extrabold text-lg text-[#005430] mb-4"><span>Total</span><span>${total}</span></div>
            <button onClick={() => { if(cart.length > 0) setIsCheckoutOpen(true); }} disabled={cart.length === 0} className="w-full bg-[#005430] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#004020] transition-colors flex items-center justify-center gap-2 shadow-lg active-scale disabled:opacity-50">
              <Lock className="w-4 h-4" /> Secure Checkout
            </button>
          </div>
        </div>
      </div>
      
      {/* Checkout Engine (Simulating Next.js Route transition / Modal) */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart}
        clearCart={() => { cart.length = 0; /* In react use state setter in context */ }}
        setView={useContext(CartContext).setView}
      />
    </>
  );
};

export default function GoGulfApp() {
  const [view, setView] = useState('home'); // Simulates Next.js routing
  const [user, setUser] = useState(null);
  
  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);
  
  // Auth Logic (Simulating Supabase integration)
  const handleAutoSignup = async (email, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password: 'guest-auto-password', options: { data: { name } } });
      if (data?.user) setUser(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleAutoSignup }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isCartOpen, toggleCart: () => setIsCartOpen(!isCartOpen), setView }}>
        <GlobalStyles />
        
        <div className="flex flex-col h-[100dvh] w-full max-w-[2000px] mx-auto bg-[#f0fdf4] relative overflow-hidden">
          
          {/* TOP HEADER */}
          <header className="h-16 bg-white/85 backdrop-blur-md border-b border-green-100 flex items-center justify-between px-4 lg:px-8 z-40 shrink-0">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 -ml-2 text-green-900 rounded-full active-scale outline-none"><Menu className="w-6 h-6"/></button>
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('home')}>
                <GCCLogo />
                <span className="text-xl font-extrabold tracking-tight text-[#005430] hidden sm:block">GoGulf<span className="text-[#d4af37]">.online</span></span>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="w-5 h-5 text-green-700/40" /></div>
              <input type="text" placeholder="Search the Gulf ecosystem..." className="block w-full pl-10 pr-3 py-2.5 border border-green-200 rounded-full leading-5 bg-[#f0fdf4] placeholder-green-700/50 focus:outline-none focus:ring-2 focus:ring-[#006C35] focus:bg-white transition-all text-sm outline-none" />
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button onClick={() => setIsCartOpen(true)} className="p-2 text-green-900 rounded-full relative active-scale hover:bg-green-50 outline-none">
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
              </button>
              
              <button onClick={() => user ? setView('dashboard') : setView('home')} className="flex items-center gap-2 rounded-full p-1 border border-transparent hover:border-green-200 transition-colors active-scale outline-none">
                <div className="w-8 h-8 rounded-full bg-[#006C35] text-white flex items-center justify-center font-bold text-xs border border-green-200 shadow-sm">
                  {user ? (user.user_metadata?.name?.[0] || 'U') : <User className="w-4 h-4"/>}
                </div>
                <div className="hidden lg:flex flex-col items-start mr-2">
                  <span className="text-xs font-bold text-green-900 leading-none mb-1">{user ? (user.user_metadata?.name || 'User') : 'Guest'}</span>
                  <span className="text-[10px] text-green-700/70 leading-none">{user ? 'Dashboard' : 'Sign in'}</span>
                </div>
              </button>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden relative">
            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-green-100 h-full overflow-y-auto custom-scrollbar shrink-0 z-10">
              <div className="p-4 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-green-700/60 uppercase tracking-wider mb-3 px-3">Ecosystem</h4>
                  <nav className="space-y-1">
                    <button onClick={() => setView('home')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors outline-none active-scale ${view === 'home' ? 'bg-green-50 text-[#006C35] font-bold' : 'text-green-900 hover:bg-[#f0fdf4]'}`}><Home className="w-5 h-5"/> Home</button>
                    <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors outline-none active-scale ${view === 'dashboard' ? 'bg-green-50 text-[#006C35] font-bold' : 'text-green-900 hover:bg-[#f0fdf4]'}`}><LayoutDashboard className="w-5 h-5"/> My Dashboard</button>
                  </nav>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-green-700/60 uppercase tracking-wider mb-3 px-3">Discover</h4>
                  <nav className="space-y-1">
                    <button onClick={() => setView('umrah')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors outline-none active-scale ${view === 'umrah' ? 'bg-amber-50 text-[#d4af37] font-bold' : 'text-green-900 hover:bg-[#f0fdf4]'}`}><Moon className="w-5 h-5"/> Hajj & Umrah</button>
                    <button onClick={() => setView('marketplace')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors outline-none active-scale ${view === 'marketplace' ? 'bg-green-50 text-[#006C35] font-bold' : 'text-green-900 hover:bg-[#f0fdf4]'}`}><ShoppingBag className="w-5 h-5"/> Marketplace</button>
                  </nav>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#f0fdf4]">
              {/* Mobile Search */}
              <div className="md:hidden px-4 py-3 bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-20">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-700/50" />
                  <input type="text" placeholder="Search GoGulf..." className="w-full bg-[#f0fdf4] border border-green-200 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#006C35] outline-none" />
                </div>
              </div>

              <div className="max-w-5xl mx-auto p-0 md:p-6 lg:p-8">
                {view === 'home' && <HomeView setView={setView} />}
                {view === 'umrah' && <UmrahView addToCart={addToCart} />}
                {view === 'marketplace' && <MarketplaceView addToCart={addToCart} />}
                {view === 'dashboard' && <DashboardView />}
              </div>
            </main>
          </div>

          {/* MOBILE BOTTOM NAVIGATION */}
          <nav className="md:hidden bg-white/95 backdrop-blur-lg border-t border-green-100 h-16 shrink-0 relative z-40 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_15px_rgba(0,108,53,0.05)]">
            <div className="flex justify-around items-center h-full px-2">
              <button onClick={() => setView('home')} className={`flex flex-col items-center justify-center w-14 h-full active-scale outline-none ${view === 'home' ? 'text-[#006C35]' : 'text-green-700/60'}`}>
                <Home className="w-6 h-6 mb-0.5" />
                <span className="text-[10px] font-medium">Home</span>
              </button>
              <button onClick={() => setView('marketplace')} className={`flex flex-col items-center justify-center w-14 h-full active-scale outline-none ${view === 'marketplace' ? 'text-[#006C35]' : 'text-green-700/60'}`}>
                <ShoppingBag className="w-6 h-6 mb-0.5" />
                <span className="text-[10px] font-medium">Shop</span>
              </button>
              
              <div className="relative -top-5">
                <button className="flex items-center justify-center w-14 h-14 bg-[#006C35] text-white rounded-full border-4 border-[#f0fdf4] shadow-xl active-scale group outline-none">
                  <Plus className="w-6 h-6 transition-transform duration-150" />
                </button>
              </div>

              <button onClick={() => setView('umrah')} className={`flex flex-col items-center justify-center w-14 h-full active-scale outline-none ${view === 'umrah' ? 'text-[#d4af37]' : 'text-green-700/60'}`}>
                <Moon className="w-6 h-6 mb-0.5" />
                <span className="text-[10px] font-medium">Umrah</span>
              </button>
              <button onClick={() => setView('dashboard')} className={`flex flex-col items-center justify-center w-14 h-full active-scale outline-none ${view === 'dashboard' ? 'text-[#006C35]' : 'text-green-700/60'}`}>
                <User className="w-6 h-6 mb-0.5" />
                <span className="text-[10px] font-medium">Profile</span>
              </button>
            </div>
          </nav>

          <CartDrawer />

        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}