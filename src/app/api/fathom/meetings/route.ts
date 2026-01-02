import { NextResponse } from 'next/server';
import { fetchFathomMeetings } from '@/lib/fathom';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeSummary = searchParams.get('summary') !== 'false';
    const includeActionItems = searchParams.get('actions') !== 'false';
    
    const meetings = await fetchFathomMeetings({
      includeSummary,
      includeActionItems,
      limit: 20,
    });

    return NextResponse.json(meetings);
  } catch (error) {
    console.error('Fathom API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}
