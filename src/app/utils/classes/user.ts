/**
 * 用户
 */
export class User {

  /**
   * ID
   */
  public id: string;

  /**
   * 邮箱
   */
  public email: string;

  /**
   * 用户名
   */
  public username?: string;

  /**
   * 访问token
   */
  public access_token?: string;

}

/**
 * `Array<User>` 别名
 */
export type UserList = Array<User>;
