/* eslint-disable @typescript-eslint/no-magic-numbers */

enum StatusCode {
  BadGateway = 502,
  BadRequest = 400,
  Created = 201,
  InternalServerError = 500,
  MethodNotAllowed = 405,
  NotFound = 404,
  OK = 200,
  SeeOther = 303,
  TooManyRequests = 429,
  Unauthorized = 401,
}

export default StatusCode;
