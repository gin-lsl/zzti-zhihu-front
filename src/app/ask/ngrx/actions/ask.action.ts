import { Action } from '@ngrx/store';

export enum AskActionTypesEnum {
  Post = '[Ask] Post',
  PostSuccess = '[Ask] Post Success',
  PostFailure = '[Ask] Post Failure',
}

export class Post implements Action {
  readonly type = AskActionTypesEnum.Post;
  constructor(public payload: any) { }
}

export class PostSuccess implements Action {
  readonly type = AskActionTypesEnum.PostSuccess;
}

export class PostFailure implements Action {
  readonly type = AskActionTypesEnum.PostFailure;
  constructor(public payload: any) { }
}

export type AskActions
  = Post
  | PostSuccess
  | PostFailure;
