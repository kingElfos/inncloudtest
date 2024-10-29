export interface TaskI {
  id: string;
  title: string;
  description: string;
  completed: boolean | number;
  project_id: string;
}
