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
