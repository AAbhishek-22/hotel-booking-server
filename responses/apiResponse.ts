
/**
 * APIs different responses are defined here in this file.
 * 
 */




import { Response } from 'express';



// Success Response without Data
export const successResponse = (res: Response, msg: string): Response => {
  return res.status(200).json({
    status: true,
    message: msg,
  });
};

// Success Response with Data
export const successResponseWithData = (res: Response, msg: string, data?: any): Response => {
  return res.status(200).json({
    status: true,
    message: msg,
    data: data,
  });
};
// Success Response with token
export const successResponseWithToken = (res: Response, msg: string, token: string): Response => {
  return res.status(200).json({
    status: true,
    message: msg,
    securToken: token,
  });
}

// Created Response
export const createdResponse = (res: Response, msg: string): Response => {
  return res.status(201).json({
    message: msg,
  });
};

// Server Error Response
export const serverErrorResponse = (res: Response, error: any): Response => {
  return res.status(500).json({
    status: false,
    message: "Server Error",
    error: error.message,
  });
};

// Client Error Response
export const clientErrorResponse = (res: Response, msg: string): Response => {
  return res.status(400).json({
    status: false,
    message: msg,
  });
};
// Bad Request Response
export const badRequestResponse = (res: Response, msg: string): Response => {
  return res.status(400).json({
    status: false,
    message: msg,
  });
};

// Not Found Response
export const notFoundResponse = (res: Response, msg: string): Response => {
  return res.status(404).json({
    status: false,
    message: msg,
  });
};

// Unauthorized Response
export const unauthorizedResponse = (res: Response, msg: string): Response => {
  return res.status(401).json({
    status: false,
    message: msg,
  });
};

// Forbidden Response
export const forbiddenResponse = (res: Response, msg: string): Response => {
  return res.status(403).json({
    message: msg,
  });
};

// Conflict Response
export const conflictResponse = (res: Response, msg: string): Response => {
  return res.status(409).json({
    status: false,
    message: msg,
  });
};

// Bad Gateway Response
export const badGatewayResponse = (res: Response, msg: string): Response => {
  return res.status(502).json({
    message: msg,
  });
};

// Too Many Requests Response
export const tooManyRequestsResponse = (res: Response, msg: string): Response => {
  return res.status(429).json({
    message: msg,
  });
};

// Not Implemented Response
export const notImplementedResponse = (res: Response, msg: string): Response => {
  return res.status(501).json({
    message: msg,
  });
};

// Service Unavailable Response
export const serviceUnavailableResponse = (res: Response, msg: string): Response => {
  return res.status(503).json({
    message: msg,
  });
};

// Unsupported Media Type Response
export const unsupportedMediaTypeResponse = (res: Response, msg: string): Response => {
  return res.status(415).json({
    message: msg,
  });
};

// No Content Response
export const noContentResponse = (res: Response, msg: string): Response => {
  return res.status(204).json({
    message: msg,
  });
};

// Validation Error Response
export const validationErrorResponse = (res: Response, msg: string, data?: any): Response => {
  return res.status(422).json({
    message: "Validation Error",
    error: msg,
    data: data,
  });
};

export default {
  successResponse,
  successResponseWithData,
  successResponseWithToken,
  createdResponse,
  serverErrorResponse,
  clientErrorResponse,
  badRequestResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
  conflictResponse,
  badGatewayResponse,
  tooManyRequestsResponse,
  notImplementedResponse,
  serviceUnavailableResponse,
  unsupportedMediaTypeResponse,
  noContentResponse,
  validationErrorResponse,

};