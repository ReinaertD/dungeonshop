import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "iMain",
    component: Main,
    props: true,
  },
  {
    path: "/form",
    name: "Form",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "form" */ "../components/Form.vue"),
    props: true,
  },
  {
    path: "/product/:id",
    name: "Id",
    component: () =>
      import(/* webpackChunkName: "product" */ "../components/Product.vue"),
    props: true,
    children: [
      {
        path: "edit",
        name: "Edit",
        component: () =>
          import(
            /* webpackChunkName: "edit product" */ "../components/EditProduct.vue"
          ),
        props: true,
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
