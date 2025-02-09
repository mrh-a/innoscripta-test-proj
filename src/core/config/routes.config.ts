import { FC } from "react"
import HomePage from "../../pages/HomePage/HomePage"
import NewsDetails from "../../pages/NewsDetails/NewsDetails";

export const GlobalRoute  = {
    Home: "/",
    NewsDetails: "/news/:id"
}

export const MainRoutes: { route: string; component: FC }[] = [
  {
    route: GlobalRoute.Home,
    component: HomePage,
  },
  {
    route: GlobalRoute.NewsDetails,
    component: NewsDetails,
  },
];