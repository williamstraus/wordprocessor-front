export interface IState {
    id: string | undefined;
    data: Object | undefined,
    submitCounter: number,
    file: File | null,
    errorMessage: string,
    showFileSubmitButton: boolean,
    showIdSubmitButton: boolean
  }