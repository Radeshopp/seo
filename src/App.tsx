import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, BarChart, Settings } from 'lucide-react';
import SearchPanel from './components/SearchPanel';
import KeywordAnalytics from './components/KeywordAnalytics';
import SuggestionsPanel from './components/SuggestionsPanel';
import { analyzeKeyword, generateSuggestions } from './utils/keywordAnalyzer';

function App() {
  const [searchResults, setSearchResults] = useState<{
    keyword: string;
    metrics: any;
    suggestions: any[];
  } | null>(null);

  const handleSearch = async (keyword: string) => {
    const metrics = await analyzeKeyword(keyword);
    const suggestions = await generateSuggestions(keyword);
    setSearchResults({ keyword, metrics, suggestions });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <SearchIcon className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-800">SEO Analytics</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <BarChart className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <SearchPanel onSearch={handleSearch} />
            {searchResults && (
              <KeywordAnalytics 
                keyword={searchResults.keyword} 
                metrics={searchResults.metrics} 
              />
            )}
          </div>
          <div className="lg:col-span-1">
            {searchResults && (
              <SuggestionsPanel suggestions={searchResults.suggestions} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;