// src/components/shared/SearchBar.jsx
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="max-w-2xl mx-auto mb-8 md:mb-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
        <div className="relative bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
          <div className="absolute inset-y-0 left-0 pl-4 md:pl-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 md:h-6 md:w-6 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Cari resep..."}
            className="block w-full pl-12 md:pl-16 pr-4 md:pr-6 py-3 md:py-4 text-sm md:text-base text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
