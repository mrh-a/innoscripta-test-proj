import { FC } from "react"
import HomePage from "../../pages/HomePage/HomePage"
import NotFoundPage from "../../pages/NotFoundPage/HomePage";

export const GlobalRoute  = {
    Home: "/",
    HomePaginated: "/pages/:id",
    NotFound: "*"
}

export const MainRoutes: { route: string; component: FC }[] = [
  {
    route: GlobalRoute.Home,
    component: HomePage,
  },
  {
    route: GlobalRoute.HomePaginated,
    component: HomePage,
  },
  {
    route: GlobalRoute.NotFound,
    component: NotFoundPage,
  },
];