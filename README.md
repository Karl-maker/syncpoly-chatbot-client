# Telegram App - User Access Management

A modern Next.js web application for managing user access periods through Telegram Web App.

## Features

- 🔐 Telegram Web App integration
- 👤 User profile display with avatar initials
- ⏰ Access period tracking and display
- 🎁 Free Daily Pass (adds 24 hours to access period)
- 🌓 Automatic dark/light mode based on system preferences
- 📱 Fully responsive design
- 🔒 API proxy routes to hide backend endpoints

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
API_URL=http://localhost:4040
```

Replace `http://localhost:4040` with your actual API URL.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

The app is designed to be used as a Telegram Web App. When accessed through Telegram:

1. The app automatically detects the Telegram user ID
2. Fetches user data from the backend API
3. Updates the user's timezone and country automatically
4. Displays the user's avatar (first initial) and access period
5. Shows a "Free Daily Pass" button if access has expired

## Development Mode

When `NODE_ENV=development`, the app automatically uses mock data:

- **API Routes**: All API endpoints return mock responses instead of calling the backend
- **Telegram User**: Uses a mock Telegram user when Telegram Web App is not available
- **Mock User Data**: 
  - Telegram ID: `123456789`
  - Name: John Doe
  - Username: johndoe
  - Access Period: Expired (to test the "Free Daily Pass" button)

This allows you to develop and test the app without needing:
- A running backend API server
- Telegram Web App environment
- Real user data

To run in development mode:
```bash
NODE_ENV=development npm run dev
```

Or simply:
```bash
npm run dev
```
(Next.js sets NODE_ENV=development automatically in dev mode)

## API Endpoints

The app proxies the following endpoints:

- `GET /api/users/telegram/[telegram_id]` - Get user by Telegram ID
- `POST /api/users/[id]/timezone-country` - Update user timezone and country
- `POST /api/users/[id]/access-period` - Update user access period

All requests are proxied to the backend API specified in `API_URL` environment variable.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Telegram Web App SDK

