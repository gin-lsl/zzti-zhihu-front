import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../root/reducers/index';
import * as fromAuth from './auth.reducer';
import * as fromUser from './user.reducer';
import { Question, Reply } from '../../../utils/index';

export interface CoreModuleState {
  auth: fromAuth.State;
  user: fromUser.State;
}

export interface State extends fromRoot.State {
  coreModule: CoreModuleState;
}

export const reducers: ActionReducerMap<CoreModuleState> = {
  auth: fromAuth.reducer,
  user: fromUser.reducer,
};

export const selectCoreModuleState = cfs<CoreModuleState>('coreModule');

export const selectAuthState = cs(selectCoreModuleState, state => state.auth);

export const selectUserState = cs(selectCoreModuleState, state => state.user);

const getUserPostedQuestionsSort = cs(selectCoreModuleState, state => state.user.postedQuestionsSort);

const getUserPostedRepliesSort = cs(selectCoreModuleState, state => state.user.postedRepliesSort);

export const getSignedIn = cs(selectAuthState, fromAuth.getSignedIn);

export const getLogedUser = cs(selectAuthState, fromAuth.getUser);

export const getSignOnError = cs(selectAuthState, fromAuth.getSignOnError);

export const getSignInError = cs(selectAuthState, fromAuth.getSignInError);

export const getUser = cs(selectUserState, fromUser.getUser);

/**
 * 获取用户发布的问题
 */
export const getUserPostedQuestions = cs(selectCoreModuleState, getUserPostedQuestionsSort, getLogedUser, (state, sort, auth) => {
  if (!state.user.user) {
    return [];
  }
  const postedQuestions = ((state.user.user as any).postedQuestions as Array<any>)
    .map((q: Question) => ({
      ...q,
      hasUp: q.upUserIds ? q.upUserIds.includes(auth.id) : false,
      hasDown: q.downUserIds ? q.downUserIds.includes(auth.id) : false,
      hasLike: q.saveUserIds ? q.saveUserIds.includes(auth.id) : false,
      upCount: q.upUserIds ? q.upUserIds.length : 0,
      downCount: q.downUserIds ? q.downUserIds.length : 0,
    }));
  switch (sort) {
    case 'OLDER_TO_NEWER':
      return postedQuestions.sort((p, c) => ((new Date(c.createAt) as any) - (new Date(p.createAt) as any)));
    case 'AGREE':
      return postedQuestions.sort((p, c) => (c.upUserIds.length - p.upUserIds.length));
    case 'NEWER_TO_OLDER':
    default:
      return postedQuestions.sort((p, c) => ((new Date(p.createAt) as any) - (new Date(c.createAt) as any)));
  }
});

/**
 * 获取用户发布的回复
 */
export const getUserPostedReplies = cs(selectCoreModuleState, getUserPostedRepliesSort, getLogedUser, (state, sort, auth) => {
  if (!state.user.user) {
    return [];
  }
  const postedReplies = ((state.user.user as any).postedReplies as Array<any>)
    .map((r: Reply) => ({
      ...r,
      hasUp: r.upUserIds ? r.upUserIds.includes(auth.id) : false,
      hasDown: r.downUserIds ? r.downUserIds.includes(auth.id) : false,
      upCount: r.upUserIds ? r.upUserIds.length : 0,
      downCount: r.downUserIds ? r.downUserIds.length : 0,
    }));
  switch (sort) {
    case 'OLDER_TO_NEWER':
      return postedReplies.sort((p, c) => ((new Date(c.createAt) as any) - (new Date(p.createAt) as any)));
    case 'AGREE':
      return postedReplies.sort((p, c) => (c.upUserIds.length - p.upUserIds.length));
    case 'NEWER_TO_OLDER':
    default:
      return postedReplies.sort((p, c) => ((new Date(p.createAt) as any) - (new Date(c.createAt) as any)));
  }
});

/**
 * 获取用户基本信息
 */
export const getUserBase = cs(getUser, getLogedUser, (user, logedUser) => {
  console.log('user: ', user, ', logedUser: ', logedUser);
  if (!(user && logedUser)) {
    return {};
  }
  const base = user.base;
  return {
    ...base,

    /**
     * 是否已登录的本人
     */
    isSelf: base.id && base.id === logedUser.id,

    /**
     * 当前登录用户是否已关注此用户
     */
    hasFollowHim: base.followHimIds && (base.followHimIds as Array<string>).includes(logedUser.id),

    /**
     * 此用户是否关注当前已登录用户
     */
    hasFollowMe: base.hisFollowIds && (base.hisFollowIds as Array<string>).includes(logedUser.id),
  };
});
