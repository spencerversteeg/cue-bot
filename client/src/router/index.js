import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";
import Add from "../views/Add.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing
  },
  {
    path: "/add",
    name: "Add",
    component: Add
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
