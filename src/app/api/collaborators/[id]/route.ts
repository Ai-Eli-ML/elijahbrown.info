import { NextResponse } from 'next/server';
import { CollaboratorSDK } from '@/lib/collaborators';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/collaborators/[id] - Get collaborator details
export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const collaborator = CollaboratorSDK.getCollaborator(id);

    if (!collaborator) {
      return NextResponse.json(
        { success: false, error: 'Collaborator not found' },
        { status: 404 }
      );
    }

    // Return without password
    const { password, ...safeCollaborator } = collaborator;

    return NextResponse.json({
      success: true,
      collaborator: safeCollaborator,
    });
  } catch (error) {
    console.error('Error fetching collaborator:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collaborator' },
      { status: 500 }
    );
  }
}

// PUT /api/collaborators/[id] - Update collaborator
export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const result = CollaboratorSDK.updateCollaborator(id, body);

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    const { password, ...safeCollaborator } = result.collaborator!;

    return NextResponse.json({
      success: true,
      collaborator: safeCollaborator,
      message: 'Collaborator updated successfully',
    });
  } catch (error) {
    console.error('Error updating collaborator:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update collaborator' },
      { status: 500 }
    );
  }
}

// DELETE /api/collaborators/[id] - Delete collaborator
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const result = CollaboratorSDK.deleteCollaborator(id);

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Collaborator deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting collaborator:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete collaborator' },
      { status: 500 }
    );
  }
}
