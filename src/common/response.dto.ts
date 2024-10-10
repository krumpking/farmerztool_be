class ResponseDto {
  constructor(public message: string, public data: any, public statusCode: number, public success: boolean) {}

  static successResponse(message: string, data: any = null, statusCode: number = 200): ResponseDto {
    return new ResponseDto(message, data, statusCode, true);
  }

  static errorResponse(message: string, statusCode: number = 500): ResponseDto {
    return new ResponseDto(message, null, statusCode, false);
  }
}

class ResponseHandler {
  static handleOk(message: string = 'OK', data: any = null): ResponseDto {
    return ResponseDto.successResponse(message, data, 200);
  }

  static handleCreated(message: string = 'Created', data: any = null): ResponseDto {
    return ResponseDto.successResponse(message, data, 201);
  }

  static handleNoContent(message: string = 'No Content'): ResponseDto {
    return ResponseDto.successResponse(message, null, 204);
  }

  static handleNotModified(message: string = 'Not Modified'): ResponseDto {
    return ResponseDto.successResponse(message, null, 304);
  }

  static handleBadRequest(message: string = 'Bad Request'): ResponseDto {
    return ResponseDto.errorResponse(message, 400);
  }

  static handleUnauthorized(message: string = 'Unauthorized'): ResponseDto {
    return ResponseDto.errorResponse(message, 401);
  }

  static handleForbidden(message: string = 'Forbidden'): ResponseDto {
    return ResponseDto.errorResponse(message, 403);
  }

  static handleNotFound(message: string = 'Not Found'): ResponseDto {
    return ResponseDto.errorResponse(message, 404);
  }

  static handleInternalServerError(message: string = 'Internal Server Error'): ResponseDto {
    return ResponseDto.errorResponse(message, 500);
  }
}

export { ResponseDto, ResponseHandler }