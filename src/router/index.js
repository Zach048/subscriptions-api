import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import JwtService from "@/common/jwt.service";
import api from '@/common/api.config'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/auth/oidc/callback",
    name: "callback",
    component: () => import("../components/Callback.vue")
  },

  // {
  //   path: "/create",
  //   name: "create",
  //   component: () => import("../components/Create.vue")
  // },
  // {
  //   path: "/edit/:id",
  //   name: "edit",
  //   component: () => import("../components/Edit.vue")
  // },
  {
    path: "/index",
    name: "index",
    component: () => import("../components/Index.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth.isAuthenticated;

  // Unauthenticated user can only access the home page.
  if (to.path != '/' && to.name != 'callback' && !isAuthenticated) {
    next('/');
  } 
  else {
    next();
  }
});

export default router
