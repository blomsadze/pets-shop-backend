import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.util.js';
import { errorHandler } from '../utils/errorHandler.util.js';
import { successHandler } from '../utils/successHadler.util.js';
import { IUser } from '../interfaces/user.interface.js';
import { loginSchema, signUpSchema } from '../validations/auth.validation.js';
import { validationHandler } from '../utils/validationHandler.util.js';

dotenv.config();

const refreshTokens: string[] = [];

const accessTokenSecretKey = process.env.TOKEN_KEY as string;
const refreshTokenSecretKey = `${process.env.TOKEN_KEY}/refresh-token`;

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const { error } = signUpSchema.validate(req.body, { abortEarly: false });

  if (error) return validationHandler(res, error);

  const checkIfExistsUser = await User.findOne({ email: email });

  if (checkIfExistsUser)
    return errorHandler(res, 'User with given email already exists', 400);

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    cart: { items: [] }
  });
  await newUser.save();
  return successHandler(res, newUser, '', 200);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) return validationHandler(res, error);

  const user = (await User.findOne({ email }).select('+password')) as IUser;

  if (!user) return errorHandler(res, 'username or password is incorrect', 400);

  const checkPassword = bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return errorHandler(res, 'username or password is incorrect', 400);
  }

  const accessToken = jwt.sign({ userId: user._id }, accessTokenSecretKey, {
    expiresIn: '1m'
  });

  const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecretKey);

  refreshTokens.push(refreshToken);
  console.log('refreshTokens after push:', refreshTokens);

  req.session.user = user;
  req.session.token = accessToken;

  req.session.save();

  return successHandler(
    res,
    {
      accessToken,
      refreshToken
    },
    '',
    200
  );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  req.session.destroy(() => {});

  return successHandler(res, null, '', 200);
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, refreshTokenSecretKey, (err: any, user: any) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { uuserId: user._id },
        accessTokenSecretKey,
        { expiresIn: '15m' }
      );
      res.json({ accessToken });
    });
  }
);
