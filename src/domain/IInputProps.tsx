import {IState} from './IState'

export interface IInputProps {
    data: IState;
    uploadHandler: (target: EventTarget & HTMLInputElement) => void;
    idHandler: (target: EventTarget & HTMLInputElement) => void;
    submit: () => void;
    get: () => void;
  }