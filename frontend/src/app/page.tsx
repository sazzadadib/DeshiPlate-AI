// src/app/page.tsx
'use client';
import React, { useState } from 'react';
import { Sparkles, TrendingUp, Shield, Zap, Camera, Brain, Heart, ArrowRight, Target, Activity, Apple, BarChart3, User, CheckCircle, ChefHat, Utensils, Award, Globe, Search } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const foodClasses = [
    { name: 'Biriyani', emoji: '🍛', category: 'Main Course' },
    { name: 'Cake', emoji: '🍰', category: 'Dessert' },
    { name: 'Cha', emoji: '☕', category: 'Beverage' },
    { name: 'Chicken Curry', emoji: '🍗', category: 'Main Course' },
    { name: 'Chicken Wings', emoji: '🍗', category: 'Appetizer' },
    { name: 'Chocolate Cake', emoji: '🍫', category: 'Dessert' },
    { name: 'Chow Mein', emoji: '🍜', category: 'Main Course' },
    { name: 'Crab Dish', emoji: '🦀', category: 'Seafood' },
    { name: 'Doi', emoji: '🥛', category: 'Dessert' },
    { name: 'Fish Bhuna', emoji: '🐟', category: 'Seafood' },
    { name: 'French Fries', emoji: '🍟', category: 'Snack' },
    { name: 'Fried Fish', emoji: '🐟', category: 'Seafood' },
    { name: 'Fried Rice', emoji: '🍚', category: 'Main Course' },
    { name: 'Khichuri', emoji: '🍲', category: 'Main Course' },
    { name: 'Misti', emoji: '🍬', category: 'Sweet' },
    { name: 'Momos', emoji: '🥟', category: 'Street Food' },
    { name: 'Meat Curry', emoji: '🍖', category: 'Main Course' },
    { name: 'Salad', emoji: '🥗', category: 'Healthy' },
    { name: 'Sandwich', emoji: '🥪', category: 'Snack' },
    { name: 'Shik Kabab', emoji: '🍡', category: 'Appetizer' },
    { name: 'Singgara', emoji: '🥟', category: 'Street Food' },
    { name: 'Bakorkhani', emoji: '🫓', category: 'Bread' },
    { name: 'Cheesecake', emoji: '🧀', category: 'Dessert' },
    { name: 'Cupcakes', emoji: '🧁', category: 'Dessert' },
    { name: 'Fuchka', emoji: '🥟', category: 'Street Food' },
    { name: 'Haleem', emoji: '🍲', category: 'Main Course' },
    { name: 'Ice Cream', emoji: '🍦', category: 'Dessert' },
    { name: 'Jilapi', emoji: '🥨', category: 'Sweet' },
    { name: 'Nehari', emoji: '🍖', category: 'Main Course' },
    { name: 'Pakora', emoji: '🥘', category: 'Street Food' },
    { name: 'Pizza', emoji: '🍕', category: 'Main Course' },
    { name: 'Poached Egg', emoji: '🥚', category: 'Breakfast' },
    { name: 'Porota', emoji: '🫓', category: 'Bread' }
  ];

  const categories = ['All', 'Main Course', 'Street Food', 'Dessert', 'Seafood', 'Sweet', 'Snack', 'Bread'];

  const filteredFoods = selectedCategory === 'All' 
    ? foodClasses 
    : foodClasses.filter(food => food.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <ChefHat className="w-4 h-4" />
              <span>Authentic Bangladeshi Cuisine Recognition</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                DeshiPlate AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Your intelligent companion for Bangladeshi food recognition and personalized nutrition. Upload any deshi dish photo and get instant AI-powered nutritional insights tailored to your health profile.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Analyze Your Food</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:shadow-lg transition-all border-2 border-gray-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform border-t-4 border-orange-500">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                89.76%
              </div>
              <p className="text-gray-600 font-medium text-sm">Model Accuracy</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform border-t-4 border-blue-500">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                33
              </div>
              <p className="text-gray-600 font-medium text-sm">Food Classes</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform border-t-4 border-purple-500">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                &lt;2s
              </div>
              <p className="text-gray-600 font-medium text-sm">Recognition Time</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform border-t-4 border-green-500">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-600 font-medium text-sm">Personalized</p>
            </div>
          </div>

          {/* Recognizable Foods Section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Utensils className="w-4 h-4" />
                <span>Trained on Authentic Bangladeshi Cuisine</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">33 Deshi Dishes We Recognize</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our AI model is specially trained to identify authentic Bangladeshi foods with high accuracy
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:shadow-md border-2 border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredFoods.map((food, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="text-4xl mb-3 text-center group-hover:scale-110 transition-transform">
                    {food.emoji}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 text-center mb-1">
                    {food.name}
                  </h3>
                  <p className="text-xs text-gray-500 text-center">
                    {food.category}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                <span className="font-semibold text-orange-600">{foodClasses.length}</span> authentic dishes and counting! More coming soon.
              </p>
            </div>
          </div>

          {/* Key Features Highlight */}
          <div className="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-12 mb-20 text-white shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">Complete Nutrition Intelligence</h2>
              <p className="text-xl text-orange-50 max-w-2xl mx-auto">
                From food recognition to personalized health tracking, DeshiPlate AI handles everything
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <Camera className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Food Detection</h3>
                <p className="text-orange-50">AI instantly recognizes 33 Bangladeshi dishes from photos with 89.76% accuracy</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <Target className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Personalized Health Goals</h3>
                <p className="text-orange-50">Get custom nutrition targets based on your BMI, age, and medical conditions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <BarChart3 className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Daily Progress Tracking</h3>
                <p className="text-orange-50">Monitor calories, protein, carbs, and fats to stay aligned with your health goals</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How DeshiPlate AI Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Four simple steps to start your personalized nutrition journey
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Create Profile</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Sign up with your health details, medical conditions, and fitness goals
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Upload Food Photo</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Take or upload a picture of your Bangladeshi dish
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Get AI Analysis</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Receive nutrition info and personalized recommendations
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  4
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Track Progress</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Monitor your daily intake and achieve your health goals
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need for intelligent nutrition management
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border-t-4 border-orange-500">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">High Accuracy Recognition</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our NextViT model achieves 89.76% accuracy on Bangladeshi food dataset, trained specifically for deshi cuisine.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border-t-4 border-blue-500">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Apple className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Medical Condition Aware</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get personalized food recommendations considering your specific health conditions and dietary restrictions.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border-t-4 border-purple-500">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Custom BMI Targets</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI calculates your ideal daily nutrition targets based on age, weight, height, and health profile.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border-t-4 border-green-500">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your daily macros in real-time. See progress toward goals and adjust your diet accordingly.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border-t-4 border-pink-500">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Recommendations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive detailed pros and cons for each food based on your health goals and medical conditions.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border-t-4 border-teal-500">
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Globe className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Deshi Focus</h3>
                <p className="text-gray-600 leading-relaxed">
                  Specialized for Bangladeshi cuisine with culturally relevant nutrition insights and recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your Nutrition Journey?
              </h2>
              <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
                Join DeshiPlate AI today and discover how our intelligent system helps you make better food choices every day
              </p>
              <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
                <Camera className="w-5 h-5" />
                <span>Start Analyzing Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}