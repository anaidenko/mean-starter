import PromiseRouter from 'express-promise-router';

import AuthRoutes from '../api/v1/auth/routes/auth.routes';
import CoreRoutes from '../api/v1/core/routes/core.routes';
import UserRoutes from '../api/v1/user/routes/user.routes';

const router = PromiseRouter();

router.use('/core', CoreRoutes);
router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);

export default router;
