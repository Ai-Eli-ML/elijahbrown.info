'use client';

import { useState, useEffect } from 'react';
import styles from './MeetingList.module.css';

interface MeetingInvitee {
  email: string;
  domain: string;
  is_external: boolean;
}

interface MeetingSummary {
  template_name: string;
  markdown_formatted: string;
}

interface ActionItem {
  text: string;
  completed: boolean;
  assignee?: string;
}

interface Meeting {
  id: number;
  title: string;
  recording_id: number;
  url: string;
  share_url: string;
  scheduled_at: string;
  recorded_at: string;
  calendar_invitees: MeetingInvitee[];
  summary?: MeetingSummary;
  action_items?: ActionItem[];
}

interface MeetingsResponse {
  items: Meeting[];
  limit: number;
  next_cursor: string | null;
}

interface MeetingListProps {
  maxMeetings?: number;
  showSummary?: boolean;
  showActionItems?: boolean;
  filterByEmail?: string;
}

export default function MeetingList({
  maxMeetings = 10,
  showSummary = true,
  showActionItems = true,
  filterByEmail,
}: MeetingListProps) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedMeeting, setExpandedMeeting] = useState<number | null>(null);

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const params = new URLSearchParams();
        params.set('summary', showSummary.toString());
        params.set('actions', showActionItems.toString());

        const response = await fetch(`/api/fathom/meetings?${params}`);
        if (!response.ok) throw new Error('Failed to fetch meetings');

        const data: MeetingsResponse = await response.json();

        let filteredMeetings = data.items || [];

        // Filter by email if specified
        if (filterByEmail) {
          filteredMeetings = filteredMeetings.filter(meeting =>
            meeting.calendar_invitees?.some(
              invitee => invitee.email.toLowerCase().includes(filterByEmail.toLowerCase())
            )
          );
        }

        setMeetings(filteredMeetings.slice(0, maxMeetings));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchMeetings();
  }, [maxMeetings, showSummary, showActionItems, filterByEmail]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  function toggleMeeting(meetingId: number) {
    setExpandedMeeting(expandedMeeting === meetingId ? null : meetingId);
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <span>Loading meetings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <span className={styles.errorIcon}>!</span>
        <span>Unable to load meetings. Please try again later.</span>
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div className={styles.empty}>
        <span>No meetings found.</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {meetings.map((meeting) => (
        <div key={meeting.id} className={styles.meetingCard}>
          <div
            className={styles.meetingHeader}
            onClick={() => toggleMeeting(meeting.id)}
          >
            <div className={styles.meetingInfo}>
              <h3 className={styles.meetingTitle}>{meeting.title}</h3>
              <span className={styles.meetingDate}>
                {formatDate(meeting.recorded_at || meeting.scheduled_at)}
              </span>
            </div>
            <div className={styles.meetingActions}>
              <a
                href={meeting.share_url || meeting.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewButton}
                onClick={(e) => e.stopPropagation()}
              >
                Watch Recording
              </a>
              <span className={`${styles.expandIcon} ${expandedMeeting === meeting.id ? styles.expanded : ''}`}>
                {expandedMeeting === meeting.id ? '−' : '+'}
              </span>
            </div>
          </div>

          {expandedMeeting === meeting.id && (
            <div className={styles.meetingDetails}>
              {/* Attendees */}
              {meeting.calendar_invitees && meeting.calendar_invitees.length > 0 && (
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>Attendees</h4>
                  <div className={styles.attendeeList}>
                    {meeting.calendar_invitees.map((invitee, idx) => (
                      <span
                        key={idx}
                        className={`${styles.attendeeBadge} ${invitee.is_external ? styles.external : ''}`}
                      >
                        {invitee.email.split('@')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              {showSummary && meeting.summary && (
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>AI Summary</h4>
                  <div className={styles.summaryContent}>
                    {meeting.summary.markdown_formatted}
                  </div>
                </div>
              )}

              {/* Action Items */}
              {showActionItems && meeting.action_items && meeting.action_items.length > 0 && (
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>Action Items</h4>
                  <ul className={styles.actionItems}>
                    {meeting.action_items.map((item, idx) => (
                      <li
                        key={idx}
                        className={`${styles.actionItem} ${item.completed ? styles.completed : ''}`}
                      >
                        <span className={styles.checkbox}>
                          {item.completed ? '✓' : '○'}
                        </span>
                        <span className={styles.actionText}>{item.text}</span>
                        {item.assignee && (
                          <span className={styles.assignee}>@{item.assignee}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
