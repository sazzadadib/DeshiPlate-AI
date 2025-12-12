// src/app/(routes)/profile/page.tsx
'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  User, Activity, TrendingUp, Calendar, Flame, Drumstick, Wheat, Droplet,
  Clock, CheckCircle, AlertCircle, Loader2, AlertTriangle, Trophy, Target,
  Info, ChefHat, Heart, PieChart, Utensils
} from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  bmi: number;
  medicalCondition: string | null;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
}

interface DailyNutrition {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  mealsCount: number;
}

interface FoodLog {
  id: number;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  recommendation: string;
  consumedAt: string;
}

function ProfileClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get('logged') === 'true';

  const [userData, setUserData] = useState<UserData | null>(null);
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    mealsCount: 0,
  });
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (session?.user?.email) {
      fetchUserData();
      fetchDailyNutrition();
    }
  }, [status, session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      if (response.ok) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchDailyNutrition = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/food/log');
      const data = await response.json();
      
      if (response.ok) {
        setDailyNutrition(data.dailyNutrition);
        setFoodLogs(data.foodLogs);
      }
    } catch (error) {
      console.error('Error fetching daily nutrition:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-orange-700 font-semibold text-lg">Loading your profile...</p>
          <p className="text-orange-600 text-sm mt-2">Getting your nutrition data</p>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculatePercentage = (current: number, target: number) => {
    return ((current / target) * 100).toFixed(1);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'from-green-500 to-emerald-600';
    if (percentage < 80) return 'from-yellow-500 to-orange-500';
    if (percentage < 100) return 'from-orange-500 to-red-500';
    return 'from-red-600 to-pink-600';
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 80) return 'text-orange-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-600', bgColor: 'from-blue-50 to-blue-100', borderColor: 'border-blue-300' };
    if (bmi < 25) return { text: 'Normal Weight', color: 'text-green-600', bgColor: 'from-green-50 to-emerald-100', borderColor: 'border-green-300' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-orange-600', bgColor: 'from-orange-50 to-amber-100', borderColor: 'border-orange-300' };
    return { text: 'Obese', color: 'text-red-600', bgColor: 'from-red-50 to-pink-100', borderColor: 'border-red-300' };
  };

  const bmiCategory = getBMICategory(userData.bmi);

  const hasExceeded = 
    dailyNutrition.totalCalories > userData.dailyCalories ||
    dailyNutrition.totalProtein > userData.dailyProtein ||
    dailyNutrition.totalCarbs > userData.dailyCarbs ||
    dailyNutrition.totalFat > userData.dailyFat;

  const hasWarning = 
    (dailyNutrition.totalCalories > userData.dailyCalories * 0.8 && dailyNutrition.totalCalories <= userData.dailyCalories) ||
    (dailyNutrition.totalProtein > userData.dailyProtein * 0.8 && dailyNutrition.totalProtein <= userData.dailyProtein) ||
    (dailyNutrition.totalCarbs > userData.dailyCarbs * 0.8 && dailyNutrition.totalCarbs <= userData.dailyCarbs) ||
    (dailyNutrition.totalFat > userData.dailyFat * 0.8 && dailyNutrition.totalFat <= userData.dailyFat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-7xl mx-auto mt-12">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-lg animate-pulse">
            <div className="bg-green-500 text-white p-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-green-800 text-lg">Food Logged Successfully!</p>
              <p className="text-green-700 text-sm">Your daily nutrition has been updated.</p>
            </div>
          </div>
        )}

        {/* Alert Messages */}
        {hasExceeded && (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl px-6 py-5 flex items-start gap-4 shadow-lg">
            <div className="bg-red-500 text-white p-2 rounded-full flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-red-800 text-xl mb-1">⚠️ Daily Limit Exceeded!</p>
              <p className="text-red-700">You've exceeded your daily limit for one or more nutrients. Consider lighter meals for the rest of the day.</p>
            </div>
          </div>
        )}

        {!hasExceeded && hasWarning && (
          <div className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl px-6 py-5 flex items-start gap-4 shadow-lg">
            <div className="bg-orange-500 text-white p-2 rounded-full flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-orange-800 text-xl mb-1">⚠️ Approaching Daily Limit</p>
              <p className="text-orange-700">You're getting close to your daily limits. Be mindful of your next meals.</p>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl border-t-4 border-orange-500 p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{userData.name}</h1>
              <p className="text-gray-600 text-lg mb-3">{userData.email}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-2 rounded-full font-semibold text-sm border border-orange-200 shadow-sm">
                  {userData.age} years old
                </span>
                <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm border border-blue-200 shadow-sm">
                  {userData.gender}
                </span>
                <span className={`bg-gradient-to-r ${bmiCategory.bgColor} ${bmiCategory.color} px-4 py-2 rounded-full font-semibold text-sm border-2 ${bmiCategory.borderColor} shadow-sm`}>
                  BMI: {userData.bmi.toFixed(1)} - {bmiCategory.text}
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 px-6 py-5 rounded-2xl border-2 border-orange-300 shadow-md text-center">
              <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-orange-700 font-semibold mb-1">Today's Meals</p>
              <p className="text-3xl font-bold text-orange-900">{dailyNutrition.mealsCount}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Physical Stats */}
          <div className="bg-white rounded-3xl shadow-xl border-t-4 border-purple-500 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-600" />
              Physical Stats
            </h2>
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200 flex justify-between items-center shadow-sm">
                <span className="text-gray-700 font-semibold">Height</span>
                <span className="font-bold text-gray-900 text-lg">{userData.height} cm</span>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-xl border-2 border-blue-200 flex justify-between items-center shadow-sm">
                <span className="text-gray-700 font-semibold">Weight</span>
                <span className="font-bold text-gray-900 text-lg">{userData.weight} kg</span>
              </div>
              <div className={`bg-gradient-to-br ${bmiCategory.bgColor} p-4 rounded-xl border-2 ${bmiCategory.borderColor} flex justify-between items-center shadow-sm`}>
                <span className="text-gray-700 font-semibold">BMI Status</span>
                <span className={`font-bold text-lg ${bmiCategory.color}`}>
                  {bmiCategory.text}
                </span>
              </div>
            </div>
          </div>

          {/* Daily Goals */}
          <div className="bg-white rounded-3xl shadow-xl border-t-4 border-green-500 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-600" />
              Daily Goals
            </h2>
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700 font-semibold">Calories</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">{userData.dailyCalories}</span>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                  <Drumstick className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700 font-semibold">Protein</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">{userData.dailyProtein}g</span>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-4 rounded-xl border-2 border-amber-200 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                  <Wheat className="w-5 h-5 text-amber-600" />
                  <span className="text-gray-700 font-semibold">Carbs</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">{userData.dailyCarbs}g</span>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-xl border-2 border-blue-200 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-semibold">Fat</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">{userData.dailyFat}g</span>
              </div>
            </div>
          </div>

          {/* Medical Info */}
          <div className="bg-white rounded-3xl shadow-xl border-t-4 border-pink-500 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-600" />
              Medical Info
            </h2>
            <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-2xl border-2 border-pink-200 min-h-[180px] flex items-center justify-center shadow-sm">
              {userData.medicalCondition ? (
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                  <p className="text-gray-800 font-semibold text-lg">{userData.medicalCondition}</p>
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No medical conditions reported</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="bg-white rounded-3xl shadow-xl border-t-4 border-blue-500 p-8 mb-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <PieChart className="w-8 h-8 text-blue-600" />
              Today's Nutrition Progress
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Calories */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-300 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 text-white p-3 rounded-xl shadow-md">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-orange-700 font-semibold">Calories</p>
                  <p className="text-xs text-orange-600">Daily Target</p>
                </div>
              </div>
              <p className="text-4xl font-bold text-orange-900 mb-2">
                {dailyNutrition.totalCalories.toFixed(0)}
              </p>
              <p className="text-sm text-gray-700 mb-4">of {userData.dailyCalories} kcal</p>
              
              <div className="bg-white/50 h-4 rounded-full overflow-hidden mb-3 shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${getProgressColor(
                    parseFloat(calculatePercentage(dailyNutrition.totalCalories, userData.dailyCalories))
                  )}`}
                  style={{
                    width: `${Math.min(calculateProgress(dailyNutrition.totalCalories, userData.dailyCalories), 100)}%`,
                  }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`font-bold text-lg ${getStatusColor(parseFloat(calculatePercentage(dailyNutrition.totalCalories, userData.dailyCalories)))}`}>
                  {calculatePercentage(dailyNutrition.totalCalories, userData.dailyCalories)}%
                </span>
                <span className="text-gray-700 font-semibold text-sm">
                  {(userData.dailyCalories - dailyNutrition.totalCalories).toFixed(0)} left
                </span>
              </div>
            </div>

            {/* Protein */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500 text-white p-3 rounded-xl shadow-md">
                  <Drumstick className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-purple-700 font-semibold">Protein</p>
                  <p className="text-xs text-purple-600">Daily Target</p>
                </div>
              </div>
              <p className="text-4xl font-bold text-purple-900 mb-2">
                {dailyNutrition.totalProtein.toFixed(0)}g
              </p>
              <p className="text-sm text-gray-700 mb-4">of {userData.dailyProtein}g</p>
              
              <div className="bg-white/50 h-4 rounded-full overflow-hidden mb-3 shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${getProgressColor(
                    parseFloat(calculatePercentage(dailyNutrition.totalProtein, userData.dailyProtein))
                  )}`}
                  style={{
                    width: `${Math.min(calculateProgress(dailyNutrition.totalProtein, userData.dailyProtein), 100)}%`,
                  }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`font-bold text-lg ${getStatusColor(parseFloat(calculatePercentage(dailyNutrition.totalProtein, userData.dailyProtein)))}`}>
                  {calculatePercentage(dailyNutrition.totalProtein, userData.dailyProtein)}%
                </span>
                <span className="text-gray-700 font-semibold text-sm">
                  {(userData.dailyProtein - dailyNutrition.totalProtein).toFixed(1)}g left
                </span>
              </div>
            </div>

            {/* Carbs */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-6 rounded-2xl border-2 border-amber-300 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-500 text-white p-3 rounded-xl shadow-md">
                  <Wheat className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-semibold">Carbs</p>
                  <p className="text-xs text-amber-600">Daily Target</p>
                </div>
              </div>
              <p className="text-4xl font-bold text-amber-900 mb-2">
                {dailyNutrition.totalCarbs.toFixed(0)}g
              </p>
              <p className="text-sm text-gray-700 mb-4">of {userData.dailyCarbs}g</p>
              
              <div className="bg-white/50 h-4 rounded-full overflow-hidden mb-3 shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${getProgressColor(
                    parseFloat(calculatePercentage(dailyNutrition.totalCarbs, userData.dailyCarbs))
                  )}`}
                  style={{
                    width: `${Math.min(calculateProgress(dailyNutrition.totalCarbs, userData.dailyCarbs), 100)}%`,
                  }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`font-bold text-lg ${getStatusColor(parseFloat(calculatePercentage(dailyNutrition.totalCarbs, userData.dailyCarbs)))}`}>
                  {calculatePercentage(dailyNutrition.totalCarbs, userData.dailyCarbs)}%
                </span>
                <span className="text-gray-700 font-semibold text-sm">
                  {(userData.dailyCarbs - dailyNutrition.totalCarbs).toFixed(1)}g left
                </span>
              </div>
            </div>

            {/* Fat */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border-2 border-blue-300 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 text-white p-3 rounded-xl shadow-md">
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-semibold">Fat</p>
                  <p className="text-xs text-blue-600">Daily Target</p>
                </div>
              </div>
              <p className="text-4xl font-bold text-blue-900 mb-2">
                {dailyNutrition.totalFat.toFixed(0)}g
              </p>
              <p className="text-sm text-gray-700 mb-4">of {userData.dailyFat}g</p>
              
              <div className="bg-white/50 h-4 rounded-full overflow-hidden mb-3 shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${getProgressColor(
                    parseFloat(calculatePercentage(dailyNutrition.totalFat, userData.dailyFat))
                  )}`}
                  style={{
                    width: `${Math.min(calculateProgress(dailyNutrition.totalFat, userData.dailyFat), 100)}%`,
                  }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`font-bold text-lg ${getStatusColor(parseFloat(calculatePercentage(dailyNutrition.totalFat, userData.dailyFat)))}`}>
                  {calculatePercentage(dailyNutrition.totalFat, userData.dailyFat)}%
                </span>
                <span className="text-gray-700 font-semibold text-sm">
                  {(userData.dailyFat - dailyNutrition.totalFat).toFixed(1)}g left
                </span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border-2 border-blue-200 flex items-start gap-3 shadow-sm">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-bold mb-2 text-base">Understanding Your Progress:</p>
              <div className="grid md:grid-cols-2 gap-2 text-blue-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span><strong>Green (0-50%):</strong> Excellent progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span><strong>Yellow (50-80%):</strong> Good progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span><strong>Orange (80-100%):</strong> Approaching limit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span><strong>Red (100%+):</strong> Limit exceeded</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Meals */}
        <div className="bg-white rounded-3xl shadow-xl border-t-4 border-teal-500 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-teal-600" />
            Today's Meals History
          </h2>

          {foodLogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Drumstick className="w-12 h-12 text-orange-600" />
              </div>
              <p className="text-gray-600 font-semibold text-xl mb-3">No meals logged today</p>
              <p className="text-gray-500 mb-6">Start tracking your nutrition by logging your first meal</p>
              <button
                onClick={() => router.push('/classifier')}
                className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 mx-auto"
              >
                <ChefHat className="w-6 h-6" />
                Log Your First Meal
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {foodLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-3 rounded-xl shadow-md">
                        <Utensils className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{log.foodName}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Clock className="w-4 h-4" />
                          {new Date(log.consumedAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm ${
                        log.recommendation === 'recommended'
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300'
                          : log.recommendation === 'moderate'
                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-2 border-orange-300'
                          : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-2 border-red-300'
                      }`}
                    >
                      {log.recommendation === 'recommended' ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Recommended
                        </>
                      ) : log.recommendation === 'moderate' ? (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          Moderate
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4" />
                          Not Recommended
                        </>
                      )}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border-2 border-orange-200 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Flame className="w-5 h-5 text-orange-600" />
                        <p className="text-xs text-gray-600 font-semibold">Calories</p>
                      </div>
                      <p className="font-bold text-gray-900 text-2xl">{log.calories}</p>
                      <p className="text-xs text-orange-600 font-medium mt-1">kcal</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border-2 border-purple-200 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Drumstick className="w-5 h-5 text-purple-600" />
                        <p className="text-xs text-gray-600 font-semibold">Protein</p>
                      </div>
                      <p className="font-bold text-gray-900 text-2xl">{log.protein}g</p>
                      <p className="text-xs text-purple-600 font-medium mt-1">grams</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border-2 border-amber-200 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Wheat className="w-5 h-5 text-amber-600" />
                        <p className="text-xs text-gray-600 font-semibold">Carbs</p>
                      </div>
                      <p className="font-bold text-gray-900 text-2xl">{log.carbs}g</p>
                      <p className="text-xs text-amber-600 font-medium mt-1">grams</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border-2 border-blue-200 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Droplet className="w-5 h-5 text-blue-600" />
                        <p className="text-xs text-gray-600 font-semibold">Fat</p>
                      </div>
                      <p className="font-bold text-gray-900 text-2xl">{log.fat}g</p>
                      <p className="text-xs text-blue-600 font-medium mt-1">grams</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        {foodLogs.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/classifier')}
              className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3"
            >
              <ChefHat className="w-6 h-6" />
              Log Another Meal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
            <p className="text-orange-700 font-semibold text-lg">Loading your profile...</p>
            <p className="text-orange-600 text-sm mt-2">Getting your nutrition data</p>
          </div>
        </div>
      }
    >
      <ProfileClient />
    </Suspense>
  );
}