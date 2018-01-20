import { ErrorCodeEnum } from '../enums/ErrorCode.enum';

export class ResponseError {
  /**
   * 错误代码
   */
  errorCode?: ErrorCodeEnum;

  /**
   * 错误消息，一般直接返回错误代码即可
   */
  errorMessage?: string;

  constructor(errorCode?: ErrorCodeEnum, errorMessage?: string) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}
