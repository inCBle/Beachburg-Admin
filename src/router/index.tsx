import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { basicRouter } from './modules/basicRouter';
import { fallbackRouter } from './modules/fallback';
import { practiceRouter } from './modules/practiceRouter';

const routes: RouteObject[] = [...basicRouter, ...practiceRouter, ...fallbackRouter];

const router = createBrowserRouter(routes);

export default router;
