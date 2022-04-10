import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, '*(&b123b12y798hZZ3an19n6123') as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token invalid' });
  }
}

export { ensureAuthenticateDeliveryman };