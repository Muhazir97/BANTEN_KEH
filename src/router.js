import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import DashboardLayout from "./views/admin/DashboardLayout.vue";

// ----------- User ----------------
import Landing from "./views/user/Landing.vue";
import ListContent from "./views/user/ListContent.vue";
import DetailContent from "./views/user/DetailContent.vue";
import Kamus from "./views/user/Kamus.vue";
import QuisPengetahuan from "./views/user/QuisPengetahuan.vue";
// ------------- Admin --------------
import Dashboard from "./views/admin/Dashboard.vue";
import DataContent from "./views/admin/page/DataContent.vue";
import DataBahasa from "./views/admin/page/DataBahasa.vue";
import DataAkun from "./views/admin/page/DataAkun.vue";
import DataQuiz from "./views/admin/page/DataQuiz.vue";


Vue.use(Router);

const vurRouter =  new Router({
  // mode: 'history',
  routes: [

    // --------------------- Route User ---------------------------------------
    {
      path: "/",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/list-content",
      name: "List Content",
      components: { default: ListContent, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/detail-content/:id",
      name: "Detail Content",
      components: { default: DetailContent, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/kamus",
      name: "kamus",
      components: { default: Kamus, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/quis-pengetahuan",
      name: "Quis Pengetahuan",
      components: { default: QuisPengetahuan, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },


    // ------------------------- Route Admin ------------------------------------------
    {
      path: '/',
      component: DashboardLayout,
      redirect: "/dashboard",
      name: 'Dashboard Layout',
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard
        },
        {
          path: "data-content",
          name: "Data Content",
          component: DataContent
        },
        {
          path: "data-bahasa",
          name: "Data Kamus",
          component: DataBahasa
        },
        {
          path: "data-admin",
          name: "Data Admin",
          component: DataAkun
        },
        {
          path: "data-quiz",
          name: "Data Quis",
          component: DataQuiz
        },
      ]
    },

    // --------------------------- General -------------------------------------------

    {
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/landing",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

vurRouter.beforeEach((to, from, next) => {
  const publicPages = ['login', 'landing', 'List Content', 'Detail Content', 'kamus', 'Quis Pengetahuan'];
  const authRequired = !publicPages.includes(to.name);
  const authenticated = JSON.parse(localStorage.getItem('authenticated'));  

  if (authRequired && !authenticated) {
      return next({
          name: 'login',
          query: {redirect: to.fullPath}
      });
  }

  if (authenticated) {
      const auth = JSON.parse(authenticated);
      if (to.name == 'login') {
          return next({
              name: 'Dashboard'
          });
      }
      if (to.name != 'Relogin') {
          if (auth.expired) {
              localStorage.removeItem('token');
              localStorage.setItem('authenticated', false)  
              return next({
                  name: 'login'
              });
          }
      }
  }
  next();
})


export default vurRouter;