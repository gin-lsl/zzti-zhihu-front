import { ErrorCodeEnum } from '../enums/ErrorCode.enum';

/**
 * 响应错误
 */
export class ResponseError {

  /**
   * 未知错误
   */
  public static readonly UNDEFINED_ERROR?: ResponseError = new ResponseError(ErrorCodeEnum.UNDEFINED_ERROR, '发生未知错误, 请重试');

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
