import { Action } from '@ngrx/store';
import { ResponseError } from '../../../utils/index';

export enum ReplyActionTypesEnum {
  Load = '[Reply] Load',
  LoadSuccess = '[Reply] Load Success',
  LoadFailure = '[Reply] Load Failure',

  Post = '[Reply] Post',
  PostSuccess = '[Reply] Post Success',
  PostFailure = '[Reply] Post Failure',
}

export class Load implements Action {
  readonly type = ReplyActionTypesEnum.Load;
  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = ReplyActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = ReplyActionTypesEnum.LoadFailure;
  constructor(public payload: ResponseError) { }
}

export class Post implements Action {
  readonly type = ReplyActionTypesEnum.Post;
  constructor(public payload: ReplyPost) { }
}

export class PostSuccess implements Action {
  readonly type = ReplyActionTypesEnum.PostSuccess;
  constructor(public payload: any) { }
}

export class PostFailure implements Action {
  readonly type = ReplyActionTypesEnum.PostFailure;
  constructor(public payload: ResponseError) { }
}

export type ReplyActions
  = Load
  | LoadSuccess
  | LoadFailure

  | Post
  | PostSuccess
  | PostFailure;


/**
 * 提交回复内容
 */
export class ReplyPost {
  /**
   * 回复的问题ID
   */
  public questionId: string;

  /**
   * 回复的内容
   */
  public content: string;
}
