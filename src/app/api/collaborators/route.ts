import { NextResponse } from 'next/server';
import { CollaboratorSDK } from '@/lib/collaborators';

// GET /api/collaborators - List all collaborators
export async function GET() {
  try {
    const collaborators = CollaboratorSDK.getAllCollaborators();

    // Return without sensitive data
    const safeCollaborators = collaborators.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      subdomain: c.subdomain,
      projectName: c.projectName,
      status: c.status,
      meetingCount: c.fathomMeetings?.length || 0,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      collaborators: safeCollaborators,
      total: safeCollaborators.length,
    });
  } catch (error) {
    console.error('Error fetching collaborators:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collaborators' },
      { status: 500 }
    );
  }
}

// POST /api/collaborators - Create a new collaborator
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, slug, password, projectName } = body;
    if (!name || !slug || !password || !projectName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, slug, password, projectName' },
        { status: 400 }
      );
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { success: false, error: 'Slug must contain only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    const result = CollaboratorSDK.createCollaborator({
      name,
      email: email || '',
      slug,
      password,
      subdomain: body.subdomain,
      projectName,
      projectDescription: body.projectDescription,
      fathomShareUrls: body.fathomShareUrls || [],
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    // Generate welcome email if requested
    let email_content = null;
    if (body.generateEmail) {
      email_content = CollaboratorSDK.generateWelcomeEmail(slug);
    }

    return NextResponse.json({
      success: true,
      collaborator: {
        id: result.collaborator?.id,
        name: result.collaborator?.name,
        slug: result.collaborator?.slug,
        projectName: result.collaborator?.projectName,
        accessUrl: result.collaborator?.subdomain
          ? `https://${result.collaborator.subdomain}.elijahbrown.info`
          : `https://elijahbrown.info/${result.collaborator?.slug}`,
      },
      email: email_content,
      message: 'Collaborator created successfully',
    });
  } catch (error) {
    console.error('Error creating collaborator:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create collaborator' },
      { status: 500 }
    );
  }
}
