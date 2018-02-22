import { Action } from '@ngrx/store';
import { ResponseError } from '../../../utils/index';

export enum CommentActionTypesEnum {
  Post = '[Comment] Post',
  PostSuccess = '[Comment] Post Success',
  PostFailure = '[Comment] Post Failure',

  Load = '[Comment] Load',
  LoadSuccess = '[Comment] Load Success',
  LoadFailure = '[Comment] Load Failure',
}

export class Post implements Action {
  readonly type = CommentActionTypesEnum.Post;
  constructor(public payload: any) { }
}

export class PostSuccess implements Action {
  readonly type = CommentActionTypesEnum.PostSuccess;
  constructor(public payload: any) { }
}

export class PostFailure implements Action {
  readonly type = CommentActionTypesEnum.PostFailure;
  constructor(public payload: ResponseError) { }
}

export class Load implements Action {
  readonly type = CommentActionTypesEnum.Load;
  constructor(public payload: any) { }
}

export class LoadSuccess implements Action {
  readonly type = CommentActionTypesEnum.LoadSuccess;
  constructor(public payload: any) { }
}

export class LoadFailure implements Action {
  readonly type = CommentActionTypesEnum.LoadFailure;
  constructor(public payload: ResponseError) { }
}

export type CommentActions
  = Post
  | PostSuccess
  | PostFailure
  | Load
  | LoadSuccess
  | LoadFailure;
