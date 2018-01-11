import { User } from './user';
import { Answer, AnswerList } from './answer';


/**
 * 问题
 */
export class Question {

  /**
   * ID
   */
  public id: string;

  /**
   * 标题
   */
  public title: string;

  /**
   * 描述
   */
  public description: string;

  /**
   * 提问者
   */
  public asker?: User;

  /**
   * 回答列表
   */
  public answerList?: AnswerList;

}

/**
 * `Array<Question>` 别名
 */
export type QuestionList = Array<Question>;
