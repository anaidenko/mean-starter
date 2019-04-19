import { Request, Response } from 'express';
import PromiseRouter from 'express-promise-router';

import { authService } from '../../../../modules/security';

const router = PromiseRouter();

// Checks if the user is logged in
router.get('/profile', authService.authenticate, async (req: Request, res: Response) => {
  res.json(req.user);
});

export default router;
