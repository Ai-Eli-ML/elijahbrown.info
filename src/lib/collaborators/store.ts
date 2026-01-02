// Collaborator Store
// In-memory store for development, can be replaced with database

import { Collaborator, FathomMeetingRef } from './types';

// In-memory collaborator store
// TODO: Replace with database (Supabase, Prisma, etc.) for production
const collaborators: Map<string, Collaborator> = new Map();

// Initialize with existing collaborators
function initializeStore() {
  // Colleen - PaperPrisons
  collaborators.set('colleen', {
    id: 'colleen',
    name: 'Colleen',
    email: '', // Add email when available
    slug: 'colleen',
    password: 'Berkeley',
    subdomain: 'berkeley',
    projectName: 'PaperPrisons.org',
    projectDescription: 'Next.js application with diary/blog navigation for prison reform advocacy',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
    status: 'active',
    fathomMeetings: [
      {
        id: 'meeting-1',
        shareUrl: 'https://fathom.video/share/xEDZo5z_fvGXN1HJjXGMRHVBnsA58Hpv',
        title: 'Meeting Notes #1',
        recordedAt: '2025-01-01T00:00:00Z',
        addedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'meeting-2',
        shareUrl: 'https://fathom.video/share/vzNkscgP9cTjuQSYsbFrfNkmRQi6P26V',
        title: 'Meeting Notes #2',
        recordedAt: '2025-01-02T00:00:00Z',
        addedAt: '2025-01-02T00:00:00Z',
      },
    ],
    notificationPreferences: {
      email: true,
      meetingNotifications: true,
      updateNotifications: true,
    },
  });

  // Jermaine
  collaborators.set('jermaine', {
    id: 'jermaine',
    name: 'Jermaine',
    email: '', // Add email when available
    slug: 'jermaine',
    password: 'Dessalines1804',
    projectName: 'Collaboration Project',
    createdAt: '2025-01-02T00:00:00Z',
    updatedAt: new Date().toISOString(),
    status: 'active',
    fathomMeetings: [],
    notificationPreferences: {
      email: true,
      meetingNotifications: true,
      updateNotifications: true,
    },
  });
}

// Initialize on module load
initializeStore();

// Store operations
export const collaboratorStore = {
  // Get all collaborators
  getAll(): Collaborator[] {
    return Array.from(collaborators.values());
  },

  // Get collaborator by ID
  getById(id: string): Collaborator | undefined {
    return collaborators.get(id);
  },

  // Get collaborator by slug
  getBySlug(slug: string): Collaborator | undefined {
    return Array.from(collaborators.values()).find(c => c.slug === slug);
  },

  // Get collaborator by subdomain
  getBySubdomain(subdomain: string): Collaborator | undefined {
    return Array.from(collaborators.values()).find(c => c.subdomain === subdomain);
  },

  // Create new collaborator
  create(collaborator: Collaborator): Collaborator {
    collaborators.set(collaborator.id, collaborator);
    return collaborator;
  },

  // Update collaborator
  update(id: string, updates: Partial<Collaborator>): Collaborator | undefined {
    const existing = collaborators.get(id);
    if (!existing) return undefined;

    const updated: Collaborator = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    collaborators.set(id, updated);
    return updated;
  },

  // Delete collaborator
  delete(id: string): boolean {
    return collaborators.delete(id);
  },

  // Add meeting to collaborator
  addMeeting(id: string, meeting: FathomMeetingRef): Collaborator | undefined {
    const existing = collaborators.get(id);
    if (!existing) return undefined;

    const updated: Collaborator = {
      ...existing,
      fathomMeetings: [...(existing.fathomMeetings || []), meeting],
      updatedAt: new Date().toISOString(),
    };
    collaborators.set(id, updated);
    return updated;
  },

  // Remove meeting from collaborator
  removeMeeting(id: string, meetingId: string): Collaborator | undefined {
    const existing = collaborators.get(id);
    if (!existing) return undefined;

    const updated: Collaborator = {
      ...existing,
      fathomMeetings: (existing.fathomMeetings || []).filter(m => m.id !== meetingId),
      updatedAt: new Date().toISOString(),
    };
    collaborators.set(id, updated);
    return updated;
  },

  // Verify password
  verifyPassword(slug: string, password: string): boolean {
    const collaborator = this.getBySlug(slug);
    if (!collaborator) return false;
    return collaborator.password === password;
  },

  // Get middleware config
  getMiddlewareConfig(): Record<string, { password: string; cookieName: string; loginPath: string }> {
    const config: Record<string, { password: string; cookieName: string; loginPath: string }> = {};

    for (const collaborator of collaborators.values()) {
      if (collaborator.status === 'active') {
        config[collaborator.slug] = {
          password: collaborator.password,
          cookieName: `${collaborator.slug}-auth`,
          loginPath: `/${collaborator.slug}/login`,
        };
      }
    }

    return config;
  },
};

export default collaboratorStore;
