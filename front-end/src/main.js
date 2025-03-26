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
  apiKey: "AIzaSyDuEk7Gvyk-kNFPudKbohIYMxCBsPK3bqw",
  authDomain: "e-commerce-demo-vue.firebaseapp.com",
  projectId: "e-commerce-demo-vue",
  storageBucket: "e-commerce-demo-vue.firebasestorage.app",
  messagingSenderId: "458074488643",
  appId: "1:458074488643:web:ec400ccca1d1ffda25f9f6"
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
