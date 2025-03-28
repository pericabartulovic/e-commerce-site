import { createApp } from "vue";
import App from "./App.vue";
import './main.css';
import * as VueRouter from "vue-router";

import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue"

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDHwS8BZMUmKvAe8BqrhYs7JP7G0KI5FYM",
  authDomain: "e-commerce-demo-vue-e29e2.firebaseapp.com",
  projectId: "e-commerce-demo-vue-e29e2",
  storageBucket: "e-commerce-demo-vue-e29e2.firebasestorage.app",
  messagingSenderId: "835473175978",
  appId: "1:835473175978:web:d88a8fc10b80e0db3327d3"
};

initializeApp(firebaseConfig);

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [
        { path: "/", redirect: "/products" },
        {
          path: "/products",
          component: ProductsPage,
          props: true
        },
        {
          path: "/cart",
          component: ShoppingCartPage,
        },
        {
          path: "/products/:productId",
          component: ProductDetailPage,
        },
        {
          path: "/:pathMatch(.*)*",
          component: NotFoundPage,
        }
      ],
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        }
        return { left: 0, top: 0 };
      },
    })
  )
  .mount("#app");
