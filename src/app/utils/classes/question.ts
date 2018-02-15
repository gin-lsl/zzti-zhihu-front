/**
 * 问题
 */
export class Question {

  /**
   * ID
   */
  id: string;

  /**
   * 标题
   */
  title: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 用户ID
   */
  userId: string;

  /**
   * 标签
   */
  tags: Array<string>;

  /**
   * 发布日期
   */
  createAt: Date;

  /**
   * 收藏此问题的用户id
   */
  collectUserIds: Array<string>;

  /**
   * 给此问题点赞的用户
   */
  upUserIds: Array<string>;

  /**
   * 反对此问题的用户
   */
  downUserIds: Array<string>;

  /**
   * 收藏此问题的用户
   */
  saveUserIds: Array<string>;

  /**
   * 是否是匿名用户提问
   */
  isAnonymous: boolean;
}

/**
 * `Array<Question>` 别名
 */
export type QuestionList = Array<Question>;
