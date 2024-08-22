import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

interface JwtPayload {
  id: number;
  username: string;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    user as JwtPayload;
    next();
  });
};

export default authenticateToken;
