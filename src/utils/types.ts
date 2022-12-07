export interface CardItem {
  id: string;
  title: string;
}

export interface Exercise extends CardItem {
  reps: number;
  sets: number;
}

export interface Workout extends CardItem {
  exercises: Exercise[];
}
