import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Users, Search, BarChart2, DollarSign, Calendar, Clock, Target } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface KeywordMetrics {
  strength: number;
  traffic: number;
  trend: 'up' | 'down';
  competition: number;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  dailySearches: number;
  monthlySearches: number;
  yearlySearches: number;
  seasonality: {
    trend: number[];
    months: string[];
  };
  clickMetrics: {
    organicClicks: number;
    paidClicks: number;
    clickThroughRate: number;
  };
  serp: {
    organicResults: number;
    paidResults: number;
    featuredSnippets: boolean;
  };
}

const KeywordAnalytics: React.FC<{ 
  keyword: string; 
  metrics: KeywordMetrics;
}> = ({ keyword, metrics }) => {
  const chartData = {
    labels: metrics.seasonality.months,
    datasets: [
      {
        label: 'Search Volume Trend',
        data: metrics.seasonality.trend,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">{keyword}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Keyword Power Score: {metrics.strength.toFixed(1)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {metrics.trend === 'up' ? (
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Trending Up</span>
            </div>
          ) : (
            <div className="flex items-center text-red-500">
              <TrendingDown className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Trending Down</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="text-green-500 w-5 h-5" />
            <h4 className="text-sm font-medium text-gray-600">CPC</h4>
          </div>
          <p className="text-2xl font-semibold text-gray-800">${metrics.cpc}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="text-purple-500 w-5 h-5" />
            <h4 className="text-sm font-medium text-gray-600">Monthly Searches</h4>
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {(metrics.monthlySearches / 1000).toFixed(1)}K
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="text-orange-500 w-5 h-5" />
            <h4 className="text-sm font-medium text-gray-600">Competition</h4>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{metrics.competition}%</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="text-blue-500 w-5 h-5" />
            <h4 className="text-sm font-medium text-gray-600">CTR</h4>
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {metrics.clickMetrics.clickThroughRate}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Search Frequency</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Daily Searches</span>
              </div>
              <span className="font-medium">{metrics.dailySearches.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-600">Monthly Searches</span>
              </div>
              <span className="font-medium">{metrics.monthlySearches.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Yearly Searches</span>
              </div>
              <span className="font-medium">{metrics.yearlySearches.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Click Distribution</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Organic Clicks</span>
              <span className="font-medium">{metrics.clickMetrics.organicClicks.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Paid Clicks</span>
              <span className="font-medium">{metrics.clickMetrics.paidClicks.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Featured Snippet</span>
              <span className="font-medium">{metrics.serp.featuredSnippets ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Search Volume Trend</h4>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-600">Keyword Power</span>
            <span className="text-sm text-gray-500">{metrics.strength}%</span>
          </div>
          <motion.div 
            className="w-full bg-gray-200 rounded-full h-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          >
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${metrics.strength}%` }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-600">Difficulty</span>
            <span className="text-sm text-gray-500">{metrics.difficulty.toFixed(1)}%</span>
          </div>
          <motion.div 
            className="w-full bg-gray-200 rounded-full h-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          >
            <motion.div
              className="bg-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${metrics.difficulty}%` }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default KeywordAnalytics;