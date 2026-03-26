<div align="center">

<img src="https://img.shields.io/badge/🌿-Smart_Irrigation_System-16a34a?style=for-the-badge&labelColor=052e16" alt="Smart Irrigation System" />

<br/><br/>

<img src="https://img.shields.io/badge/Status-Live-22c55e?style=flat-square&logo=statuspage&logoColor=white" />
<img src="https://img.shields.io/badge/Built_with-❤️-f97316?style=flat-square&logo=heart&logoColor=white" />
<img src="https://img.shields.io/badge/React-TypeScript-3b82f6?style=flat-square&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/ML-Python-facc15?style=flat-square&logo=python&logoColor=black" />
<img src="https://img.shields.io/github/last-commit/tanusingh04/smart_irrigation_system?style=flat-square&color=8b5cf6" />

<br/><br/>

> **An AI-powered smart farming dashboard** — combining real-time crop recommendations,  
> cattle movement monitoring, and intelligent irrigation control in one place.

<br/>

[![🚀 Open Project](https://img.shields.io/badge/🚀%20Open%20Project-Launch-f97316?style=for-the-badge)]([https://github.com/tanusingh04/smart_irrigation_system])
&nbsp;
[![⭐ Star on GitHub](https://img.shields.io/badge/⭐%20Star%20on%20GitHub-tanusingh04-1f2937?style=for-the-badge&logo=github)](https://github.com/tanusingh04/smart_irrigation_system)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌱 **Crop Recommendations** | ML-powered suggestions based on soil & climate data |
| 🐄 **Cattle Movement Monitoring** | Smart tracking with alarm triggers |
| 💧 **Irrigation Control** | Automated watering based on real-time sensor input |
| 📊 **Live Dashboard** | Beautiful, responsive UI built with React + shadcn/ui |
| 🔁 **Supabase Integration** | Real-time data sync and backend support |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
|  **Bundler** | Vite |
|  **Frontend** | React + TypeScript |
|  **Styling** | Tailwind CSS |
|  **UI Components** | shadcn/ui |
|  **ML Backend** | Python (scikit-learn, pandas, numpy) |
|  **Database** | Supabase |
|  **Hosting Config** | Firebase |

</div>

---

##  Getting Started

### Prerequisites

Make sure you have **Node.js & npm** installed.  
 [Install via nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Clone & Run

```bash
# 1️⃣  Clone the repository
git clone https://github.com/tanusingh04/smart_irrigation_system.git

# 2️⃣  Navigate into the project
cd smart_irrigation_system

# 3️⃣  Install dependencies
npm install

# 4️⃣  Start the development server
npm run dev
```

> The app will be live at `http://localhost:5173` with hot-reload enabled.

---

## 🤖 ML Simulation (Python)

The `ml/smart_farm_ml.py` script trains two models:
-  **Crop Recommendation** model
-  **Cattle Movement** model

### Setup & Run

```bash
# Navigate to the ML directory
cd smart-farm-guardian-main/ml

# Create and activate a virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run the simulation
python smart_farm_ml.py
```

### Required Data Files

Place these CSV files in the same directory as the script before running:

```
📁 ml/
├── smart_farm_ml.py
├── Crop_recommendation.csv       ← required
└── animal_activity_sample.csv    ← required
```

>  Don't want to create a `requirements.txt`? Just install manually:
> ```bash
> pip install pandas scikit-learn numpy
> ```

The script will output **training accuracy** and simulate **3 monitoring cycles** with alarm output.

---

## 🌐 Deployment

Open the [project link][https://github.com/tanusingh04/smart_irrigation_system]

---

<div align="center">

Made with ♥️ by [tanusingh04](https://github.com/tanusingh04) 

</div>atures/custom-domain#custom-domain)
