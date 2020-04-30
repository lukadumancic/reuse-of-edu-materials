export interface Presentation {
  id: string;
  title: string;
  date: Date;
  screens: Screen[];
}

export interface Screen {
  src: string;
  index?: number;
}

export interface PresentationsState {
  presentations: Presentation[];
  selectedPresentationIndex: number;
}

export interface Store {
  presentations: PresentationsState;
}
