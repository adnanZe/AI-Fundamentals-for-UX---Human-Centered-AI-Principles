export type FeedbackType = 'like' | 'dislike' | 'report';

export interface Feedback {
  id: string;
  type: FeedbackType;
  suggestionId: string;
  field: string;
  timestamp: Date;
  comment?: string;
}

export interface FeedbackStats {
  likes: number;
  dislikes: number;
  reports: number;
}
