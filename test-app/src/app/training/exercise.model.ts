export interface Exercise {
  id: string;
  name: string;
  duration: number; // seconds
  calories: number;
  lastSelected?: Date;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
