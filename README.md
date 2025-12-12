<!-- # **DeshiPlate AI: Bangladeshi Food Recognition & Nutrition Assistant**

DeshiPlate AI is an AI-powered food recognition and nutrition companion designed specifically for **Bangladeshi cuisine**.
It combines **NextViT-based image classification**, **Next.js frontend**, **LLM-powered nutrition analysis**, and **personalized diet guidance** to help users understand what they eat — effortlessly.

This repository contains the full source code for:

* 🧠 **NextViT training pipeline** for Bangladeshi food recognition
* 🌐 **Next.js web application** for real-time inference
* 🔗 **Integration with Hugging Face model hub**
* 🤖 **LLM nutrition assistant**: caloric needs, BMI, macros, suggestions
* 🍽️ **Personalized food suitability recommendations**

---

## 🥗 **Project Overview**

DeshiPlate AI classifies Bangladeshi dishes across **33 food categories**, trained using a custom-built dataset.
Once a user uploads an image, the system:

1. **Recognizes the food** using a fine-tuned **NextViT** model
2. **Fetches nutrition profile** for the detected item
3. Calculates:

   * Daily **caloric needs**
   * Recommended **protein, carbs, and fats**
   * **BMI**
4. Provides:

   * Personalized dietary suggestions
   * Whether the food is healthy for the user **based on their health condition + today's food consumption**

Designed for health-conscious individuals and those tracking Bengali cuisine dietary habits.

---

## 🧩 **Repository Structure**

```
DeshiPlate-AI/
│
├── ml-training/            # NextViT model training code
│   ├── train.py
│   ├── dataset_utils.py
│   ├── preprocessing/
│   └── README.md
│
├── frontend/               # Next.js application for user interface
│   ├── src/
│   ├── public/
│   ├── components/
│   └── README.md
│
├── inference/ (optional)   # Helper scripts for loading HF model
│
└── README.md                # Main documentation (this file)
```

---

## 📦 **Features**

### 🔍 **1. Bangladeshi Food Image Recognition**

* Custom dataset of **33 Bangladeshi dishes**
* Fine-tuned **NextViT model**
* Hosted on **Hugging Face** for lightweight deployment

### 🍲 **2. Nutrition Intelligence**

* Auto-fetches calories, protein, fat, and carb details
* Tracks what the user ate today
* Calculates remaining nutrition requirements for the day

### 🏥 **3. Health-Aware Food Recommendation**

* User inputs basic health conditions (e.g., diabetes, high BP, obesity)
* AI evaluates:

  * ✔ Should the user eat this food?
  * ✔ How much is safe?
  * ✔ Is there a healthier alternative?

### 🤖 **4. LLM-Enhanced Insights**

* BMI calculation
* Personalized diet planning
* Chat-style nutrition assistant
* Suggests meals based on goal (weight loss, muscle gain, balanced diet)

### 💻 **5. Modern Web Experience**

* Built using **Next.js** (App Router)
* Clean UI for uploading images and seeing predictions
* Real-time inference from Hugging Face

---

## 🚀 **How It Works**

1. User uploads a food image
2. Next.js frontend sends the image to the Hugging Face model
3. Model outputs:

   * Food class
   * Prediction confidence
4. System retrieves nutrition info
5. LLM processes:

   * BMI
   * Remaining daily macros
   * Whether the meal is suitable
6. User receives an easy-to-understand breakdown & suggestions

---

## 📊 **Tech Stack**

| Area           | Technology                          |
| -------------- | ----------------------------------- |
| Model Training | PyTorch, NextViT, Python            |
| Web Frontend   | Next.js, TypeScript, TailwindCSS    |
| AI Assistant   | LLM (OpenAI / custom)               |
| Model Hosting  | Hugging Face Hub                    |
| Data Tools     | TorchVision, Pandas, Albumentations |
| Deployment     | Vercel / Node.js                    |

---

## 📁 **Dataset**

* **Custom curated dataset** of 33 Bangladeshi dishes
* Cleaned, preprocessed, train/val/test split
* Includes popular items such as:

  * Biryani
  * Bhuna Khichuri
  * Panta Bhat
  * Hilsha Fish Curry
  * Vegetable Bhorta
  * Mishti Doi
  * And more...

*(Dataset is not included in the repo for size/privacy reasons.)*

---

## 🤝 **Contributing**

Contributions are welcome!
You can contribute via:

* Bug fixes
* UI improvements
* Additional Bangladeshi food classes
* Model accuracy enhancements
* Nutrition database updates

---

## 📄 **License**

This project is released under the **MIT License**.
Free to use, modify, and distribute with attribution.

---

## 🌟 **Acknowledgements**

* NextViT authors
* Hugging Face team
* Global Bangladeshi food & health community
* OpenAI LLM tools

---

## ❤️ **Support the Project**

If you find **DeshiPlate AI** helpful, please ⭐ the repository!
Your support motivates further development and additional Bangladeshi food classes. -->






























# **DeshiPlate AI: Bangladeshi Food Recognition & Nutrition Assistant**

DeshiPlate AI is an intelligent food-recognition and nutrition-guidance system built specifically for **Bangladeshi cuisine**.  
It combines a **NextViT-based image classifier**, a **Next.js web app**, and an **LLM-powered nutrition engine** to help users understand their meals, track macros, and receive personalized dietary recommendations.

🔗 **Live Site:** [deshiplateai.vercel.app](https://deshiplateai.vercel.app)

---

## 🌟 **Key Features**

### 🍛 **33-Class Bangladeshi Food Recognition**
- Custom dataset with 33 popular Bangladeshi foods  
- Fine-tuned **NextViT** model  
- Hosted on **Hugging Face Hub**  
- Provides label + confidence + nutrition info  

### 🍽️ **Nutrition & Health Intelligence**
- Calculates:
  - Daily caloric needs  
  - Recommended protein, carbs, fat  
  - BMI  
- Tracks daily meals  
- Performs food health suitability checks based on:
  - Diabetes  
  - BP  
  - High cholesterol  
  - Weight goals  
  - Activity level  

### 🤖 **LLM-Powered Recommendations**
- Generates personalized meal advice  
- Identifies risky foods  
- Suggests alternatives  
- Explains results in natural language  

### 💻 **Modern Full-Stack Application**
- Next.js frontend  
- Drizzle ORM + PostgreSQL  
- NextAuth authentication  
- TailwindCSS UI  
- HuggingFace inference API  

---

## 🧩 **Repository Structure**

```

DeshiPlate-AI/
│
├── frontend/           # Production-grade Next.js web application
├── model-training/     # NextViT training pipeline for 33-class food classifier
└── README.md 

```

---

## 🚀 **How It Works**

1. User uploads food image  
2. Frontend calls `/api/food/analyze`  
3. API forwards image to HuggingFace model  
4. Model returns class + confidence  
5. System fetches nutrition information  
6. LLM generates personalized guidance  
7. User gets full breakdown + suggestions  

---

## 🛠️ **Tech Stack**

| Layer | Technologies |
|-------|--------------|
| Model Training | Python, PyTorch, NextViT |
| Model Hosting | HuggingFace Hub |
| Frontend | Next.js 16, TypeScript, React |
| Backend / API | Next.js Server Actions, Route Handlers |
| Database | PostgreSQL + Drizzle ORM |
| Authentication | NextAuth |
| Styling | TailwindCSS |
| AI Assistant | OpenAI LLM / ChatGPT API |

---

## 📄 **License**

Released under the **MIT License**.

---

## ⭐ **Support the Project**

If DeshiPlate AI helps you, please consider **starring the repo** to support future development.

---

## 🤝 **Contributing**

Contributions are always welcome:
- Add new Bangladeshi foods  
- Improve accuracy  
- Extend nutrition database  
- UX/UI upgrades  
