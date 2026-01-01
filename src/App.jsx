import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, Trash2, Moon, Sun, 
  DollarSign, CreditCard, RotateCcw, Search 
} from 'lucide-react';

const CURRENCIES = {
  USD: { symbol: '$', locale: 'en-US' },
  EUR: { symbol: '€', locale: 'de-DE' },
};

const CATEGORIES = ['All', 'Video', 'Music', 'Gaming', 'Software', 'Cloud', 'Security', 'Learning', 'Other'];

const DEFAULT_SUBSCRIPTIONS = [
  { id: 'netflix', name: 'Netflix', price: 15.49, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=netflix.com&sz=128' },
  { id: 'prime', name: 'Prime Video', price: 14.99, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=primevideo.com&sz=128' },
  { id: 'disney', name: 'Disney+', price: 13.99, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=disneyplus.com&sz=128' },
  { id: 'hbo', name: 'HBO Max', price: 15.99, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=max.com&sz=128' },
  { id: 'appletv', name: 'Apple TV+', price: 9.99, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=tv.apple.com&sz=128' },
  { id: 'youtube', name: 'YouTube Premium', price: 13.99, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=128' },
  { id: 'hulu', name: 'Hulu', price: 17.99, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=hulu.com&sz=128' },
  { id: 'paramount', name: 'Paramount+', price: 11.99, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=paramountplus.com&sz=128' },
  { id: 'peacock', name: 'Peacock', price: 11.99, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=peacocktv.com&sz=128' },
  { id: 'discovery', name: 'Discovery+', price: 8.99, category: 'Video', logo: 'https://www.google.com/s2/favicons?domain=discoveryplus.com&sz=128' },

  { id: 'spotify', name: 'Spotify Premium', price: 10.99, category: 'Music', logo: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=128' },
  { id: 'applemusic', name: 'Apple Music', price: 10.99, category: 'Music', logo: 'https://www.google.com/s2/favicons?domain=music.apple.com&sz=128' },
  { id: 'youtubemusic', name: 'YouTube Music', price: 10.99, category: 'Music', logo: 'https://www.google.com/s2/favicons?domain=music.youtube.com&sz=128' },
  { id: 'amazonmusic', name: 'Amazon Music', price: 10.99, category: 'Music', logo: 'https://www.google.com/s2/favicons?domain=music.amazon.com&sz=128' },
  { id: 'tidal', name: 'Tidal', price: 10.99, category: 'Music', logo: 'https://www.google.com/s2/favicons?domain=tidal.com&sz=128' },
  { id: 'soundcloud', name: 'SoundCloud Go+', price: 9.99, category: 'Music', logo: 'https://www.google.com/s2/favicons?domain=soundcloud.com&sz=128' },
  { id: 'deezer', name: 'Deezer', price: 10.99, category: 'Music', logo: 'https://www.google.com/s2/favicons?domain=deezer.com&sz=128' },

  { id: 'xbox', name: 'Xbox Game Pass', price: 16.99, category: 'Gaming', logo: 'https://www.google.com/s2/favicons?domain=xbox.com&sz=128' },
  { id: 'psplus', name: 'PlayStation Plus', price: 9.99, category: 'Gaming', logo: 'https://www.google.com/s2/favicons?domain=playstation.com&sz=128' },
  { id: 'nintendo', name: 'Nintendo Online', price: 3.99, category: 'Gaming', logo: 'https://www.google.com/s2/favicons?domain=nintendo.com&sz=128' },
  { id: 'eaplay', name: 'EA Play', price: 5.99, category: 'Gaming', logo: 'https://www.google.com/s2/favicons?domain=ea.com&sz=128' },
  { id: 'ubisoft', name: 'Ubisoft+', price: 17.99, category: 'Gaming', logo: 'https://www.google.com/s2/favicons?domain=ubisoft.com&sz=128' },

  { id: 'chatgpt', name: 'ChatGPT Plus', price: 20.00, category: 'Software', logo: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128' },
  { id: 'm365', name: 'Microsoft 365', price: 6.99, category: 'Software', logo: 'https://www.google.com/s2/favicons?domain=office.com&sz=128' },
  { id: 'googleone', name: 'Google One', price: 2.99, category: 'Software', logo: 'https://www.google.com/s2/favicons?domain=one.google.com&sz=128' },
  { id: 'adobe', name: 'Adobe CC', price: 59.99, category: 'Software', logo: 'https://www.google.com/s2/favicons?domain=adobe.com&sz=128' },
  { id: 'notion', name: 'Notion Plus', price: 10.00, category: 'Software', logo: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128' },
  { id: 'canva', name: 'Canva Pro', price: 12.99, category: 'Software', logo: 'https://www.google.com/s2/favicons?domain=canva.com&sz=128' },
  { id: 'figma', name: 'Figma Pro', price: 12.00, category: 'Software', logo: 'https://www.google.com/s2/favicons?domain=figma.com&sz=128' },
  { id: 'grammarly', name: 'Grammarly', price: 12.00, category: 'Software', logo: 'https://www.google.com/s2/favicons?domain=grammarly.com&sz=128' },

  { id: 'icloud', name: 'iCloud+', price: 2.99, category: 'Cloud', logo: 'https://www.google.com/s2/favicons?domain=icloud.com&sz=128' },
  { id: 'dropbox', name: 'Dropbox Plus', price: 11.99, category: 'Cloud', logo: 'https://www.google.com/s2/favicons?domain=dropbox.com&sz=128' },
  { id: 'onedrive', name: 'OneDrive', price: 1.99, category: 'Cloud', logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128' },

  { id: 'nordvpn', name: 'NordVPN', price: 12.99, category: 'Security', logo: 'https://www.google.com/s2/favicons?domain=nordvpn.com&sz=128' },
  { id: 'expressvpn', name: 'ExpressVPN', price: 12.95, category: 'Security', logo: 'https://www.google.com/s2/favicons?domain=expressvpn.com&sz=128' },
  { id: 'surfshark', name: 'Surfshark', price: 12.95, category: 'Security', logo: 'https://www.google.com/s2/favicons?domain=surfshark.com&sz=128' },
  { id: 'proton', name: 'Proton VPN', price: 9.99, category: 'Security', logo: 'https://www.google.com/s2/favicons?domain=protonvpn.com&sz=128' },
  { id: '1password', name: '1Password', price: 2.99, category: 'Security', logo: 'https://www.google.com/s2/favicons?domain=1password.com&sz=128' },

  { id: 'udemy', name: 'Udemy', price: 20.00, category: 'Learning', logo: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=128' },
  { id: 'coursera', name: 'Coursera', price: 59.00, category: 'Learning', logo: 'https://www.google.com/s2/favicons?domain=coursera.org&sz=128' },
  { id: 'skillshare', name: 'Skillshare', price: 14.00, category: 'Learning', logo: 'https://www.google.com/s2/favicons?domain=skillshare.com&sz=128' },
  { id: 'pluralsight', name: 'Pluralsight', price: 29.00, category: 'Learning', logo: 'https://www.google.com/s2/favicons?domain=pluralsight.com&sz=128' },

  { id: 'medium', name: 'Medium', price: 5.00, category: 'Other', logo: 'https://www.google.com/s2/favicons?domain=medium.com&sz=128' },
  { id: 'linkedin', name: 'LinkedIn', price: 39.99, category: 'Other', logo: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=128' },
  { id: 'twitter', name: 'X Premium', price: 8.00, category: 'Other', logo: 'https://www.google.com/s2/favicons?domain=x.com&sz=128' },
  { id: 'patreon', name: 'Patreon', price: 5.00, category: 'Other', logo: 'https://www.google.com/s2/favicons?domain=patreon.com&sz=128' },
];

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 ${className}`}>
    {children}
  </div>
);

const SubscriptionItem = ({ sub, currency, onToggle, onPriceChange, onDelete }) => {
  return (
    <Card className={`flex items-center justify-between group border-l-4 ${sub.enabled ? 'border-indigo-500' : 'border-transparent'}`}>
      <div className="flex items-center gap-4 flex-1">
        <div className="w-11 h-11 min-w-[2.75rem] rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-gray-200 p-1">
          {sub.logo ? (
            <img 
              src={sub.logo} 
              alt={sub.name} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-white font-bold text-lg rounded-xl ${sub.color || 'bg-gray-400'}`}>
              {sub.name.substring(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex flex-col">
          <span className={`font-semibold ${sub.enabled ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
            {sub.name}
          </span>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{CURRENCIES[currency].symbol}</span>
            <input
              type="number"
              value={sub.price}
              onChange={(e) => onPriceChange(sub.id, e.target.value)}
              disabled={!sub.enabled}
              className="w-16 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none ml-1 text-gray-700 dark:text-gray-300 transition-colors"
            />
            <span className="text-xs ml-1">/mo</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(sub.id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            sub.enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span
            className={`${
              sub.enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </button>

        {sub.isCustom && (
          <button 
            onClick={() => onDelete(sub.id)}
            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </Card>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [income, setIncome] = useState(0);
  const [viewMode, setViewMode] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('subs_data');
    if (saved) return JSON.parse(saved);
    
    return DEFAULT_SUBSCRIPTIONS.map(sub => ({
      ...sub,
      enabled: false,
      isCustom: false
    }));
  });

  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');

  useEffect(() => {
    localStorage.setItem('subs_data', JSON.stringify(subscriptions));
    localStorage.setItem('income_data', income);
    localStorage.setItem('currency_data', currency);
  }, [subscriptions, income, currency]);

  useEffect(() => {
    const savedIncome = localStorage.getItem('income_data');
    const savedCurrency = localStorage.getItem('currency_data');
    if (savedIncome) setIncome(Number(savedIncome));
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const stats = useMemo(() => {
    const totalMonthly = subscriptions
      .filter(s => s.enabled)
      .reduce((acc, curr) => acc + Number(curr.price), 0);

    const multiplier = viewMode === 'yearly' ? 12 : 1;
    const totalCost = totalMonthly * multiplier;
    const totalIncome = income * multiplier;
    const remaining = totalIncome - totalCost;
    const percentSpent = totalIncome > 0 ? ((totalCost / totalIncome) * 100).toFixed(1) : 0;

    return { totalCost, totalIncome, remaining, percentSpent };
  }, [subscriptions, income, viewMode]);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory || (sub.isCustom && selectedCategory === 'Other');
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggle = (id) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, enabled: !sub.enabled } : sub
    ));
  };

  const handlePriceChange = (id, newPrice) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, price: newPrice } : sub
    ));
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customName || !customPrice) return;
    
    const newSub = {
      id: Date.now().toString(),
      name: customName,
      price: Number(customPrice),
      color: 'bg-indigo-500',
      enabled: true,
      isCustom: true,
      category: 'Other'
    };

    setSubscriptions([...subscriptions, newSub]);
    setCustomName('');
    setCustomPrice('');
  };

  const handleDelete = (id) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setSubscriptions(DEFAULT_SUBSCRIPTIONS.map(s => ({ ...s, enabled: false, isCustom: false })));
      setIncome(0);
    }
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat(CURRENCIES[currency].locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="min-h-screen pb-20 transition-colors duration-300 font-sans">
      
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <CreditCard className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              SubTracker
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1 text-sm outline-none border-none cursor-pointer text-gray-700 dark:text-gray-300 font-medium"
            >
              {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-emerald-500">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 flex justify-between">
              Monthly Income
              <DollarSign size={16} />
            </div>
            <div className="flex items-end gap-2">
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="text-2xl font-bold bg-transparent outline-none w-full text-gray-900 dark:text-white placeholder-gray-300"
                placeholder="0"
              />
            </div>
          </Card>

          <Card className="border-l-4 border-red-500">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
              {viewMode === 'monthly' ? 'Monthly' : 'Yearly'} Expenses
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatMoney(stats.totalCost)}
            </div>
            <div className="text-xs text-red-500 mt-1 font-medium">
              {stats.percentSpent}% of income
            </div>
          </Card>

          <Card className={`border-l-4 ${stats.remaining >= 0 ? 'border-indigo-500' : 'border-orange-500'}`}>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
              Remaining
            </div>
            <div className={`text-2xl font-bold ${stats.remaining >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {formatMoney(stats.remaining)}
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-3 overflow-hidden">
              <div 
                className={`h-2.5 rounded-full transition-all duration-500 ${stats.percentSpent > 90 ? 'bg-red-600' : stats.percentSpent > 50 ? 'bg-orange-500' : 'bg-emerald-500'}`} 
                style={{ width: `${Math.min(stats.percentSpent, 100)}%` }}
              ></div>
            </div>
          </Card>
        </section>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Subscriptions
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative group w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                {['monthly', 'yearly'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      viewMode === mode 
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' 
                        : 'text-gray-500'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSubscriptions.map(sub => (
            <SubscriptionItem 
              key={sub.id} 
              sub={sub} 
              currency={currency}
              onToggle={handleToggle}
              onPriceChange={handlePriceChange}
              onDelete={handleDelete}
            />
          ))}
          
          {filteredSubscriptions.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-12 flex flex-col items-center text-gray-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p>No subscriptions found matching your filters.</p>
            </div>
          )}
        </div>

        <Card>
          <form onSubmit={handleAddCustom} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Service Name</label>
              <input 
                type="text" 
                placeholder="e.g. Gym Membership"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
              />
            </div>
            <div className="w-full md:w-32">
              <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Cost</label>
              <input 
                type="number" 
                placeholder="0.00"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
              />
            </div>
            <button 
              type="submit"
              disabled={!customName || !customPrice}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add
            </button>
          </form>
        </Card>

        <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-800">
           <button 
             onClick={handleReset}
             className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-2 mx-auto transition-colors"
           >
             <RotateCcw size={14} /> Reset Data
           </button>
        </div>

      </main>
    </div>
  );
}