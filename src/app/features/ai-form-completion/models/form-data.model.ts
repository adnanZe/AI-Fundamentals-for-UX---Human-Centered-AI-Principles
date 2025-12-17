export interface ProfileFormData {
  name: string;
  bio: string;
  role: string;
  hobbies: string;
}

export interface FormFieldChange {
  field: keyof ProfileFormData;
  oldValue: string;
  newValue: string;
  timestamp: Date;
  source: 'user' | 'ai';
}
