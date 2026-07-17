// src/(routes)/signup/page.tsx
"use client";
import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Ruler,
  Weight,
  Users,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChefHat,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    medicalCondition: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/signin?registered=true");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    if (stepNumber === 1) {
      return !!(formData.name && formData.email && formData.password && formData.password.length >= 6);
    }
    if (stepNumber === 2) {
      return !!(formData.age && formData.gender && formData.height && formData.weight);
    }
    return true;
  };

  const nextStep = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      setError("Please fill in all required fields before continuing");
      return;
    }
    
    setError("");
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    setError("");
    if (step > 1) setStep(step - 1);
  };

  const renderStep1 = () => (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn">
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 border-2 border-gray-200 text-gray-900 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 border-2 border-gray-200 text-gray-900 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
          <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
          Password *
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          disabled={loading}
          className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 border-2 border-gray-200 text-gray-900 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
          placeholder="Minimum 6 characters"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
            Age *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
            disabled={loading}
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 border-2 border-gray-200 text-gray-900 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
            placeholder="25"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 border-2 border-gray-200 text-gray-900 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
            <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
            Height (cm) *
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="50"
            max="300"
            disabled={loading}
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 border-2 border-gray-200 text-gray-900 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
            placeholder="170"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
            <Weight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
            Weight (kg) *
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="20"
            max="500"
            disabled={loading}
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 border-2 border-gray-200 text-gray-900 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
            placeholder="70"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn">
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
          Medical Condition (Optional)
        </label>
        <textarea
          name="medicalCondition"
          value={formData.medicalCondition}
          onChange={handleChange}
          rows={4}
          disabled={loading}
          className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 border-2 border-gray-200 text-gray-900 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
          placeholder="Any medical conditions, allergies, or dietary restrictions..."
        />
      </div>
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg sm:rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-2 sm:gap-3">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-gray-700">
            <p className="font-bold mb-1.5 sm:mb-2 text-orange-900">What happens next?</p>
            <ul className="space-y-1 sm:space-y-1.5">
              <li className="flex items-start gap-1.5 sm:gap-2">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>AI calculates your personalized nutrition targets</span>
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>Your BMI is automatically computed</span>
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>
                  Custom daily goals for calories, protein, carbs & fat
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 px-2">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-xl">
              <Image
                src="/plate-logo.png"
                alt="DeshiPlate Logo"
                width={64}
                height={64}
                className="object-contain w-12 h-12 sm:w-16 sm:h-16"
              />
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                DeshiPlate AI
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Smart Bengali Nutrition
              </p>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1.5 sm:mb-2 px-2">
            Create Your Account
          </h2>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            {loading
              ? "Calculating your personalized nutrition..."
              : "Join DeshiPlate AI and start your healthy journey"}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-4 sm:mb-6 px-2">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-all shadow-lg ${
                      step >= s
                        ? "bg-gradient-to-br from-orange-600 to-amber-600 text-white scale-110"
                        : "bg-white text-gray-400 border-2 border-gray-200"
                    }`}
                  >
                    {step > s ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : s}
                  </div>
                  <p
                    className={`text-[10px] sm:text-xs font-semibold mt-1 sm:mt-1.5 whitespace-nowrap ${
                      step >= s ? "text-orange-600" : "text-gray-400"
                    }`}
                  >
                    {s === 1 ? "Account" : s === 2 ? "Physical" : "Health"}
                  </p>
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 sm:w-20 md:w-24 h-1 mx-2 sm:mx-3 rounded-full transition-all ${
                      step > s
                        ? "bg-gradient-to-r from-orange-600 to-amber-600"
                        : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 md:p-8 mx-2">
          {error && (
            <div className="mb-4 sm:mb-5 bg-red-50 border-2 border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-start sm:items-center gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="font-medium text-xs sm:text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5 sm:mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={loading}
                  className="w-full sm:flex-1 px-5 sm:px-6 py-3 sm:py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={loading}
                  className="w-full sm:flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:hover:scale-100 text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      Create Account
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center text-gray-600 mt-4 sm:mt-5 text-xs sm:text-sm px-2">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}