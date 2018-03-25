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

export const getSignOnErrorMessage = cs(selectAuthState, fromAuth.getSignOnError,
  (state, error) => {
    return state.signOnError && (state.signOnError.errorMessage || '未知错误, 请重试!');
  });

export const getSignInErrorMessage = cs(selectAuthState, fromAuth.getSignInError,
  (state, error) => {
    return state.signInError && (state.signInError.errorMessage || '未知错误, 请重试!');
  });

export const getAuthActiveKey = cs(selectAuthState, state => state.activeKey);

export const getUser = cs(selectUserState, fromUser.getUser);

export const getUserInformationTotal = cs(selectUserState, fromUser.getUser, state => {
  if (state && state.user) {
    const u = state.user;
    let _ups = 0;
    let _saves = 0;
    (u.postedQuestions as Array<any>).forEach(_ => {
      _saves += _.saveUserIds.length || 0;
      _ups += _.upUserIds.length || 0;
    });
    return {
      totalPostedQuestionsUp: _ups,
      totalPostedReplies: u.postedReplies.length,
      totalPostedQuestionsSave: _saves,
    };
  }
  return {};
});

/**
 * 获取用户发布的问题
 */
export const getUserPostedQuestions = cs(selectCoreModuleState, getUserPostedQuestionsSort, getLogedUser, (state, sort, auth) => {
  if (!state.user.user) {
    return [];
  }
  const postedQuestions = ((state.user.user as any).postedQuestions as Array<Question>)
    .map(q => ({
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
  const postedReplies = ((state.user.user as any).postedReplies as Array<Reply>)
    .map(r => ({
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
 * 获取用户动态
 */
export const getUserActivities = cs(getUser, getLogedUser, (user, logedUser) => {
  if (!user) {
    return [];
  }
  const postedQuestions = ((user as any).postedQuestions as Array<any>).map(q => ({
    ...q,
    activity: {
      text: '提出了问题',
      date: q.createAt,
    }
  }));
  const postedReplies = ((user as any).postedReplies as Array<any>).map(r => ({
    ...r,
    activity: {
      text: '回答了问题',
      date: r.createAt,
    }
  }));
  const qrs = [...postedQuestions, ...postedReplies];
  return qrs.map(qr => ({
    ...qr,
  }));
});

/**
 * 获取用户收藏的问题
 */
export const getUserSavedQuestions = cs(selectCoreModuleState, getLogedUser, (state, auth) => {
  if (!state.user.user) {
    return [];
  }
  const savedQuestions = (state.user.user.savedQuestions as Array<Question>);
  return savedQuestions;
});

/**
 * 获取用户基本信息
 */
export const getUserBase = cs(getUser, getLogedUser, (user, logedUser) => {
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
    hasFollowHim: base.followHimUsers && (base.followHimUsers as Array<any>).find(f => f.id === logedUser.id),

    /**
     * 此用户是否关注当前已登录用户
     */
    hasFollowMe: base.hisFollowUsers && (base.hisFollowUsers as Array<any>).find(f => f.id === logedUser.id),
  };
});
