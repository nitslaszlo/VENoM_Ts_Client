import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/Home.vue";
import AboutView from "@/views/About.vue";
import LoginView from "@/views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/about",
      name: "about",
      component: AboutView
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
