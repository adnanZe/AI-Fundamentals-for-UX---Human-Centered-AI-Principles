import { Component, input, output, signal, computed, inject } from '@angular/core';
import { FeedbackType } from '../../models/feedback.model';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback-buttons',
  imports: [],
  template: `
    <div class="feedback-container">
      <div class="feedback-label">Was this suggestion helpful?</div>

      <div class="feedback-buttons">
        <button
          type="button"
          class="feedback-btn"
          [class.active]="selectedFeedback() === 'like'"
          [disabled]="hasSubmitted()"
          (click)="handleFeedback('like')"
          title="Like this suggestion"
        >
          <span class="icon">👍</span>
          <span class="text">Helpful</span>
        </button>

        <button
          type="button"
          class="feedback-btn"
          [class.active]="selectedFeedback() === 'dislike'"
          [disabled]="hasSubmitted()"
          (click)="handleFeedback('dislike')"
          title="Dislike this suggestion"
        >
          <span class="icon">👎</span>
          <span class="text">Not Helpful</span>
        </button>

        <button
          type="button"
          class="feedback-btn report"
          [class.active]="selectedFeedback() === 'report'"
          [disabled]="hasSubmitted()"
          (click)="handleFeedback('report')"
          title="Report an issue with this suggestion"
        >
          <span class="icon">🚩</span>
          <span class="text">Report</span>
        </button>
      </div>

      @if (hasSubmitted()) {
        <div class="feedback-message">
          <span class="success-icon">✓</span>
          Thank you for your feedback!
        </div>
      }
    </div>
  `,
  styles: [
    `
      .feedback-container {
        margin-top: 16px;
        padding: 16px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e9ecef;
      }

      .feedback-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: #495057;
        margin-bottom: 12px;
      }

      .feedback-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .feedback-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        background: white;
        border: 2px solid #dee2e6;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        color: #495057;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .feedback-btn:not(:disabled):hover {
        border-color: #667eea;
        background: #f8f9ff;
        transform: translateY(-1px);
      }

      .feedback-btn:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      .feedback-btn.active {
        border-color: #667eea;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .feedback-btn.report.active {
        border-color: #dc3545;
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
      }

      .icon {
        font-size: 1.1rem;
        line-height: 1;
      }

      .text {
        font-size: 0.875rem;
      }

      .feedback-message {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 12px;
        padding: 10px 14px;
        background: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 6px;
        color: #155724;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .success-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        background: #28a745;
        color: white;
        border-radius: 50%;
        font-size: 0.75rem;
        font-weight: bold;
      }

      @media (max-width: 640px) {
        .feedback-buttons {
          flex-direction: column;
        }

        .feedback-btn {
          width: 100%;
          justify-content: center;
        }
      }
    `,
  ],
})
export class FeedbackButtonsComponent {
  private readonly feedbackService = inject(FeedbackService);

  suggestionId = input.required<string>();
  field = input.required<string>();

  feedbackSubmitted = output<FeedbackType>();

  protected readonly selectedFeedback = signal<FeedbackType | null>(null);
  protected readonly hasSubmitted = computed(() => this.selectedFeedback() !== null);

  protected handleFeedback(type: FeedbackType): void {
    if (this.hasSubmitted()) return;

    this.selectedFeedback.set(type);
    this.feedbackService.submitFeedback(this.suggestionId(), this.field(), type);
    this.feedbackSubmitted.emit(type);
  }
}
