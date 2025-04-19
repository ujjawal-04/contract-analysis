# Contract Analysis Web Application

## Overview

This application is a Next.js-based platform that provides AI-powered contract analysis. It enables users to upload contract documents in PDF format, process them through AI analysis, and receive detailed reports highlighting risks, opportunities, and key clauses.

## Features

- AI-powered contract analysis with risk identification
- Opportunity discovery and key clause detection
- Interactive dashboards with data visualization
- Document management for storing and organizing contracts
- Tiered subscription model with Stripe payment integration
- User authentication and account management
- Responsive design for desktop and mobile access

## Technology Stack

### Frontend
- Next.js 15.3.0
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- Recharts for data visualization
- Framer Motion for animations
- Zustand for state management
- TanStack Query (React Query) for data fetching
- Axios for HTTP requests

### Integration
- Stripe API for payment processing

## Installation and Setup

### Prerequisites
- Node.js (version 18.18.0 or higher)
- npm or yarn package manager

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/contract-analysis.git
   cd contract-analysis
   ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   ```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
CLIENT_URL=http://localhost:3000
SESSION_SECRET=your_session_secret
NODE_ENV=development
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Ensure all environment variables are properly set before running the application. For production deployment, configure these variables in your hosting platform's environment settings.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
client/
├── public/                  # Static assets
└── src/
    ├── app/                 # Next.js app directory
    │   ├── (private)/       # Protected routes requiring authentication
    │   │   ├── dashboard/   # Dashboard and analytics pages
    │   │   ├── payment-cancel/  # Payment cancellation page
    │   │   └── payment-success/ # Payment success page
    │   ├── globals.css      # Global styles
    │   ├── layout.tsx       # Root layout
    │   └── page.tsx         # Homepage
    ├── components/          # Reusable components
    │   ├── analysis/        # Contract analysis components
    │   ├── dashboard/       # Dashboard components
    │   ├── modals/          # Modal dialogs
    │   ├── shared/          # Shared UI elements
    │   └── ui/              # Base UI components
    ├── hooks/               # Custom React hooks
    ├── interfaces/          # TypeScript interfaces
    ├── lib/                 # Utility functions
    ├── providers/           # Context providers
    └── store/               # State management
```

## Key Components

### User Interface
- **Dashboard**: Central access point for all user contracts and analysis
- **Contract Analysis Results**: Detailed breakdown of contract analysis with visualizations
- **User Settings**: Account and preference management
- **Pricing**: Subscription tier information and management

### Business Logic
- **Authentication System**: User login, registration, and account management
- **Contract Processing**: Document upload and analysis workflow
- **Payment System**: Subscription management with Stripe integration

## Development

### Available Commands
- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

### Development Guidelines
- Follow TypeScript typing for all components and functions
- Maintain responsive design patterns across all UI components
- Use Zustand for global state management
- Implement proper error handling for API calls
- Follow the established component structure

## Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the required environment variables
3. Deploy the application

For alternative deployment options, build the application using `npm run build` and serve the output using an appropriate web server.

## External Services

- **Backend API**: Provides contract analysis functionality and data storage
- **Stripe Dashboard**: Manages payment processing at [https://dashboard.stripe.com](https://dashboard.stripe.com)

## License

This project is licensed under the MIT License.
