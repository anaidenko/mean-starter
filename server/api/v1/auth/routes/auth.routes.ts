import { Request, Response } from 'express';
import PromiseRouter from 'express-promise-router';

import { authService } from '../../../../modules/security';

import * as controller from '../controllers/auth.controller';

const router = PromiseRouter();

// Create User
router.post('/signup', async (req: Request, res: Response) => {
  const user = await controller.signup(req, res);
  const result = user.active ? await authService.login(req, res) : { user, token: null };

  // if success give success message
  res.status(201).json({
    message: 'User created.',
    user: result.user,
    token: result.token
  });
});

// Sign User in
router.post('/login', async (req: Request, res: Response) => {
  const { token, user, ip } = await controller.login(req, res);

  // give token to user in a success message
  res.json({
    message: 'Logged in',
    token,
    user,
    ip
  });
});

// Provide profile information for authenticated user only
router.get('/profile', authService.authenticate, async (req: Request, res: Response) => {
  res.json(req.user);
});

// Checks if the user is logged in
router.get('/check', authService.authenticate, async (req: Request, res: Response) => {
  // respond with success message
  return res.json({ message: 'Token is valid' });
});

export default router;
