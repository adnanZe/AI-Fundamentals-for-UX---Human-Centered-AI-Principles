import { Injectable, signal } from '@angular/core';
import { AISuggestion, ConfidenceLevel } from '../models/ai-suggestion.model';
import { ProfileFormData } from '../models/form-data.model';

@Injectable({
  providedIn: 'root',
})
export class AiSuggestionService {
  private readonly isGenerating = signal(false);

  readonly loading = this.isGenerating.asReadonly();

  /**
   * Generates AI suggestion based on current form field and context
   * Mock implementation for demo purposes
   */
  async generateSuggestion(
    field: keyof ProfileFormData,
    currentValue: string,
    formContext: Partial<ProfileFormData>
  ): Promise<AISuggestion> {
    this.isGenerating.set(true);

    // Simulate API delay
    await this.delay(1500);

    const suggestion = this.createSuggestion(field, currentValue, formContext);

    this.isGenerating.set(false);
    return suggestion;
  }

  private createSuggestion(
    field: keyof ProfileFormData,
    currentValue: string,
    context: Partial<ProfileFormData>
  ): AISuggestion {
    switch (field) {
      case 'name':
        return this.suggestName(currentValue);
      case 'bio':
        return this.suggestBio(currentValue, context);
      case 'role':
        return this.suggestRole(currentValue);
      case 'hobbies':
        return this.suggestHobbies(currentValue);
      default:
        return this.defaultSuggestion(field, currentValue);
    }
  }

  private suggestName(currentValue: string): AISuggestion {
    const words = currentValue.trim().split(' ');
    const confidence = this.calculateConfidence(currentValue.length, 5);

    // Capitalize each word properly
    const formatted = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    return {
      id: this.generateId(),
      field: 'name',
      suggestedText: formatted,
      confidence,
      explanation: 'Formatted name with proper capitalization for professional appearance.',
      originalText: currentValue,
    };
  }

  private suggestBio(currentValue: string, context: Partial<ProfileFormData>): AISuggestion {
    const hasRole = context.role && context.role.length > 0;
    const hasHobbies = context.hobbies && context.hobbies.length > 0;

    let enrichedBio = currentValue;

    if (hasRole && !currentValue.toLowerCase().includes(context.role!.toLowerCase())) {
      enrichedBio += ` As a ${context.role}, I bring expertise and passion to my work.`;
    }

    if (
      hasHobbies &&
      !currentValue.toLowerCase().includes('hobby') &&
      !currentValue.toLowerCase().includes('interest')
    ) {
      enrichedBio += ` In my free time, I enjoy ${context.hobbies}.`;
    }

    // If bio is too short, suggest expansion
    if (currentValue.length < 50 && !hasRole && !hasHobbies) {
      enrichedBio = `${currentValue} I'm passionate about creating meaningful experiences and continuous learning.`;
    }

    const confidence = this.calculateConfidence(
      currentValue.length,
      hasRole && hasHobbies ? 30 : 20
    );

    return {
      id: this.generateId(),
      field: 'bio',
      suggestedText: enrichedBio.trim(),
      confidence,
      explanation:
        hasRole || hasHobbies
          ? 'Enhanced bio using your role and hobbies to create a more complete profile.'
          : 'Expanded bio with engaging professional language.',
      originalText: currentValue,
    };
  }

  private suggestRole(currentValue: string): AISuggestion {
    const roleKeywords: Record<string, string> = {
      developer: 'Software Developer',
      design: 'UX/UI Designer',
      frontend: 'Frontend Developer',
      backend: 'Backend Developer',
      fullstack: 'Full-Stack Developer',
      product: 'Product Manager',
      engineer: 'Software Engineer',
      architect: 'Solution Architect',
    };

    let suggestedRole = currentValue;
    const lowerValue = currentValue.toLowerCase();

    // Find matching professional title
    for (const [keyword, title] of Object.entries(roleKeywords)) {
      if (lowerValue.includes(keyword)) {
        suggestedRole = title;
        break;
      }
    }

    // If no match, capitalize properly
    if (suggestedRole === currentValue) {
      suggestedRole = currentValue
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    const confidence = this.calculateConfidence(currentValue.length, 5);

    return {
      id: this.generateId(),
      field: 'role',
      suggestedText: suggestedRole,
      confidence,
      explanation: 'Standardized role title based on common professional terminology.',
      originalText: currentValue,
    };
  }

  private suggestHobbies(currentValue: string): AISuggestion {
    const hobbies = currentValue
      .split(',')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    // Enrich each hobby with descriptive language
    const enrichedHobbies = hobbies.map((hobby) => {
      const lower = hobby.toLowerCase();

      if (lower.includes('read')) return 'reading books and articles';
      if (lower.includes('music')) return 'listening to music and discovering new artists';
      if (lower.includes('sport') || lower.includes('gym'))
        return 'staying active through sports and fitness';
      if (lower.includes('travel')) return 'traveling and exploring new cultures';
      if (lower.includes('cook')) return 'cooking and experimenting with new recipes';
      if (lower.includes('photo')) return 'photography and visual storytelling';
      if (lower.includes('game')) return 'gaming and interactive entertainment';
      if (lower.includes('paint') || lower.includes('draw'))
        return 'creating art through painting and drawing';

      return hobby;
    });

    const suggestedText = enrichedHobbies.join(', ');
    const confidence = this.calculateConfidence(currentValue.length, 10);

    return {
      id: this.generateId(),
      field: 'hobbies',
      suggestedText,
      confidence,
      explanation:
        'Enhanced hobby descriptions to make your profile more engaging and descriptive.',
      originalText: currentValue,
    };
  }

  private defaultSuggestion(field: string, currentValue: string): AISuggestion {
    return {
      id: this.generateId(),
      field,
      suggestedText: currentValue,
      confidence: 'low',
      explanation: 'No specific suggestion available for this field.',
      originalText: currentValue,
    };
  }

  private calculateConfidence(textLength: number, threshold: number): ConfidenceLevel {
    if (textLength >= threshold * 2) return 'high';
    if (textLength >= threshold) return 'medium';
    return 'low';
  }

  private generateId(): string {
    return `suggestion_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
