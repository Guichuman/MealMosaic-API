import { Response } from 'express';

interface ApiResponse {
  status: number;
  message: string;
  data?: any;
}

export const sendApiResponse = (res: Response, status: number, message: string, data?: any): void => {
  const response: ApiResponse = { status, message };

  if (data !== undefined) {
    response.data = data;
  }

  res.status(status).json(response);
};
