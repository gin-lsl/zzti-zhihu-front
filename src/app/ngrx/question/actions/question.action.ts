import { Action } from '@ngrx/store';
import { ResponseError } from '../../../utils/index';

interface QuestionAndUser {
  questionId: string;
  userId: string;
}

export enum QuestionActionTypesEnum {
  Load = '[Question] Load',
  Loading = '[Question] Loading',
  LoadSuccess = '[Question] Load Success',
  LoadFailure = '[Question] Load Failure',

  LoadOne = '[Question] Load One',
  LoadOneSuccess = '[Question] Load One Success',
  LoadOneFailure = '[Question] Load One Failure',

  LoadRelates = '[Question] Load Relates',
  LoadRelatesSuccess = '[Question] Load Relates Success',
  LoadRelatesFailure = '[Question] Load Relates Failure',

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

  Search = '[Question] Search',
  SearchSuccess = '[Question] Search Success',
  SearchFailure = '[Question] Search Failure',
  SearchBoxFocusChange = '[Question] Search Box Focus Change',

  ChangeSort = '[Question] Change Sort',
}

export class Load implements Action {
  readonly type = QuestionActionTypesEnum.Load;
  /**
   * @param payload 条目数
   */
  constructor(public payload?: number | string) { }
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

export class LoadRelates implements Action {
  readonly type = QuestionActionTypesEnum.LoadRelates;
  constructor(public payload: any) { }
}

export class LoadRelatesSuccess implements Action {
  readonly type = QuestionActionTypesEnum.LoadRelatesSuccess;
  constructor(public payload: any) { }
}

export class LoadRelatesFailure implements Action {
  readonly type = QuestionActionTypesEnum.LoadRelatesFailure;
  constructor(public payload: ResponseError) { }
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

export class ChangeSort implements Action {
  readonly type = QuestionActionTypesEnum.ChangeSort;
  constructor(public payload: 'NEWER_TO_OLDER' | 'OLDER_TO_NEWER') { }
}

export class Search implements Action {
  readonly type = QuestionActionTypesEnum.Search;
  constructor(public payload: string) { }
}

export class SearchSuccess implements Action {
  readonly type = QuestionActionTypesEnum.SearchSuccess;
  constructor(public payload: any) { }
}

export class SearchFailure implements Action {
  readonly type = QuestionActionTypesEnum.SearchFailure;
  constructor(public payload: ResponseError) { }
}

export class SearchBoxFocusChange implements Action {
  readonly type = QuestionActionTypesEnum.SearchBoxFocusChange;
  constructor(public payload: boolean) { }
}

export type QuestionActions
  = Load
  | Loading
  | LoadSuccess
  | LoadFailure

  | LoadOne
  | LoadOneSuccess
  | LoadOneFailure

  | LoadRelates
  | LoadRelatesSuccess
  | LoadRelatesFailure

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
  | UnLikeFailure

  | Search
  | SearchSuccess
  | SearchFailure
  | SearchBoxFocusChange

  | ChangeSort;
