import { Injectable, signal, computed } from '@angular/core';
import { AIAction, ActionType } from '../models/action.model';

@Injectable({
  providedIn: 'root',
})
export class ActionHistoryService {
  private readonly actions = signal<AIAction[]>([]);
  private readonly currentState = signal<Record<string, string>>({
    title: '',
    description: '',
    tags: '',
  });

  readonly actionHistory = computed(() => this.actions());
  readonly hasActions = computed(() => this.actions().length > 0);
  readonly fieldValues = computed(() => this.currentState());

  addAction(
    type: ActionType,
    title: string,
    description: string,
    field: string,
    previousValue: string,
    newValue: string,
  ): void {
    const newAction: AIAction = {
      id: this.generateId(),
      type,
      title,
      description,
      timestamp: new Date(),
      previousValue,
      newValue,
      field,
    };

    this.actions.update((actions) => [...actions, newAction]);
    this.currentState.update((state) => ({
      ...state,
      [field]: newValue,
    }));
  }

  undoAction(actionId: string): void {
    const action = this.actions().find((a) => a.id === actionId);
    if (!action) return;

    // Restore previous value
    this.currentState.update((state) => ({
      ...state,
      [action.field]: action.previousValue,
    }));

    // Remove action and all subsequent actions on the same field
    const actionIndex = this.actions().findIndex((a) => a.id === actionId);
    const updatedActions = this.actions().filter((a, index) => {
      if (index < actionIndex) return true;
      if (index === actionIndex) return false;
      // Remove subsequent actions on same field
      return a.field !== action.field;
    });

    this.actions.set(updatedActions);
  }

  clear(): void {
    this.actions.set([]);
    this.currentState.set({
      title: '',
      description: '',
      tags: '',
    });
  }

  private generateId(): string {
    return `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
