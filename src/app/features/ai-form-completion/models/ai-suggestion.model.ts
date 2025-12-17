export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface AISuggestion {
  field: string;
  suggestedText: string;
  confidence: ConfidenceLevel;
  explanation: string;
  originalText: string;
}

export type SuggestionAction = 'accept' | 'modify' | 'reject';

export interface SuggestionState {
  suggestion: AISuggestion | null;
  isVisible: boolean;
  isEditing: boolean;
  editedText: string;
}
