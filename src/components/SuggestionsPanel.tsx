import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ArrowRight, Search, Filter, ChevronLeft, ChevronRight, DollarSign, TrendingUp, Target } from 'lucide-react';

interface Suggestion {
  keyword: string;
  score: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  searchVolume: number;
  trend: number;
  cpc: number;
  intent: 'Informational' | 'Transactional' | 'Navigational' | 'Commercial';
  competition: number;
}

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
}

const ITEMS_PER_PAGE = 10;

const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({ suggestions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'Easy' | 'Medium' | 'Hard' | 'All'>('All');
  const [intentFilter, setIntentFilter] = useState<'All' | 'Informational' | 'Transactional' | 'Navigational' | 'Commercial'>('All');

  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.keyword.toLowerCase().includes(filter.toLowerCase()) &&
    (difficultyFilter === 'All' || suggestion.difficulty === difficultyFilter) &&
    (intentFilter === 'All' || suggestion.intent === intentFilter)
  );

  const totalPages = Math.ceil(filteredSuggestions.length / ITEMS_PER_PAGE);
  const paginatedSuggestions = filteredSuggestions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Lightbulb className="text-yellow-500 w-6 h-6" />
          <h2 className="text-xl font-semibold text-gray-800">Keyword Suggestions</h2>
        </div>
        <span className="text-sm text-gray-500">
          {filteredSuggestions.length} suggestions
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter suggestions..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              className="pl-3 pr-8 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm bg-white"
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select
              value={intentFilter}
              onChange={(e) => setIntentFilter(e.target.value as any)}
              className="pl-3 pr-8 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm bg-white"
            >
              <option value="All">All Intents</option>
              <option value="Informational">Informational</option>
              <option value="Transactional">Transactional</option>
              <option value="Navigational">Navigational</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="wait">
          {paginatedSuggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.keyword}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer border border-transparent hover:border-gray-200"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">{suggestion.keyword}</h3>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{suggestion.score}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">${suggestion.cpc}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">
                    {(suggestion.searchVolume / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      suggestion.intent === 'Informational' ? 'bg-blue-100 text-blue-700' :
                      suggestion.intent === 'Transactional' ? 'bg-green-100 text-green-700' :
                      suggestion.intent === 'Navigational' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {suggestion.intent}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <span
                  className="text-sm px-2 py-1 rounded-full bg-opacity-10"
                  style={{
                    backgroundColor: suggestion.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.1)' : 
                                   suggestion.difficulty === 'Medium' ? 'rgba(234, 179, 8, 0.1)' : 
                                   'rgba(239, 68, 68, 0.1)',
                    color: suggestion.difficulty === 'Easy' ? 'rgb(34, 197, 94)' : 
                           suggestion.difficulty === 'Medium' ? 'rgb(234, 179, 8)' : 
                           'rgb(239, 68, 68)'
                  }}
                >
                  {suggestion.difficulty}
                </span>
                <span className="text-sm text-gray-500">
                  Competition: {suggestion.competition}%
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-lg text-sm ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SuggestionsPanel;