import express from 'express';
import { login, signUp, logout } from '../controllers/auth.controller.js';

export const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
authRoutes.post('/signup', signUp);
