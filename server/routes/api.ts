import { Request, Response } from 'express';
import PromiseRouter from 'express-promise-router';

import v1 from './v1';

const router = PromiseRouter();

router.use('/v1', v1);

router.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: 'Welcome!'
  });
});

export default router;
