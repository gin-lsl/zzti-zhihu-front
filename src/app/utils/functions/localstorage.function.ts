import { User } from '../classes/index';
import { ISignIn } from '../interfaces/index';
import { ACCESS_TOKEN, SIGNED_USER_EMAIL, SIGNED_USER_ID } from '../constants/index';

/**
 * 缓存用户相关的信息到`localStorage`
 *
 * @param user 用户信息
 */
export function cacheUserStorage(user: ISignIn | User): void {

  if (!user || !user.id || !user.access_token || !user.email) {
    clearUserStorage();
    return;
  }
  localStorage.setItem(SIGNED_USER_ID, user.id);
  localStorage.setItem(SIGNED_USER_EMAIL, user.email);
  localStorage.setItem(ACCESS_TOKEN, user.access_token);
}

/**
 * 从`localStorage`清除用户相关的
 */
export function clearUserStorage(): void {

  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(SIGNED_USER_ID);
  localStorage.removeItem(SIGNED_USER_EMAIL);
}

/**
 * 从 `localStorage` 解析出用户数据, 如果没有数据, 会把用户相关的 `localStorage` 数据清除
 */
export function parseUserStorage(): ISignIn | User | null {
  const id = localStorage.getItem(SIGNED_USER_ID);
  const email = localStorage.getItem(SIGNED_USER_EMAIL);
  const access_token = localStorage.getItem(ACCESS_TOKEN);
  if (id && email && access_token) {
    return {
      id,
      email,
      access_token,
    };
  }
  clearUserStorage();
  return null;
}
