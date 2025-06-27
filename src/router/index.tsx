import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { basicRouter } from './modules/basicRouter';
import { fallbackRouter } from './modules/fallback';

const routes: RouteObject[] = [...basicRouter, ...fallbackRouter];

const router = createBrowserRouter(routes);

export default router;
