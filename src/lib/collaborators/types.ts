// Collaborator Framework Types
// SDK for seamlessly deploying protected pages after meetings

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  slug: string; // URL path e.g., 'colleen' for /colleen
  password: string;
  subdomain?: string; // Optional subdomain e.g., 'berkeley' for berkeley.elijahbrown.info
  projectName: string;
  projectDescription?: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'pending';
  fathomMeetings?: FathomMeetingRef[];
  customContent?: CollaboratorContent;
  notificationPreferences?: NotificationPreferences;
}

export interface FathomMeetingRef {
  id: string;
  shareUrl: string;
  title: string;
  recordedAt: string;
  addedAt: string;
}

export interface CollaboratorContent {
  welcomeMessage?: string;
  sections?: ContentSection[];
  documents?: Document[];
  links?: ExternalLink[];
}

export interface ContentSection {
  id: string;
  title: string;
  content: string; // Markdown or HTML
  type: 'architecture' | 'documentation' | 'notes' | 'custom';
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface Document {
  id: string;
  title: string;
  url: string;
  type: 'pdf' | 'doc' | 'spreadsheet' | 'presentation' | 'other';
}

export interface ExternalLink {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms?: boolean;
  meetingNotifications: boolean;
  updateNotifications: boolean;
}

export interface CollaboratorPageConfig {
  collaborator: Collaborator;
  theme?: PageTheme;
  features?: PageFeatures;
}

export interface PageTheme {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundGradient?: string[];
  accentColor?: string;
}

export interface PageFeatures {
  showFathomMeetings: boolean;
  showLiveMeetingFeed: boolean;
  showContactCard: boolean;
  showProjectProgress?: boolean;
  customComponents?: string[];
}

// API Types
export interface CreateCollaboratorRequest {
  name: string;
  email: string;
  slug: string;
  password: string;
  subdomain?: string;
  projectName: string;
  projectDescription?: string;
  fathomShareUrls?: string[];
}

export interface UpdateCollaboratorRequest {
  name?: string;
  email?: string;
  password?: string;
  status?: 'active' | 'inactive';
  projectDescription?: string;
  customContent?: CollaboratorContent;
}

export interface AddMeetingRequest {
  collaboratorId: string;
  shareUrl: string;
  title: string;
  recordedAt?: string;
}

export interface SendNotificationRequest {
  collaboratorId: string;
  subject: string;
  message: string;
  includeMeetingLink?: boolean;
  meetingShareUrl?: string;
}

// Response types
export interface CollaboratorResponse {
  success: boolean;
  collaborator?: Collaborator;
  error?: string;
}

export interface CollaboratorsListResponse {
  success: boolean;
  collaborators?: Collaborator[];
  total?: number;
  error?: string;
}
