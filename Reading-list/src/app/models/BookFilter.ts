import { BookState } from "./BookStateEnum";

export class BoardFilter {
    selectedState: BookState | null;

    constructor(selectedState: BookState | null = null) {
        this.selectedState = selectedState;
    }
  }