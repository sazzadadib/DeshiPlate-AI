// src/app/(routes)/food-analysis/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Loader2, ThumbsUp, ThumbsDown, TrendingUp, AlertTriangle,
  CheckCircle, XCircle, UtensilsCrossed, Activity, Info,
  Flame, Drumstick, Wheat, Droplet, PieChart, Target
} from 'lucide-react';

interface AnalysisData {
  foodName: string;
  nutritionalData: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  analysis: {
    recommendation: 'recommended' | 'moderate' | 'not_recommended';
    pros: string[];
    cons: string[];
    summary: string;
  };
  userProfile: {
    dailyCalories: number;
    dailyProtein: number;
    dailyCarbs: number;
    dailyFat: number;
  };
  currentConsumption?: {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    mealsCount: number;
  };
  afterConsumption?: {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
  };
}

function FoodAnalysisContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodName = searchParams.get('food');

  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (!foodName) {
      router.push('/classifier');
      return;
    }

    analyzeFood();
  }, [foodName, status]);

  const analyzeFood = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/food/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze food');
      }

      setAnalysisData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEat = async () => {
    if (!analysisData) return;

    try {
      setActionLoading(true);

      const response = await fetch('/api/food/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foodName: analysisData.foodName,
          calories: analysisData.nutritionalData.calories,
          protein: analysisData.nutritionalData.protein,
          carbs: analysisData.nutritionalData.carbs,
          fat: analysisData.nutritionalData.fat,
          recommendation: analysisData.analysis.recommendation,
          pros: analysisData.analysis.pros,
          cons: analysisData.analysis.cons,
          aiAnalysis: analysisData.analysis.summary,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to log food');
      }

      router.push('/profile?logged=true');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to log food');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDontEat = () => {
    router.push('/classifier');
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-orange-700 font-semibold text-base sm:text-lg">Analyzing your food...</p>
          <p className="text-orange-600 text-xs sm:text-sm mt-2">Getting personalized nutrition insights</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center border-t-4 border-red-500">
          <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Analysis Failed</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/classifier')}
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!analysisData) return null;

  const getRecommendationColor = () => {
    switch (analysisData.analysis.recommendation) {
      case 'recommended':
        return 'from-green-500 to-emerald-600';
      case 'moderate':
        return 'from-yellow-500 to-orange-500';
      case 'not_recommended':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getRecommendationIcon = () => {
    switch (analysisData.analysis.recommendation) {
      case 'recommended':
        return <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
      case 'moderate':
        return <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
      case 'not_recommended':
        return <XCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />;
    }
  };

  const getRecommendationText = () => {
    switch (analysisData.analysis.recommendation) {
      case 'recommended':
        return 'Recommended for You';
      case 'moderate':
        return 'Eat in Moderation';
      case 'not_recommended':
        return 'Not Recommended';
    }
  };

  const calculatePercentage = (value: number, target: number) => {
    return ((value / target) * 100).toFixed(1);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 80) return 'text-orange-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const currentConsumption = analysisData.currentConsumption;
  const afterConsumption = analysisData.afterConsumption;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-4 sm:py-6 md:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-5xl mx-auto mt-8 sm:mt-10 md:mt-12">
        {/* Header with Food Name */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-t-4 border-orange-500 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md">
              <UtensilsCrossed className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">{analysisData.foodName}</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">AI-Powered Nutritional Analysis by DeshiPlate</p>
            </div>
          </div>

          {/* Recommendation Badge */}
          <div className={`bg-gradient-to-r ${getRecommendationColor()} text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 shadow-lg`}>
            {getRecommendationIcon()}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium opacity-90">AI Recommendation</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold break-words">{getRecommendationText()}</p>
            </div>
          </div>
        </div>

        {/* Current Consumption Context */}
        {currentConsumption && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-t-4 border-blue-500 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 flex-shrink-0" />
              <span className="break-words">Today's Consumption So Far</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              You've consumed {currentConsumption.mealsCount} meal{currentConsumption.mealsCount !== 1 ? 's' : ''} today. 
              Here's your current progress:
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 border-orange-300 shadow-sm">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-orange-700 font-semibold">Calories</p>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900">{currentConsumption.totalCalories.toFixed(0)}</p>
                <p className={`text-xs sm:text-sm font-bold mt-1 sm:mt-2 ${getStatusColor(parseFloat(calculatePercentage(currentConsumption.totalCalories, analysisData.userProfile.dailyCalories)))}`}>
                  {calculatePercentage(currentConsumption.totalCalories, analysisData.userProfile.dailyCalories)}% of target
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 border-purple-300 shadow-sm">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Drumstick className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-purple-700 font-semibold">Protein</p>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-900">{currentConsumption.totalProtein.toFixed(0)}g</p>
                <p className={`text-xs sm:text-sm font-bold mt-1 sm:mt-2 ${getStatusColor(parseFloat(calculatePercentage(currentConsumption.totalProtein, analysisData.userProfile.dailyProtein)))}`}>
                  {calculatePercentage(currentConsumption.totalProtein, analysisData.userProfile.dailyProtein)}% of target
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 border-amber-300 shadow-sm">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Wheat className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-amber-700 font-semibold">Carbs</p>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900">{currentConsumption.totalCarbs.toFixed(0)}g</p>
                <p className={`text-xs sm:text-sm font-bold mt-1 sm:mt-2 ${getStatusColor(parseFloat(calculatePercentage(currentConsumption.totalCarbs, analysisData.userProfile.dailyCarbs)))}`}>
                  {calculatePercentage(currentConsumption.totalCarbs, analysisData.userProfile.dailyCarbs)}% of target
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 border-blue-300 shadow-sm">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Droplet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-blue-700 font-semibold">Fat</p>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">{currentConsumption.totalFat.toFixed(0)}g</p>
                <p className={`text-xs sm:text-sm font-bold mt-1 sm:mt-2 ${getStatusColor(parseFloat(calculatePercentage(currentConsumption.totalFat, analysisData.userProfile.dailyFat)))}`}>
                  {calculatePercentage(currentConsumption.totalFat, analysisData.userProfile.dailyFat)}% of target
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-blue-900 flex-1 min-w-0">
                <p className="font-bold mb-2">Remaining Daily Allowance:</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                  <span className="font-semibold break-words"><strong>Calories:</strong> {(analysisData.userProfile.dailyCalories - currentConsumption.totalCalories).toFixed(0)} kcal</span>
                  <span className="font-semibold break-words"><strong>Protein:</strong> {(analysisData.userProfile.dailyProtein - currentConsumption.totalProtein).toFixed(1)}g</span>
                  <span className="font-semibold break-words"><strong>Carbs:</strong> {(analysisData.userProfile.dailyCarbs - currentConsumption.totalCarbs).toFixed(1)}g</span>
                  <span className="font-semibold break-words"><strong>Fat:</strong> {(analysisData.userProfile.dailyFat - currentConsumption.totalFat).toFixed(1)}g</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* This Food's Nutritional Information */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-t-4 border-purple-500 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <PieChart className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 flex-shrink-0" />
            <span className="break-words">Nutritional Content of This Food</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 border-orange-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-orange-700 font-semibold">Calories</p>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900">{analysisData.nutritionalData.calories}</p>
              <p className="text-xs text-orange-600 mt-1 sm:mt-2 font-medium">
                {calculatePercentage(analysisData.nutritionalData.calories, analysisData.userProfile.dailyCalories)}% of daily goal
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Drumstick className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-purple-700 font-semibold">Protein</p>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-900">{analysisData.nutritionalData.protein}g</p>
              <p className="text-xs text-purple-600 mt-1 sm:mt-2 font-medium">
                {calculatePercentage(analysisData.nutritionalData.protein, analysisData.userProfile.dailyProtein)}% of daily goal
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 border-amber-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Wheat className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-amber-700 font-semibold">Carbs</p>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900">{analysisData.nutritionalData.carbs}g</p>
              <p className="text-xs text-amber-600 mt-1 sm:mt-2 font-medium">
                {calculatePercentage(analysisData.nutritionalData.carbs, analysisData.userProfile.dailyCarbs)}% of daily goal
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Droplet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-blue-700 font-semibold">Fat</p>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">{analysisData.nutritionalData.fat}g</p>
              <p className="text-xs text-blue-600 mt-1 sm:mt-2 font-medium">
                {calculatePercentage(analysisData.nutritionalData.fat, analysisData.userProfile.dailyFat)}% of daily goal
              </p>
            </div>
          </div>
        </div>

        {/* After Eating Projection */}
        {afterConsumption && currentConsumption && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-t-4 border-teal-500 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 flex-shrink-0" />
              <span className="break-words">Impact on Your Daily Totals</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">If you eat this, your daily consumption would be:</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {[
                { label: 'Calories', value: afterConsumption.totalCalories, target: analysisData.userProfile.dailyCalories, icon: Flame, color: 'orange' },
                { label: 'Protein', value: afterConsumption.totalProtein, target: analysisData.userProfile.dailyProtein, icon: Drumstick, color: 'purple' },
                { label: 'Carbs', value: afterConsumption.totalCarbs, target: analysisData.userProfile.dailyCarbs, icon: Wheat, color: 'amber' },
                { label: 'Fat', value: afterConsumption.totalFat, target: analysisData.userProfile.dailyFat, icon: Droplet, color: 'blue' }
              ].map((item, index) => {
                const percentage = parseFloat(calculatePercentage(item.value, item.target));
                const isOver = item.value > item.target;
                const isWarning = item.value > item.target * 0.8;
                const Icon = item.icon;
                
                return (
                  <div key={index} className={`p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 shadow-sm ${
                    isOver ? 'bg-red-50 border-red-300' : 
                    isWarning ? 'bg-orange-50 border-orange-300' : 
                    'bg-green-50 border-green-300'
                  }`}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${item.color}-600 flex-shrink-0`} />
                      <p className="text-xs sm:text-sm font-semibold text-gray-700">{item.label}</p>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{item.value.toFixed(0)}{item.label !== 'Calories' ? 'g' : ''}</p>
                    <p className={`text-xs sm:text-sm font-bold mt-1 sm:mt-2 ${getStatusColor(percentage)}`}>
                      {percentage}% of target
                    </p>
                    {isOver && (
                      <p className="text-xs text-red-700 font-bold mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0" /> OVER LIMIT
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Analysis */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-t-4 border-green-500 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 flex-shrink-0" />
            <span className="break-words">Personalized AI Analysis</span>
          </h2>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-green-200 mb-4 sm:mb-6 shadow-sm">
            <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed break-words">{analysisData.analysis.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-green-200">
              <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-3 sm:mb-4 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Health Benefits</span>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {analysisData.analysis.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <span className="text-xs sm:text-sm leading-relaxed break-words">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concerns */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-red-200">
              <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-3 sm:mb-4 flex items-center gap-2">
                <ThumbsDown className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Health Concerns</span>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {analysisData.analysis.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <span className="text-xs sm:text-sm leading-relaxed break-words">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-0">
          <button
            onClick={handleEat}
            disabled={actionLoading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3"
          >
            {actionLoading ? (
              <>
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin flex-shrink-0" />
                <span>Logging Food...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Yes, I'll Eat This</span>
              </>
            )}
          </button>
          <button
            onClick={handleDontEat}
            disabled={actionLoading}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3"
          >
            <XCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <span>No, I Won't Eat This</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FoodAnalysisPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-orange-700 font-semibold text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    }>
      <FoodAnalysisContent />
    </Suspense>
  );
}