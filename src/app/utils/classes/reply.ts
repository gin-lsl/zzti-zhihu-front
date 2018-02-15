/**
 * 回复信息
 */
export class Reply {

  /**
   * ID
   */
  id: string;

  /**
   * 内容
   */
  content: string;

  /**
   * 问题ID
   */
  questionId: string;

  /**
   * 用户ID
   */
  userId: string;

  /**
   * 发布时间
   */
  createAt: Date;

  /**
   * 更新时间
   */
  updateAt: Date;

  /**
   * 给此回答点赞的用户
   */
  upUserIds: Array<string>;

  /**
   * 反对此回答的用户
   */
  downUserIds: Array<string>;

  /**
   * 是否是匿名用户回答
   */
  isAnonymous: boolean;
}

/**
 * `Array<Reply>` 别名
 */
export type ReplyList = Array<Reply>;
