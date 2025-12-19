import { Injectable, signal, computed } from '@angular/core';
import { Feedback, FeedbackType, FeedbackStats } from '../models/feedback.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly feedbacks = signal<Feedback[]>([]);
  private readonly activeFeedback = signal<{ suggestionId: string; type: FeedbackType } | null>(
    null,
  );

  readonly allFeedbacks = this.feedbacks.asReadonly();
  readonly currentFeedback = this.activeFeedback.asReadonly();

  readonly stats = computed<FeedbackStats>(() => {
    const all = this.feedbacks();
    return {
      likes: all.filter((f) => f.type === 'like').length,
      dislikes: all.filter((f) => f.type === 'dislike').length,
      reports: all.filter((f) => f.type === 'report').length,
    };
  });

  /**
   * Submit feedback for a suggestion
   */
  submitFeedback(suggestionId: string, field: string, type: FeedbackType, comment?: string): void {
    // Check if feedback already exists for this suggestion
    const existingIndex = this.feedbacks().findIndex((f) => f.suggestionId === suggestionId);

    const newFeedback: Feedback = {
      id: this.generateId(),
      type,
      suggestionId,
      field,
      timestamp: new Date(),
      comment,
    };

    if (existingIndex !== -1) {
      // Update existing feedback
      this.feedbacks.update((feedbacks) => {
        const updated = [...feedbacks];
        updated[existingIndex] = newFeedback;
        return updated;
      });
    } else {
      // Add new feedback
      this.feedbacks.update((feedbacks) => [...feedbacks, newFeedback]);
    }

    // Set as active feedback
    this.activeFeedback.set({ suggestionId, type });

    console.log(`Feedback submitted: ${type} for suggestion ${suggestionId}`, newFeedback);
  }

  /**
   * Get feedback for a specific suggestion
   */
  getFeedbackForSuggestion(suggestionId: string): Feedback | undefined {
    return this.feedbacks().find((f) => f.suggestionId === suggestionId);
  }

  /**
   * Check if a suggestion has been given feedback
   */
  hasFeedback(suggestionId: string): boolean {
    return this.feedbacks().some((f) => f.suggestionId === suggestionId);
  }

  /**
   * Clear feedback for a suggestion
   */
  clearFeedback(suggestionId: string): void {
    this.feedbacks.update((feedbacks) => feedbacks.filter((f) => f.suggestionId !== suggestionId));

    if (this.activeFeedback()?.suggestionId === suggestionId) {
      this.activeFeedback.set(null);
    }
  }

  /**
   * Clear all feedback
   */
  clearAllFeedback(): void {
    this.feedbacks.set([]);
    this.activeFeedback.set(null);
  }

  /**
   * Generate a unique ID for feedback
   */
  private generateId(): string {
    return `feedback_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}
