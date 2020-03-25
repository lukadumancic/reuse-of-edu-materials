export interface Presentation {
  id: number;
  title: string;
  date: Date;
  screens: Screen[];
}

export interface Screen {
  src: string;
}

export interface PresentationsState {
  presentations: Presentation[];
}

export interface Store {
  presentations: PresentationsState;
}