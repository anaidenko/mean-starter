import { Request, Response } from 'express';
import PromiseRouter from 'express-promise-router';

const router = PromiseRouter();

router.all('/ping', async (req: Request, res: Response) => {
  res.send(`Pong at ${new Date()}`);
});

router.all('/echo', async (req: Request, res: Response) => {
  res.json(req.query);
});

export default router;
