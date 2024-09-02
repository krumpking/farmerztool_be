export class ResponseDto {
  success: boolean;
  message: string;
  data: any;

  static errorResponse (message: string): ResponseDto {
    return {
      success: false,
      message,
      data: null
    }
  }

  static successResponse (message: string, data: any): ResponseDto {
    return {
      success: true,
      message,
      data
    }
  }
}

