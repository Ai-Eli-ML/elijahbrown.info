// Collaborator Framework SDK
// Main entry point for collaborator management

export * from './types';
export * from './store';
export * from './generator';

import { collaboratorStore } from './store';
import {
  generatePageConfig,
  generatePageCode,
  generateLoginPageCode,
  generateMiddlewareEntry,
  generateWelcomeEmail,
  generateMeetingNotificationEmail,
} from './generator';
import {
  Collaborator,
  CreateCollaboratorRequest,
  UpdateCollaboratorRequest,
  AddMeetingRequest,
  CollaboratorResponse,
  FathomMeetingRef,
} from './types';

/**
 * Collaborator Framework SDK
 *
 * Usage:
 * ```typescript
 * import { CollaboratorSDK } from '@/lib/collaborators';
 *
 * // Create a new collaborator
 * const result = await CollaboratorSDK.createCollaborator({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   slug: 'john',
 *   password: 'SecurePassword123',
 *   projectName: 'Project X',
 * });
 *
 * // Add a meeting
 * await CollaboratorSDK.addMeeting('john', {
 *   shareUrl: 'https://fathom.video/share/...',
 *   title: 'Kickoff Meeting',
 * });
 *
 * // Generate welcome email
 * const email = CollaboratorSDK.generateWelcomeEmail('john');
 * ```
 */
export const CollaboratorSDK = {
  // ============================================================
  // COLLABORATOR MANAGEMENT
  // ============================================================

  /**
   * Get all collaborators
   */
  getAllCollaborators(): Collaborator[] {
    return collaboratorStore.getAll();
  },

  /**
   * Get collaborator by ID or slug
   */
  getCollaborator(idOrSlug: string): Collaborator | undefined {
    return collaboratorStore.getById(idOrSlug) || collaboratorStore.getBySlug(idOrSlug);
  },

  /**
   * Create a new collaborator
   */
  createCollaborator(request: CreateCollaboratorRequest): CollaboratorResponse {
    // Validate slug is unique
    if (collaboratorStore.getBySlug(request.slug)) {
      return { success: false, error: 'Slug already exists' };
    }

    // Create collaborator
    const collaborator: Collaborator = {
      id: request.slug, // Use slug as ID for simplicity
      name: request.name,
      email: request.email,
      slug: request.slug,
      password: request.password,
      subdomain: request.subdomain,
      projectName: request.projectName,
      projectDescription: request.projectDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      fathomMeetings: (request.fathomShareUrls || []).map((url, i) => ({
        id: `meeting-${i + 1}`,
        shareUrl: url,
        title: `Meeting Notes #${i + 1}`,
        recordedAt: new Date().toISOString(),
        addedAt: new Date().toISOString(),
      })),
      notificationPreferences: {
        email: true,
        meetingNotifications: true,
        updateNotifications: true,
      },
    };

    const created = collaboratorStore.create(collaborator);
    return { success: true, collaborator: created };
  },

  /**
   * Update a collaborator
   */
  updateCollaborator(id: string, request: UpdateCollaboratorRequest): CollaboratorResponse {
    const updated = collaboratorStore.update(id, request);
    if (!updated) {
      return { success: false, error: 'Collaborator not found' };
    }
    return { success: true, collaborator: updated };
  },

  /**
   * Delete a collaborator
   */
  deleteCollaborator(id: string): { success: boolean; error?: string } {
    const deleted = collaboratorStore.delete(id);
    if (!deleted) {
      return { success: false, error: 'Collaborator not found' };
    }
    return { success: true };
  },

  // ============================================================
  // MEETING MANAGEMENT
  // ============================================================

  /**
   * Add a meeting to a collaborator
   */
  addMeeting(
    collaboratorId: string,
    meeting: { shareUrl: string; title: string; recordedAt?: string }
  ): CollaboratorResponse {
    const meetingRef: FathomMeetingRef = {
      id: `meeting-${Date.now()}`,
      shareUrl: meeting.shareUrl,
      title: meeting.title,
      recordedAt: meeting.recordedAt || new Date().toISOString(),
      addedAt: new Date().toISOString(),
    };

    const updated = collaboratorStore.addMeeting(collaboratorId, meetingRef);
    if (!updated) {
      return { success: false, error: 'Collaborator not found' };
    }
    return { success: true, collaborator: updated };
  },

  /**
   * Remove a meeting from a collaborator
   */
  removeMeeting(collaboratorId: string, meetingId: string): CollaboratorResponse {
    const updated = collaboratorStore.removeMeeting(collaboratorId, meetingId);
    if (!updated) {
      return { success: false, error: 'Collaborator or meeting not found' };
    }
    return { success: true, collaborator: updated };
  },

  // ============================================================
  // CODE GENERATION
  // ============================================================

  /**
   * Generate page configuration for a collaborator
   */
  generatePageConfig(collaboratorId: string) {
    const collaborator = this.getCollaborator(collaboratorId);
    if (!collaborator) return null;
    return generatePageConfig(collaborator);
  },

  /**
   * Generate page component code
   */
  generatePageCode(collaboratorId: string): string | null {
    const collaborator = this.getCollaborator(collaboratorId);
    if (!collaborator) return null;
    return generatePageCode(collaborator);
  },

  /**
   * Generate login page code
   */
  generateLoginPageCode(collaboratorId: string): string | null {
    const collaborator = this.getCollaborator(collaboratorId);
    if (!collaborator) return null;
    return generateLoginPageCode(collaborator);
  },

  /**
   * Generate middleware entry
   */
  generateMiddlewareEntry(collaboratorId: string): string | null {
    const collaborator = this.getCollaborator(collaboratorId);
    if (!collaborator) return null;
    return generateMiddlewareEntry(collaborator);
  },

  /**
   * Get middleware config for all collaborators
   */
  getMiddlewareConfig() {
    return collaboratorStore.getMiddlewareConfig();
  },

  // ============================================================
  // EMAIL GENERATION
  // ============================================================

  /**
   * Generate welcome email for a collaborator
   */
  generateWelcomeEmail(collaboratorId: string, baseUrl?: string) {
    const collaborator = this.getCollaborator(collaboratorId);
    if (!collaborator) return null;
    return generateWelcomeEmail(collaborator, baseUrl);
  },

  /**
   * Generate meeting notification email
   */
  generateMeetingNotificationEmail(
    collaboratorId: string,
    meetingTitle: string,
    shareUrl: string
  ) {
    const collaborator = this.getCollaborator(collaboratorId);
    if (!collaborator) return null;
    return generateMeetingNotificationEmail(collaborator, meetingTitle, shareUrl);
  },

  // ============================================================
  // AUTHENTICATION
  // ============================================================

  /**
   * Verify collaborator password
   */
  verifyPassword(slug: string, password: string): boolean {
    return collaboratorStore.verifyPassword(slug, password);
  },
};

export default CollaboratorSDK;
