export interface Task {
  id?: number;
  title: string;
  desc?: string;
  checklist: Check[];
}

export interface Check {
  value: string;
  completed: boolean;
  mode: GuiMode;
}

export enum GuiMode {
  'edit',
  'view',
}
