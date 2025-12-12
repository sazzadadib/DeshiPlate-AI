import React from 'react';
import { 
  UserPlus, Activity, Camera, Brain, CheckCircle, XCircle, 
  BarChart3, TrendingUp, Heart, Shield, Sparkles, ArrowRight,
  Scale, Ruler, Calendar, Stethoscope, Target, Apple, Clock,
  Award, Zap, Database
} from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Complete Guide</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            How <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Smart Dietitian</span> Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your complete guide to personalized nutrition tracking with AI
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Step 1: Sign Up */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <UserPlus className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold opacity-90">Step 1</div>
                    <h2 className="text-3xl font-bold">Create Your Profile</h2>
                  </div>
                </div>
                <p className="text-green-50 text-lg">
                  Tell us about yourself so we can personalize your nutrition journey
                </p>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What Information You Provide</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Basic Information</h4>
                        <ul className="text-gray-700 space-y-1 text-sm">
                          <li>• Full Name</li>
                          <li>• Email Address</li>
                          <li>• Secure Password</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Scale className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Body Metrics</h4>
                        <ul className="text-gray-700 space-y-1 text-sm">
                          <li>• Age</li>
                          <li>• Height</li>
                          <li>• Current Weight</li>
                          <li>• Gender</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Medical Conditions (Optional)</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Share any health conditions to receive more accurate recommendations
                      </p>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 italic">
                          Examples: Diabetes, High Blood Pressure, Heart Disease, Food Allergies, etc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-6 h-6 text-green-700" />
                    <h4 className="font-bold text-gray-900">Privacy First</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    All your personal and health information is encrypted and stored securely. We never share your data with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: AI Calculation */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Activity className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold opacity-90">Step 2</div>
                    <h2 className="text-3xl font-bold">AI Calculates Your Targets</h2>
                  </div>
                </div>
                <p className="text-blue-50 text-lg">
                  Our advanced LLM analyzes your profile and creates personalized nutrition goals
                </p>
              </div>
              
              <div className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Brain className="w-7 h-7 text-blue-600 mr-3" />
                    What Our AI Calculates
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Scale className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg">Body Mass Index (BMI)</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Calculated from your height and weight to understand your current body composition
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg">Daily Calories</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Total energy you need per day based on your age, gender, weight, and activity level
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Apple className="w-6 h-6 text-red-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg">Protein Goal</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Daily protein intake (in grams) to maintain or build muscle mass
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-orange-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg">Carbs & Fats</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Optimal carbohydrate and fat intake for balanced energy and health
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Database className="w-6 h-6 text-green-700" />
                    <h4 className="font-bold text-gray-900">Saved to Your Profile</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    All these calculations are securely stored in our database and used every time you analyze food to provide personalized recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Upload Food Photo */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold opacity-90">Step 3</div>
                    <h2 className="text-3xl font-bold">Upload Your Food Photo</h2>
                  </div>
                </div>
                <p className="text-purple-50 text-lg">
                  Simply take or upload a photo of your meal
                </p>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">How to Capture</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-purple-600 text-sm font-bold">1</span>
                        </div>
                        <span className="text-gray-700">Take a clear, well-lit photo of your food</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-purple-600 text-sm font-bold">2</span>
                        </div>
                        <span className="text-gray-700">Make sure the food is clearly visible</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-purple-600 text-sm font-bold">3</span>
                        </div>
                        <span className="text-gray-700">Upload directly from camera or gallery</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Award className="w-5 h-5 text-purple-600 mr-2" />
                      Recognition Capability
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Our AI model can identify:
                    </p>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-700">34+ Different Foods</p>
                      <p className="text-xs text-gray-600 mt-1">Including meals, snacks, fruits, vegetables, and more</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-6 h-6 text-blue-700" />
                    <h4 className="font-bold text-gray-900">Instant Classification</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Once uploaded, our classification model identifies the food and displays its complete nutritional content in under 2 seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: AI Analysis & Recommendation */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold opacity-90">Step 4</div>
                    <h2 className="text-3xl font-bold">Get Personalized Analysis</h2>
                  </div>
                </div>
                <p className="text-orange-50 text-lg">
                  Click "Analyze This Food" to receive AI-powered recommendations
                </p>
              </div>
              
              <div className="p-8">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-8 border-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What the AI Analyzes</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Target className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2">Nutrition vs. Your Goals</h4>
                          <p className="text-gray-700 text-sm">
                            Compares the food's calories, protein, carbs, and fats against your personalized daily targets
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Stethoscope className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2">Medical Conditions Check</h4>
                          <p className="text-gray-700 text-sm">
                            Evaluates if the food is suitable for your specific health conditions (e.g., diabetes, high blood pressure)
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2">Daily Progress Impact</h4>
                          <p className="text-gray-700 text-sm">
                            Shows how eating this food will affect your remaining daily nutrition targets
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">You'll Receive</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h4 className="font-bold text-gray-900">Suitability Verdict</h4>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Clear recommendation on whether this food is good for you
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Heart className="w-6 h-6 text-blue-600" />
                      <h4 className="font-bold text-gray-900">Pros & Cons</h4>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Detailed benefits and potential concerns about this food
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Make Decision */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-green-600 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold opacity-90">Step 5</div>
                    <h2 className="text-3xl font-bold">Make Your Decision</h2>
                  </div>
                </div>
                <p className="text-teal-50 text-lg">
                  Choose to eat or skip the food based on AI recommendations
                </p>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-300">
                    <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Eat This Food</h3>
                    <p className="text-gray-700 mb-4">
                      If you decide to eat, the food is automatically saved to your profile:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                        <span>Added to your daily food log</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                        <span>Nutrition counted toward daily goals</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold mt-0.5">✓</span>
                        <span>Progress updated in real-time</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-300">
                    <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                      <XCircle className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Don't Eat This Food</h3>
                    <p className="text-gray-700 mb-4">
                      If you decide not to eat, the food is simply discarded:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold mt-0.5">✗</span>
                        <span>Not saved to your profile</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold mt-0.5">✗</span>
                        <span>No impact on your daily targets</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold mt-0.5">✗</span>
                        <span>You can analyze something else</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <Heart className="w-6 h-6 text-purple-700" />
                    <h4 className="font-bold text-gray-900">You're Always In Control</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    The AI provides recommendations, but you make the final decision. You can eat foods even if not recommended, or skip foods that are suggested. It's your journey, we're just here to help!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6: Track Progress */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold opacity-90">Step 6</div>
                    <h2 className="text-3xl font-bold">Monitor Your Progress</h2>
                  </div>
                </div>
                <p className="text-indigo-50 text-lg">
                  Track all your meals and see how you're doing against your goals
                </p>
              </div>
              
              <div className="p-8">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-indigo-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Profile Dashboard Shows</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Apple className="w-5 h-5 text-green-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Foods Eaten Today</h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Complete list of all meals you've consumed with timestamps
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Calories Consumed</h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Total calories eaten vs. your daily target with progress bar
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-purple-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Macronutrients</h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Protein, carbs, and fats consumed vs. daily goals
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-orange-600" />
                        </div>
                        <h4 className="font-bold text-gray-900">Remaining Budget</h4>
                      </div>
                      <p className="text-gray-700 text-sm">
                        How much more you can eat to stay within your targets
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Clock className="w-6 h-6 text-green-700" />
                      <h4 className="font-bold text-gray-900">Real-Time Updates</h4>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Every time you eat something, your dashboard updates instantly to reflect your current progress
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar className="w-6 h-6 text-blue-700" />
                      <h4 className="font-bold text-gray-900">Daily Reset</h4>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Your targets reset each day, giving you a fresh start to meet your nutrition goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why This System Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Smart Dietitian combines multiple AI technologies to give you the most personalized nutrition experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-8 text-white shadow-xl">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Dual AI System</h3>
                <p className="text-green-50">
                  One AI calculates your personal targets, another identifies food and provides recommendations
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-white shadow-xl">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Health-Aware</h3>
                <p className="text-blue-50">
                  Recommendations consider your specific medical conditions, not just generic nutrition advice
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Complete Tracking</h3>
                <p className="text-purple-50">
                  Every food choice is tracked, giving you full visibility into your nutrition journey
                </p>
              </div>
            </div>
          </div>

          {/* Technology Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white shadow-2xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Zap className="w-4 h-4" />
                  <span>Powered by Advanced AI</span>
                </div>
                <h2 className="text-4xl font-bold mb-4">The Technology Behind Smart Dietitian</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  State-of-the-art machine learning models working together for your health
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">LLM for Personalization</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Large Language Model analyzes your profile data to calculate BMI and determine optimal daily nutrition targets
                  </p>
                  <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="text-sm text-green-300">
                      <span className="font-bold">Result:</span> Personalized calorie, protein, carbs, and fat goals stored in your profile
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Classification Model</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Computer Vision model trained on thousands of food images identifies meals and provides accurate nutritional information
                  </p>
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <p className="text-sm text-blue-300">
                      <span className="font-bold">Result:</span> 86.96% accuracy in food recognition across 34+ food categories
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Recommendation Engine</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    AI compares food nutrition against your goals and medical conditions to provide personalized eat/skip recommendations
                  </p>
                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                    <p className="text-sm text-purple-300">
                      <span className="font-bold">Result:</span> Smart advice with detailed pros and cons for every food choice
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Smart Database</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Secure storage system tracks all your profile data, daily targets, and food consumption history for comprehensive monitoring
                  </p>
                  <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                    <p className="text-sm text-orange-300">
                      <span className="font-bold">Result:</span> Real-time progress tracking and historical data analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about using Smart Dietitian
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Do I need to count calories manually?</h3>
                <p className="text-gray-600">
                  No! Our AI automatically calculates all nutrition information from food photos. Just upload, analyze, and decide whether to eat.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What if the AI doesn't recognize my food?</h3>
                <p className="text-gray-600">
                  Our model is trained on 34+ common foods and constantly improving. If your food isn't recognized, you can try a different angle or lighting, or manually log it.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Can I change my health goals later?</h3>
                <p className="text-gray-600">
                  Yes! You can update your profile information (weight, height, medical conditions) anytime, and the AI will recalculate your daily targets automatically.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Is my medical information private?</h3>
                <p className="text-gray-600">
                  Absolutely. All your personal and health data is encrypted and stored securely. We never share your information with third parties.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How accurate is the nutrition information?</h3>
                <p className="text-gray-600">
                  Our food classification model achieves 86.96% accuracy. Nutrition data is based on standard serving sizes from verified databases.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Can I track multiple meals per day?</h3>
                <p className="text-gray-600">
                  Yes! Upload and analyze as many meals as you want. Your dashboard tracks all food consumed throughout the day against your daily goals.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Sign up now and let AI guide you toward better nutrition choices every day
            </p>
            <Link href="/classifier" className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
              <span>Try Smart Dietitian Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-green-100 text-sm mt-4">
              No credit card required • Free forever • Get started in 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}