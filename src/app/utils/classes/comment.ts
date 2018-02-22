/**
 * 评论
 */
export class Comment {

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
   * 评论的回复ID, 可以没有, 比如评论的是问题而不是某个回复信息
   */
  replyId?: string;

  /**
   * 用户ID
   */
  userId: string;

  /**
   * 发布时间
   */
  createAt: Date;

  /**
   * 给此评论点赞的用户
   */
  upUserIds: Array<string>;

  /**
   * 反对此评论的用户
   */
  downUserIds: Array<string>;

  /**
   * 是否是匿名用户评论
   */
  isAnonymous: boolean;

}

/**
 * `Array<Comment>` 别名
 */
export type CommentList = Array<Comment>;
