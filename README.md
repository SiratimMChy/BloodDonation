# 🩸 Hemovia – Blood Donation Management Platform

<div align="center">

**A modern, full-stack platform connecting blood donors, volunteers, and administrators to save lives faster**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.5-5A0EF8?style=flat&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#-license--contributions)

<div align="center">
<a href="https://blooddonation-f6367.web.app" target="_blank">

![Live Demo](https://img.shields.io/badge/HEMOVIA-LIVE%20DEMO-dc2626?style=for-the-badge&logo=firefox-browser&logoColor=white&labelColor=111827)

</a>
</div>

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Real-World Problem & Solution](#-real-world-problem--solution)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Software Architecture](#️-software-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Authentication & Security](#-authentication--security)
- [Database Schema](#-database-schema)
- [Performance & Responsive Design](#-performance--responsive-design)
- [Deployment](#-deployment)
- [Future Roadmap](#-future-roadmap)
- [Acknowledgments](#-acknowledgments)
- [License & Contributions](#-license--contributions)

---

## 🎯 About The Project

**Hemovia** is a comprehensive blood donation management platform that digitizes and accelerates every step of the donation pipeline — from donor onboarding and geographic matching to emergency request tracking, volunteer coordination, and transparent fundraising.

### Why Hemovia?

- **Emergency-Ready**: Geographic donor search by blood group, district, and upazila cuts response times dramatically
- **Full Lifecycle Tracking**: Donation requests move through real-time status states from creation to completion
- **Role-Based Control**: Separate, purpose-built dashboards for donors, volunteers, and administrators
- **Transparent Fundraising**: Stripe-backed fundraising with a public, verified transaction ledger
- **Secure by Design**: Firebase Authentication combined with JWT-protected API endpoints and client-side RBAC
- **Safe Demo Mode**: Visitors can explore every dashboard feature without affecting real data

---

## 🧠 Real-World Problem & Solution

### The Problem
During medical emergencies (surgeries, trauma care, chronic illnesses like thalassemia), finding compatible blood donors is a critical and time-sensitive bottleneck. Traditional sourcing methods suffer from:

1. **Inefficient Sourcing** — No location-based filtering means requests reach donors who are too far away
2. **Coordination Overhead** — No request tracking leads to duplicate signups or unanswered calls
3. **Transparency Issues** — No consolidated ledger for donations, volunteer roles, or charity funding

### The Solution
Hemovia digitizes the entire donation pipeline:

- **Geographic Matchmaking**: Instantly query donor pools by blood group, district, and upazila
- **Request Lifecycle Management**: Track requests through `pending` → `inprogress` → `done` / `canceled`
- **Administrative Transparency**: Role-based dashboards keep user records, requests, and funding fully audited

---

## ✨ Key Features

### 🏠 Role-Based Dashboards

#### 🩸 Donor Dashboard
- Create and submit blood donation requests with full recipient details
- Track the live status of personal requests
- Manage profile, blood group, and location information

#### 🛡️ Admin Dashboard
- System-wide statistics: total donors, lives saved, total funding, and all request counts
- Visual request status distribution with animated progress bars
- Toggle user account status (Active / Blocked) and escalate roles (Donor → Volunteer → Admin)
- View recent requests and new user activity at a glance

#### 🤝 Volunteer Dashboard
- Overview of platform activity and requests needing coordination
- Manage and moderate all platform-wide donation requests

---

### 💉 Donation Request Management
- **Create Requests**: Structured form capturing recipient name, hospital, address, blood group, date, time, and an urgency message
- **Edit & Delete**: Full CRUD controls across all request records
- **Status Tracking**: Four-stage lifecycle — `pending`, `inprogress`, `done`, `canceled`
- **Paginated Directory**: Browse all platform requests with pagination for performance

### 🔍 Live Donor Search Engine
- Multi-field filtering by blood group, district, and upazila
- Instant results queried against the live database

### 💰 Stripe Fundraising & Public Ledger
- Secure Stripe Checkout redirect for monetary donations to the platform
- Transparent public ledger displaying donor name, amount, date, and verified Stripe transaction ID

### 📖 Blood Donation Centers Directory
- Browse geo-coded blood banks and donation centers with operating hours, contact, and ratings
- Featured centers highlighted on the landing page

### 🩺 Blood Compatibility Guide
- Full blood type compatibility reference built into the platform

### 📬 Contact Support via EmailJS
- Functional contact form on the home page dispatching messages directly to the support team

### 🎭 Read-Only Demo Playground
- One-click demo login with auto-filled credentials (Demo Donor / Demo Admin)
- All write operations blocked for demo accounts via a custom `useDemoRestriction` hook
- Floating badge clearly identifies demo sessions

### 🌙 Dark Mode Support
- Persistent light/dark theme toggle synced across all views via localStorage and custom event dispatchers

### 📱 Responsive Design
- Fully adaptive layout from mobile to large desktop screens
- Collapsible sidebar, touch-friendly components, and fluid grid layouts

---

## 🛠️ Tech Stack

### Frontend
- **[React 19.0](https://react.dev/)** — Latest concurrent rendering features and state hooks
- **[Vite 7.0](https://vitejs.dev/)** — Lightning-fast build tool with HMR
- **[React Router 7.10](https://reactrouter.com/)** — Client-side routing, nested layouts, and private route guards
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** — Utility-first CSS via the new `@tailwindcss/vite` plugin
- **[DaisyUI 5.5](https://daisyui.com/)** — Accessible component library with automatic light/dark theme support

### Backend & Services
- **[Node.js & Express.js](https://expressjs.com/)** — REST API gateway hosted on Vercel
- **[MongoDB Atlas](https://www.mongodb.com/)** — Cloud-hosted document store for users, requests, and payments

### Cloud Integrations
- **[Firebase Authentication 12.6](https://firebase.google.com/)** — Email/password sign-up, Google SSO, and session tokens
- **[Stripe API](https://stripe.com/)** — Secure checkout sessions and transaction verification
- **[EmailJS SDK](https://www.emailjs.com/)** — Serverless email dispatch from the contact form
- **[ImgBB API](https://imgbb.com/)** — CDN for user avatar uploads

### UI & Feedback
- **[Lucide React](https://lucide.dev/)** — Consistent icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** — Additional icon sets
- **[SweetAlert2 11.26](https://sweetalert2.github.io/)** — Rich animated alert modals
- **[React-Toastify 11.0](https://fkhadra.github.io/react-toastify/)** — Non-blocking toast notifications

### Development Tools
- **[ESLint](https://eslint.org/)** — Code linting and quality enforcement

---

## 🏗️ Software Architecture

### Architecture Overview

Hemovia follows a **Component-Based Architecture** with clear separation of concerns, built on modern React patterns.

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  (React Components, Pages, Role-Based Dashboard Views)      │
├─────────────────────────────────────────────────────────────┤
│                    State Management Layer                    │
│  (AuthProvider Context, Local useState, Theme Events)       │
├─────────────────────────────────────────────────────────────┤
│                    Business Logic Layer                      │
│  (RBAC Guards, Demo Restrictions, Data Aggregations)        │
├─────────────────────────────────────────────────────────────┤
│                    API Integration Layer                     │
│  (Axios Secure Interceptor, Firebase Auth SDK)              │
├─────────────────────────────────────────────────────────────┤
│                    External Services                         │
│  (Firebase Auth, MongoDB/Express API, Stripe, EmailJS, ImgBB)│
└─────────────────────────────────────────────────────────────┘
```

### Key Data Flows

#### User Authentication Flow
```
User Input (Login / Google SSO)
    ↓
Firebase Authentication Service
    ↓
AuthProvider Context — fetches role from API
    ↓
PrivateRoute Guard validates session
    ↓
Role-specific Dashboard rendered
```

#### Donation Request Lifecycle Flow
```
Donor submits request form
    ↓
useAxiosSecure — injects JWT Bearer token
    ↓
POST /requests → MongoDB
    ↓
Request visible in public directory (status: pending)
    ↓
Donor accepts → status: inprogress → done / canceled
```

#### Security Interceptor Flow
```
Any write action (POST / PUT / DELETE)
    ↓
useDemoRestriction hook checks user email
    ↓
Demo account? → SweetAlert2 block modal shown
    ↓
Real account? → Action proceeds normally
```

### Component Hierarchy

```
App
├── RootLayout
│   ├── Navbar
│   ├── Public Routes
│   │   ├── Home (Hero, HowItWorks, Centers, Compatibility, FAQ, Contact)
│   │   ├── Login (+ Demo auto-fill)
│   │   ├── Register
│   │   ├── Search
│   │   ├── DonationRequests
│   │   ├── ViewRequest
│   │   ├── DonationCentersPage / CenterDetails
│   │   ├── BloodCompatibilitySection
│   │   ├── FAQPage
│   │   └── About
│   └── Footer
└── PrivateRoute
    └── DashboardLayout
        ├── Aside (Collapsible Sidebar + Theme Toggle)
        ├── DemoUserBadge (Floating overlay)
        └── Dashboard Routes
            ├── AdminDashboard   (Stats, Charts, Recent Activity)
            ├── DonorDashboard
            ├── VolunteerDashboard
            ├── AddRequest
            ├── MyRequest
            ├── AllRequest
            ├── AllUsers
            ├── Profile
            └── Donate (Stripe Ledger)
```

### Design Patterns Used

| Pattern | Usage |
|---|---|
| **Context Provider** | `AuthProvider` manages global auth state and role |
| **Higher-Order Component** | `PrivateRoute` wraps protected dashboard routes |
| **Custom Hook** | `useAxiosSecure` injects JWT; `useDemoRestriction` blocks writes |
| **Controlled Components** | All forms use controlled state with `useState` |
| **Compound Components** | Admin Dashboard composed of independent stat card units |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- A **Firebase account** (for Authentication and Hosting)
- An **EmailJS account** (for the contact form)
- An **ImgBB account** (for profile avatar uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SiratimMChy/BloodDonation.git
   cd BloodDonation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory (see [Environment Variables](#environment-variables) below).

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

### Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# Firebase Configuration
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# ImgBB Configuration
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

| Variable | Description | Required |
|---|---|:---:|
| `VITE_APIKEY` | Firebase Web API key | ✅ |
| `VITE_AUTHDOMAIN` | Firebase Authentication domain | ✅ |
| `VITE_PROJECTID` | Firebase project identifier | ✅ |
| `VITE_STORAGEBUCKET` | Firebase storage bucket URL | ✅ |
| `VITE_MESSAGINGSENDERID` | Firebase Cloud Messaging sender ID | ✅ |
| `VITE_APPID` | Firebase application ID | ✅ |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service identifier | ✅ |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS email template ID | ✅ |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key for SDK init | ✅ |
| `VITE_IMGBB_API_KEY` | ImgBB API key for avatar uploads | ✅ |

---

## 📖 Usage

### Getting Started with Hemovia

1. **Create an Account**
   - Navigate to `/Signup`
   - Register with your email, blood group, district, and upazila
   - Or use **Google Sign-In** for one-click authentication

2. **Explore with Demo Mode**
   - On the login page, click **"Try Demo Login"**
   - Choose **Demo Donor** or **Demo Admin**
   - Credentials are auto-filled — click Sign In to explore safely

3. **Create a Blood Donation Request** *(Donor)*
   - From your dashboard, go to **Add Request**
   - Fill in recipient details, hospital name, blood group, and urgency message
   - Submit to publish the request publicly

4. **Search for Donors**
   - Navigate to `/search`
   - Filter by blood group, district, and upazila to find matching donors instantly

5. **Manage Requests**
   - Go to **My Requests** to view, edit, or delete your submitted requests
   - Track the live status of each request

6. **Admin Controls** *(Admin only)*
   - Access **All Users** to block, unblock, or promote accounts
   - Access **All Requests** to oversee and moderate all platform requests
   - View system-wide stats on the Admin Dashboard

7. **Fundraise for the Platform**
   - Navigate to `/donate`
   - Enter an amount and complete the Stripe-secured checkout
   - View the verified public ledger of all platform contributions

### Key Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero, features, and contact form |
| `/login` | Login with email/password, Google, or Demo credentials |
| `/Signup` | New user registration with blood group and location |
| `/search` | Live donor search by blood group, district, and upazila |
| `/donation-requests` | Public paginated list of all pending requests |
| `/donate` | Stripe fundraising form and public donation ledger |
| `/center` | Blood donation centers directory |
| `/BloodCom` | Blood type compatibility reference guide |
| `/faq` | Frequently asked questions |
| `/dashboard/donordashboard` | Donor personal overview |
| `/dashboard/admindashboard` | Admin stats, charts, and activity tables |
| `/dashboard/volunteerdashboard` | Volunteer coordination overview |
| `/dashboard/addRequest` | Create a new donation request |
| `/dashboard/myRequest` | View and manage personal requests |
| `/dashboard/allRequest` | Platform-wide request directory |
| `/dashboard/all-users` | User account management |
| `/dashboard/profile` | Edit profile, blood group, and avatar |

---

## 📁 Project Structure

```
Blood Donation/
├── .firebase/                    # Local Firebase configuration cache
├── .firebaserc                   # Firebase project mapping
├── firebase.json                 # Firebase Hosting config (SPA rewrites)
├── vite.config.js                # Vite + Tailwind CSS v4 plugin settings
├── eslint.config.js              # ESLint rules
├── package.json                  # Dependencies and npm scripts
├── public/                       # Static assets (served directly)
│   ├── centers.json              # Geo-coded blood banks registry
│   ├── district.json             # Bangladesh districts data
│   └── upazila.json              # Bangladesh upazilas data
└── src/
    ├── assets/                   # Local image and icon assets
    ├── Components/               # Reusable UI components
    │   ├── Aside/                # Collapsible dashboard sidebar
    │   ├── DemoUserBadge/        # Floating demo session indicator
    │   ├── Navbar/               # Responsive top navigation
    │   ├── Footer/               # Shared site footer
    │   ├── SkeletonLoader/       # Loading state card placeholders
    │   └── UI/                   # Design system components (Card, Button, Input, Badge)
    ├── config/
    │   └── emailjs.js            # EmailJS config wrapper and validator
    ├── Dashboard/                # Protected dashboard modules
    │   ├── AddRequest/           # Blood request creation form
    │   ├── AdminDashboard/       # System stats, charts, user/request tables
    │   ├── AllRequest/           # Platform-wide requests directory
    │   ├── AllUsers/             # User management (block, promote)
    │   ├── DonorDashboard/       # Donor personal stats and request list
    │   ├── MyRequest/            # Individual request logs and controls
    │   ├── Profile/              # Profile editor with ImgBB avatar upload
    │   └── VolunteerDashboard/   # Volunteer coordination overview
    ├── DashboardLayout/          # Protected layout wrapper
    ├── Donate/                   # Stripe checkout + public payment ledger
    ├── Firebase/
    │   └── firebase.config.js    # Firebase SDK initialization
    ├── Hooks/
    │   ├── useAxios.jsx          # Base Axios instance
    │   ├── useAxiosSecure.jsx    # JWT-injecting secure Axios instance
    │   └── useDemoRestriction.js # Demo user write-block interceptor
    ├── Pages/                    # Public-facing pages
    │   ├── Home.jsx              # Landing page (Hero, Stats, Centers, Contact)
    │   ├── Login.jsx             # Auth form + Demo auto-fill
    │   ├── Register.jsx          # Registration + ImgBB avatar upload
    │   ├── Search.jsx            # Donor search engine
    │   ├── ViewRequest.jsx       # Request detail + donation confirmation
    │   ├── EditRequest.jsx       # Request editing form
    │   ├── DonationRequests/     # Paginated public requests list
    │   ├── DonationCentersPage.jsx  # Blood bank directory
    │   ├── CenterDetails.jsx     # Individual center details
    │   ├── BloodCompatibilitySection.jsx  # Blood type guide
    │   ├── FAQPage.jsx           # Accordion FAQ
    │   ├── About.jsx             # Platform mission and stats
    │   └── PaymentSuccess/       # Stripe success callback
    ├── Provider/
    │   └── AuthProvider.jsx      # Global auth state + role fetching
    ├── RootLayout/               # App shell (Navbar, Footer, theme init)
    ├── Routes/
    │   ├── PrivateRoute.jsx      # Auth guard for protected routes
    │   └── router.jsx            # React Router v7 route config
    └── styles/
        ├── designSystem.js       # Color, spacing, typography, layout tokens
        └── globals.css           # Base CSS variables and resets
```

---

## 🔒 Authentication & Security

### Authentication Flow

```
[Client] → Firebase Auth (Email / Google SSO) → JWT Access Token
    ↓
AuthProvider fetches role from API → sets role in context
    ↓
PrivateRoute checks auth state → redirects unauthenticated users
    ↓
Role-specific dashboard and navigation rendered
```

### Security Layers

1. **Firebase Authentication** — Manages user credentials, session tokens, and Google OAuth
2. **JWT Bearer Tokens via Axios Interceptor** — `useAxiosSecure.jsx` attaches the Firebase access token to every protected API request:
   ```javascript
   config.headers.Authorization = `Bearer ${user?.accessToken}`;
   ```
3. **Role-Based Access Control (RBAC)** — Dashboard menus and routes dynamically render based on `donor`, `volunteer`, or `admin` role from context
4. **Demo User Write Guard** — `useDemoRestriction.js` intercepts all write actions for demo accounts and shows a SweetAlert2 block modal:
   ```javascript
   if (isDemoUser(user.email)) {
     Swal.fire({ title: "Demo User Restriction!", icon: "warning", ... });
     return true; // block the action
   }
   ```
5. **Environment Variable Isolation** — All sensitive keys are stored in `.env.local` and never committed to version control

---

## 💾 Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "Jane Doe",
  "email": "jane@hemovia.com",
  "role": "donor",         // donor | volunteer | admin
  "status": "active",      // active | blocked
  "district": "Dhaka",
  "upazila": "Dhanmondi",
  "bloodGroup": "O+",
  "imageUrl": "https://i.ibb.co/avatar.jpg"
}
```

### Requests Collection
```json
{
  "_id": "ObjectId",
  "requesterName": "Jane Doe",
  "requesterEmail": "jane@hemovia.com",
  "recipientName": "John Connor",
  "recipientDistrict": "Dhaka",
  "recipientUpazila": "Mirpur",
  "hospitalName": "Dhaka Medical College Hospital",
  "fullAddress": "Zahir Raihan Rd, Dhaka",
  "bloodGroup": "A+",
  "donationDate": "2026-06-15",
  "donationTime": "10:30",
  "requestMessage": "Urgent donor needed for cardiac surgery.",
  "mobile": "017XXXXXXXX",
  "donation_status": "pending",  // pending | inprogress | done | canceled
  "donorName": "John Doe",       // Populated when inprogress or done
  "donorEmail": "donor@hemovia.com"
}
```

### Payments Collection
```json
{
  "_id": "ObjectId",
  "donorName": "Sarah Lee",
  "donorEmail": "sarah@example.com",
  "amount": 50.00,
  "paidAt": "2026-05-24T18:23:26Z",
  "transactionId": "pi_3MtwMQ2eZvKYlo2C1OBxxxxx"
}
```

---

## ⚡ Performance & Responsive Design

### Performance Optimizations
- **Static Geographic Data Offloading**: `district.json` (12KB), `upazila.json` (67KB), and `centers.json` (25KB) are served from the `public/` directory, eliminating redundant API calls for static reference data
- **Skeleton Loaders**: `SkeletonLoader.jsx` renders animated card placeholders across all data-loading views to reduce perceived latency and prevent layout shifts
- **Centralized Axios Instances**: Reusable `useAxios` and `useAxiosSecure` hooks prevent redundant client configurations and manage connection pooling
- **Server-Side Aggregation**: The `/public-stats` endpoint uses MongoDB aggregate pipelines, keeping response payloads minimal even at scale

### Responsive Design
- **Mobile-First Grid System**: Tailwind responsive breakpoints (sm / md / lg / xl) with fluid card grids
- **Collapsible Sidebar**: Dashboard aside collapses to icon-only mode on smaller screens
- **DaisyUI v5 Theme Engine**: Light/dark toggle persisted in localStorage and synchronized across components via custom `themeChange` events
- **Accessibility (a11y)**: Semantic HTML, labeled form controls, visible focus states, and WCAG AA color contrast ratios

---

## 🌐 Deployment

The frontend is deployed on **Firebase Hosting**, with SPA rewrites ensuring React Router routes are handled correctly.

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Authenticate and set project
firebase login
firebase use default

# Build and deploy
npm run build
firebase deploy
```

> The `firebase.json` configuration rewrites all routes to `index.html`, enabling full client-side SPA routing.

---

## 📈 Future Roadmap

1. **Geographic Database Indexing** — Compound indexes on `bloodGroup`, `recipientDistrict`, `recipientUpazila` to optimize search as data volume grows
2. **Real-Time Donor Matching** — Socket.io integration for instant push notifications to compatible donors when a nearby emergency request is created
3. **Automated Request Expiry** — Background cron jobs to automatically mark expired requests as `canceled` once the donation date has passed
4. **SMS Alerts** — Twilio or local SMS gateway integration to reach donors who are offline on the web platform

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/) — Comprehensive modern React guides
- [Vite Documentation](https://vitejs.dev/) — Fast build tooling and HMR
- [Firebase Documentation](https://firebase.google.com/docs) — Auth and Hosting
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) — Beautiful Tailwind component library
- [Lucide Icons](https://lucide.dev/) — Clean, consistent icon set
- [React Router](https://reactrouter.com/) — Client-side routing
- [SweetAlert2](https://sweetalert2.github.io/) — Elegant alert modals
- [Recharts](https://recharts.org/) — Composable React chart library

---

## 📄 License & Contributions

This project is open-source and welcoming. Anyone is free to view, explore, and contribute to this repository. However, proper credit and attribution must be given to the original creator.

Distributed under the **MIT License**. See the license details for more information.

*Copyright © 2026 Hemovia Management Platform. All rights reserved.*

<div align="center">

**Made by Siratim Mustakim Chowdhury**

[![GitHub](https://img.shields.io/badge/GitHub-SiratimMChy-181717?style=flat&logo=github)](https://github.com/SiratimMChy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Siratim%20Mustakim-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/siratim-mustakim-chowdhury/)
[![Email](https://img.shields.io/badge/Email-chowdhurysiratimmustakim@gmail.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:chowdhurysiratimmustakim@gmail.com)

</div>
