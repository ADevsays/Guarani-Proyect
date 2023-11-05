import { RouteRecordRaw, createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import routesArray from './routes';
import pages from './pages';
import Error404Page from '../views/Error404Page.vue';
import YouProfilePage from '../views/YouProfilePage.vue';
import AlreadyYouHaveUserPage from '../views/AlreadyYouHaveUserPage.vue';
import { getToken } from '../helpers/saveToken';

const routes = [] as RouteRecordRaw[];
type RouteMethodParams = [
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
];

routesArray.forEach(({ path }, index) => {
  const routeObj = {
    path: path,
    component: pages[index],
  }
  const loginRegisterObj = {
    ...routeObj,
    beforeEnter: (...params:RouteMethodParams) => {
      const [, , next] = params;
      const isAuthenticated = getToken('user_token');
      if (isAuthenticated) {
        next('/ya_tienes_cuenta');
      } else {
        next();
      }
    }
  }
  const objUse = path != '/login'
    && path != '/registro'
    && path != '/registro/admin';
  routes.push(objUse ? routeObj : loginRegisterObj);
});
routes.push({
  path: '/ya_tienes_cuenta',
  component: AlreadyYouHaveUserPage,
  beforeEnter: (...params:RouteMethodParams) => {
    const [, , next] = params;
    const isAuthenticated = getToken('user_token');         
    if (!isAuthenticated) {
      next('/')
    } else {
      next()
    }
  }
});

routes.push({
  path: '/tu_cuenta',
  component: YouProfilePage,
  meta:{requiresAuth:true},
  beforeEnter: (...params:RouteMethodParams) => {
    const [, , next] = params;
    const isAuthenticated = getToken('user_token');
    if (isAuthenticated) {
      next()
    } else {
      next('/login')
    }
  }
});


routes.push({
  path: '/:catchAll(.*)',
  component: Error404Page
});

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;