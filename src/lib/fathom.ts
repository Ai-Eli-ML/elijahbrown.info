// Fathom AI API Client
// Centralized client for meeting intelligence

const FATHOM_API_KEY = process.env.FATHOM_API_KEY;
const FATHOM_BASE_URL = 'https://api.fathom.ai/external/v1';

export interface FathomMeeting {
  id: number;
  title: string;
  recording_id: number;
  url: string;
  share_url: string;
  scheduled_at: string;
  recorded_at: string;
  calendar_invitees: Array<{
    email: string;
    domain: string;
    is_external: boolean;
  }>;
  summary?: {
    template_name: string;
    markdown_formatted: string;
  };
  action_items?: Array<{
    text: string;
    completed: boolean;
    assignee?: string;
  }>;
  transcript?: Array<{
    speaker: {
      display_name: string;
      matched_calendar_invitee_email: string | null;
    };
    text: string;
    timestamp: string;
  }>;
}

export interface FathomMeetingsResponse {
  limit: number;
  next_cursor: string | null;
  items: FathomMeeting[];
}

export async function fetchFathomMeetings(options?: {
  includeSummary?: boolean;
  includeTranscript?: boolean;
  includeActionItems?: boolean;
  createdAfter?: string;
  limit?: number;
}): Promise<FathomMeetingsResponse> {
  if (!FATHOM_API_KEY) {
    throw new Error('FATHOM_API_KEY not configured');
  }

  const params = new URLSearchParams();
  if (options?.includeSummary) params.append('include_summary', 'true');
  if (options?.includeTranscript) params.append('include_transcript', 'true');
  if (options?.includeActionItems) params.append('include_action_items', 'true');
  if (options?.createdAfter) params.append('created_after', options.createdAfter);
  if (options?.limit) params.append('limit', options.limit.toString());

  const response = await fetch(`${FATHOM_BASE_URL}/meetings?${params}`, {
    headers: {
      'X-Api-Key': FATHOM_API_KEY,
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Fathom API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchMeetingSummary(recordingId: number): Promise<{
  summary: { template_name: string; markdown_formatted: string };
}> {
  if (!FATHOM_API_KEY) {
    throw new Error('FATHOM_API_KEY not configured');
  }

  const response = await fetch(`${FATHOM_BASE_URL}/recordings/${recordingId}/summary`, {
    headers: {
      'X-Api-Key': FATHOM_API_KEY,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Fathom API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchMeetingTranscript(recordingId: number): Promise<{
  transcript: Array<{
    speaker: { display_name: string; matched_calendar_invitee_email: string | null };
    text: string;
    timestamp: string;
  }>;
}> {
  if (!FATHOM_API_KEY) {
    throw new Error('FATHOM_API_KEY not configured');
  }

  const response = await fetch(`${FATHOM_BASE_URL}/recordings/${recordingId}/transcript`, {
    headers: {
      'X-Api-Key': FATHOM_API_KEY,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Fathom API error: ${response.status}`);
  }

  return response.json();
}

// Verify webhook signature
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.FATHOM_WEBHOOK_SECRET;
  if (!secret) return false;
  
  // Fathom uses HMAC-SHA256 for webhook signatures
  const crypto = require('crypto');
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === `sha256=${expectedSig}`;
}
