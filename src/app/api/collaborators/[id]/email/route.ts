import { NextResponse } from 'next/server';
import { CollaboratorSDK } from '@/lib/collaborators';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/collaborators/[id]/email - Generate email for collaborator
export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'welcome';
    const meetingTitle = searchParams.get('meetingTitle');
    const shareUrl = searchParams.get('shareUrl');

    const collaborator = CollaboratorSDK.getCollaborator(id);
    if (!collaborator) {
      return NextResponse.json(
        { success: false, error: 'Collaborator not found' },
        { status: 404 }
      );
    }

    let email;

    if (type === 'meeting' && meetingTitle && shareUrl) {
      email = CollaboratorSDK.generateMeetingNotificationEmail(id, meetingTitle, shareUrl);
    } else {
      email = CollaboratorSDK.generateWelcomeEmail(id);
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      email: {
        to: collaborator.email || '[email not set]',
        subject: email.subject,
        html: email.html,
        text: email.text,
      },
    });
  } catch (error) {
    console.error('Error generating email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}
