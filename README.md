# Student Savings Group Web Application

A modern, production-ready web application for managing a collective savings group investing in Play-to-Earn blockchain games. Built with React, TypeScript, and Tailwind CSS.

## 📋 Overview

The Student Savings Group application enables 12 students to collectively manage their savings with guaranteed weekly returns. The app features three investment tiers with different weekly interest rates, real-time tracking of contributions and accumulated interest, and flexible membership management.

## ✨ Features

### 1. **Student Registration**

- Enter name and select a savings tier
- Three tier options with different investment amounts and interest rates:
  - **Tier 1**: ₦10,000 with 5% weekly interest
  - **Tier 2**: ₦20,000 with 10% weekly interest
  - **Tier 3**: ₦30,000 with 20% weekly interest
- Input validation ensuring correct tier selection
- Real-time member count and balance updates

### 2. **Savings Dashboard**

- **Group Overview**: Display total members, current week, total contributed, and total interest earned
- **Member Breakdown**: View individual member details including:
  - Principal amount
  - Accumulated interest
  - Current balance (principal + interest)
  - Weeks participated
- **Weekly Progress Simulation**: Advance to the next week to calculate and apply weekly interest
- **Total Group Balance**: Shows combined withdrawable amount for all members

### 3. **Tier Validation**

- Validates that each student selects the correct amount for their chosen tier
- Prevents registration without a tier selection
- Clear feedback for invalid inputs through toast notifications

### 4. **Withdrawal Management**

- Students can withdraw their funds at any time
- Withdrawal includes:
  - All principal contributions
  - All accumulated interest
  - Automatic removal from the group
  - Updated group totals
- Confirmation dialog before processing withdrawal

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (recommended) or npm

### Installation

1. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:5173` (or the URL shown in terminal)

### Building for Production

```bash
pnpm build
# or
npm run build
```

## 📱 How to Use the App

### Registering a Student

1. Click **"Join Now"** on the home page
2. On the registration page:
   - Enter your full name
   - Select your savings tier (Tier 1, 2, or 3)
   - Review the weekly interest amount and projected growth
   - Click **"Join Savings Group"** to register
3. You'll be added to the group and see confirmation

### Viewing the Savings Dashboard

1. Click **"View Savings Dashboard"** from the home page or registration page
2. The dashboard displays:
   - **Group Overview**: Current statistics at the top
   - **Weekly Progress Control**: Button to simulate weekly progress and interest accrual
   - **Total Group Balance**: Combined funds available for withdrawal
   - **Active Members**: List of all group members with their individual details

### Simulating Weekly Progress

1. On the dashboard, click **"Simulate Weekly Progress"** button
2. All members' balances will be updated with their weekly interest
3. The current week counter increments
4. Interest is calculated based on each member's tier and their current balance

### Withdrawing Funds

1. On the dashboard, find the member card (yours or view others)
2. Click **"Withdraw Funds"** button on the card
3. Confirm the withdrawal amount (principal + accumulated interest)
4. The member is removed from the group
5. Group totals are updated immediately

## 🏗️ Project Structure

```
client/
├── components/
│   ├── RegistrationForm.tsx      # Student registration form
│   ├── TierSelector.tsx          # Tier selection component
│   ├── StudentCard.tsx           # Individual member card display
│   ├── SavingsDashboard.tsx      # Main dashboard component
│   ├── StatCard.tsx              # Statistics display card
│   └── ui/                       # Pre-built Radix UI components
├── context/
│   └── SavingsContext.tsx        # Global savings state management
├── pages/
│   ├── Index.tsx                 # Home/landing page
│   ├── Registration.tsx          # Registration page
│   └── Dashboard.tsx             # Dashboard page
├── lib/
│   └── utils.ts                  # Utility functions (cn helper)
├── App.tsx                       # Main app with routing
└── global.css                    # Global styles and theme

shared/
└── savings.ts                    # Business logic and type definitions

server/
├── index.ts                      # Express server setup
└── routes/
    └── demo.ts                   # Example API route
```

## 💡 Business Logic

### Tier Definitions

- **Tier 1**: ₦10,000 principal, 5% weekly interest
- **Tier 2**: ₦20,000 principal, 10% weekly interest
- **Tier 3**: ₦30,000 principal, 20% weekly interest

### Interest Calculation

- Weekly interest is calculated as: `Interest = Principal × (Weekly Interest Rate / 100)`
- New balance after week: `Balance = Previous Balance + Interest`
- Interest compounds weekly as members earn interest on their previous balance + accumulated interest

### Example Calculation (Tier 2 over 4 weeks)

- Week 0: ₦20,000
- Week 1: ₦20,000 + ₦2,000 (10%) = ₦22,000
- Week 2: ₦22,000 + ₦2,200 (10%) = ₦24,200
- Week 3: ₦24,200 + ₦2,420 (10%) = ₦26,620
- Week 4: ₦26,620 + ₦2,662 (10%) = ₦29,282

## 🎨 Design & Styling

The application uses:

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS 3 with custom theme
- **Component Library**: Radix UI components
- **Icons**: Lucide React
- **Animations**: CSS keyframe animations for smooth transitions
- **Color Scheme**: Modern gradient with primary purple (#6366F1) and secondary blue (#0099FF)

### Key Design Features

- Responsive grid layouts for desktop and mobile
- Gradient backgrounds for visual appeal
- Card-based component design
- Hover effects and smooth transitions
- Toast notifications for user feedback
- Accessible form inputs and buttons

## 🔧 Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: React Router 6
- **Build Tool**: Vite
- **Testing**: Vitest

## 📊 State Management

The app uses React Context API for global state management through `SavingsContext`:

```typescript
// Provides:
- group: SavingsGroup          // All members and group totals
- addStudent()                 // Register new student
- withdrawStudentMember()      // Remove member and update balances
- progressToNextWeek()         // Calculate weekly interest
- currentWeek                  // Current week number
```

## 🎯 Validation Rules

- **Name**: Required, non-empty string
- **Tier Selection**: Must select exactly one of Tier 1, 2, or 3
- **Duplicate Prevention**: No explicit duplicate prevention (allows same name multiple times)
- **Withdrawal**: Available for any member with balance > 0

## 📈 Future Enhancement Ideas

- Database integration for persistent data storage
- User authentication and personal dashboards
- Export member data to CSV/PDF reports
- Blockchain integration for actual P2E game investment
- Email notifications for weekly progress
- Admin panel for group management
- Performance metrics and charts
- Multi-language support

## 🚀 Deployment

### Deploy to Netlify

1. Push code to a Git repository
2. Connect repository to Netlify
3. Configure build settings:
   - Build command: `pnpm build` or `npm run build`
   - Publish directory: `dist`
4. Deploy

### Deploy to Vercel

1. Push code to a Git repository
2. Import project in Vercel dashboard
3. Vercel auto-detects the build settings
4. Deploy

## 📝 Notes

- The app simulates weekly progress locally; in production, this would be triggered by actual blockchain transactions
- All data is stored in React state and resets on page refresh
- For persistent data, integrate with a backend database
- The app supports up to 12 members as specified in the requirements
- Interest calculations use compound interest (applied weekly)

## 📞 Support

For issues or questions:

1. Check the dashboard to verify all member details
2. Use the browser console to check for any error messages
3. Ensure you've followed the registration and withdrawal steps correctly

## 📄 License

This project is provided as-is for educational purposes.

---

**Built with ❤️ for collaborative savings management**
