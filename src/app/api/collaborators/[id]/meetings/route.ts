import { NextResponse } from 'next/server';
import { CollaboratorSDK } from '@/lib/collaborators';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// POST /api/collaborators/[id]/meetings - Add meeting to collaborator
export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { shareUrl, title, recordedAt } = body;

    if (!shareUrl || !title) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: shareUrl, title' },
        { status: 400 }
      );
    }

    const result = CollaboratorSDK.addMeeting(id, {
      shareUrl,
      title,
      recordedAt,
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    // Generate notification email if requested
    let email_content = null;
    if (body.sendNotification) {
      email_content = CollaboratorSDK.generateMeetingNotificationEmail(id, title, shareUrl);
    }

    return NextResponse.json({
      success: true,
      collaborator: {
        id: result.collaborator?.id,
        name: result.collaborator?.name,
        meetingCount: result.collaborator?.fathomMeetings?.length || 0,
      },
      email: email_content,
      message: 'Meeting added successfully',
    });
  } catch (error) {
    console.error('Error adding meeting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add meeting' },
      { status: 500 }
    );
  }
}

// DELETE /api/collaborators/[id]/meetings - Remove meeting from collaborator
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const meetingId = searchParams.get('meetingId');

    if (!meetingId) {
      return NextResponse.json(
        { success: false, error: 'Missing meetingId query parameter' },
        { status: 400 }
      );
    }

    const result = CollaboratorSDK.removeMeeting(id, meetingId);

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Meeting removed successfully',
    });
  } catch (error) {
    console.error('Error removing meeting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove meeting' },
      { status: 500 }
    );
  }
}
