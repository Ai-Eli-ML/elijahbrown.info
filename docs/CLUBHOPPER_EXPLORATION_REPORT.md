# Exploration Report: Club Hopper Project

**Generated:** January 15, 2026
**Project:** elijahbrown.info/clubhopper
**Status:** Planning & Design (10% Complete)

---

## Executive Summary

**Club Hopper** is a mobile nightlife discovery and VIP access platform for Albany, NY's underground party scene. The project combines VIP booking, live streaming, and creator monetization into a single app.

**Core Value Proposition:** The gateway to Albany's underground VIP nightlife - curated discovery, exclusive access, and community-driven hype.

---

## Source Data Analysis

### ChatGPT Conversation Timeline

| Conversation | Date | Messages | Key Outputs |
|--------------|------|----------|-------------|
| Club Hopper App Dev | 2025-07-02 19:48 | 17 | Initial concept, Lovable prompt v1 |
| Club Hopper App Plan | 2025-07-02 20:04 | 54 | UI mockups, streaming-first decision, component specs |
| Thoughts sharing session | 2025-07-29 13:34 | 12 | Task prioritization, repo setup |

### Key Decisions from Conversations

1. **Experience Priority:** Streaming-first (Option B) chosen over VIP-first or Creator-first
2. **Target Market:** Albany Capital District, 25-44 demographic + UAlbany students
3. **Business Model:** Membership subscriptions + VIP commissions + Creator platform fees
4. **Tech Stack:** React Native + Expo, Supabase, Stripe, Twitch/TikTok APIs, Whop

---

## Project Structure

### Website Dashboard (`elijahbrown.info/clubhopper`)

```
src/app/clubhopper/
├── layout.tsx          # Root layout with dark theme
├── page.tsx            # Main dashboard (team, timeline, features)
├── page.module.css     # Nightlife-themed styling
└── login/
    ├── page.tsx        # Password gate (TheMemberz)
    └── page.module.css # Login styling
```

**Access:** Password-protected (`TheMemberz`)

### Development Environment (`Business/clubhopper`)

```
Business/clubhopper/
├── src/
│   ├── app/            # Expo Router pages (planned)
│   └── types/          # TypeScript interfaces
├── docs/
│   ├── meetings/       # Fathom meeting recaps
│   ├── EXPERT_PANEL.md # Virtual consultants
│   └── MARKET_RESEARCH.md
├── data/
│   ├── CLUBHOPPER_DETAILS.md    # Full ChatGPT export
│   └── clubhoper_extract.json   # Raw JSON data
├── scripts/
│   └── update-website.js        # Auto-sync script
├── CLAUDE.md           # Development guide
├── package.json        # React Native + Expo deps
└── app.json            # Expo configuration
```

---

## Feature Specification

### Core Features (from ChatGPT Planning)

| Feature | Priority | Status | Description |
|---------|----------|--------|-------------|
| Live Now Feed | P1 | Planned | Streaming hub with Twitch/TikTok embeds |
| Influencer Hub | P1 | Planned | UGC contests, earnings dashboard |
| Club Discovery | P2 | Planned | Swipeable venue cards |
| VIP Booking | P2 | Planned | Concierge-style reservation flow |
| Membership | P3 | Planned | Monthly subscription for exclusives |
| Social Sync | P3 | Planned | Auto-pull @clubhopper tagged posts |

### Streaming-First Architecture (Option B)

```
┌─────────────────────────────────────┐
│          LIVE NOW TAB               │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │ Stream 1│ │ Stream 2│ │Stream 3│ │
│  │ 🔴 LIVE │ │ 🔴 LIVE │ │ 🔴 LIVE│ │
│  └─────────┘ └─────────┘ └────────┘ │
│  [Twitch API] [Kick API] [TikTok]   │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│        INFLUENCER HUB               │
│  Views: 2,450 / 10,000              │
│  Payout: $24.50 pending             │
│  Status: Rising Creator             │
│  [Apply for VIP] [Link Accounts]    │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│        VIP BOOKING                  │
│  Club: Rocks Albany                 │
│  Section: VIP Booth 1               │
│  Price: $500 + 2 bottles            │
│  [Book with Concierge]              │
└─────────────────────────────────────┘
```

---

## Team Structure

| Role | Person | Responsibilities |
|------|--------|------------------|
| Dev Lead | Elijah | Engineering, backend, project page |
| Marketing Lead | Q | Marketing plan, Stripe, venue photos |
| Ops/QA | America | Operations, QA, KPIs |
| Communications | Cyril | Venue outreach, email templates |

---

## Technology Stack

### Frontend (Mobile)
- **Framework:** React Native with Expo SDK 52
- **Router:** Expo Router v4
- **Styling:** NativeWind (Tailwind CSS)
- **State:** Zustand
- **Animations:** Framer Motion

### Backend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth + OAuth (Google, Twitch, TikTok)
- **Storage:** Supabase Storage + AWS S3
- **Payments:** Stripe

### Integrations
- **Streaming:** Twitch API, Kick API, TikTok Live API
- **Creator Rewards:** Whop API
- **Social:** Instagram Graph API
- **Notifications:** Expo Notifications + SendGrid

### Design System
- **Font:** Inter or Urbanist
- **Colors:**
  - Primary: #000000 (Blackout)
  - Accent: #FF2D55 (Neon Pink)
  - Secondary: #A855F7 (Purple)
  - Background: Dark purple gradients
- **Theme:** Mobile-first, luxury-street, neon highlights

---

## Business Strategy

### Revenue Streams
1. **Membership Subscriptions** - Access to exclusive Club Hopper events
2. **VIP Booking Commissions** - Fee on each VIP section booking
3. **Creator Platform Fees** - Percentage of creator payouts via Whop

### "Club Hopper Hub" Concept
- Physical presence at Saucy's venue as central event liaison
- Offer discounted VIP sections, bottles, and promotional packages
- Build legitimacy through venue partnerships

### Creator Monetization
- UGC contests with view-based payouts (1,000 views = payout threshold)
- Influencer streaming from venues with merch affiliate revenue
- VIP perks for top creators (section + bottle)

### User Acquisition
- Fund initial users with $100 credits (entry + drinks)
- Lower barrier to entry for first-time users
- Word-of-mouth through exclusive events

---

## Market Analysis

### Albany Demographics
- **Median Age:** ~32 years
- **Target Income:** $68k (25-44 age group)
- **Key Venues:** Rocks, Waterworks, Savoy Taproom, Saucy's
- **Opportunity:** Underground scene lacks centralized discovery platform

### Industry Context
- NY State Bar & Nightclub Industry: $3.3 billion (2025)
- Global bars/nightclubs market: $105.3B → $137.7B by 2033
- Average gross profit margins on drinks: 65-80%

---

## Development Timeline

| Phase | Timeframe | Milestones |
|-------|-----------|------------|
| Planning | Jan 2026 | ✅ Team formed, ✅ Project page, Wireframes |
| MVP Dev | Feb 2026 | Core screens, Supabase setup, Miami trip |
| Beta | Q1 2026 | Albany beta launch, venue partnerships |
| Launch | Q2 2026 | Full Capital District launch |

---

## Action Items

### Elijah (Dev Lead)
- [x] Create password-protected project page
- [ ] Contact Regan Suarez (Flavors owner)
- [ ] Set up Supabase database schema
- [ ] Build Live Now tab component

### Q (Marketing)
- [ ] Create Stripe account
- [ ] Develop marketing plan
- [ ] Collect venue photos (exteriors/interiors)

### America (Ops/QA)
- [ ] Define KPIs for project tracking
- [ ] Set up project management workflow

### Cyril (Communications)
- [ ] Prepare email/text templates for venue outreach
- [ ] Create list of target venues

### All
- [ ] Plan Miami trip (early February)
- [ ] Meet with Richie, Animal, and TK

---

## Discord Integration

**Server:** COOL
**Category:** Club Hopper (1461397181767356529)

| Channel | ID | Purpose |
|---------|-----|---------|
| #general | 1461397350479302960 | General discussion |
| #dev-logs | 1461397352308015258 | Build/deploy notifications |
| #design | 1461397354241327145 | UI/UX discussion |
| #voice-meetings | 1461397355650617407 | Voice calls |

---

## Expert Panel (Virtual Consultants)

1. **UX/UI Expert** - Mobile-first nightlife design
2. **Payment Systems Expert** - Stripe integration for VIP bookings
3. **Streaming Integration Expert** - Twitch/TikTok API implementation
4. **Albany Market Expert** - Local nightlife scene knowledge
5. **Creator Economy Expert** - Influencer platform mechanics
6. **Legal/Compliance Expert** - Age verification, liability
7. **Growth Marketing Expert** - User acquisition strategies

---

## Files Reference

| File | Location | Purpose |
|------|----------|---------|
| CLUBHOPPER_DETAILS.md | Business/clubhopper/data/ | Full ChatGPT export (2289 lines) |
| clubhoper_extract.json | Business/clubhopper/data/ | Raw JSON conversation data |
| 2026-01-15-development-call.md | Business/clubhopper/docs/meetings/ | Fathom recap |
| MARKET_RESEARCH.md | Business/clubhopper/docs/ | Industry analysis |
| EXPERT_PANEL.md | Business/clubhopper/docs/ | Virtual consultants |

---

## Next Steps

1. **Immediate:** Review this report with team
2. **This Week:** Set up Supabase and create database schema
3. **Next Week:** Begin Live Now tab development
4. **February:** Miami trip for investor/partner meetings

---

**Report Generated By:** Claude Code
**Last Updated:** January 15, 2026
