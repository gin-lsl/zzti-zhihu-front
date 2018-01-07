import { AccessToken } from '../types/index';

/**
 * 登录请求返回数据类型接口
 */
export interface ISignIn {

  /**
   * ID 用户id
   */
  id: string;

  /**
   * 用户email
   */
  email: string;

  /**
   * access_token
   */
  access_token: AccessToken;

}
