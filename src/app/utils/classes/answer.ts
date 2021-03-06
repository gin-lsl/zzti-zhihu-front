import { User } from './user';

/**
 * 回答模型
 */
export class Answer {

  /**
   * ID
   */
  public id: string;

  /**
   * 对应的问题ID
   */
  public questionId: string;

  /**
   * 回答者信息
   */
  public answerer: User;

  /**
   * 活动信息
   */
  public activity?: any;
}

/**
 * `Array<Answer>` 别名
 */
export type AnswerList = Array<Answer>;
