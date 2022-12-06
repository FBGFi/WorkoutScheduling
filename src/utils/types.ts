export interface CardItem {
  id: string;
  title: string;
}

export interface Excercise extends CardItem {
  reps: number;
  sets: number;
}

export interface Workout extends CardItem {
  exercises: Excercise[];
}
