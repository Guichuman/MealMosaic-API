import jwt from 'jsonwebtoken';

interface UserPayload {
  id: number;
  username: string;
}

const generateAccessToken = (user: UserPayload) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '24h' });
};

export default generateAccessToken;
