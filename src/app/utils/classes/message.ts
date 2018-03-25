import { MessageTypeEnum } from '../enums/index';

/**
 * 消息
 */
export class Message {

  id: string;

  /**
   * 是否已经查看过
   */
  isLooked: boolean;
  /**
   * 消息类型
   */
  type: MessageTypeEnum;
  /**
   * 消息创建时间
   */
  createAt: Date;
  /**
   * 消息创建者, 指的是这条消息跟何人有关
   */
  createUserId: string;
  /**
   * 消息给谁提示
   */
  userId: string;
  /**
   * 消息内容
   */
  content?: string;
  /**
   * 链接
   */
  link?: string;

}
