# Fathom Integration Plan for elijahbrown.info

## Overview
Integrate Fathom AI meeting notes directly into the Colleen protected page, replacing static links with live meeting data.

---

## Phase 1: Setup & Authentication (30 min)

### 1.1 Install Dependencies
```bash
cd Research/elijahbrown.info
npm install fathom-typescript
```

### 1.2 Environment Configuration
Add to `.env.local`:
```bash
FATHOM_API_KEY=your_api_key_here
```

### 1.3 Get API Key
1. Log into Fathom (https://fathom.video)
2. Go to Settings > API
3. Generate new API key
4. Add to `.env.local`

---

## Phase 2: API Route (1 hour)

### 2.1 Create Fathom API Route
Create `src/app/api/fathom/meetings/route.ts`:

```typescript
import { NextResponse } from 'next/server';

const FATHOM_API_KEY = process.env.FATHOM_API_KEY;
const FATHOM_BASE_URL = 'https://api.fathom.ai/external/v1';

export async function GET() {
  if (!FATHOM_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(`${FATHOM_BASE_URL}/meetings?include_summary=true&include_action_items=true`, {
      headers: {
        'X-Api-Key': FATHOM_API_KEY,
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Fathom API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fathom API error:', error);
    return NextResponse.json({ error: 'Failed to fetch meetings' }, { status: 500 });
  }
}
```

### 2.2 Create Transcript Endpoint
Create `src/app/api/fathom/transcript/[id]/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(
    `https://api.fathom.ai/external/v1/recordings/${params.id}/transcript`,
    {
      headers: { 'X-Api-Key': process.env.FATHOM_API_KEY! },
      next: { revalidate: 3600 } // Cache for 1 hour
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
```

---

## Phase 3: UI Components (2 hours)

### 3.1 Meeting List Component
Create `src/components/fathom/MeetingList.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import styles from './MeetingList.module.css';

interface Meeting {
  id: number;
  title: string;
  recorded_at: string;
  share_url: string;
  summary?: {
    markdown_formatted: string;
  };
  action_items?: Array<{
    text: string;
    completed: boolean;
  }>;
}

export function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/fathom/meetings')
      .then(res => res.json())
      .then(data => {
        setMeetings(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading meetings...</div>;

  return (
    <div className={styles.meetingList}>
      {meetings.map(meeting => (
        <div key={meeting.id} className={styles.meetingCard}>
          <div 
            className={styles.meetingHeader}
            onClick={() => setExpandedId(expandedId === meeting.id ? null : meeting.id)}
          >
            <h3>{meeting.title}</h3>
            <span>{new Date(meeting.recorded_at).toLocaleDateString()}</span>
          </div>
          
          {expandedId === meeting.id && (
            <div className={styles.meetingContent}>
              {meeting.summary && (
                <div className={styles.summary}>
                  <h4>Summary</h4>
                  <div dangerouslySetInnerHTML={{ 
                    __html: meeting.summary.markdown_formatted 
                  }} />
                </div>
              )}
              
              {meeting.action_items?.length > 0 && (
                <div className={styles.actionItems}>
                  <h4>Action Items</h4>
                  <ul>
                    {meeting.action_items.map((item, i) => (
                      <li key={i} className={item.completed ? styles.completed : ''}>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <a href={meeting.share_url} target="_blank" rel="noopener noreferrer">
                View Full Recording →
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

### 3.2 Update Colleen Page
Update `src/app/colleen/page.tsx` to use the component:

```typescript
import { MeetingList } from '@/components/fathom/MeetingList';

// In the page, replace static links with:
<div className={styles.card}>
  <h2>Meeting Notes</h2>
  <p>Live meeting recordings and AI-generated notes:</p>
  <MeetingList />
</div>
```

---

## Phase 4: Webhook for Real-time Updates (Optional, 1 hour)

### 4.1 Create Webhook Endpoint
Create `src/app/api/webhooks/fathom/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json();
  
  // Log new meeting notification
  console.log('New Fathom meeting:', payload);
  
  // Optional: Send notification, update cache, etc.
  
  return NextResponse.json({ received: true });
}
```

### 4.2 Register Webhook with Fathom
```typescript
// One-time setup script
const response = await fetch('https://api.fathom.ai/external/v1/webhooks', {
  method: 'POST',
  headers: {
    'X-Api-Key': FATHOM_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://elijahbrown.info/api/webhooks/fathom',
    events: ['meeting.ready']
  })
});
```

---

## Phase 5: Fix Console Errors (15 min)

### 5.1 Analytics 405 Error
The `/api/analytics` 405 error is from Vercel Analytics. Fix options:

**Option A: Remove custom analytics route if not needed**
Check if `src/app/api/analytics/route.ts` exists and either:
- Add POST method support
- Remove the file if using Vercel's built-in analytics

**Option B: Add POST handler**
```typescript
// src/app/api/analytics/route.ts
export async function POST(request: Request) {
  // Handle analytics or return 200 OK
  return new Response(null, { status: 200 });
}
```

### 5.2 CSS Preload Warning
This is a minor Next.js optimization warning. It means a CSS file was preloaded but loaded via a different mechanism. Not critical - can be ignored or fixed by adjusting font/CSS loading in `layout.tsx`.

### 5.3 ERR_BLOCKED_BY_CLIENT
This is caused by ad blockers blocking Vercel's analytics script. Not a bug - expected behavior when users have ad blockers.

---

## Implementation Checklist

- [ ] Get Fathom API key from dashboard
- [ ] Add `FATHOM_API_KEY` to `.env.local`
- [ ] Install `fathom-typescript` package
- [ ] Create `/api/fathom/meetings` route
- [ ] Create `/api/fathom/transcript/[id]` route
- [ ] Create `MeetingList` component
- [ ] Update Colleen page with live meetings
- [ ] (Optional) Set up webhook for real-time updates
- [ ] Fix analytics 405 error
- [ ] Test in production

---

## Security Considerations

1. **API Key Protection**: Keep `FATHOM_API_KEY` server-side only (no `NEXT_PUBLIC_` prefix)
2. **Protected Routes**: Meeting data is only accessible through authenticated `/colleen` page
3. **Rate Limiting**: Fathom API has rate limits - use caching (`revalidate`)
4. **Webhook Verification**: Add signature verification for webhook endpoint

---

## Alternative: Quick Fix Without API

If you just want to fix the share URL access issue, Fathom share links require:
1. User must be logged into Fathom, OR
2. The recording must be set to "Public" sharing

The share URLs you have should work directly in browser - the fetch failures are because the pages require JavaScript rendering.

---

## Timeline Estimate

| Phase | Time | Priority |
|-------|------|----------|
| Phase 1: Setup | 30 min | High |
| Phase 2: API Routes | 1 hour | High |
| Phase 3: UI Components | 2 hours | High |
| Phase 4: Webhooks | 1 hour | Low |
| Phase 5: Console Fixes | 15 min | Medium |
| **Total** | **~4-5 hours** | |

---

## Next Steps

1. **Get API Key**: Log into Fathom → Settings → API → Generate Key
2. **Share the key**: Add to `.env.local` or tell me and I'll configure it
3. **Choose scope**: Full integration (Phases 1-4) or just fix errors (Phase 5)?
