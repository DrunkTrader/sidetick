# Sidetick

**Premium algorithmic trading education platform for Indian retail traders.**
This is a [Next.js](https://nextjs.org) App Router project integrated with Tailwind CSS, Prisma, and PostgreSQL.

## Core Features

- **Neo-brutalist User Experience**: A highly engaging, premium UI with playful elements, robust Dark Mode support, and a responsive layout designed to "wow" users.
- **Lead Generation Funnel**: 
  - Freebies Lead Magnet with OTP verification (Twilio).
  - Seamless Google OAuth & Telegram Login.
  - Mandatory User Onboarding flow to capture critical lead details (phone numbers).
- **Piracy Protection**: 
  - UI-level protections including dynamic watermarks, disabled right-click, and shortcut guards.
  - Planned backend DRM & tokenized HLS video streaming (Bunny Stream).
- **Gated Member Portal**:
  - Course curriculum management.
  - Locked vs. Unlocked Free Resources.
  - Pine Scripts Code Library.

## Environment Variables

Create a `.env` file at the root:

```bash
# Database
DATABASE_URL=

# Authentication
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
TELEGRAM_BOT_TOKEN=
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=

# External Services (Pending/Active)
# TWILIO_ACCOUNT_SID=
# TWILIO_AUTH_TOKEN=
# RAZORPAY_KEY_ID=
# RAZORPAY_KEY_SECRET=
```

## Getting Started

1. **Database Setup**:
   Ensure your PostgreSQL instance is running.
   ```bash
   npx prisma db push
   npx prisma generate
   ```

2. **Run Development Server**:
   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the platform.

## Architecture

- **Frontend**: Next.js 15 App Router, Tailwind CSS v3 (class-based Dark Mode), React 19.
- **Backend**: Next.js Route Handlers, Prisma ORM, PostgreSQL.
- **Auth**: Custom JWT session mechanism supporting OAuth callbacks and Telegram verification.
