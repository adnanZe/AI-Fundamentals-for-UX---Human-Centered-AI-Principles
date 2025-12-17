import { Component, input, computed } from '@angular/core';
import { ConfidenceLevel } from '../../models/ai-suggestion.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-confidence-indicator',
  imports: [NgClass],
  template: `
    <div
      class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
      [ngClass]="badgeClasses()"
    >
      <span class="inline-block w-2 h-2 rounded-full" [ngClass]="dotClasses()"></span>
      <span>Confidence: {{ confidenceLabel() }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class ConfidenceIndicatorComponent {
  confidence = input.required<ConfidenceLevel>();

  confidenceLabel = computed(() => {
    const level = this.confidence();
    return level.charAt(0).toUpperCase() + level.slice(1);
  });

  badgeClasses = computed(() => {
    const level = this.confidence();
    switch (level) {
      case 'high':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'low':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
    }
  });

  dotClasses = computed(() => {
    const level = this.confidence();
    switch (level) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-orange-500';
    }
  });
}
