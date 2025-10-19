# PREDICTIS: Agentic AI for Predictive Hospital Management

## Problem Statement

Healthcare centers in India face unpredictable patient surges during major festivals, seasonal pollution spikes, and epidemics, straining staffing, medical supplies, and facilities. This leads to overcrowding and longer wait times.

---

## Solution Overview

PREDICTIS is an intelligent, agentic AI system that analyzes historical patient data, air quality indices (AQI), festival schedules, and epidemiological factors to proactively forecast respiratory patient admissions for the next 7 days. It provides hospital management with actionable recommendations for optimal staffing levels, supply allocation, and patient advisories.

## How PREDICTIS Solves the Problem Statement

The problem statement identifies three critical challenges:

**1. Unpredictable patient surges during major festivals (Diwali, Holi, Ganesh Chaturthi)**
- PREDICTIS Solution: Ingestion Agent integrates festival calendars to flag high-demand periods. Predictive Agent analyzes historical admission patterns during these festivals to forecast surges 7 days in advance.

**2. Seasonal pollution spikes (winter smog, crop burning seasons)**
- PREDICTIS Solution: Ingestion Agent continuously monitors real-time AQI data. Predictive Agent identifies strong correlations between air quality degradation and respiratory admissions, enabling early warning systems.

**3. Strain on staffing, medical supplies, and facilities leading to overcrowding**
- PREDICTIS Solution: Advisory Agent translates predictions into concrete, actionable recommendations for staffing adjustments and supply reordering. Hospitals receive specific numbers: "Call in 3 additional staff for Emergency Department" and "Prepare extra respiratory supplies."

PREDICTIS directly addresses these challenges through its agentic architecture, where autonomous agents work collaboratively to provide proactive, data-driven recommendations rather than reactive crisis management.

### Key Features

- **Predictive Forecasting:** AI-driven predictions of patient admissions for the next 7 days
- **Multi-factor Analysis:** Considers AQI, festival schedules, historical trends, and seasonal patterns
- **Agentic Architecture:** Three specialized agents (Ingestion, Predictive, Advisory) work collaboratively
- **Staffing Recommendations:** Dynamic staffing level suggestions based on predicted surges
- **Supply Management:** Alerts for respiratory supplies, ICU beds, and equipment
- **Real-time Dashboard:** Beautiful, intuitive interface for hospital administrators and staff

---

## How It Works

### 1. Data Ingestion Agent

- Reads historical patient admission data
- Integrates real-time AQI (air quality) data
- Tracks festival and epidemic calendars
- Cleans and normalizes data for downstream processing

### 2. Predictive Agent

- Uses time-series linear regression with historical features
- Analyzes correlations between AQI, festivals, and admissions
- Generates 7-day forecasts with admission predictions
- Outputs probability-weighted predictions

### 3. Advisory Agent

- Evaluates forecasted peaks against historical baselines
- Triggers automated alerts when surge exceeds 125% of historical average
- Generates staffing recommendations:
  - Emergency Department: +3 reserve staff during surge
  - Respiratory ICU: +2 reserve staff during surge
- Recommends supply preparation (respiratory equipment, oxygen, ventilators)

---

## Technology Stack

### Frontend
- React 18 with React Router for seamless navigation
- React Bootstrap for responsive, professional UI
- Recharts for interactive data visualizations
- React Bootstrap Icons for intuitive iconography

### Deployment
- Vercel for production deployment
- GitHub for version control and collaboration

---

## Architecture

The system follows a modular agent-based architecture where each component operates autonomously but communicates with others:

**Data Layer (Historical Data, AQI, Festival Calendar) → Ingestion Agent → Predictive Agent → Advisory Agent → Frontend Dashboard**

Each agent is implemented as a distinct module, ensuring:
- Separation of concerns
- Easy scalability
- Clear data flow
- Autonomous decision-making at each stage

---

## Impact & Benefits

### For Hospital Administration
- **Data-Driven Decisions:** Forecasts replace guesswork with AI predictions
- **Cost Optimization:** Avoid overstaffing during low-demand periods
- **Resource Efficiency:** Proactive supply management reduces waste

### For Medical Staff
- **Early Warnings:** Know about surges 7 days in advance
- **Better Preparation:** Time to call in staff, arrange supplies
- **Reduced Stress:** Less overcrowding means better patient care

### For Patients
- **Shorter Wait Times:** Optimized staffing reduces delays
- **Better Care:** Fewer beds per patient, more attentive staff
- **Transparency:** Know expected wait times from advisories

---

## Live Demo

**Website:** https://predictis-mvp.vercel.app/dashboard

### Dashboard Features
- 7-day patient admission forecast visualization
- Real-time KPI cards (Patient Influx, Wait Times, Occupancy)
- AI-generated advisory alerts
- Staffing recommendations by department
- Festival and pollution spike indicators

---

## GitHub Repository

**Repository:** https://github.com/AlphaNOVA23/predictis-mvp

### Project Structure
```
predictis-mvp/
├── src/
│   ├── Dashboard.js
│   ├── Header.js
│   ├── Sidebar.js
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── public/
│   ├── index.html
│   └── logo.png
│
├── package.json
└── README.md
```

---

## Future Enhancements

### Phase 2 (Post-Hackathon)
- **Authentication and RBAC:** Role-based access for doctors, admins, staff
- **Advanced Analytics:** More visualization types, export to PDF/Excel
- **Improved Models:** ARIMA time-series, seasonal decomposition
- **Mobile App:** iOS/Android native apps for on-the-go monitoring
- **Real-time Updates:** WebSocket integration for live data streaming
- **Multi-Hospital Support:** Manage multiple hospitals from one dashboard
- **Backend Integration:** Python FastAPI backend with NumPy-based predictive models

---

## How to Run Locally

### Frontend
```bash
npm install
npm start
# Opens at http://localhost:3000/dashboard
```

---

## Submission Links

- **Live Website:** https://predictis-mvp.vercel.app/dashboard
- **GitHub Repository:** https://github.com/AlphaNOVA23/predictis-mvp

---

PREDICTIS: Making Indian Healthcare Smarter, One Prediction at a Time.