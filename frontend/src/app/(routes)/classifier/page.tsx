// src/app/(routes)/classifier/page.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, AlertCircle, ChefHat, Sparkles, Camera, Award, Zap } from 'lucide-react';

interface PredictionResult {
  label: string;
  confidence: number;
}

export default function FoodClassifier() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topK, setTopK] = useState(5);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-orange-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setPredictions([]);
      setError(null);
    }
  }, []);

  const classifyImage = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setPredictions([]);

    try {
      const { Client } = await import('@gradio/client');
      
      const client = await Client.connect('blackhacker/bangla-diet');
      const result = await client.predict('/predict_image', {
        image: selectedFile,
        top_k: topK,
      });

      const data = result.data;
      
      if (data && Array.isArray(data) && data.length > 0) {
        const responseObj = data[0];
        
        if (responseObj.confidences && Array.isArray(responseObj.confidences)) {
          let parsedPredictions: PredictionResult[] = responseObj.confidences.map((item: any) => ({
            label: item.label,
            confidence: item.confidence
          }));

          parsedPredictions = parsedPredictions.slice(0, topK);
          setPredictions(parsedPredictions);
        } else {
          setError('Unexpected response format from model.');
        }
      } else {
        setError('No predictions returned from model.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to classify image');
      console.error('Classification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeFood = (foodName: string) => {
    router.push(`/food-analysis?food=${encodeURIComponent(foodName)}`);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setPredictions([]);
      setError(null);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">  
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 mt-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ChefHat className="w-4 h-4" />
            <span>AI-Powered Food Recognition</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Analyze Your <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Deshi Food</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a photo of your Bangladeshi dish and let our AI identify it with 89.76% accuracy
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border-t-4 border-orange-500 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Camera className="w-6 h-6" />
                  Upload Food Image
                </h2>
                <p className="text-orange-50 mt-1">Drop your image or click to browse</p>
              </div>

              <div className="p-6">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="relative border-3 border-dashed border-orange-300 rounded-2xl p-8 hover:border-orange-500 transition-all bg-gradient-to-br from-orange-50 to-amber-50"
                >
                  {selectedImage ? (
                    <div className="relative group">
                      <img
                        src={selectedImage}
                        alt="Selected food"
                        className="w-full h-80 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <label className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold cursor-pointer hover:bg-gray-100 transition-colors shadow-lg">
                          Change Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-gradient-to-br from-orange-100 to-amber-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Upload className="w-12 h-12 text-orange-600" />
                      </div>
                      <p className="text-gray-700 font-semibold mb-2">
                        Drop your deshi food image here
                      </p>
                      <p className="text-gray-500 text-sm mb-4">or</p>
                      <label className="inline-block bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
                        Browse Files
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                      </label>
                      <p className="text-gray-400 text-xs mt-3">
                        Supports: JPG, PNG, WEBP
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-xl border-2 border-amber-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Number of Predictions: <span className="text-orange-600 text-lg">{topK}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={topK}
                    onChange={(e) => setTopK(Number(e.target.value))}
                    className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                    <span>1 result</span>
                    <span>10 results</span>
                  </div>
                </div>

                <button
                  onClick={classifyImage}
                  disabled={!selectedFile || loading}
                  className="w-full mt-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Analyzing Your Food...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Classify Food
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">High Accuracy Model</h3>
                  <p className="text-sm text-blue-800">
                    Our model is trained on authentic Bangladeshi cuisine with 89.76% accuracy across 33 food classes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border-t-4 border-purple-500 overflow-hidden min-h-[500px]">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  Recognition Results
                </h2>
                <p className="text-purple-50 mt-1">AI-powered food identification</p>
              </div>

              <div className="p-6">
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">Error</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-orange-200 rounded-full"></div>
                      <div className="w-20 h-20 border-4 border-orange-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium">Analyzing your deshi food...</p>
                    <p className="text-sm text-gray-500 mt-2">This will take just a moment</p>
                  </div>
                )}

                {!loading && !error && predictions.length === 0 && (
                  <div className="text-center py-16">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <ChefHat className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium mb-2">
                      Upload an image to see predictions
                    </p>
                    <p className="text-sm text-gray-400">
                      Our AI will identify your Bangladeshi dish
                    </p>
                  </div>
                )}

                {predictions.length > 0 && (
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                      <p className="text-sm text-green-800 font-semibold">
                        ✓ Analysis Complete! Found {predictions.length} matching dishes
                      </p>
                    </div>
                    {predictions.map((pred, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-200 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                              {index + 1}
                            </div>
                            <span className="font-bold text-gray-900 text-xl">
                              {pred.label}
                            </span>
                          </div>
                          <span className="text-orange-600 font-bold text-xl">
                            {(pred.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${pred.confidence * 100}%` }}
                          ></div>
                        </div>
                        <button
                          onClick={() => handleAnalyzeFood(pred.label)}
                          className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-5 h-5" />
                          Get Nutrition Analysis
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}