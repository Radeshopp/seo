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

interface KeywordSuggestion {
  keyword: string;
  score: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  searchVolume: number;
  trend: number;
  cpc: number;
  intent: 'Informational' | 'Transactional' | 'Navigational' | 'Commercial';
  competition: number;
}

export const analyzeKeyword = async (keyword: string): Promise<KeywordMetrics> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const keywordLength = keyword.length;
  const wordCount = keyword.split(' ').length;
  
  const strength = Math.min(100, Math.max(60, 
    85 + (wordCount * 2) - (keywordLength * 0.5)
  ));
  
  const monthlySearches = Math.floor(
    (strength * 1000) * (1 + Math.random() * 0.3)
  );

  const competition = Math.min(100, Math.max(20,
    70 + (wordCount * 5) - (keywordLength * 2)
  ));

  const cpc = parseFloat((0.5 + Math.random() * 4.5).toFixed(2));
  const dailySearches = Math.floor(monthlySearches / 30);
  const yearlySearches = monthlySearches * 12;

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const seasonalityTrend = months.map(() => 
    Math.floor(80 + Math.random() * 40)
  );

  return {
    strength,
    traffic: monthlySearches,
    trend: Math.random() > 0.3 ? 'up' : 'down',
    competition,
    searchVolume: yearlySearches,
    difficulty: competition * 0.8,
    cpc,
    dailySearches,
    monthlySearches,
    yearlySearches,
    seasonality: {
      trend: seasonalityTrend,
      months
    },
    clickMetrics: {
      organicClicks: Math.floor(monthlySearches * 0.7),
      paidClicks: Math.floor(monthlySearches * 0.3),
      clickThroughRate: parseFloat((45 + Math.random() * 25).toFixed(1))
    },
    serp: {
      organicResults: Math.floor(8 + Math.random() * 4),
      paidResults: Math.floor(2 + Math.random() * 4),
      featuredSnippets: Math.random() > 0.5
    }
  };
};

const searchIntents = ['Informational', 'Transactional', 'Navigational', 'Commercial'] as const;

export const generateSuggestions = async (keyword: string): Promise<KeywordSuggestion[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  const baseWords = keyword.toLowerCase().split(' ');
  const modifiers = [
    'best', 'top', 'guide', 'tutorial', 'tips',
    'strategies', 'examples', 'tools', 'software',
    'services', 'platform', 'solution', 'review',
    'comparison', 'alternative', 'vs', 'how to',
    'benefits', 'features', 'pricing', 'cost'
  ];

  const suggestions: KeywordSuggestion[] = [];
  
  for (const modifier of modifiers) {
    if (baseWords.includes(modifier)) continue;

    const newKeyword = Math.random() > 0.5 
      ? `${modifier} ${keyword}`
      : `${keyword} ${modifier}`;

    const score = Math.floor(70 + Math.random() * 30);
    const searchVolume = Math.floor(1000 + Math.random() * 9000);
    const trend = 0.8 + Math.random() * 0.4;
    const cpc = parseFloat((0.5 + Math.random() * 4.5).toFixed(2));
    const competition = Math.floor(40 + Math.random() * 60);

    let difficulty: 'Easy' | 'Medium' | 'Hard';
    if (score > 85) difficulty = 'Hard';
    else if (score > 75) difficulty = 'Medium';
    else difficulty = 'Easy';

    const intent = searchIntents[Math.floor(Math.random() * searchIntents.length)];

    suggestions.push({
      keyword: newKeyword,
      score,
      difficulty,
      searchVolume,
      trend,
      cpc,
      intent,
      competition
    });
  }

  return suggestions.sort((a, b) => b.score - a.score);
};