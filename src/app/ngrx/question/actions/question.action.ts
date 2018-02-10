import { Action } from '@ngrx/store';

interface QuestionAndUser {
  questionId: string;
  userId: string;
}

export enum QuestionActionTypesEnum {
  Load = '[Question] Load',
  Loading = '[Question] Loading',
  LoadSuccess = '[Question] LoadSuccess',
  LoadFailure = '[Question] LoadFailure',

  LoadOne = '[Question] Load One',
  LoadOneSuccess = '[Question] Load One Success',
  LoadOneFailure = '[Question] Load One Failure',

  Up = '[Question] Up',
  UpSuccess = '[Question] Up Success',
  UpFailure = '[Question] Up Failure',
  CancelUp = '[Question] Cancel Up',
  CancelUpSuccess = '[Question] Cancel Up Success',
  CancelUpFailure = '[Question] Cancel Up Failure',

  Down = '[Question] Down',
  DownSuccess = '[Question] Down Success',
  DownFailure = '[Question] Down Failure',
  CancelDown = '[Question] Cancel Down',
  CancelDownSuccess = '[Question] Cancel Down Success',
  CancelDownFailure = '[Question] Cancel Down Failure',

  Like = '[Question] Like',
  LikeSuccess = '[Question] Like Success',
  LikeFailure = '[Question] Like Failure',
  UnLike = '[Question] UnLike',
  UnLikeSuccess = '[Question] UnLike Success',
  UnLikeFailure = '[Question] UnLike Failure',
}

export class Load implements Action {
  readonly type = QuestionActionTypesEnum.Load;
  /**
   * @todo 此方法需要完善
   *
   * @param payload 条目数
   */
  constructor(public payload?: number) { }
}

export class Loading implements Action {
  readonly type = QuestionActionTypesEnum.Loading;
  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = QuestionActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = QuestionActionTypesEnum.LoadFailure;
  constructor(public payload: any) { }
}

export class LoadOne implements Action {
  readonly type = QuestionActionTypesEnum.LoadOne;
  readonly payload: { questionId: string, isWannaNativateTo: boolean };
  /**
   * @param questionId questionId
   * @param isWannaNativateTo 是否导航到此问题页面
   */
  constructor(private questionId: string, private isWannaNativateTo: boolean) {
    this.payload = {
      questionId,
      isWannaNativateTo
    };
  }
}

export class LoadOneSuccess implements Action {
  readonly type = QuestionActionTypesEnum.LoadOneSuccess;
  constructor(public payload: any) { }
}

export class LoadOneFailure implements Action {
  readonly type = QuestionActionTypesEnum.LoadOneFailure;
  constructor(public paylaod: any) { }
}

export class Up implements Action {
  readonly type = QuestionActionTypesEnum.Up;
  constructor(public payload: string) { }
}

export class UpSuccess implements Action {
  readonly type = QuestionActionTypesEnum.UpSuccess;
  readonly payload: QuestionAndUser;
  constructor(questionId: string, userId: string) {
    this.payload = { questionId, userId };
  }
}

export class UpFailure implements Action {
  readonly type = QuestionActionTypesEnum.UpFailure;
  constructor(public payload: any) { }
}

export class CancelUp implements Action {
  readonly type = QuestionActionTypesEnum.CancelUp;
  constructor(public payload: string) { }
}

export class CancelUpSuccess implements Action {
  readonly type = QuestionActionTypesEnum.CancelUpSuccess;
  readonly payload: QuestionAndUser;
  constructor(questionId: string, userId: string) {
    this.payload = { questionId, userId };
  }
}

export class CancelUpFailure implements Action {
  readonly type = QuestionActionTypesEnum.CancelUpFailure;
  constructor(public payload: any) { }
}

export class Down implements Action {
  readonly type = QuestionActionTypesEnum.Down;
  constructor(public payload: string) { }
}

export class DownSuccess implements Action {
  readonly type = QuestionActionTypesEnum.DownSuccess;
  readonly payload: QuestionAndUser;
  constructor(questionId: string, userId: string) {
    this.payload = { questionId, userId };
  }
}

export class DownFailure implements Action {
  readonly type = QuestionActionTypesEnum.DownFailure;
  constructor(public payload: any) { }
}

export class CancelDown implements Action {
  readonly type = QuestionActionTypesEnum.CancelDown;
  constructor(public payload: string) { }
}

export class CancelDownSuccess implements Action {
  readonly type = QuestionActionTypesEnum.CancelDownSuccess;
  readonly payload: QuestionAndUser;
  constructor(questionId: string, userId: string) {
    this.payload = { questionId, userId };
  }
}

export class CancelDownFailure implements Action {
  readonly type = QuestionActionTypesEnum.CancelDownFailure;
  constructor(public payload: any) { }
}

export class Like implements Action {
  readonly type = QuestionActionTypesEnum.Like;
  constructor(public payload: string) { }
}

export class LikeSuccess implements Action {
  readonly type = QuestionActionTypesEnum.LikeSuccess;
  readonly payload: QuestionAndUser;
  constructor(questionId: string, userId: string) {
    this.payload = { userId, questionId };
  }
}

export class LikeFailure implements Action {
  readonly type = QuestionActionTypesEnum.LikeFailure;
  constructor(public payload: any) { }
}

export class UnLike implements Action {
  readonly type = QuestionActionTypesEnum.UnLike;
  constructor(public payload: string) { }
}

export class UnLikeSuccess implements Action {
  readonly type = QuestionActionTypesEnum.UnLikeSuccess;
  readonly payload: QuestionAndUser;
  constructor(questionId: string, userId: string) {
    this.payload = { questionId, userId };
  }
}

export class UnLikeFailure implements Action {
  readonly type = QuestionActionTypesEnum.UnLikeFailure;
  constructor(public payload: any) { }
}

export type QuestionActions
  = Load
  | Loading
  | LoadSuccess
  | LoadFailure

  | LoadOne
  | LoadOneSuccess
  | LoadOneFailure

  | Up
  | UpSuccess
  | UpFailure
  | CancelUp
  | CancelUpSuccess
  | CancelUpFailure

  | Down
  | DownSuccess
  | DownFailure
  | CancelDown
  | CancelDownSuccess
  | CancelDownFailure

  | Like
  | LikeSuccess
  | LikeFailure
  | UnLike
  | UnLikeSuccess
  | UnLikeFailure;
