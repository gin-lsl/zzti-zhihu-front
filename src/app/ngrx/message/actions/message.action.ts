import { Action } from '@ngrx/store';

export enum MessageActionTypesEnum {
  Load = '[Message] Load',
  LoadSuccess = '[Message] Load Success',
  LoadFailure = '[Message] Load Failure',
  Remove = '[Message] Remove',
  RemoveSuccess = '[Message] Remove Success',
  RemoveFailure = '[Message] Remove Failure',
  Clear = '[Message] Clear',
  ClearSuccess = '[Message] Clear Success',
  ClearFailure = '[Message] Clear Failure',
}

export class Load implements Action {
  readonly type = MessageActionTypesEnum.Load;
  constructor() { }
}

export class LoadSuccess implements Action {
  readonly type = MessageActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = MessageActionTypesEnum.LoadFailure;
  constructor(public payload: any) { }
}

export class Remove implements Action {
  readonly type = MessageActionTypesEnum.Remove;
  readonly payload: string;
  constructor(id: string) {
    this.payload = id;
  }
}

export class RemoveSuccess implements Action {
  readonly type = MessageActionTypesEnum.RemoveSuccess;
  constructor(public payload: any) { }
}

export class RemoveFailure implements Action {
  readonly type = MessageActionTypesEnum.RemoveFailure;
  constructor(public payload: any) { }
}

export class Clear implements Action {
  readonly type = MessageActionTypesEnum.Clear;
  constructor() { }
}

export class ClearSuccess implements Action {
  readonly type = MessageActionTypesEnum.ClearSuccess;
  constructor() { }
}

export class ClearFailure implements Action {
  readonly type = MessageActionTypesEnum.ClearFailure;
  constructor(public payload: any) { }
}

export type MessageActions
  = Load
  | LoadSuccess
  | LoadFailure
  | Remove
  | RemoveSuccess
  | RemoveFailure
  | Clear
  | ClearSuccess
  | ClearFailure;
