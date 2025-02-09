import { FC } from "react"
import HomePage from "../../pages/HomePage/HomePage"

export const GlobalRoute  = {
    Home: "/",
    HomePaginated: "/pages/:id"
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
];