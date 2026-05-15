# Current Project Status

This status is based on current code and client requirements documented in:
- `.github/sidetick_copilot_prompt.md`
- `sidetick_project_instructions.md` (especially Sections **5, 6, 7, 8, 9, 10, 12, 13, 14**)

## DONE

- **Core app structure is in place** (App Router with public/protected/admin/api surfaces, shared components, Prisma schema, middleware).
- **Landing page is implemented** with major required sections from Section 5:
  - Sticky navbar, hero, problem cards, social proof, curriculum accordion, feature highlights, testimonials, pricing, FAQ, footer.
  - Mobile sticky enroll bar and exit-intent discount modal.
  - Floating WhatsApp chat widget.
- **Freebies page UI and flow are implemented** (Section 7):
  - Locked cards, unlock modal, OTP send/verify flow, session unlock flag in localStorage, footer CTA.
- **Freebies OTP backend is implemented**:
  - `POST /api/freebies/send-otp` with OTP generation + Redis rate limit + Twilio send.
  - `POST /api/freebies/verify` with OTP validation and `FreebiesLead` upsert.
- **Authentication system is active** (customized from Section 8):
  - Login page now supports **Google OAuth** and **Telegram login**.
  - Routes implemented: `/api/auth/google/start`, `/api/auth/google/callback`, `/api/auth/telegram`, `/api/auth/me`, `/api/auth/logout`.
  - JWT cookie session issuance and session persistence in DB.
- **Route protection exists** via `middleware.ts` for `/dashboard/*` and `/admin/*` entry checks.
- **Member portal UI exists** (Section 6):
  - Dashboard layout + course sidebar + lesson player pages + account page UI.
  - Video player includes watermark overlay, right-click block, keyboard shortcut guard, and 30-second progress sync attempts.
- **Security baseline is partially in place** (Section 13):
  - Security headers configured in `next.config.ts`.
  - Razorpay webhook signature timing-safe validation exists.
- **Environment template updated** for new auth variables:
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `TELEGRAM_BOT_TOKEN`, `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`.

## TO DO

- **Payment integration is not production-complete** (Section 9):
  - `POST /api/payment/create-order` is mocked (no real Razorpay order creation).
  - `GET /api/payment/verify` is placeholder.
  - Webhook validates signature but does not yet provision access end-to-end (user/purchase lifecycle + onboarding).
  - Frontend checkout flow is not wired to real Razorpay modal and success handling.
- **Portal data is still mostly static/mock** (Section 6):
  - Dashboard/course/lesson/account pages use hardcoded values instead of DB/session-driven data.
  - Purchase checks are not enforced end-to-end before rendering course content.
- **Progress persistence is incomplete** (Sections 6.5, 12.4):
  - `PATCH /api/progress/:lessonId` computes completion but does not save to Prisma.
  - Missing `GET /api/progress/:courseId`.
  - Resume-from-last-position is not truly loaded from DB.
- **Video token security is incomplete** (Section 10):
  - `/api/video/token` does not validate session + active purchase + lesson ownership before issuing token.
  - Concurrent stream/device limit via Redis is not implemented.
- **Freebies backend is partial** (Section 12.5):
  - `GET /api/freebies` currently returns empty list.
  - `GET /api/freebies/download/:id` returns placeholder payload; no signed URL or verification guard.
- **Admin system is largely pending** (Section 14):
  - `/admin` page is a shell.
  - `/api/admin/users` is placeholder.
  - Other required admin endpoints/features are missing.
- **Auth strategy alignment decision is pending**:
  - Spec Section 8 describes OTP-first auth, while current build uses Google + Telegram for main login.
  - Need explicit product decision and documentation sync for final auth scope.
- **Middleware/admin-role hardening required**:
  - Admin role enforcement logic should be reviewed for strict role checks on `/admin/*`.
- **Twilio config cleanup**:
  - `lib/sms.ts` still references `TWILIO_WHATSAPP_FROM` while `.env.example` no longer defines it.
- **Quality/completion items from prompt still pending**:
  - Replace placeholder links/text (e.g., pricing CTA `href="#"`, static instructor/testimonial assets where required).
  - Complete analytics, SEO, and production readiness checklist items from later sections of instructions.

