import { Injectable, signal, computed } from '@angular/core';
import { AIAction, ActionType } from '../models/action.model';

@Injectable({
  providedIn: 'root',
})
export class ActionHistoryService {
  private readonly actions = signal<AIAction[]>([]);
  private readonly undoneActions = signal<AIAction[]>([]);
  private readonly currentState = signal<Record<string, string>>({
    title: '',
    description: '',
    tags: '',
  });

  readonly actionHistory = computed(() => this.actions());
  readonly undoneHistory = computed(() => this.undoneActions());
  readonly hasActions = computed(() => this.actions().length > 0);
  readonly hasUndoneActions = computed(() => this.undoneActions().length > 0);
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

    // Clear redo stack when new action is added
    this.undoneActions.set([]);
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
    const actionsToUndo: AIAction[] = [];

    const updatedActions = this.actions().filter((a, index) => {
      if (index < actionIndex) return true;
      if (index === actionIndex) {
        actionsToUndo.push(a);
        return false;
      }
      // Remove subsequent actions on same field
      if (a.field === action.field) {
        actionsToUndo.push(a);
        return false;
      }
      return true;
    });

    this.actions.set(updatedActions);
    // Add undone actions to redo stack (in reverse order)
    this.undoneActions.update((undone) => [...actionsToUndo.reverse(), ...undone]);
  }

  redoAction(): void {
    const undoneActionsList = this.undoneActions();
    if (undoneActionsList.length === 0) return;

    const actionToRedo = undoneActionsList[0];

    // Re-apply the action
    this.currentState.update((state) => ({
      ...state,
      [actionToRedo.field]: actionToRedo.newValue,
    }));

    // Move action back to actions list
    this.actions.update((actions) => [...actions, actionToRedo]);
    this.undoneActions.update((undone) => undone.slice(1));
  }

  clear(): void {
    this.actions.set([]);
    this.undoneActions.set([]);
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
