import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

interface SearchPanelProps {
  onSearch: (keyword: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim() && !isSearching) {
      setIsSearching(true);
      await onSearch(keyword.trim());
      setIsSearching(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isSearching ? 'text-blue-500 animate-pulse' : 'text-gray-400'
          } w-5 h-5`} />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword to analyze..."
            disabled={isSearching}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>
        
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSearching || !keyword.trim()}
            className={`flex-1 ${
              isSearching ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
            } text-white py-3 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed`}
          >
            {isSearching ? 'Analyzing...' : 'Analyze Keyword'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            disabled={isSearching}
            className="flex items-center justify-center px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5 text-blue-500" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchPanel;