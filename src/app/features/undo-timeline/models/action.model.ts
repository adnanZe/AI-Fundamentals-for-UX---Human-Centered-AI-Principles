export type ActionType =
  | 'text-generated'
  | 'text-edited'
  | 'suggestion-accepted'
  | 'auto-completed'
  | 'data-enhanced';

export interface AIAction {
  id: string;
  type: ActionType;
  title: string;
  description: string;
  timestamp: Date;
  previousValue: string;
  newValue: string;
  field: string;
}

export interface ActionHistoryState {
  actions: AIAction[];
  currentText: Record<string, string>;
}
