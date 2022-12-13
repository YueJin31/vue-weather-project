import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import FavoritesView from "@/views/FavoritesView.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "home" },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/vue-weather-project/favorites",
    name: "favorites",
    component: FavoritesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
