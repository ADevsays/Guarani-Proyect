import { RouteRecordRaw, createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import routesArray from './routes';
import pages from './pages';
import Error404Page from '../views/Error404Page.vue';
import YouProfilePage from '../views/YouProfilePage.vue';
import AlreadyYouHaveUserPage from '../views/AlreadyYouHaveUserPage.vue';
import { getToken } from '../helpers/saveToken';
import { changePathToTitle } from '../helpers/changePathToTitle.ts';

function checkIsID(path:string){
  const regex = /id/;
  return regex.test(path);
}

const defaultTitle = 'Asamblea del pueblo Guaraní';
const routes = [] as RouteRecordRaw[];
type RouteMethodParams = [
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
];

routesArray.forEach((route, index) => {
  const routeObj = {
    path: route.path,
    component: pages[index],
    meta:{
      title: `${changePathToTitle(route.path)} - ${defaultTitle}`,
      description: route.description
    }
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
  const objUse = route.path != '/login'
    && route.path != '/registro'
    && route.path != '/registro/admin';
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
  meta:{requiresAuth:true, title:'Tu cuenta'},
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

routes.push({
  path: '/imagen3D/:id',
  component: ()=> import('../views/IndividualVirtualRealityPage.vue'),
  meta:{
    title: `Realidad Virtual - ${defaultTitle}`,
    // description: route.description
  }
});

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next)=>{
  const title = to.meta.title;
  if(title 
    && title != `undefined - ${defaultTitle}`
    && !checkIsID(title as string)){
    document.title = title as string;
  }
  const metaDescription = document.querySelector('meta[name="description"]');
  if(metaDescription){
    metaDescription.setAttribute('content', to.meta.description as string)
  }
  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
